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
import { PrepaidwallettransferreqService } from '../prepaidwallettransferreq-service/prepaidwallettransferreq.service';
import { Prepaidwallettransferreq } from '../prepaidwallettransferreq-service/prepaidwallettransferreq.model';
import { AppConfigService } from "@dep/services";
import { PpCardService } from "../ppCard-service/ppCard.service";
import { Prepaidcard } from "../prepaidcard-service/prepaidcard.model";
export class RetailPrepaidWalletTransferFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);


  showSuggestion: boolean = false;
  paymentAmount: any = {
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
  cbxrTerms: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  accountBalanceVariable: any;
  exchangeDetails: any = {
    creditAmount: "",
    debitAmount: "",
    exchangeRate: ""
  }
  fromCurrencyVariable: any;
  paymentAmountVar!: any;
  toCurrencyVariable: any;
  cardPayload: any;
  cardData!: Prepaidcard;
  allowedCurrency: any = [

  ]
  currencywithbal: any;
  cardAmount:any;
}


@Injectable()
export class RetailPrepaidWalletTransferFormHelper extends BaseFpxFormHelper<RetailPrepaidWalletTransferFormState>{

  constructor(private retailPrepaidWalletTransferFormService: PrepaidwallettransferreqService,
    private _httpProvider: HttpProviderService, private _router: Router,
    private _appConfig: AppConfigService,
    private _prepaidcardservice: PpCardService,
    private _currencyFormatter: FpxCurrenyFormatterPipe) {
    super(new RetailPrepaidWalletTransferFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILPREPAIDWALLETTRAN");
    this.addResetHandler("reset", this.resetForm.bind(this))
  }

  resetForm() {
    console.log(this.formGroup)
    this.reset('fromCurrency', "");
    this.reset('paymentAmount', "");
    this.reset('toCurrency', "");
    this.reset('cbxrTerms', "");
    this.reset('remarks', "");
    this.reset('charges', "");
    this.state.exchangeDetails = {
      creditAmount: "",
      debitAmount: "",
      exchangeRate: ""
    }
    this.handleFormOnLoad();
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    this.setValue('cbxrTerms',null);
    if (this.getRoutingParam('cardReference')) {
      this.setValue('cardRefNumber', this.getRoutingParam('cardReference'));
    }
    this.setHidden('exchangeDetails', true);
    this.state.cardData = this._appConfig.getData('prepaidCardData');
    this.setValue('cardRefNumber', this.state.cardData?.cardRefNumber)

    let key: any = {
      cardReference: this.state.cardData?.cardRefNumber
    }
    this._prepaidcardservice.findByKey(key)().subscribe(res => {
      this.state.cardPayload = res;
      let data: any = [];
      this.state.cardPayload?.balanceDetails.forEach((element: any) => {
        this.state.currencywithbal = element.currency + " - " + "Bal: " + this._currencyFormatter.transform(element.balance, element.currency);
        data.push({ id: element.currency, text: this.state.currencywithbal })
      });
      // this.setStaticDropdown('fromCurrency', data);
      this.setValue('fromCurrency', this._appConfig.getBaseCurrency());
      this.setStaticDropdown('fromCurrency', data);
      // this.setReadonly('currency', true);
    })

    this.setValue('charges', { amount: 100, currencyCode: this._appConfig.baseCurrency });
    this.setReadonly('charges', true);
    this.setHidden('exchangeDetails', true);
  }

  public handleCardRedNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions

  }
  public handlePaymentAmountOnvalueChange: BaseFpxChangeHandler = (
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
    if(value.amount<0 || !value.amount){
      // this.setErrors('paymentAmount','amount_err');
      this.setHidden('exchangeDetails', true);
    }

  }
  public handleFromCurrencyOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    this.state.fromCurrencyVariable = value;
    this.setVariable('fromCurrencyVariable', value);
    this.reset('paymentAmount');
    this.reset('toCurrency','')
    
    
    if (value) {
      this.setAmountCurrencyList('paymentAmount', [{ id: this.state.fromCurrencyVariable, text: this.state.fromCurrencyVariable }]);
      this.state.allowedCurrency[0] = value;
      let i = 0
      for (i; i < this.state.cardPayload.balanceDetails.length; i++) {
        if (value == this.state.cardPayload.balanceDetails[i].currency) {
          this.state.accountBalanceVariable = this.state.cardPayload.balanceDetails[i].balance;
          this.setVariable('accountBalanceVariable', this.state.cardPayload.balanceDetails[i].balance);
        }
      }
      this.reset("toCurrency", "");
      let data1: any = [];
      this.state.cardPayload?.balanceDetails.forEach((element: any) => {
        if (value != element.currency) {
          this.state.currencywithbal = element.currency + " - " + "Bal: " + this._currencyFormatter.transform(element.balance, element.currency);
          data1.push({ id: element.currency, text: this.state.currencywithbal })
        }
      });
      this.setStaticDropdown('toCurrency', data1);

    }
    else{
      let data: any = [];
      this.state.cardPayload?.balanceDetails.forEach((element: any) => {
        this.state.currencywithbal = element.currency + " - " + "Bal: " + this._currencyFormatter.transform(element.balance, element.currency);
        data.push({ id: element.currency, text: this.state.currencywithbal })
      });
      this.setStaticDropdown('toCurrency', data);
    }

  }
  public handleToCurrencyOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    this.state.toCurrencyVariable = value;
    this.reset('paymentAmount','');
    this.setVariable('toCurrencyVariable', value);
    if (value) {
      this.state.allowedCurrency[1] = value;
      let currencyList = [];
      let i = 0
      for (i = 0; i < this.state.allowedCurrency.length; i++) {
        currencyList.push({
          id: this.state.allowedCurrency[i],
          text: this.state.allowedCurrency[i]
        })

      }
      this.setAmountCurrencyList('paymentAmount', currencyList);

      // if (value == this.formGroup.controls['fromCurrency'].value) {
      //   this.setErrors("toCurrency", 'tocurrency_err');
      // }
    }
  }
  public onCardRefNumberDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 

    if (payload) {
    }
  }

  public onExchangeRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    if (payload) {
      this.setValue('exchangeRate', Number(payload.exchangeRate));
      this.setValue('baseRate', Number(payload.baseRate));
      this.setValue('debitAmount', payload.debitAmount);
      this.setValue('creditAmount', Number(payload.creditAmount));
      this.state.paymentAmountVar = payload.debitAmount;
      this.state.exchangeDetails.exchangeRate = 1 + " " + this.state.fromCurrencyVariable + " = " + this.state.toCurrencyVariable + " " + payload.againstRate;
      this.state.exchangeDetails.debitAmount = this.state.fromCurrencyVariable + " " + this._currencyFormatter.transform(payload.debitAmount, this.state.fromCurrencyVariable);
      this.state.exchangeDetails.creditAmount = this.state.toCurrencyVariable + " " + this._currencyFormatter.transform(payload.creditAmount, this.state.toCurrencyVariable);
      if(this.state.cardAmount){
        if (this.state.toCurrencyVariable != this.state.fromCurrencyVariable || this.state.accountBalanceVariable < this.state.cardAmount) {
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
      this.setValue('cbxrTerms',null);
    }
  }

  public override doPostInit(): void {
    this.addControlEventHandler("cardRefNumberDataReceived", this.onCardRefNumberDataReceived);
    this.addValueChangeHandler("cardRefNumber", this.handleCardRedNumberOnvalueChange);
    this.addValueChangeHandler("fromCurrency", this.handleFromCurrencyOnvalueChange);
    this.addValueChangeHandler("toCurrency", this.handleToCurrencyOnvalueChange);
    this.addValueChangeHandler("paymentAmount", this.handlePaymentAmountOnvalueChange);
    this.addControlEventHandler("exchangeRateReceived", this.onExchangeRateDataReceived);
    this.addValueChangeHandler("cbxrTerms", this.handleTermsFlagOnvalueChange);
    this.handleFormOnLoad();

  }
  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res: any = response.success?.body?.prepaidwallettransferreq;
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

  public override preSubmitInterceptor(payload: Prepaidwallettransferreq): any {
    // WRITE CODE HERE TO HANDLE 
    payload.charges = this.getValue('charges').amount;
    payload.paymentCurrency = this.getValue('paymentAmount').currencyCode;
    payload.paymentAmount = this.getValue('paymentAmount').amount;
    if(!payload.baseRate){
      payload.baseRate=0;
    }

    return payload;
  }


  public override postDataFetchInterceptor(payload: Prepaidwallettransferreq) {
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


