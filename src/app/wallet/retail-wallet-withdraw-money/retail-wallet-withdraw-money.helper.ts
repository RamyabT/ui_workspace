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
import { WalletwithdrawmoneyService } from '../walletwithdrawmoney-service/walletwithdrawmoney.service';
import { Walletwithdrawmoney } from '../walletwithdrawmoney-service/walletwithdrawmoney.model';
import { AppConfigService } from "@dep/services";

import { MomentService } from "src/app/foundation/validator-service/moment-service";
import { WalletService } from "../components/wallet-service/wallet.service";
export class RetailWalletWithDrawMoneyFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
 	showSuggestion : boolean = false;
	paymentAmount:any={
	  isCurrEditable: false,
	  CurrencyList: [{id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency}],
	   amountInWords : false,
	   initCurrency : '',
	   defaultFetch : true,
	}
	chargesAmount:any={
	  isCurrEditable: false,
	  CurrencyList: [{id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency}],
	   amountInWords : false,
	   initCurrency : this._appConfig.baseCurrency,
	   defaultFetch : true,
	}
  isBalanceTransfer: any = {
    textPosition: 'after',
    ckValues: { checked: "1", unchecked: "0" }
  }
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  paymentDate: any = {
    minDate: "",
    maxDate: "",
  }
  fromCurrencyVariable: any;
  toCurrencyVariable: any;
  showExchangeRateAccordin: boolean = false;
  creditAccountSummary: any;
  debitAccountSummary: any;
  paymentSummary: any;
  charges:any;
  exchangeDetails: any = {
    creditAmount: "",
    debitAmount: "",
    exchangeRate: ""
  };
  paymentAmountVar: any;
  accountBalanceVariable: any;
  payeeWalletDetails: any;
  availableBalance:any;
}


@Injectable()
export class RetailWalletWithDrawMoneyFormHelper extends BaseFpxFormHelper<RetailWalletWithDrawMoneyFormState>{

   constructor( private retailWalletWithDrawMoneyFormService: WalletwithdrawmoneyService, private _httpProvider : HttpProviderService,private _router: Router, private appConfigService: AppConfigService, private _appConfig: AppConfigService, private _walletService: WalletService, private momentService: MomentService, private _currencyFormatter: FpxCurrenyFormatterPipe,) 
    {
        super(new RetailWalletWithDrawMoneyFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILWALLETWITHDRAWMONEY");
 }
   

  public override doPostInit(): void {
    this.setValue('paymentAmount', { currencyCode: this.appConfigService.baseCurrency });
    this.addValueChangeHandler("isBalanceTransfer", this.handleisBalanceTransferOnvalueChange);
    this.addValueChangeHandler("paymentAmount", this.handlePaymentAmountOnvalueChange);
    this.addControlEventHandler("walletAccountDataReceived", this.onWalletAccountDataReceived);
    this.addControlEventHandler("toAccountDataReceived", this.onToAccountDataReceived);
    this.addControlEventHandler("chargesRateReceived", this.onChargesRateDataReceived);
    this.addControlEventHandler("exchangeRateReceived", this.onExchangeRateDataReceived);

    this.handleFormOnLoad();
    this.setReadonly('chargesAmount', true);
    let Date: any = this.momentService.getInstance();
    let currentDate: any = Date.format("YYYY-MM-DD");
    this.setValue('paymentDate', currentDate);
    this.state.paymentDate.minDate = currentDate;
    
  
  }
  
  public handleFormOnLoad() {
    this.setValue('chargesBorneBy','1');
    this.setHidden('chargesBorneBy',true);
    this.setHidden('exchangeDetails', true);
  }
  public override preSubmitInterceptor(payload: Walletwithdrawmoney):any {
     // WRITE CODE HERE TO HANDLE 
    payload.paymentCurrency = payload.paymentAmount.currencyCode;
    payload.paymentAmount = Number(payload.paymentAmount.amount);
    // payload.paymentCurrency = payload.chargesAmount.currencyCode;
    payload.chargesAmount = Number(payload.chargesAmount.amount);
    payload.exchangeRate = Number(payload.exchangeRate);
    payload.baseRate = Number(payload.baseRate);
    // payload.chargesAmount = 0;
    payload.charges=this.getValue('chargesAmount').amount;
    if(payload.isBalanceTransfer == ""){
      payload.isBalanceTransfer = "0";
    }
    return payload;
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
  public onChargesRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    if(payload.totalChargeAmnBaseCurr){
    this.setValue('chargesAmount', { amount: payload.totalChargeAmnBaseCurr, currencyCode: payload.baseCurrency });
    }
    else{
    this.setValue('chargesAmount', { amount: 0, currencyCode: this._appConfig.baseCurrency });
    this.state.charges = { amount: 0, currencyCode: this._appConfig.baseCurrency };
    }
}
  
 public override postDataFetchInterceptor(payload: Walletwithdrawmoney){
   // WRITE CODE HERE TO HANDLE 
  //  payload.paymentAmount = { amount: payload?.paymentAmount, currencyCode: payload?.paymentCurrency };
   let _paymentAmount:any = {
    amount: payload.paymentAmount,
    currencyCode: payload.paymentCurrency
  }
  payload.paymentAmount = _paymentAmount;
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
   let routingInfo: RoutingInfo = new RoutingInfo();
   routingInfo.setNavigationURL("confirmation");
   let res:any = response.success?.body?.walletwithdrawmoney;    
     if (response.success) {
     routingInfo.setQueryParams({
       response: res,
     });}
      else if (response.error) {
     routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
   }
    return routingInfo;
  }

  
  public handleisBalanceTransferOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    let key: any = {
      walletId: this.getValue("walletAccount")
    }
    if (value == '1') {
      this._walletService.findByKey(key)().subscribe((res: any) => {
        this.setValue('paymentAmount', {
          amount: res?.availableBalance,
          currencyCode: res?.currency
        });
      })
      // this.setReadonly('paymentAmount', true);
      // this.setMandatory('paymentAmount', false);

    }
    else {
      // this.setMandatory('paymentAmount', true);
      // this.setReadonly('paymentAmount', false);
    }


  }

