import { inject, Injectable } from "@angular/core";
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
import { WalletaddmoneyService } from '../walletaddmoney-service/walletaddmoney.service';
import { Walletaddmoney } from '../walletaddmoney-service/walletaddmoney.model';
import { AppConfigService } from "@dep/services";
import { MomentService } from "src/app/foundation/validator-service/moment-service";
export class RetailWalletAddMoneyFormState extends BaseFpxComponentState {
    private _appConfig: AppConfigService = inject(AppConfigService);
 	showSuggestion : boolean = false;
   paymentDate: any = {
    minDate: "",
    maxDate: "",
  }
  exchangeDetails: any = {
    creditAmount: "",
    debitAmount: "",
    exchangeRate: ""
  }
  paymentAmount: any = {
    isCurrEditable: true,
    CurrencyList: [],
    amountInWords: false,
    initCurrency: '',
    defaultFetch: false,
  }
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  fromCurrencyVariable: any;
  toCurrencyVariable: any;
  showExchangeRateAccordin: boolean = false;
  creditAccountSummaryAccordion: boolean = false;
  debitAccountSummaryAccordion: boolean = false;
  creditAccountSummary: any;
  debitAccountSummary: any;
  paymentSummary: any;
  chargesAmount: any = {
    isCurrEditable: true,
    CurrencyList: [],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  }
  charges:any={
      amount:0,
      currencyCode:this._appConfig.baseCurrency
  };
  paymentAmountVar: any;
}


@Injectable()
export class RetailWalletAddMoneyFormHelper extends BaseFpxFormHelper<RetailWalletAddMoneyFormState>{

  constructor(
    private retailWalletAddMoneyFormService: WalletaddmoneyService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
    private _appConfig: AppConfigService,
    private momentService: MomentService,
  ) {
    super(new RetailWalletAddMoneyFormState());
  }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILWALLETADDMONEY");
 }
   
 public onWalletAccountDataReceived: BaseFpxControlEventHandler = (payload: any) => {
  // WRITE CODE HERE TO HANDLE 
  if (payload) {
    this.state.toCurrencyVariable = payload.currency;
    if (this.formMode == "ADD") {
      this.setVariable('toCurrencyVariable', payload.currency);
      this.reset('paymentAmount', {
        amount: 0,
        currencyCode: payload.currency
      });
    }

    this.state.creditAccountSummary = {
      availableBalance:Number(payload.availableBalance),
      accountBalance: this.state.toCurrencyVariable + " " + this._currencyFormatter.transform(payload.availableBalance, this.state.toCurrencyVariable)
    }
    this.updatePaymentCurrencyList();
  }
}

