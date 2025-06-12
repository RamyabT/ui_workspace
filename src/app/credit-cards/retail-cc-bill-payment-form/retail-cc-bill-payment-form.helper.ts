import { Injectable, inject } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup } from "@angular/forms";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  HttpProviderService,
  IHttpSuccessPayload,
  RoutingInfo,
  BaseFpxChangeHandler,
  BaseFpxControlEventHandler,
  HttpRequest,
  SpinnerService,
  ILookupResponse,
  FpxModal,
  FpxCurrenyFormatterPipe
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { CcbillpaymentrequestService } from '../ccbillpaymentrequest-service/ccbillpaymentrequest.service';
import { Ccbillpaymentrequest } from '../ccbillpaymentrequest-service/ccbillpaymentrequest.model';
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
import { Creditcard } from "../creditcard-service/creditcard.model";

import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
export class RetailCCBillPaymentFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  amount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  otherAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  charges: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  fromCurrencyVariable: any;
  toCurrencyVariable: any;
  creditCardDetails: any;
  cardData!: Creditcard;
  exchangeDetails: any = {
    creditAmount: "",
    debitAmount: "",
    exchangeRate: ""
  }
  accountBalanceVariable: any;
  cardAmount: any;
  amount1: any;
  accountNumber: any;
  accountNum:any;

}


@Injectable()
export class RetailCCBillPaymentFormHelper extends BaseFpxFormHelper<RetailCCBillPaymentFormState>{

