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
  FpxCurrenyFormatterPipe,
  FpxResetHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { LoanclosureService } from "../../loans/loanclosure-service/loanclosure.service";
import { Loanclosure } from "../loanclosure-service/loanclosure.model";
import moment from "moment";
import { AppConfigService } from "@dep/services";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
export class RetailLoanClosureFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  closureDate: any = {
    minDate: new Date("01-07-2023"),
    maxDate: new Date("31-07-2023"),
  }
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  loanDetails: any = {
    principalAmount: "",
    interestAmount: "",
    totalOutstanding: "",
    closureCharges: ""
  }
  toCurrencyVariable=""
  fromCurrencyVariable=""
  availableBalanceVariable=""
  // exchangeDetails: any={
  //   exchangeRate:"",
  //   creditAmount:"",
  //   debitAmount:""
  // }
  amount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
}


@Injectable()
export class RetailLoanClosureFormHelper extends BaseFpxFormHelper<RetailLoanClosureFormState>{
  loanDetails! : FormGroup;

  constructor(private retailLoanClosureFormService: LoanclosureService,
    private _httpProvider: HttpProviderService, private _router: Router,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
    
    public _device: DeviceDetectorService,
    private _appConfig:AppConfigService,
    private _activeSpaceInfoService: ActiveSpaceInfoService
    ) {
    super(new RetailLoanClosureFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILLOANCLOSURE");
    this.addResetHandler('reset', this._reset);
    this.addValueChangeHandler("loanAccountNumber", this.handleLoanAccountNumberOnvalueChange);
    this.addControlEventHandler("loanAccountNumberDataReceived", this.onLoanAccountNumberDataReceived);
    this.addControlEventHandler("debitAccountDataReceived", this.ondebitAccountDataRecieved);
    this.addValueChangeHandler("debitAccount", this.handledebitAccountOnvalueChange);
    this.addValueChangeHandler("remarks", this.handleRemarksOnvalueChange);
   
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE

    if (this.formMode == 'ADD') {
      this.setValue('termsFlag',null)

      let accNum = this._activeSpaceInfoService.getAccountNumber();
      if (accNum) {
        this.setValue('loanAccountNumber', accNum);
      }
    }
   
    this.setHidden('infoNote', true);

    //userdate
    // this.state.closureDate.minDate = new Date();
    // this.state.closureDate.minDate = moment(this.state.closureDate.minDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
    // this.setValue('closureDate', this.state.closureDate.minDate);

    //serverDate added below
    this.state.closureDate.minDate = moment(this._appConfig.getCBD()).format('YYYY-MM-DD');
    // this.setValue('closureDate', this.state.closureDate.minDate);`
    this.state.closureDate.maxDate = new Date(new Date().setMonth(new Date().getMonth() + 3));

    // this.setHidden("exchangeDetails",true);
    // this.setHidden("loanDetails",true);
    this.setHidden('amount', true);
  }
  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.loanclosure;
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

  }

