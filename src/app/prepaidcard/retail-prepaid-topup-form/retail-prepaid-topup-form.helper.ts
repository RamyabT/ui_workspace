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
import { PrepaidLoadMoneyService } from '../prepaidLoadMoney-service/prepaidLoadMoney.service';
import { PrepaidLoadMoney } from '../prepaidLoadMoney-service/prepaidLoadMoney.model';
import { AppConfigService } from "@dep/services";
import { Prepaidcard } from "../prepaidcard-service/prepaidcard.model";
import { PpCardService } from "../ppCard-service/ppCard.service";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
import { TranslateService } from "@ngx-translate/core";
export class RetailPrepaidTopUpFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  amount: any = {
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
  exchangeDetails: any = {
    creditAmount: "",
    debitAmount: "",
    exchangeRate: ""
  }
  accountBalanceVariable: any;
  fromCurrencyVariable: any;
  paymentAmountVar!: any;
  toCurrencyVariable: any;
  cardData!: Prepaidcard
  cardPayload: any;
  cardAmount: any;
  currencywithbal: any;
  accountNumber: any;
  impNote: any
  maxTranAmount: any
}


@Injectable()
export class RetailPrepaidTopUpFormHelper extends BaseFpxFormHelper<RetailPrepaidTopUpFormState> {

  constructor(private retailPrepaidTopUpFormService: PrepaidLoadMoneyService,
    private _httpProvider: HttpProviderService, private _router: Router,
    private _appConfig: AppConfigService,
    private _prepaidcardservice: PpCardService,
    private _exchangeRate: CommonService,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
    private _translate: TranslateService
  ) {
    super(new RetailPrepaidTopUpFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILPCTOPUP");
    this.addResetHandler("reset", this.resetForm.bind(this))
  }

  resetForm() {
    console.log(this.formGroup)
    this.reset('amount', "");
    this.reset('currency', "");
    this.reset('accountNumber', "");
    this.reset('termsFlag', "");
    this.reset('remarks', "");
    // this.reset('charges', "");
    this.state.exchangeDetails = {
      creditAmount: "",
      debitAmount: "",
      exchangeRate: ""
    }
    // this.setValue('charges', { amount: 100, currencyCode: this._appConfig.baseCurrency });
    this.setValue('amount', { currencyCode: this._appConfig.baseCurrency });
    this.setValue('accountNumber', this.state.accountNumber);
    this.setHidden('exchangeDetails', true);
    this.handleFormOnLoad();
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    this.setValue('termsFlag',null);
    if (this.getRoutingParam('cardReference')) {
      this.setValue('cardRefNumber', this.getRoutingParam('cardReference'));
    }
    this.state.cardData = this._appConfig.getData('prepaidCardData');
    this.setValue('cardRefNumber', this.state.cardData?.cardRefNumber)
    this.setValue('charges', { amount: 100, currencyCode: this._appConfig.baseCurrency });
    this.setReadonly('charges', true);
    this.setHidden('exchangeDetails', true);
    let key: any = {
      cardReference: this.state.cardData?.cardRefNumber
    }
    this._prepaidcardservice.findByKey(key)().subscribe(res => {
      this.state.cardPayload = res;
      let data: any = [];
      if (this.state.cardPayload?.balanceDetails.length > 1) {
        this.state.cardPayload?.balanceDetails.forEach((element: any) => {
          this.state.currencywithbal = element.currency + " - " + "Bal: " + this._currencyFormatter.transform(element.balance, element.currency);
          data.push({ id: element.currency, text: this.state.currencywithbal })
        });

        this.setValue('currency', this._appConfig.getBaseCurrency());
        this.setStaticDropdown('currency', data);
        //this.setReadonly('currency', true);
      }
      else {
        this.setVariable('toCurrencyVariable', this.state.cardPayload?.balanceDetails[0].currency);
        let currencyText = this.state.cardPayload?.balanceDetails[0].currency + " - " + "Bal: " + this._currencyFormatter.transform(this.state.cardPayload?.balanceDetails[0].balance, this.state.cardPayload?.balanceDetails[0].currency);
        data.push({ id: this.state.cardPayload?.balanceDetails[0].currency, text: currencyText });
        this.setValue('currency', data[0].id);
        this.setStaticDropdown('currency', data);
        //this.setReadonly('currency', true);
      
      }
    })

    let note = this._translate.instant('RetailPrepaidTopUpForm.impNote', {
      impNoteVal: this._appConfig.getBaseCurrency()
    })
    this.state.impNote = note;
    // this.state.impNote ='Note: The Topup amount should be within AED 1.00 and AED 55,000.00'
    this.setAmountCurrencyList('amount', [{ id: this._appConfig.getBaseCurrency(), text: this._appConfig.getBaseCurrency() }]);
    // if (this.getValue('currency') == null) {
    //   this.setHidden('impNote', true)
    // }
  }
  public onCardRefNumberDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 

    if (payload) {
    }
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res: any = response.success?.body?.prepaidLoadMoney;
      routingInfo.setQueryParams({
        response: res,
        result: {
          serviceCode: this.serviceCode,
        }
      });
    }
    else if (response.error) {
      let error: any = response.error.error;
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
    payload.currency = this.getValue('amount').currencyCode;
    payload.amount = this.getValue('amount').amount;
    payload.debitCurrency = this.state.fromCurrencyVariable;
    payload.creditCurrency = this.state.toCurrencyVariable;
    if (payload.exchange == null) {
      delete payload.exchangeRate;
    }
    if (payload.debitAmount == '') {
      delete payload.debitAmount;
    }
    if (payload.remarks == '') {
      delete payload.remarks;
    }
  }

