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
import { LoanmodificationreqService } from '../loanmodificationreq-service/loanmodificationreq.service';
import { Loanmodificationreq } from '../loanmodificationreq-service/loanmodificationreq.model';
import { formatDate } from "@angular/common";
import moment from "moment";
import { AppConfigService } from "@dep/services";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
export class RetailLoanModificationState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  currentInstDate: any = {
    minDate: "",
    maxDate: "",
  }
  propInstDate: any = {
    minDate: "",
    maxDate: "",
  }
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  fileUpload: any = {
    minSize: "1024",
    maxSize: "10000024",
    extensions: ".pdf,.jpg,.jpeg,.png"
  }
  deferralAmt: any = {
    isCurrEditable: true,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  }
  outstandingAmount:any;
  loanDetail:any={
    totalOutstanding:"",
    nextDueDate:"",
    payOffAmount:""
  }
}


@Injectable()
export class RetailLoanModificationHelper extends BaseFpxFormHelper<RetailLoanModificationState>{
  loanDetails! : FormGroup;
  constructor(private _currencyFormatter:FpxCurrenyFormatterPipe,private retailLoanModificationService: LoanmodificationreqService, private _httpProvider: HttpProviderService, private _router: Router,
    public _device: DeviceDetectorService,
    private _appConfig:AppConfigService,
    private _activeSpaceInfoService: ActiveSpaceInfoService
  ) {
    super(new RetailLoanModificationState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILLOANMODIFICATION");
    this.addResetHandler('reset', this._reset);
    this.addControlEventHandler("loanAccountNumberDataReceived", this.onLoanAccountNumberDataReceived);
    this.addValueChangeHandler("loanAccountNumber", this.handleLoanAccountNumberOnvalueChange);
    this.addValueChangeHandler("loanNoOfInstallments", this.handleLoanNoOfInstallmentsOnvalueChange);
    this.addValueChangeHandler("purposeOfDeferment", this.handlePurposeOfDefermentOnvalueChange);
    this.addValueChangeHandler("termsFlag", this.handleTermsFlagOnvalueChange);
    this.addValueChangeHandler("remarks", this.handleRemarksOnvalueChange);


  }
  private _reset: FpxResetHandler = (payload: any) => {
    console.log("payload", payload);
    this.reset('loanAccountNumber');
    this.reset('loanNoOfInstallments');
    this.reset('purposeOfDeferment');
    this.reset('currentInstDate');
    this.reset('remarks');
    this.reset('loanDetails');
    this.reset('termsFlag');
    this.handleFormOnLoad();
  }
  
  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    // this.setValue('loanModificationType', '2');
    // this.setReadonly('loanModificationType', true);
    // this.setReadonly('currentInstDate',true);
    if(this.formMode=='ADD'){
      let accNum = this._activeSpaceInfoService.getAccountNumber();
      this.state.currentInstDate.minDate=this._appConfig.getCBD();
      this.state.currentInstDate.maxDate = new Date(new Date().setMonth(new Date().getMonth() + 3));
    if (accNum) {
      this.setValue('loanAccountNumber', accNum);
    }
    this.setValue('termsFlag',null);
    this.setHidden('loanDetails',true)
    this.setHidden('otherReason',true);
    }
    else {
      this.setValue('currentInstDate', this.state.currentInstDate.minDate);
      let reason=this.getValue('otherReason');
     if (reason) {
       this.setHidden('otherReason', false);
       this.setReadonly('otherReason',true);
     }
     else{
       this.setHidden('otherReason', true);
     }
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
        if (value) {
          this.setHidden('loanDetails', false);
        }
        else {
          this.setHidden('loanDetails', true);
        }
        if(this.formMode=='ADD'){
          this.reset('loanNoOfInstallments');
          this.reset('currentInstDate');
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
    public handleLoanNoOfInstallmentsOnvalueChange: BaseFpxChangeHandler = (
      name: string,
      status: FormControlStatus,
      value: any,
      formGroup: FormGroup
    ) => {
      // WRITE CODE HERE TO HANDLE 
      //tool generated code based on Orchestration Instructions
      if(value && this.formMode == 'ADD'){
      let currentNextDate;
      currentNextDate= this.state.currentInstDate.minDate;
      if(value == '1'){
       // let currentDate = moment(currentNextDate).add('1','M').format('YYYY-MM-DD')
        //this.setValue('currentInstDate',currentDate)
       }
       else if(value == '2'){
        // let currentDate = moment(currentNextDate).add('2','M').format('YYYY-MM-DD')
        // this.setValue('currentInstDate',currentDate)
       }
       else if(value == '3'){
        // let currentDate = moment(currentNextDate).add('3','M').format('YYYY-MM-DD')
        // this.setValue('currentInstDate',currentDate)
       }
       else if(value == '4'){
        // let currentDate = moment(currentNextDate).add('4','M').format('YYYY-MM-DD')
        // this.setValue('currentInstDate',currentDate)
       }
        else if(value == '5'){
        // let currentDate = moment(currentNextDate).add('5','M').format('YYYY-MM-DD')
        // this.setValue('currentInstDate',currentDate)
       }
      }
    }
    public onLoanAccountNumberDataReceived: BaseFpxControlEventHandler = (payload: any) => {
      if (payload) {
        this.setHidden('loanDetails',false)
        this.state.loanDetail.totalOutstanding=this._currencyFormatter.transform(payload.totalOutstanding,payload.accountCurrency) +' '+payload.accountCurrency;
        this.state.loanDetail.payOffAmount=this._currencyFormatter.transform(payload.installmentAmount,payload.accountCurrency)+' '+payload.accountCurrency;
        if(payload.nextDueDate){
        this.state.loanDetail.nextDueDate=moment(payload.nextDueDate, 'YYYY-MM-DD').format('DD MMM yyyy');
        }
        else{
          this.state.loanDetail.nextDueDate="null";
        }
        // this.reset('currentInstDate');
        // this.state.outstandingAmount = payload.totalOutstanding;

        // this.setValue('deferralAmt', { currencyCode: payload.currency });
        // this.state.currentInstDate=payload.nextDueDate;
        // this.state.propInstDate.minDate = new Date(payload.nextDueDate);

        //for nextdueDate 
        // this.state.currentInstDate.minDate = new Date(payload.nextDueDate);
        // this.setValue('currentInstDate', this.state.currentInstDate.minDate);
        // // this.setValue('propInstDate', this.state.propInstDate.minDate);

        //if nextduedate having null
        // if(payload.nextDueDate){
        // this.state.currentInstDate.minDate = new Date(payload.nextDueDate);
        // this.setValue('currentInstDate', this.state.currentInstDate.minDate);
        // }
        // else{
        // this.state.currentInstDate.minDate = new Date();
        // this.state.currentInstDate.minDate = moment(this.state.currentInstDate.minDate).add(2,'days').format('YYYY-MM-DD');
        // this.setValue('currentInstDate', this.state.currentInstDate.minDate);
        // }
  
      }
    }

    public handlePurposeOfDefermentOnvalueChange: BaseFpxChangeHandler = (
      name: string,
      status: FormControlStatus,
      value: any,
      formGroup: FormGroup
    ) => {
      if(value){
        if ( value=="5") {
          this.setHidden('otherReason',false);
        }
        else{
          this.setHidden('otherReason',true);
        }
        this.reset('currentInstDate')
      }
    }
  public override doPostInit(): void {
    // this.addControlEventHandler("loanAccountNumberDataReceived", this.onLoanAccountNumberDataReceived);
    // this.addValueChangeHandler("loanAccountNumber", this.handleLoanAccountNumberOnvalueChange);
    // this.addValueChangeHandler("loanNoOfInstallments", this.handleLoanNoOfInstallmentsOnvalueChange);
    // this.addValueChangeHandler("purposeOfDeferment", this.handlePurposeOfDefermentOnvalueChange);
    // this.addValueChangeHandler("deferralAmt", this.handleDeferralAmtOnvalueChange);
    this.loanDetails = this.formGroup.get("loanDetails") as FormGroup;
    this.handleFormOnLoad();

  }


  public override preSubmitInterceptor(payload: Loanmodificationreq): any {
    // if (payload.deferralAmt) {
    //   // payload.currency = payload.deferralAmt.currencyCode;
    //   // payload.deferralAmt = payload.deferralAmt.amount;
    // }
    // if (payload.propInstDate) {
    //   payload.propInstDate = moment(this.formGroup.controls['propInstDate'].value, 'DD-MM-YYYY').format('YYYY-MM-DD');
    // }
    if (payload.currentInstDate) {
      // payload.currentInstDate = moment(this.formGroup.controls['currentInstDate'].value, 'DD-MM-YYYY').format('YYYY-MM-DD');
    }
    if (payload.inventoryNumber == "") {
      delete payload.inventoryNumber
    }
    return payload;
  }


  public override postDataFetchInterceptor(payload: Loanmodificationreq) {
    // WRITE CODE HERE TO HANDLE 
    this.state.currentInstDate.minDate = payload?.currentInstDate;
    return payload;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.loanmodificationreq;
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
