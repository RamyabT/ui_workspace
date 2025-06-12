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
  FpxCurrenyFormatterPipe,
  FpxResetHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { LoanpreclosurerequestService } from '../loanpreclosurerequest-service/loanpreclosurerequest.service';
import { Loanpreclosurerequest } from '../loanpreclosurerequest-service/loanpreclosurerequest.model';
import { AppConfigService } from "@dep/services";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { formatDate } from "@angular/common";
import { LoansService } from "../loans-service/loans.service";
export class RetailLoanPreClosureRequestState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
 	showSuggestion : boolean = false;
	paymentDate:any={
	   minDate:"",
       maxDate:"",
     }
	termsFlag:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}
  prePaymentAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  chargesAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  loanDetails: any = {
    installmentAmount: "",
    loanCurrency: "",
  };
  paymentSummary: any = {
    accountName: "",
    product: "",
    currency: "",
    initialDepositAmount: "",
    debitAmount: "",
    creditAmount: "",
    exchangeRate: "",
    chargesAmount: ""
  };
  fromCurrencyVariable: any;
  toCurrencyVariable: any;
  debitAmount: any;
  availableBalanceVariable: any;


}


@Injectable()
export class RetailLoanPreClosureRequestHelper extends BaseFpxFormHelper<RetailLoanPreClosureRequestState>{

   constructor( 
    private retailLoanPreClosureRequestService: LoanpreclosurerequestService, 
    private _httpProvider : HttpProviderService,
    private _router: Router,
    public _device: DeviceDetectorService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
    private _loansService: LoansService,
    private _appConfig:AppConfigService
  ) 
    {
        super(new RetailLoanPreClosureRequestState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILLOANPREPAYMENT");
 }

 public handleFormOnLoad() {
  // WRITE CODE HERE TO HANDLE
this.setHidden('exchangeDetails', true);

  if (this.formMode == 'ADD') {
    let accNum = this._activeSpaceInfoService.getAccountNumber();
    if (accNum) {
      this.setValue('loanAccountNumber', accNum);
    }

    let newDate = new Date();
    this.setValue('paymentDate',formatDate(newDate, 'yyyy-MM-dd', 'en-US'));
    this.setReadonly('paymentDate',true);
    this.setValue('chargesAmount', { amount: 100, currencyCode: this._appConfig.baseCurrency });
    this.setReadonly('chargesAmount', true);
    this._loansService.loanDetails(accNum as any)().subscribe({
      next: (res) => {
        this.hideSpinner();
        this.state.loanDetails = res as any;
        this.state.toCurrencyVariable = this.state.loanDetails.accountCurrency
        this.setVariable('toCurrencyVariable', this.state.toCurrencyVariable);
      },
      error: (reason) => {
        console.error("loan Find By Key Error: ", reason);
      }
    })
  }
}

public debitAccountNumberDataReceived: BaseFpxControlEventHandler = (payload: any) => {
  this.hideSpinner()
  if (payload) {
    
    if (payload.availableBalance == 0 || payload.availableBalance==undefined) {
      this.setErrors('prePaymentAmount', "debitBalanceError")
    }
    else
    {
      this.formGroup.get('prePaymentAmount')?.setErrors(null);
    }

    this.state.fromCurrencyVariable = payload.accountCurrency;
    this.setVariable('fromCurrencyVariable', payload.accountCurrency);
    this.state.availableBalanceVariable = payload.availableBalance;
    this.setVariable('availableBalanceVariable', this.state.availableBalanceVariable);
  }
}

public onExchangeRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {
  if (payload) {
    this.setValue('exchangeRate', Number(payload.exchangeRate));
    this.setValue('baseRate', Number(payload.baseRate))
    this.state.debitAmount = payload.debitAmount;
    this.state.paymentSummary.exchangeRate  = '1' + " " + this.state.toCurrencyVariable + " = " +  " " + payload.exchangeRate + " "+this.state.fromCurrencyVariable;
    this.state.paymentSummary.debitAmount = payload.debitAmount +" "+this.state.fromCurrencyVariable ;
  this.state.paymentSummary.creditAmount = payload.creditAmount +" "+ this.state.toCurrencyVariable;
  }
}

public handlePrePaymentAmountOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
) => {
  if(value.amount>0){
  if(value.amount>0)
  {
  this.setHidden('exchangeDetails', false);
  }
  else if(value.amount==0||isNaN(value.amount)){
  this.setHidden('exchangeDetails', true);
  this.formGroup.get('prePaymentAmount')?.setErrors(null);
  }

  if (value.amount > Math.round(this.state.loanDetails.totalOutstanding*100)/100) {
    this.setErrors('prePaymentAmount', "prePaymentAmountError")
  }

  if (value.amount > this.state.availableBalanceVariable) {
    this.setErrors('prePaymentAmount', "debitBalanceError")
  }
}
  
}
public handledebitAccountNumberOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
) => {
  this.reset('prePaymentAmount')
  this.reset('termsFlag')
  this.reset('remarks')
  this.setHidden('exchangeDetails', true);


}


private onReset: FpxResetHandler = (payload: any) => {
  console.log("payload", payload);
  this.reset('loanAccountNumber');
  this.reset('debitAccountNumber');
  this.reset('prePaymentAmount');
  this.reset('paymentDate');
  this.reset('remarks');
  this.reset('termsFlag');
  this.reset('chargesAmount', "");
  this.setValue('chargesAmount', { amount: 100, currencyCode: this._appConfig.baseCurrency });
  this.setReadonly('chargesAmount', true);
  let newDate = new Date();
  this.setValue('paymentDate',formatDate(newDate, 'yyyy-MM-dd', 'en-US'));
  this.setReadonly('paymentDate',true);
  this.setHidden('exchangeDetails', true);

}
   

  public override doPostInit(): void {
    this.addResetHandler('reset', this.onReset);
    this.addValueChangeHandler("prePaymentAmount", this.handlePrePaymentAmountOnvalueChange);
    this.addValueChangeHandler("debitAccountNumber", this.handledebitAccountNumberOnvalueChange);
    this.addControlEventHandler("debitAccountNumberDataReceived", this.debitAccountNumberDataReceived);
    this.addControlEventHandler("exchangeRateReceived", this.onExchangeRateDataReceived);
    this.handleFormOnLoad();
  }
  
 
  public override preSubmitInterceptor(payload: Loanpreclosurerequest):any {
     // WRITE CODE HERE TO HANDLE 
     if (payload.prePaymentAmount) {
      payload.prePaymentCurrency = payload.prePaymentAmount.currencyCode;
      payload.prePaymentAmount = Number(payload.prePaymentAmount.amount);
    }
    payload.debitAmount = this.state.debitAmount;
    payload.debitCurrency = this.state.fromCurrencyVariable;
    payload.chargesAmount = this.getValue('chargesAmount').amount;

    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Loanpreclosurerequest){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.loanpreclosurerequest;
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
  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 

