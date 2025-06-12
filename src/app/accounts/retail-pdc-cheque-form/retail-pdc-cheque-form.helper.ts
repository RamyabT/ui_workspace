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
  CriteriaQuery,
  FpxSubmitHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { RetailpdcchequeformService } from "../retailpdcchequeform-service/retailpdcchequeform.service";
import moment from "moment";
import { Retailpdcchequeform } from "../retailpdcchequeform-service/retailpdcchequeform.model";
import { AppConfigService } from "@dep/services";
import { RetailPdcChequeDisplayGridComponent } from "../retail-pdc-cheque-display-grid/retail-pdc-cheque-display-grid.component";
import { ActiveSpaceInfoService } from "@dep/core";
export class RetailPdcChequeFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;
  fromDate: any = {
    minDate: new Date("01-07-2023"),
    maxDate: new Date("31-07-2023"),
  }
  toDate: any = {
    minDate: new Date("01-07-2023"),
    maxDate: new Date("31-07-2023"),
  }
  amount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  startDate: any
  endDate: any
}


@Injectable()
export class RetailPdcChequeFormHelper extends BaseFpxFormHelper<RetailPdcChequeFormState>{
  pdcChequeInquiry!: FormArray;
  _userService: any;

  constructor(private _appConfig: AppConfigService, private retailPdcChequeFormService: RetailpdcchequeformService, private _httpProvider: HttpProviderService, private _router: Router,
    private _activeSpaceInfoService: ActiveSpaceInfoService
  ) {
    super(new RetailPdcChequeFormState());
  }