  constructor(private retailCCBillPaymentFormService: CcbillpaymentrequestService,
    private _httpProvider: HttpProviderService, private _router: Router,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
    private _appConfig: AppConfigService) {
    super(new RetailCCBillPaymentFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILCCBILLPAYMENT");
    this.addResetHandler("reset", this.resetForm.bind(this));
  }

  resetForm() {
    console.log(this.formGroup)
    this.reset('debitAccount', "");
    this.reset('paymentOption', "");
    this.reset('amount', "");
    this.reset('termsFlag', "");
    this.reset('autoPay', "");
    this.reset('remarks', "");
    this.reset('charges', "");
    this.reset('otherAmount', "");
    this.state.exchangeDetails = {
      creditAmount: "",
      debitAmount: "",
      exchangeRate: ""
    }
    this.setHidden('exchangeDetails', true);
    this.setValue('paymentOption', 'T');
    this.setValue('charges', { amount: 100, currencyCode: this._appConfig.baseCurrency });
    this.setReadonly('charges', true);
    this.setValue('amount', { currencyCode: this.state.cardData.accountCurrency });
    this.setValue('debitAccount', this.state.accountNumber);
    this.setValue('otherAmount', { currencyCode: this.state.cardData.accountCurrency });
    this.setHidden('otherAmount', true);
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    if (this.getRoutingParam('cardReference')) {
      this.setValue('cardRefNumber', this.getRoutingParam('cardReference'));
    }
    this.state.cardData = this._appConfig.getData('creditCardData');
    this.setValue('paymentOption', "T");
    this.setValue('cardRefNumber', this.state.cardData?.cardRefNumber);
    this.setValue('amount', { currencyCode: this.state.cardData.accountCurrency });
    this.setValue('otherAmount', { currencyCode: this.state.cardData.accountCurrency });
    this.setValue('autoPay', '0');
    this.setValue('charges', { amount: 100, currencyCode: this._appConfig.baseCurrency });
    this.state.toCurrencyVariable = this.state.cardData?.accountCurrency;
    this.setVariable('toCurrencyVariable', this.state.cardData?.accountCurrency);
    if (this.formGroup.controls['paymentOption'].value == "T") {
      this.setReadonly('amount', true);
      if (this.state.cardData.totalDueAmount > 0) {
        this.setValue('amount', { amount: this.state.cardData.totalDueAmount, currencyCode: this.state.cardData.accountCurrency });
      }
      else {
        this.setValue('amount', { currencyCode: this.state.cardData.accountCurrency });
        this.setErrors("amount", 'amount_err');
      }
    }
    this.setReadonly('charges', true);
    this.setHidden('exchangeDetails', true);
    this.setHidden('otherAmount', true);
  }
  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.ccbillpaymentrequest;
      routingInfo.setQueryParams({
        response: res
      });
    } else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        response: error,
        serviceCode: this.serviceCode.value
      });
    }
    return response;
  }
  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
    payload.charges = this.getValue('charges').amount;
    if (this.state.cardAmount) {
      payload.accountCurrency = this.getValue('amount').currencyCode;
      payload.amount = Number(this.getValue('amount').amount);
    }
    else if (this.state.amount1) {
      payload.accountCurrency = this.getValue('otherAmount').currencyCode;
      payload.amount = this.getValue('otherAmount').amount;
    }
    payload.debitCurrency = this.state.fromCurrencyVariable;
    payload.creditCurrency = this.state.toCurrencyVariable;
  }

  public onCardRefNumberDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    this.state.creditCardDetails = payload
    // WRITE CODE HERE TO HANDLE 

  }

  public onDebitAccountDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    if (!this.state.accountNumber) {
      this.state.accountNumber = payload?.accountNumber;
    }
    this.state.accountNum = payload?.accountNumber;
    if (payload) {
      if (payload?.availableBalance) {
        this.state.accountBalanceVariable = payload?.availableBalance;
        this.setVariable('accountBalanceVariable', payload?.availableBalance);
      }
      else {
        this.state.accountBalanceVariable = 0;
        this.setVariable('accountBalanceVariable', 0);
      }
      if (payload?.accountCurrency) {
        this.state.fromCurrencyVariable = payload?.accountCurrency;
        this.setVariable('fromCurrencyVariable', payload?.accountCurrency);
      }
      else {
        this.state.fromCurrencyVariable = this._appConfig.baseCurrency;
        this.setVariable('fromCurrencyVariable', this._appConfig.baseCurrency);
      }
      if (this.state.cardAmount > 0 && this.formGroup.controls['paymentOption'].value!='P') {
        this.formGroup.get('amount')?.updateValueAndValidity();
        if (this.state.cardAmount > this.state.accountBalanceVariable) {
          this.setErrors("amount", 'insufficient_balance_error');
          this.setHidden('exchangeDetails', true);
        }
      }
      else if (this.state.amount1 > 0 && this.formGroup.controls['paymentOption'].value=='P') {
        this.formGroup.get('otherAmount')?.updateValueAndValidity();
        if (this.state.amount1 > this.state.accountBalanceVariable) {
          this.setErrors("otherAmount", 'insufficient_balance_error');
          this.setHidden('exchangeDetails', true);
        }
      }
    }
  }

  public handlePaymentOptionOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value) {
      if (value == "T") {
        this.setHidden('otherAmount', true);
        this.setHidden('amount', false);
        this.setReadonly('amount', true);
        if (this.state.cardData.totalDueAmount > 0) {
          this.setValue('amount', { amount: this.state.cardData.totalDueAmount, currencyCode: this.state.cardData.accountCurrency });
        }
        else {
          this.reset('amount', "");
          this.setValue('amount', { currencyCode: this.state.cardData.accountCurrency });
          this.setErrors("amount", 'amount_err');
          this.setHidden('exchangeDetails', true);
        }
      }
      else if (value == "M") {
        this.setHidden('otherAmount', true);
        this.setHidden('amount', false);
        this.setReadonly('amount', true);
        if (this.state.cardData.minPaymentDue > 0) {
          this.setValue('amount', { amount: this.state.cardData.minPaymentDue, currencyCode: this.state.cardData.accountCurrency });
        }
        else {
          this.reset('amount', "");
          this.setValue('amount', { currencyCode: this.state.cardData.accountCurrency });
          this.setErrors("amount", 'amount_err');
          this.setHidden('exchangeDetails', true);
        }
      }
      else if (value == "O") {
        this.setHidden('otherAmount', true);
        this.setHidden('amount', false);
        this.setReadonly('amount', true);
        if (this.state.cardData.outstandingAmount > 0) {
          this.setValue('amount', { amount: this.state.cardData.outstandingAmount, currencyCode: this.state.cardData.accountCurrency });
        }
        else {
          this.reset('amount', "");
          this.setValue('amount', { currencyCode: this.state.cardData.accountCurrency });
          this.setErrors("amount", 'amount_err1');
          this.setHidden('exchangeDetails', true);
        }
      }
      else {
        this.reset('amount', "");
        this.setHidden('amount', true);
        this.setHidden('otherAmount', false);
        this.setFocus('otherAmount')
        this.setAmountCurrencyList('otherAmount', [{ id: this.state.cardData.accountCurrency, text: this.state.cardData.accountCurrency }]);
        // this.setReadonly('amount', false);
        this.setHidden('exchangeDetails', true);
      }
    }
  }
  public handleAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value) {
      this.state.cardAmount = value.amount;
      if (this.state.cardAmount > this.state.accountBalanceVariable) {
        this.setErrors("amount", 'insufficient_balance_error');
        this.setHidden('exchangeDetails', true);
      }
    }
  }

  public handleOtherAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value) {
      this.state.amount1 = value.amount;
      if(value.amount>0){
        this.state.cardAmount=null;
      }
      if (value.amount > this.state.cardData.outstandingAmount || !this.state.cardData.outstandingAmount) {
        this.setErrors("otherAmount", 'max_amount_err');
        this.setHidden('exchangeDetails', true);
      }
      else if (value.amount < this.state.cardData.minPaymentDue || !this.state.cardData.totalDueAmount) {
        this.setErrors("otherAmount", 'min_amount_err');
        this.setHidden('exchangeDetails', true);
      }
      else if (value.amount > this.state.accountBalanceVariable) {
        this.setErrors("otherAmount", 'insufficient_balance_error');
        this.setHidden('exchangeDetails', true);
      }
    }
  }

  public handleAutoPayOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value == '1') {
      let modal = new FpxModal();
      modal.setComponent(DepAlertComponent);
      modal.setPanelClass('dep-alert-popup');
      modal.setBackDropClass('dep-popup-back-drop');
      modal.setDisableClose(false);
      modal.setData({
        message: ' The bill amount generated will be automatically debited from the debit account '+ '"' + this.state.accountNum +'"' +' on the due date',
      });
      // modal.setAfterClosed(this.MenuClose);
      this.openModal(modal);
    }
  }

  public onExchangeRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    if (payload) {
      this.setValue('exchangeRate', Number(payload.exchangeRate));
      this.setValue('baseRate', Number(payload.baseRate));
      this.setValue('debitAmount', Number(payload.debitAmount));
      this.setValue('creditAmount', Number(payload.creditAmount));
      this.state.exchangeDetails.exchangeRate = 1 + " " + this.state.fromCurrencyVariable + " = " + this.state.toCurrencyVariable + " " + payload.againstRate;
      this.state.exchangeDetails.debitAmount = this.state.fromCurrencyVariable + " " + this._currencyFormatter.transform(payload.debitAmount, this.state.fromCurrencyVariable);
      this.state.exchangeDetails.creditAmount = this.state.toCurrencyVariable + " " + this._currencyFormatter.transform(payload.creditAmount, this.state.toCurrencyVariable);
      if (this.state.cardAmount) {
        if (this.state.accountBalanceVariable > this.state.cardAmount && this.state.toCurrencyVariable != this.state.fromCurrencyVariable) {
          this.setHidden('exchangeDetails', false);
        }
        else {
          this.setHidden('exchangeDetails', true);
        }
      }
      else if (this.state.amount1) {
        if (this.state.accountBalanceVariable > this.state.amount1 && this.state.toCurrencyVariable != this.state.fromCurrencyVariable && this.state.amount1) {
          this.setHidden('exchangeDetails', false);
        }
        else {
          this.setHidden('exchangeDetails', true);
        }
      }
      else{
        this.setHidden('exchangeDetails', true);
      }
    }
  }
  public override doPostInit(): void {
    setTimeout(() => {
      window.scrollTo(0,0);
    },100);
    this.addControlEventHandler("cardRefNumberDataReceived", this.onCardRefNumberDataReceived);
    this.addControlEventHandler("debitAccountDataReceived", this.onDebitAccountDataReceived);
    this.addValueChangeHandler("paymentOption", this.handlePaymentOptionOnvalueChange);
    this.addValueChangeHandler("amount", this.handleAmountOnvalueChange);
    this.addValueChangeHandler("otherAmount", this.handleOtherAmountOnvalueChange);
    this.addValueChangeHandler("autoPay", this.handleAutoPayOnvalueChange);
    this.addControlEventHandler("exchangeRateReceived", this.onExchangeRateDataReceived);

    this.handleFormOnLoad();
  }


  public override preSubmitInterceptor(payload: Ccbillpaymentrequest): any {
    // WRITE CODE HERE TO HANDLE 
    this.handleFormOnPresubmit(payload);
    return payload;
  }


  public override postDataFetchInterceptor(payload: Ccbillpaymentrequest) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