  public handlePaymentAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value.amount > 0) {
      
    if(this.state.accountBalanceVariable<value.amount){
      this.setErrors('paymentAmount','insufficient_balance_error')
    }
    if (value.currencyCode != this.state.toCurrencyVariable) {
        this.setHidden('exchangeDetails', false);
      }
    }
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
    this.reset('paymentAmount', { amount: 0, currencyCode: selectCurrency });
  }

  public onWalletAccountDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    // if (payload) {
    //   this.state.toCurrencyVariable = payload.currency;
    //   if (this.formMode == "ADD") {
    //     this.setVariable('toCurrencyVariable', payload.currency);
    //     this.reset('paymentAmount', {
    //       amount: 0,
    //       currencyCode: payload.currency
    //     });
    //   }

    //   this.state.creditAccountSummary = {
    //     availableBalance:Number(payload.availableBalance),
    //     accountNumber: payload.walletAccountNumber,
    //     accountBalance: this.state.toCurrencyVariable + " " + this._currencyFormatter.transform(payload.availableBalance, this.state.toCurrencyVariable)
    //   }

    //   this.state.showExchangeRateAccordin = false;
    //   this.state.creditAccountSummaryAccordion = true;

    //   this.updatePaymentCurrencyList();
    // }
    if (payload) {
      this.state.accountBalanceVariable = payload.availableBalance;
      this.state.fromCurrencyVariable = payload.currency;
      this.setVariable('accountBalanceVariable', payload.availableBalance);
      this.setVariable('fromCurrencyVariable', payload.currency);
      this.setValue('paymentAmount', { amount: 0, currencyCode: payload.currency });

      this.updatePaymentCurrencyList();
    }
  }

  public onToAccountDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    if (payload) {
        this.state.toCurrencyVariable = payload.accountCurrency;
        this.setVariable('toCurrencyVariable', payload.accountCurrency);
      }

      this.updatePaymentCurrencyList();
    }

  

  
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 