  private _reset: FpxResetHandler = (payload: any) => {
    console.log("payload", payload);
    this.reset('loanAccountNumber');
    this.reset('closureDate');
    this.reset('debitAccount');
    this.reset('remarks');
    this.reset('loanDetails');
    this.reset('termsFlag');
    this.state.closureDate.minDate = moment(this._appConfig.getCBD()).format('YYYY-MM-DD');
    // this.state.closureDate.minDate = new Date();
    // this.state.closureDate.minDate = moment(this.state.closureDate.minDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
    // this.setValue('closureDate', this.state.closureDate.minDate);
    this.state.closureDate.maxDate = new Date(new Date().setMonth(new Date().getMonth() + 3));


  }
  public handleRemarksOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value.includes('')) {
      this.setValue('remarks', value.trim());
    }
  }
  public onLoanAccountNumberDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    if (payload) {
      this.state.loanDetails.principalAmount = payload.loanAmount +" "+payload.accountCurrency;
      this.state.loanDetails.totalOutstanding = payload.totalOutstanding +" "+payload.accountCurrency;
      this.state.loanDetails.interestAmount = payload.interestAmount+" "+payload.accountCurrency;
      this.state.loanDetails.closureCharges = 0.00 +" "+payload.accountCurrency;
      this.setHidden("loanDetails",false); 

    this.state.toCurrencyVariable = payload.accountCurrency;
    this.state.loanDetails.totalOutstandingAmount = payload.totalOutstanding;
    this.setValue('amount', { currencyCode: payload?.accountCurrency, amount: payload?.totalOutstanding });
    this.setVariable('toCurrencyVariable', payload.currency);
    }
  }
  public ondebitAccountDataRecieved: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    if (payload) {
      this.state.fromCurrencyVariable = payload.accountCurrency;
      this.setVariable('fromCurrencyVariable', payload.accountCurrency);
      this.state.availableBalanceVariable = payload?.availableBalance;
      this.setVariable('availableBalanceVariable', this.state.availableBalanceVariable);
      this.setValue('amount', { amount: this.state.loanDetails.totalOutstandingAmount, currencyCode: this.state.toCurrencyVariable });
      // if (payload?.availableBalance < this.state.loanDetails.totalOutstandingAmount) {
      //   this.setErrors('debitAccount', "insufficient_balance_error");
      //   this.setHidden("exchangeDetails",true);
      // }
      // else if(this.state.fromCurrencyVariable==this.state.toCurrencyVariable){
      //   this.setHidden("exchangeDetails",true);
      // }
      // else{
      //   this.setHidden("exchangeDetails",false);
      // }
    }
  }
  public handleLoanAccountNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if(this.formMode=='ADD'){
    this.reset('debitAccount');
    this.setHidden('infoNote', false);
    if (value) {
      this.setHidden('loanDetails', false);
    }
    else {
      this.setHidden('loanDetails', true);
    }
  }
  }
  public handledebitAccountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if(this.formMode=='ADD'){
    this.setValue('amount', { amount: this.state.loanDetails.totalOutstandingAmount, currencyCode: this.state.toCurrencyVariable });
    if(value ==""){
      this.setHidden("exchangeDetails",true);
    }
    else{
      this.setHidden("exchangeDetails",false);
    }
  }
  }
  // public onExchangeRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {
  //   // WRITE CODE HERE TO HANDLE 
  //   if (payload) {
  //     this.setValue('exchangeRate', Number(payload.exchangeRate));
  //     this.setValue('baseRate', Number(payload.baseRate));
  //     // this.state.paymentAmountVar = payload.debitAmount;
  //     			this.state.fxRates.exchangeRate  = '1' + " " + this.state.toCurrencyVariable + " = " +  " " + payload.exchangeRate + " "+this.state.fromCurrencyVariable;
	      	// this.state.fxRates.debitAmount = payload.debitAmount +" "+this.state.fromCurrencyVariable ;
          // this.state.fxRates.creditAmount = payload.creditAmount +" "+ this.state.toCurrencyVariable;
  //   }
  // }

  public override doPostInit(): void {
    // this.addValueChangeHandler("loanAccountNumber", this.handleLoanAccountNumberOnvalueChange);
    // this.addControlEventHandler("loanAccountNumberDataReceived", this.onLoanAccountNumberDataReceived);
    // this.addControlEventHandler("debitAccountDataReceived", this.ondebitAccountDataRecieved);
    // this.addValueChangeHandler("debitAccount", this.handledebitAccountOnvalueChange);
    // this.addControlEventHandler("exchangeRateReceived", this.onExchangeRateDataReceived);
    this.loanDetails = this.formGroup.get("loanDetails") as FormGroup;
    this.addValueChangeHandler("termsFlag", this.handleTermsFlagOnvalueChange);
    if(this.formMode == 'ADD') {
      this.handleFormOnLoad();
    }
  }

  public handleTermsFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value =="N"){
      this.setValue('termsFlag',null)
    }
  }


  public override preSubmitInterceptor(payload: Loanclosure): any {
    // WRITE CODE HERE TO HANDLE 
    if(payload.remarks == ""){
      delete payload.remarks;
    }
    if (payload.inventoryNumber == "") {
      delete payload.inventoryNumber
    }
    this.handleFormOnPresubmit(payload);
    return payload;
  }


  public override postDataFetchInterceptor(payload: Loanclosure) {
    // WRITE CODE HERE TO HANDLE 
    this.setValue('debitAccount',payload.debitAccount);
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


