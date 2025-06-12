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
import { AedtransferService } from '../aedtransfer-service/aedtransfer.service';
import { Aedtransfer } from '../aedtransfer-service/aedtransfer.model';
import { AppConfigService } from "@dep/services";
import { AccountsService } from "src/app/foundation/validator-service/accounts.service";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { MomentService } from "src/app/foundation/validator-service/moment-service";
import { ScheduleaedService } from "../scheduleaed-service/scheduleaed.service";
import { ScheduleAedReqService } from "../scheduleAedReq-service/scheduleAedReq.service";
export class RetailAedTransferFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;
  beneficiaryAdvice: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }

  paymentSummary: any = {
    debitAmount: "",
    creditAmount: "",
    exchangeRate: "",
    chargesAmount: ""
  };


  paymentAmount: any = {
    isCurrEditable: true,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  paymentDate: any = {
    minDate: "",
    maxDate: "",
  }
  endDate: any = {
    minDate: "",
    maxDate: "",
  }
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }

  exchangeDetail: any = {
    text: " Exchange Info"
  }
  paymentAmountInfoVar: any;
  creditCurrencyVar: any;
  debitCurrVar: any;
  accountBalanceVar: any;
  beneCurrencyVar: any;
  debitAccountVar: any;
  creditAccountVar: any;
  debitAccountData: any;
  fromCurrencyVariable: any;
  toCurrencyVariable: any;
  beneAccountData: any;
  beneData: any;
}


@Injectable()
export class RetailAedTransferFormHelper extends BaseFpxFormHelper<RetailAedTransferFormState>{
  shellType: any;


