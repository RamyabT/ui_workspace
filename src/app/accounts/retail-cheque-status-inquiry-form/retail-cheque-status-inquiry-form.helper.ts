import { Injectable } from "@angular/core";
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
  CriteriaQuery,
  FpxSubmitHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { Retailchequestatusinquiryform } from "../retailchequestatusinquiryform-service/retailchequestatusinquiryform.model";
import { RetailchequestatusinquiryformService } from "../retailchequestatusinquiryform-service/retailchequestatusinquiryform.service";
import { AppConfigService } from "@dep/services";
import { RetailChequeStatusInquiryDisplayGridComponent } from "../retail-cheque-status-inquiry-display-grid/retail-cheque-status-inquiry-display-grid.component";
import { ActiveSpaceInfoService } from "@dep/core";
export class RetailChequeStatusInquiryFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  fromDate: any = {
    minDate: "",
    maxDate: "",
  }
  toDate: any = {
    minDate: "",
    maxDate: "",
  }
}


@Injectable()
export class RetailChequeStatusInquiryFormHelper extends BaseFpxFormHelper<RetailChequeStatusInquiryFormState>{
  chequeStatusInquiry!: FormArray;

  constructor(private retailChequeStatusInquiryFormService: RetailchequestatusinquiryformService,
    private _httpProvider: HttpProviderService, private _router: Router,
    private _appConfig: AppConfigService,
    private _activeSpaceInfoService: ActiveSpaceInfoService
  ) {
    super(new RetailChequeStatusInquiryFormState());
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    let accNum = this._activeSpaceInfoService.getAccountNumber();
    if (accNum) {
      this.setValue('accountNumber', accNum);
    }
    this.setHidden('chequeNumber',true);
    this.setHidden('fromChequeNumber',true);
    this.setHidden('toChequeNumber',true);
    this.setHidden('fromDate',true);
    this.setHidden('toDate',true);
    this.state.fromDate.minDate = new Date(new Date().setMonth(new Date().getMonth() - 6));
    this.state.fromDate.maxDate = new Date();
    // this.setValue('fromDate', this.state.fromDate.minDate);
    this.state.toDate.minDate = new Date(new Date().setMonth(new Date().getMonth() - 6));
    this.state.toDate.maxDate = new Date();
    // this.setValue('toDate', this.state.fromDate.minDate);
    // this.setValue('inquiryType', '1');
  }

  override doPreInit(): void {
    // this.hideShellActions();
    this.addSubmitHandler('submit', this.customSubmitHandler);
    this.setServiceCode("RETAILINQCHQSTATUS");
  }

  customSubmitHandler: FpxSubmitHandler = (payload: any) => {
    this.onSearchClick({});
    return {
      success: () => {
        console.log("on submit");
      },
      error: () => {
        console.log("error");
      }
    }
  }