  public handleCardRefNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
  }

  public onAccountNumberDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    if (payload) {
      this.reset('amount');
      this.setHidden('exchangeDetails', true);
      if (!this.state.accountNumber) {
        this.state.accountNumber = payload?.accountNumber;
      }
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
        // this.setAmountCurrencyList('amount', [{ id: this.state.fromCurrencyVariable, text: this.state.fromCurrencyVariable }]);
      }
      // this.state.impNote = 'Note: Minimum amount is 10 ' + this._appConfig.getBaseCurrency();
      // if (this.state.cardAmount > 0){
      //   this.formGroup.get('amount')?.updateValueAndValidity();
      // }


    }
  }

  public handleCurrencyOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    this.setHidden('exchangeDetails',true);
    this.state.toCurrencyVariable = value;
    this.setVariable('toCurrencyVariable', value);
    this.reset('amount','');
    this.setAmountCurrencyList('amount', [{ id: value, text: value}]);
    // this.setFocus('amount');
  
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
      this.state.cardAmount=value.amount;

    }
  }

  onAlertClose(res: any) {
    this.reset('amount');
  }
  public onExchangeRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    this.state.maxTranAmount = Number(payload.maxTranAmount);
    if (Number(this.state.cardData.avlBalance) +Number( payload.creditAmount) > this.state.maxTranAmount && !this.formGroup.controls['amount'].invalid &&Number( payload.creditAmount) <= this.state.maxTranAmount) {
      this.setErrors('amount', 'card_limit_amount_err', { card_limit_amount_err: this._appConfig.getBaseCurrency() + ' ' + String(this.state.maxTranAmount - Number(this.state.cardData.avlBalance)) });
      let errMsg = this._translate.instant('RetailPrepaidTopUpForm.card_limit_amount_err.message', {
        card_limit_amount_err: this._appConfig.getBaseCurrency() + ' ' + String(this.state.maxTranAmount - Number(this.state.cardData.avlBalance))
      })
      let modal = new FpxModal();
      modal.setComponent(DepAlertComponent);
      modal.setPanelClass('dep-alert-popup');
      modal.setBackDropClass('dep-popup-back-drop');
      modal.setDisableClose(true);
      modal.setData({
        title: "RetailPrepaidTopUpForm.card_limit_amount_err.title",
        message: errMsg,
      });
      modal.setAfterClosed(this.onAlertClose.bind(this));
      this.openModal(modal);

    }

    if (payload) {
      this.setValue('exchangeRate', Number(payload.exchangeRate));
      this.setValue('baseRate', Number(payload.baseRate));
      this.setValue('debitAmount', payload.debitAmount);
      this.setValue('creditAmount',Number( payload.creditAmount));
      this.state.paymentAmountVar = payload.debitAmount;
      this.state.exchangeDetails.exchangeRate = 1 + " " + this.state.fromCurrencyVariable + " = " + this.state.toCurrencyVariable + " " + payload.againstRate;
      this.state.exchangeDetails.debitAmount = this.state.fromCurrencyVariable + " " + this._currencyFormatter.transform(payload.debitAmount, this.state.fromCurrencyVariable);
      this.state.exchangeDetails.creditAmount = this.state.toCurrencyVariable + " " + this._currencyFormatter.transform(payload.creditAmount, this.state.toCurrencyVariable);
      if (this.state.cardAmount) {
        if (this.state.toCurrencyVariable != this.state.fromCurrencyVariable && this.state.accountBalanceVariable > this.state.cardAmount) {
          this.setHidden('exchangeDetails', false);
        }
        else {
          this.setHidden('exchangeDetails', true);
        }
      }
      else {
        this.setHidden('exchangeDetails', true);
      }
    }
  }

   public handleTermsFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,

    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    if(value =="N"){
      this.setValue('termsFlag',null);
    }
  }
public override doPostInit(): void {
    this.addControlEventHandler("cardRefNumberDataReceived", this.onCardRefNumberDataReceived);
    this.addControlEventHandler("accountNumberDataReceived", this.onAccountNumberDataReceived);
    this.addControlEventHandler("exchangeRateReceived", this.onExchangeRateDataReceived);
    this.addValueChangeHandler("cardRefNumber", this.handleCardRefNumberOnvalueChange);
    this.addValueChangeHandler("amount", this.handleAmountOnvalueChange);
    this.addValueChangeHandler("currency", this.handleCurrencyOnvalueChange);
    this.addValueChangeHandler("termsFlag", this.handleTermsFlagOnvalueChange);

    this.handleFormOnLoad();
  }


  public override preSubmitInterceptor(payload: PrepaidLoadMoney): any {
    // WRITE CODE HERE TO HANDLE 
    this.handleFormOnPresubmit(payload);
    return payload;
  }


  public override postDataFetchInterceptor(payload: PrepaidLoadMoney) {
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