  constructor(private retailAedTransferFormService: AedtransferService, private _httpProvider: HttpProviderService, private _router: Router,
    private scheduleAedService: ScheduleaedService,
    private casaservice: AccountsService,
    private commonService: CommonService,
    private scheduleAedReqService: ScheduleAedReqService,
    private momentService: MomentService,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
    private _appConfig: AppConfigService) {
    super(new RetailAedTransferFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILTRANCBAED");
    let routingParam: any = this.getRoutingParam();
    let mode: any = this.getRoutingParam('mode');
    let scheduleId: any = this.getRoutingParam('scheduleId');
    let paymentId: any = this.getRoutingParam('paymentId');
    let serviceCode: any = this.getRoutingParam('serviceCode');
    let inventoryNumber: any = this.getRoutingParam('inventoryNumber');
    this.setServiceCode("RETAILTRANCBAED");
    if (this.formMode == 'DECISION' && paymentId && serviceCode) {
      this.setServiceCode("RETAILSCHCBAED");
      this.setDataService(this.scheduleAedReqService);
    }
    else if (paymentId && mode) {
      this.setServiceCode("RETAILSCHCBAED");
      this.setDataService(this.scheduleAedService)
    }

  }


  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    //   let mode: any = this.getRoutingParam('mode');
    //   let scheduleId: any = this.getRoutingParam('scheduleId');
    //    let paymentId: any = this.getRoutingParam('paymentId');
    //   let routingParam: any = this.getRoutingParam();
    //   let serviceCode: any = routingParam.serviceCode;


    //   let paymentCurrencyVar: any = this.getValue('paymentCurrency');
    //   let paymentAmountVar: any = this.getValue('paymentAmount');
    //   let paymentFrequencyVar= this.getValue('paymentFrequency');
    //   let numberOfPaymentsVar=this.getValue('numberOfPayments');
    //   let debitAmountVar=this.getValue('debitAmount');
    //   let debitCurrencyVar=this.getValue('debitCurrency');
    //   let creditAmountVar=this.getValue('creditAmount');
    //   let creditCurrencyVar=this.getValue('creditCurrency');
    //   let exchangeRateVar=this.getValue('rateApplied');
    //   let chargesAmountVar=this.getValue('chargesAmount');
    //   let endDateVar=this.getValue('endDate');
    //   if (this.formMode == 'DECISION') {
    //     if (serviceCode == 'RETAILSCHCBAED') {
    //    this.setValue('paymentAmount', { amount: paymentAmountVar, currencyCode: paymentCurrencyVar });
    //    this.state.paymentSummary.debitAmount = debitCurrencyVar + " " + this._currencyFormatter.transform(debitAmountVar, debitCurrencyVar);
    //    this.state.paymentSummary.creditAmount = creditCurrencyVar + " " + this._currencyFormatter.transform(creditAmountVar, creditCurrencyVar);
    //    this.state.paymentSummary.exchangeRate = exchangeRateVar;
    //    this.state.paymentSummary.chargesAmount="_appConfig.baseCurrency 25.00";
    //     if(this.getValue('scheduleType')=="2"){
    //       this.setHidden('scheduleHandler', true);
    //       }
    //     else {
    //       this.setHidden('scheduleHandler', false);
    //       this.setValue('scheduleHandler.paymentFrequency', paymentFrequencyVar);
    //       this.setValue('scheduleHandler.numberOfPayments', numberOfPaymentsVar);
    //       this.setHidden('scheduleHandler.endDate', false);
    //       this.setValue('scheduleHandler.endDate', endDateVar);
    //       this.setReadonly('scheduleHandler.paymentFrequency', true);
    //       this.setReadonly('scheduleHandler.numberOfPayments', true);
    //       this.setReadonly('scheduleHandler.endDate', true);
    //       }
    //       if (this.getValue('beneficiaryAdvice') == "N") {
    //         this.setHidden('beneficiaryEmail', true);
    //       }
    //     }
    //   }

    //  /*for Manage Schedule View mode*/
    //  else if(paymentId && mode=='V'){
    //   this.setValue('paymentAmount', { amount: paymentAmountVar, currencyCode: paymentCurrencyVar });
    //   this.state.paymentSummary.debitAmount = debitCurrencyVar + " " + this._currencyFormatter.transform(debitAmountVar, debitCurrencyVar);
    //   this.state.paymentSummary.creditAmount = creditCurrencyVar + " " + this._currencyFormatter.transform(creditAmountVar, creditCurrencyVar);
    //   this.state.paymentSummary.exchangeRate = exchangeRateVar;
    //     this.state.paymentSummary.chargesAmount = "_appConfig.baseCurrency 25.00";
    //     if (this.getValue('beneficiaryAdvice') == "N") {
    //       this.setHidden('beneficiaryEmail', true);
    //     }
    //     if(this.getValue('scheduleType')=="2"){
    //       this.setHidden('scheduleHandler', true);
    //     }
    //     else{
    //       this.setHidden('scheduleHandler', false);
    //       this.setValue('scheduleHandler.paymentFrequency', paymentFrequencyVar);
    //       this.setValue('scheduleHandler.numberOfPayments', numberOfPaymentsVar);
    //       this.setHidden('scheduleHandler.endDate', false);
    //       this.setValue('scheduleHandler.endDate', endDateVar);
    //       this.setReadonly('scheduleHandler.paymentFrequency', true);
    //       this.setReadonly('scheduleHandler.numberOfPayments', true);
    //       this.setReadonly('scheduleHandler.endDate', true);
    //     }

    //     }
    //  /*for Manage Schedule transfer Modify and Delet mode*/
    //   else if (paymentId && mode =='M' || mode =='D') {
    //     this.scheduleAedService.findByKey(routingParam)().subscribe((res) => {
    //     console.log("Response", res);
    //     if (res) {
    //      if(mode=='M'){
    //       this.patchValue(res);
    //       this.setDisabled('paymentId',true);
    //       this.setValue('scheduleId',res.paymentId);
    //       this.setVariable('fromCurrencyVariable', res.debitCurrency);
    //       this.state.fromCurrencyVariable = res.debitCurrency;
    //       this.setVariable('toCurrencyVariable', res.creditCurrency);
    //       this.state.toCurrencyVariable = res.creditCurrency;
    //       this.setValue('paymentAmount', { amount: res?.paymentAmount, currencyCode: res?.paymentCurrency });
    //       this.setValue('scheduleHandler.paymentFrequency', res?.paymentFrequency);
    //       this.setValue('scheduleHandler.numberOfPayments', res?.numberOfPayments);
    //       this.setReadonly('sourceAccount', true);
    //       this.setReadonly('beneficiaryId', true);
    //       this.setReadonly('purpose', true);
    //       this.setValue('rateApplied',res?.rateApplied);
    //       this.setValue('baseRateApplied',res?.baseRateApplied);
    // 					this.state.paymentSummary.debitAmount =res?.debitCurrency + " " + this._currencyFormatter.transform(debitAmountVar, res?.debitCurrency);
    //            				this.state.paymentSummary.creditAmount = res?.creditCurrency + " " + this._currencyFormatter.transform(creditAmountVar, res?.creditCurrency);
    // 					this.state.paymentSummary.exchangeRate = res?.rateApplied;
    //       this.state.paymentSummary.chargesAmount = "_appConfig.baseCurrency 25.00";

    //           }
    //           if (mode == 'D') {
    //             this.patchValue(res);
    //             this.setDisabled('paymentId',true);
    //             this.setValue('scheduleId',res.paymentId);
    //             this.setVariable('fromCurrencyVariable', res.debitCurrency);
    //             this.state.fromCurrencyVariable = res.debitCurrency;
    //             this.setVariable('toCurrencyVariable', res.creditCurrency);
    //             this.state.toCurrencyVariable = res.creditCurrency;
    //             this.setValue('paymentAmount', { amount: res?.paymentAmount, currencyCode: res?.paymentCurrency });
    //             this.setValue('paymentDate',res.paymentDate);

    //             this.setValue('scheduleHandler.paymentFrequency', res?.paymentFrequency);
    //             this.setValue('scheduleHandler.numberOfPayments', res?.numberOfPayments);
    //             this.setReadonly('sourceAccount', true);
    //             this.setReadonly('beneficiaryId', true);
    //             this.setReadonly('scheduleHandler.numberOfPayments', true);
    //             this.setReadonly('scheduleHandler.paymentFrequency', true);
    //             this.setReadonly('beneficiaryId', true);
    //             this.setReadonly('beneficiaryAdvice', true);
    //             this.setReadonly('paymentDetails',true);
    //             this.setReadonly('purpose', true);
    //             this.setReadonly('paymentAmount',true);
    //             this.setReadonly('chargesBorneBy',true);
    //             this.setReadonly('scheduleType',true);
    //             this.setReadonly('paymentDate',true);
    // 			        	 this.state.paymentSummary.debitAmount = res?.debitCurrency + " " + this._currencyFormatter.transform(debitAmountVar, res?.debitCurrency);
    //                                         this.state.paymentSummary.creditAmount = res?.creditCurrency + " " + this._currencyFormatter.transform(creditAmountVar, res?.creditCurrency);
    //       				        this.state.paymentSummary.exchangeRate = res?.rateApplied;
    //             this.state.paymentSummary.chargesAmount = "_appConfig.baseCurrency 25.00";
    //             if (this.getValue('beneficiaryAdvice') == "N" && this.getValue('beneficiaryAdvice') == "") {
    //               this.setHidden('beneficiaryEmail', true);
    //             }
    //             }



    //         }
    //       });
    //     }

    //     //for Form Add Mode
    //     else {
    this.setValue('scheduleType', "1");
    this.setValue('purpose', "001");
    this.setValue('paymentFrequency', "1");
    this.setValue('chargesBorneBy', "1");
    this.setHidden('paymentSummary', true);
    //   this.setDisabled('creditAmount', true);
    //   this.setDisabled('creditCurrency', true);
    //   this.setDisabled('debitAmount', true);
    //   this.setDisabled('debitCurrency', true);
    //   this.setDisabled('paymentId', true);
    //   this.setDisabled('scheduleId',true);


    // }
  }
  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE

    if (this.formMode == 'ADD' && this.getRoutingParam('mode') == 'M') {
      payload.operationMode = "M";
      // payload.paymentId=this.getRoutingParam('paymentId');
      payload.paymentAmount = this.getValue('paymentAmount').amount;
      payload.paymentCurrency = this.getValue('paymentAmount').currencyCode;

    }
    else if (this.formMode == 'ADD' && this.getRoutingParam('mode') == 'D') {
      payload.operationMode = "D";
      payload.paymentAmount = this.getValue('paymentAmount').amount;
      payload.paymentCurrency = this.getValue('paymentAmount').currencyCode;
    }
    else {
      payload.paymentAmount = this.getValue('paymentAmount').amount;
      payload.paymentCurrency = this.getValue('paymentAmount').currencyCode;
      if (payload.scheduleType == "2" || payload.scheduleType == "3") {

        payload.operationMode = "A";
      }
    }

  }
  public onSourceAccountDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 

    if (payload) {
      this.state.debitAccountData = payload
      this.setVariable('fromCurrencyVariable', payload.accountCurrency);
      this.state.fromCurrencyVariable = payload.accountCurrency;
      this.setVariable('accountBalanceVariable', payload.availableBalance);
      this.state.accountBalanceVar = payload.availableBalance;
      console.log(payload.accountCurrency)
      if (this.state.fromCurrencyVariable == this.state.toCurrencyVariable) {
        this.setAmountCurrencyList('paymentAmount', [{ id: this.state.fromCurrencyVariable, text: this.state.fromCurrencyVariable }]);
      }
      else {
        this.setAmountCurrencyList('paymentAmount', [{ id: this.state.fromCurrencyVariable, text: this.state.fromCurrencyVariable }, { id: this.state.toCurrencyVariable, text: this.state.toCurrencyVariable }]);
      }

    }
  }
  public onBeneficiaryIdDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 

    if (payload) {
      this.state.beneData = payload;
      this.setVariable('toCurrencyVariable', this._appConfig.baseCurrency);
      this.state.toCurrencyVariable = this._appConfig.baseCurrency;

      this.setAmountCurrencyList('paymentAmount', [{ id: this.state.fromCurrencyVariable, text: this.state.fromCurrencyVariable }, { id: this.state.toCurrencyVariable, text: this.state.toCurrencyVariable }]);
      if (this.state.fromCurrencyVariable == this.state.toCurrencyVariable) {
        this.setAmountCurrencyList('paymentAmount', [{ id: this.state.toCurrencyVariable, text: this.state.toCurrencyVariable }]);
      }
      else {
        this.setAmountCurrencyList('paymentAmount', [{ id: this.state.fromCurrencyVariable, text: this.state.fromCurrencyVariable }, { id: this.state.toCurrencyVariable, text: this.state.toCurrencyVariable }]);
      }
    }
  }
  public handlePaymentAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions


  }
  public handleScheduleTypeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    let Date: any = this.momentService.getInstance();
    let currentDate: any = Date.format("YYYY-MM-DD");
    let futureDate: any = Date.add(1, "day").format("YYYY-MM-DD");
    if (value == '1') {

      this.setValue('paymentDate', currentDate);
      this.setReadonly('paymentDate', true);
      this.setHidden('scheduleHandler', true);
      this.setDisabled("paymentFrequency", true);
      this.setDisabled("numberOfPayments", true);
      this.setDataService(this.retailAedTransferFormService);
      this.setServiceCode("CORPTRANCBAED");
    }
    if (value == "2") {

      this.reset('paymentDate', "");
      this.state.paymentDate.minDate = futureDate;
      this.setValue('paymentDate', futureDate);
      this.setHidden('scheduleHandler', true);
      this.setDisabled("endDate", true);
      this.setDisabled("numberOfPayments", true);
      this.setDisabled("paymentFrequency", true);
      this.setReadonly('paymentDate', false);
      this.setHidden('scheduleHandler', true);
      this.setServiceCode("CORPSCHCBAED");
      this.setDataService(this.scheduleAedReqService);
    }
    if (value == "3") {
      this.state.paymentDate.minDate = futureDate;
      this.setHidden('scheduleHandler', false);
      this.setValue('paymentDate', futureDate);
      this.setReadonly('paymentDate', false);
      this.setServiceCode("CORPSCHCBAED");
      this.setHidden('scheduleHandler', false);
      this.setDataService(this.scheduleAedReqService);


    }

  }
  public handlePaymentDateOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    let installment: any = this.getValue('numberOfPayments');
    if (value && status == 'VALID' && installment != null && installment != "") {
      let startDate: any = this.getValue('paymentDate');

      let endDate = this.commonService.caculateEndDate(startDate, value, installment);
      if (endDate) {
        this.setValue('endDate', endDate);
        this.setReadonly('endDate', true);
      }
      else {
        this.setHidden('endDate', true);
      }
    }

  }
  public handleChargesBorneByOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions

  }
  public handlePurposeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
  }

  public onExchangeRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    if (payload) {
      this.setHidden('paymentSummary', false);
      this.setValue('rateApplied', payload.exchangeRate);
      this.setValue('baseRateApplied', payload.baseRate);
      this.state.paymentSummary.exchangeRate  = '1' + " " + this.state.toCurrencyVariable + " = " +  " " + payload.exchangeRate + " "+this.state.fromCurrencyVariable;
      this.state.paymentSummary.debitAmount = payload.debitAmount +" "+this.state.fromCurrencyVariable ;
      this.state.paymentSummary.creditAmount = payload.creditAmount +" "+ this.state.toCurrencyVariable;
      this.state.paymentSummary.chargesAmount = this._appConfig.baseCurrency+" 25.00";

    }
  }

  public handleScheduleHandlerOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    console.log(value);
    if (this.getValue('scheduleType') == "3") {
      this.setDisabled("numberOfPayments", false)
      this.setDisabled("paymentFrequency", false)
      this.setValue("numberOfPayments", value.numberOfPayments);
      this.setValue("paymentFrequency", value.paymentFrequency)
      if (value.endDate) {
        this.setValue("endDate", value.endDate);
      }
      this.setDisabled('scheduleHandler', true);
    }
  }
  public handleBeneficiaryIdOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    // this.setHidden("purpose", false);
    this.setVariable('beneficiaryIdVariable', value);
  }
  public override doPostInit(): void {
    this.addControlEventHandler("sourceAccountDataReceived", this.onSourceAccountDataReceived);
    this.addControlEventHandler("beneficiaryIdDataReceived", this.onBeneficiaryIdDataReceived);
    this.addValueChangeHandler("paymentAmount", this.handlePaymentAmountOnvalueChange);
    this.addValueChangeHandler("scheduleType", this.handleScheduleTypeOnvalueChange);
    this.addValueChangeHandler("paymentDate", this.handlePaymentDateOnvalueChange);
    this.addValueChangeHandler("chargesBorneBy", this.handleChargesBorneByOnvalueChange);
    this.addValueChangeHandler("purpose", this.handlePurposeOnvalueChange);
    this.addValueChangeHandler("scheduleHandler", this.handleScheduleHandlerOnvalueChange);
    this.addValueChangeHandler("beneficiaryId", this.handleBeneficiaryIdOnvalueChange);
    this.addControlEventHandler("exchangeRateReceived", this.onExchangeRateDataReceived);
    this.handleFormOnLoad();
  }



  public override preSubmitInterceptor(payload: Aedtransfer): any {
    // WRITE CODE HERE TO HANDLE 
    this.handleFormOnPresubmit(payload);
    return payload;
  }


  public override postDataFetchInterceptor(payload: Aedtransfer) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.aedtransfer.paymentId,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