  public handleFormOnHandleReset() {
    // WRITE CODE HERE TO HANDLE
    const criteriaQuery = new CriteriaQuery();
    this.setGridCriteria('chequeStatusInquiry', criteriaQuery);
    this.reset('chequeNumber', "");
    this.reset('fromChequeNumber', "");
    this.reset('toChequeNumber', "");
    this.reset('fromDate', "");
    this.reset('toDate', "");
    this.reset('chequeStatus');
    this.setHidden('chequeNumber',true);
    this.setHidden('fromChequeNumber',true);
    this.setHidden('toChequeNumber',true);
    this.setHidden('fromDate',true);
    this.setHidden('toDate',true);
  }
  public handleAccountNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    // this.setValue('inquiryType', '1');
    this.reset('chequeNumber', "");
    this.reset('fromChequeNumber', "");
    this.reset('toChequeNumber', "");
    this.reset('fromDate', "");
    this.reset('toDate', "");
    this.reset('inquiryType');
    this.reset('chequeStatus');
    this.setHidden('chequeNumber',true);
    this.setHidden('fromChequeNumber',true);
    this.setHidden('toChequeNumber',true);
    this.setHidden('fromDate',true);
    this.setHidden('toDate',true);
    this.handleFormOnHandleReset();
  }
  public handleFromChequeNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.reset('toChequeNumber');
    this.reset('chequeStatus');
    let val = parseFloat(value);
    if (isNaN(val) || (val === 0))
    {
       this.setErrors('fromChequeNumber','required');
    }
  }
  public handleChequeNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.reset('chequeStatus');
    let val = parseFloat(value);
    if (isNaN(val) || (val === 0))
    {
       this.setErrors('chequeNumber','required');
    }
  }
  public handleToChequeNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value){
    this.reset('chequeStatus');
      if(Number(value) < Number(this.formGroup.controls['fromChequeNumber'].value) || Number(value) == Number(this.formGroup.controls['fromChequeNumber'].value)){
        this.setErrors('toChequeNumber','fromChequeNumberError')
      }
      let val = parseFloat(value);
      if (isNaN(val) || (val === 0))
      {
         this.setErrors('toChequeNumber','required');
      }
    }
  }
  public handleFromDateOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.reset('chequeNumber', "");
    this.reset('fromChequeNumber', "");
    this.reset('toChequeNumber', "");
    this.reset('chequeStatus');
    if (value) {
      this.reset('toDate');
      this.state.toDate.minDate = value;
    }
  }
  public handleInquiryTypeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    this.reset('chequeNumber', "");
    this.reset('fromChequeNumber', "");
    this.reset('toChequeNumber', "");
    this.reset('fromDate', "");
    this.reset('toDate', "");
    this.reset('chequeStatus');
    this.setHidden('chequeNumber',true);
    this.setHidden('fromChequeNumber',true);
    this.setHidden('toChequeNumber',true);
    this.setHidden('fromDate',true);
    this.setHidden('toDate',true);
    if (value == '1') {
      this.setHidden('chequeNumber', false);
      this.setHidden('fromChequeNumber', true);
      this.setHidden('toChequeNumber', true);
      this.setHidden('fromDate', true);
      this.setHidden('toDate', true);
    }
    else if (value == '2') {
      this.setHidden('chequeNumber', true);
      this.setHidden('fromChequeNumber', false);
      this.setHidden('toChequeNumber', false);
      this.setHidden('fromDate', true);
      this.setHidden('toDate', true);
    }
    else if (value == '3') {
      this.setHidden('chequeNumber', true);
      this.setHidden('fromChequeNumber', true);
      this.setHidden('toChequeNumber', true);
      this.setHidden('fromDate', false);
      this.setHidden('toDate', false);
    }
    else if(value == null || value == undefined || value == ""){
      this.setHidden('chequeNumber',true);
      this.setHidden('fromChequeNumber',true);
      this.setHidden('toChequeNumber',true);
      this.setHidden('fromDate',true);
      this.setHidden('toDate',true);
    }
  }
   public handlefromChequeNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
   if(value){
    this.reset("toChequeNumber",true);
    this.reset('chequeStatus');
   }
  
  }
  public handletoChequeNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    let fromChequeNumber: any = this.getValue('fromChequeNumber');
    let toChequeNumber: any = this.getValue('toChequeNumber');
    if(Number(fromChequeNumber) == Number(toChequeNumber) || Number(fromChequeNumber) > Number(toChequeNumber)){
      this.formGroup.get('toChequeNumber')?.setErrors({ "chequeRangeError": true }, { emitEvent: false });

    }
    this.reset('chequeStatus');

  
  }
  public onResetClick: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    this.formGroup.reset();
    this.handleFormOnLoad();
    const criteriaQuery = new CriteriaQuery();
    this.setHidden('chequeNumber',true);
    this.setHidden('fromChequeNumber',true);
    this.setHidden('toChequeNumber',true);
    this.setHidden('fromDate',true);
    this.setHidden('toDate',true);
    this.setGridCriteria('', criteriaQuery)
  }
  public onSearchClick: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 

    let accountNumber: any = this.getValue('accountNumber');
    let chequeStatus: any = this.getValue('chequeStatus');

    const criteriaQuery = new CriteriaQuery();
    criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', { searchText: accountNumber });


    let inquiryType = this.getValue('inquiryType');
    if (inquiryType == 1) {
      //cheque number
      let chequeNumber: any = this.getValue('chequeNumber');
      criteriaQuery.addFilterCritertia('chequeNumber', 'String', 'equals', { searchText: chequeNumber });
    } else if (inquiryType == 2) {
      //cheque number range
      let fromChequeNumber: any = this.getValue('fromChequeNumber');
      let toChequeNumber: any = this.getValue('toChequeNumber');
      if (toChequeNumber > Number(fromChequeNumber)) {
        criteriaQuery.addFilterCritertia('chequeNumber', 'String', 'inRange', { fromValue: fromChequeNumber, toValue: toChequeNumber });

      } else {
        this.formGroup.get('toChequeNumber')?.setErrors({ "chequeError": true }, { emitEvent: false });
      }
    } else if (inquiryType == 3) {
      //date range: yyyy-MM-dd
      let fromDate: any = this.getValue('fromDate');
      let toDate: any = this.getValue('toDate');
      criteriaQuery.addFilterCritertia('issueDate', 'Date', 'inRange', { dateFrom: fromDate, dateTo: toDate });

    }
    criteriaQuery.addFilterCritertia('chequeStatus', 'String', 'equals', { searchText: chequeStatus });

    let modal = new FpxModal();
    modal.setComponent(RetailChequeStatusInquiryDisplayGridComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setBackDropClass('dep-popup-back-drop');
    modal.setDisableClose(false);
    modal.setData({
      title: "ChequeStatusResultMessage.title",
      criteriaQuery: criteriaQuery
    });
    modal.setAfterClosed(this.onSearchResultPopupClose);
    this.openModal(modal);
  }

  public override doPostInit(): void {
    // this.chequeStatusInquiry = this.formGroup.get("chequeStatusInquiry") as FormArray;
    this.addValueChangeHandler("accountNumber", this.handleAccountNumberOnvalueChange);
    this.addValueChangeHandler("inquiryType", this.handleInquiryTypeOnvalueChange);
    this.addValueChangeHandler("fromDate", this.handleFromDateOnvalueChange);
    this.addValueChangeHandler("fromChequeNumber", this.handleFromChequeNumberOnvalueChange);
    this.addValueChangeHandler("toChequeNumber", this.handleToChequeNumberOnvalueChange);
    this.addValueChangeHandler("chequeNumber", this.handleChequeNumberOnvalueChange);


    this.handleFormOnLoad();
  }


  public override preSubmitInterceptor(payload: Retailchequestatusinquiryform): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: Retailchequestatusinquiryform) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.retailchequestatusinquiryform,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }

  onSearchResultPopupClose() {

  }

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