  override doPreInit(): void {
    // this.hideShellActions();
    this.addSubmitHandler('submit', this.customSubmitHandler);
    this.setServiceCode("RETAILINQPDCCHQSTATUS");
    this.addValueChangeHandler("fromDate", this.handleFromDateOnvalueChange);
    this.addValueChangeHandler("toDate", this.handleToDateOnvalueChange);
    this.addValueChangeHandler("chequeNumber", this.handleChequeNumberOnvalueChange);

  }
  public handleChequeNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    let val = parseFloat(value);
    if (isNaN(val) || (val === 0))
    {
       this.setErrors('chequeNumber','required');
    }
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

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    this.setValue('accountNumber', this._activeSpaceInfoService.getAccountNumber());
    // this.setValue('pdcInquiryType', '1');
    this.setHidden('chequeNumber',true);
    this.setHidden('fromDate',true);
    this.setHidden('toDate',true);
    this.state.fromDate.minDate = new Date();
    this.state.fromDate.maxDate = new Date(new Date().setMonth(new Date().getMonth() + 12));
    // this.setValue('fromDate', this.state.fromDate.minDate);
    this.state.toDate.minDate = new Date(this.getValue('fromDate')); // Set 'To Date' min as 'From Date'
    let newDate = new Date();
    this.state.toDate.maxDate = moment(newDate).add(12, 'months');
    // let serverDate:any=this._userService.getServerDate();
    //  this.state.fromDate.minDate=  moment(serverDate).subtract(6,'months');
    //  this.state.fromDate.maxDate= moment(serverDate).add(6,'months');
    //  this.state.toDate.minDate=  moment(serverDate).subtract(6,'months');
    //  this.state.toDate.maxDate= moment(serverDate).add(6,'months');
  }
  public handlePdcInquiryTypeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    this.reset('chequeNumber');
    this.reset('fromDate');
    this.reset('toDate');
    this.reset('amount');
    if (value == '1') {
      this.setHidden('chequeNumber', false);
      this.setHidden('fromDate', true);
      this.setHidden('amount', true);
      this.setHidden('toDate', true);
    }
    else if (value == '2') {
      this.setHidden('chequeNumber', true);
      this.setHidden('fromDate', false);
      this.setHidden('toDate', false);
      this.setHidden('amount', true);
    }
   else  if(value == '3'){
      this.setHidden('chequeNumber', true);
      this.setHidden('fromDate', true);
      this.setHidden('toDate', true);
      this.setHidden('amount', false);
    }
    else if(value == null || value == undefined || value == ""){
      this.setHidden('chequeNumber',true);
      this.setHidden('fromDate',true);
      this.setHidden('toDate',true);
      this.setHidden('amount', true);

    }
  }
  public onResetClick: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    this.formGroup.reset();
    this.handleFormOnLoad();
    const criteriaQuery = new CriteriaQuery();
    this.setGridCriteria('', criteriaQuery)
  }
  public handleFromDateOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      this.reset('toDate');
      this.state.toDate.minDate = value;
      this.state.toDate.maxDate = moment(this.getValue('fromDate')).add(12, 'months');
      if(this.getValue('pdcInquiryType') == 2){
      this.state.startDate=this.getValue('fromDate');
      }    
    }
  }
  public handleFormOnHandleReset() {
    // WRITE CODE HERE TO HANDLE
    const criteriaQuery = new CriteriaQuery();
    this.setGridCriteria('chequeStatusInquiry', criteriaQuery);
    this.reset('chequeNumber', "");
    this.reset('fromDate', "");
    this.reset('toDate', "");
    this.reset('pdcInquiryType');
    this.setHidden('chequeNumber',true);
    this.setHidden('fromDate',true);
    this.setHidden('toDate',true);
    this.setHidden('amount',true);
  }
  public handleToDateOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      if(this.getValue('pdcInquiryType')=='2'){
        this.state.endDate=value;
      }

    }
  }
  public onSearchClick: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 

    const criteriaQuery = new CriteriaQuery();
    let accountNumber: any = this.getValue('accountNumber');
    let inquiryType = this.getValue('pdcInquiryType');
    if (inquiryType == '1') {
       //cheque number
      let chequeNumber: any = this.getValue('chequeNumber');
      criteriaQuery.addFilterCritertia('chequeNumber', 'String', 'equals', { searchText: chequeNumber });
    }
    else if (inquiryType == '2') {
      //date range: yyyy-MM-dd
      let fromDate: any = this.getValue('fromDate');
      let toDate: any = this.getValue('toDate');
      criteriaQuery.addFilterCritertia('chequePostedDate', 'Date', 'inRange', { dateFrom: fromDate, dateTo: toDate });
    }
    else if (inquiryType == '3'){
      criteriaQuery.addFilterCritertia('amount','String','equals',{searchText:this.getValue('amount').amount});
    }
    criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', { searchText: accountNumber });
    this.setGridCriteria('pdcChequeInquiry', criteriaQuery);
    let modal = new FpxModal();
    modal.setComponent(RetailPdcChequeDisplayGridComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setBackDropClass('dep-popup-back-drop');
    modal.setDisableClose(false);
    
    modal.setData({
      title: "ViewPDCChequeResultsMessage.title",
      criteriaQuery: criteriaQuery
    });
    modal.setAfterClosed(this.onSearchResultPopupClose);
    this.openModal(modal);
  }

  public handlechequeNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    this.reset('chequeNumber', "");
    this.reset('pdcInquiryType', "");
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
    this.reset('chequeNumber');
    this.reset('fromDate');
    this.reset('toDate');
    this.reset('amount');
    this.reset('pdcInquiryType');
    this.handleFormOnHandleReset();
  }


  public onAccountNumberDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE
    if(payload){
      this.setValue('amount',{amount:'0.00',currencyCode:payload?.accountCurrency});
    }
  }
  public override doPostInit(): void {
    this.pdcChequeInquiry = this.formGroup.get("pdcChequeInquiry") as FormArray;
    this.addValueChangeHandler("accountNumber", this.handleAccountNumberOnvalueChange);
    this.addValueChangeHandler("pdcInquiryType", this.handlePdcInquiryTypeOnvalueChange);
    this.addValueChangeHandler("fromDate", this.handleFromDateOnvalueChange);
    this.addControlEventHandler('accountNumberDataReceived',this.onAccountNumberDataReceived)

    this.handleFormOnLoad();
  }


  public override preSubmitInterceptor(payload: Retailpdcchequeform): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: Retailpdcchequeform) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.retailpdcchequeform,
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