public onFromAccountDataReceived: BaseFpxControlEventHandler = (payload: any) => {
  // WRITE CODE HERE TO HANDLE 
  if (payload) {
    this.state.fromCurrencyVariable = payload.accountCurrency;
    this.setValue('paymentAmount', { amount: 0, currencyCode: payload.accountCurrency });
    if (this.formMode == "ADD") {
      this.setVariable('fromCurrencyVariable', payload.accountCurrency);
      // this.reset('paymentAmount', {
      //   amount: 0,
      //   currencyCode: this.state.toCurrencyVariable
      // });
    }

    this.state.debitAccountSummary = {
      availableBalance:Number(payload.availableBalance),
      accountBalance: this.state.fromCurrencyVariable + " " + this._currencyFormatter.transform(payload.availableBalance, this.state.fromCurrencyVariable),
      accountType: payload.accountTypeDesc
    }
    this.updatePaymentCurrencyList();
  }
}

  public override doPostInit(): void {
    this.setVariable('scheduleTypeVariable', '1');
    this.setReadonly('paymentDate', true);

    if(this.formMode == "ADD"){
      let walletId: string = this._appConfig.getData('walletId');
      if(walletId) this.setValue('walletAccount', walletId);
      let date: any = this.momentService.getInstance();
      let currentDate: any = date.format("YYYY-MM-DD");
      this.setValue('paymentDate', currentDate);
    }

    this.addControlEventHandler("walletAccountDataReceived", this.onWalletAccountDataReceived);
    this.addControlEventHandler("fromAccountDataReceived", this.onFromAccountDataReceived);
    this.addControlEventHandler("exchangeRateReceived", this.onExchangeRateDataReceived);
    this.addControlEventHandler("chargesRateReceived", this.onChargesRateDataReceived);
    this.addValueChangeHandler("paymentAmount", this.handlePaymentAmountOnvalueChange);
    this.setValue('chargesBorneBy','1');
    this.setHidden('chargesBorneBy',true);
    this.setHidden('chargesAmount',true);
    this.setHidden('exchangeDetails', true);
  }
  public onChargesRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    if(payload.totalChargeAmnBaseCurr){
    this.setValue('chargesAmount', { amount: payload.totalChargeAmnBaseCurr, currencyCode: payload.baseCurrency });
    }
    else{
    this.setValue('chargesAmount', { amount: 5, currencyCode: this._appConfig.baseCurrency });
    this.state.charges = { amount: 5, currencyCode: this._appConfig.baseCurrency };
    }
    this.setHidden('chargesBorneBy',true);
    this.setHidden('chargesAmount',true);
}
  
  updatePaymentCurrencyList() {
    let currencyList: any = [];
    let selectCurrency: string = '';
    if (this.state?.fromCurrencyVariable && this.state?.toCurrencyVariable) {
      if (this.state.fromCurrencyVariable == this.state.toCurrencyVariable) {
        currencyList.push({
          id: this.state.fromCurrencyVariable,
          text: this.state.fromCurrencyVariable,
        });
        selectCurrency = this.state.fromCurrencyVariable;
      } else {
        currencyList.push({
          id: this.state.fromCurrencyVariable,
          text: this.state.fromCurrencyVariable,
        });
        currencyList.push({
          id: this.state.toCurrencyVariable,
          text: this.state.toCurrencyVariable,
        });
        selectCurrency = this.state.fromCurrencyVariable;
      }
    } else {
      if (this.state?.fromCurrencyVariable) {
        currencyList.push({
          id: this.state.fromCurrencyVariable,
          text: this.state.fromCurrencyVariable,
        });
        selectCurrency = this.state.fromCurrencyVariable;
      } else if (this.state?.toCurrencyVariable) {
        currencyList.push({
          id: this.state.toCurrencyVariable,
          text: this.state.toCurrencyVariable,
        });
        selectCurrency = this.state.toCurrencyVariable;
      }
    }

    this.setAmountCurrencyList("paymentAmount", currencyList);
  }
  public onExchangeRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    if (payload && this.formMode == 'ADD') {
      if (payload.exchangeRate == null || payload.exchangeRate == undefined || payload.exchangeRate == "") {
        payload.exchangeRate = 1
      } else {
        this.setValue('exchangeRate', Number(payload.exchangeRate));
      }
      this.state.exchangeDetails.exchangeRate = '1' + " " + this.state.toCurrencyVariable + " = " + " " + payload.exchangeRate + " " + this.state.fromCurrencyVariable;
      this.state.exchangeDetails.debitAmount = payload.debitAmount + " " + this.state.fromCurrencyVariable;
      this.state.exchangeDetails.creditAmount = payload.creditAmount + " " + this.state.toCurrencyVariable;
      this.state.paymentAmountVar = payload.debitAmount;
    }
  }
 
  public override preSubmitInterceptor(payload: Walletaddmoney):any {
     // WRITE CODE HERE TO HANDLE 
    let paymentAmount: any = this.getValue('paymentAmount');
    payload.paymentAmount = paymentAmount.amount;
    payload.paymentCurrency = paymentAmount.currencyCode;
    payload.exchangeRate = Number(payload.exchangeRate);
    payload.baseRate = Number(payload.baseRate);
    payload.chargesAmount = 0;

    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Walletaddmoney){
   // WRITE CODE HERE TO HANDLE 
   let _paymentAmount:any = {
    amount: payload.paymentAmount,
    currencyCode: payload.paymentCurrency
  }
  payload.paymentAmount = _paymentAmount;

  return payload;
}

public handlePaymentAmountOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
) => {

  console.log("addmoneyform",this.formGroup.value)
  if(this.state.debitAccountSummary.availableBalance<value.amount){
    this.setErrors("paymentAmount",'insufficient_balance_error')
  }
  if (value.amount > 0) {
      if (value.currencyCode != this.state.toCurrencyVariable) {
        this.setHidden('exchangeDetails', false);
      }
    }
    else{
      if (value.currencyCode == this.state.toCurrencyVariable) {
        this.setHidden('exchangeDetails', true);
      }
    }
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    let res:any = response.success?.body?.walletaddmoney;    
      if (response.success) {
      routingInfo.setQueryParams({
        response: res,
      });}
       else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
    }
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 

