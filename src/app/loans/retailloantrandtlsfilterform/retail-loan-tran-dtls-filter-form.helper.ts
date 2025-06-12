import { Inject, Injectable, inject } from "@angular/core";
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
  CriteriaQuery
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";

import { AppConfigService } from "@dep/services";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { formatDate } from "@angular/common";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DeviceDetectorService } from "@dep/core";
import { FileOpenerService } from "@dep/native";
import moment from "moment";
import { RetailloantrandtlsfilterformService } from "../retailloantrandtlsfilterform-service/retailloantrandtlsfilterform.service";
import { Retailloantrandtlsfilterform } from "../retailloantrandtlsfilterform-service/retailloantrandtlsfilterform.model";
export class RetailLoanTranDtlsFilterFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  availableBalance: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  }
  LogDate = new Date()
  fromDate: any = {
    minDate: new Date("01-07-2023"),
    maxDate: new Date("31-07-2023"),
  }
  startDate: any
  startDate1: any
  endDate: any
  transType: any
  toDate: any = {
    minDate: new Date("01-07-2023"),
    maxDate: new Date("31-07-2023"),
  }
  formValues: any;
}


@Injectable()
export class RetailLoanTranDtlsFilterFormHelper extends BaseFpxFormHelper<RetailLoanTranDtlsFilterFormState> {

  constructor(private retailLoanTranDtlsFilterFormService: RetailloantrandtlsfilterformService,
  private _httpProvider: HttpProviderService,
  private _router: Router,
  private commonService: CommonService,
  public deviceDetectorService: DeviceDetectorService,
  private _fileOpener: FileOpenerService,
  private _appConfig: AppConfigService,
  private _dialogRef: MatDialogRef<any>,
  @Inject(MAT_DIALOG_DATA) private _dialogData: any,
  
  ){
  super(new RetailLoanTranDtlsFilterFormState());
}
   
  override doPreInit(): void {
  this.hideShellActions();
  this.setServiceCode("RETAILLOANTRANDTLSFILTER");
  this.addValueChangeHandler("rangeType", this.handleRangeTypeOnvalueChange);
  this.addValueChangeHandler("fromDate", this.handleFromDateOnvalueChange);
  this.addValueChangeHandler("toDate", this.handleToDateOnvalueChange);
}
   

  public override doPostInit(): void {
    this.handleFormOnLoad();

}
 public handleFromDateOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
) => {
  if (value) {
    this.reset('toDate','');
    this.state.toDate.minDate = value;
    if (this.getValue('rangeType') == '10') {
      this.state.startDate = this.getValue('fromDate');
    }

  }
}
  public handleToDateOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
) => {
  if (value) {
    if (this.getValue('rangeType') == '10') {
      this.state.endDate = value;

    }

  }
}
  

public handleRangeTypeOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
) => {
  if (value) {
    if(value =='1'){
      this.setHidden('fromDate',true);
    this.setHidden('toDate',true);
    }
   else if (value == "2") {
      //Current Month
      this.setHidden('fromDate', true);
      this.setHidden('toDate', true);
      let newDate = new Date();
      let date = newDate.getDate();
      this.state.startDate = formatDate(newDate.setDate(newDate.getDate() - Number(date) + 1), 'yyyy-MM-dd', 'en-US');
      this.state.endDate = formatDate(this.state.LogDate, 'yyyy-MM-dd', 'en-US');

    }
    else if (value == "3") {
      //Last Month
      this.setHidden('fromDate', true);
      this.setHidden('toDate', true);
      let newDate = new Date();
      let date = newDate.getDate()
      let dateReset: any = new Date(newDate.setDate(newDate.getDate() - Number(date) + 1));
      let finalDate = dateReset.setMonth(dateReset.getMonth() - 1);
      this.state.startDate = formatDate(finalDate, 'yyyy-MM-dd', 'en-US');
      let lastDate = new Date(dateReset.getFullYear(), dateReset.getMonth() + 1, 0)
      this.state.endDate = formatDate(lastDate, 'yyyy-MM-dd', 'en-US');
    }
    else if (value == '4') {
      //Last 3 Months
      this.setHidden('fromDate', true);
      this.setHidden('toDate', true);
      let NewDate = new Date();
      this.state.endDate = formatDate(NewDate, 'yyyy-MM-dd', 'en-US');
      let threeMonth = new Date(NewDate.setMonth(NewDate.getMonth() - 3));
      this.state.startDate = formatDate(threeMonth, 'yyyy-MM-dd', 'en-US');
      
    }
    // Vancity range type conditions
    else if(value =='6'){
      //last 14 days  fixed
    this.setHidden('fromDate',true);
    this.setHidden('toDate',true);
    let newDate = new Date();
    let date = newDate.getDate();
    // this.state.startDate = formatDate(newDate.setDate(newDate.getDate() - Number(date) + 13), 'yyyy-MM-dd', 'en-US');
    // this.state.endDate = formatDate(this.state.LogDate, 'yyyy-MM-dd', 'en-US');
    this.state.startDate1 =  moment(newDate).subtract(13, 'days');
    this.state.startDate = formatDate(this.state.startDate1, 'yyyy-MM-dd', 'en-US');
    this.state.endDate = formatDate(this.state.LogDate, 'yyyy-MM-dd', 'en-US');
    }
    else if (value == "7") {
      //last 30 days fixed
    this.setHidden('fromDate',true);
    this.setHidden('toDate',true);
    let newDate = new Date();
    let date = newDate.getDate();
    this.state.startDate1 =  moment(newDate).subtract(29, 'days');
    this.state.startDate = formatDate(this.state.startDate1, 'yyyy-MM-dd', 'en-US');
    this.state.endDate = formatDate(this.state.LogDate, 'yyyy-MM-dd', 'en-US');
    }
    else if (value == "8") {
      //Last 90 days  fixed
      this.setHidden('fromDate', true);
      this.setHidden('toDate', true);
      let NewDate = new Date()
      // this.state.endDate = formatDate(NewDate, 'yyyy-MM-dd', 'en-US');
      // let threeMonth = new Date(NewDate.setMonth(NewDate.getMonth() - 3))
      // this.state.startDate = formatDate(threeMonth, 'yyyy-MM-dd', 'en-US');
      this.state.startDate1 =  moment(NewDate).subtract(89, 'days');
      this.state.startDate = formatDate(this.state.startDate1, 'yyyy-MM-dd', 'en-US');
      this.state.endDate = formatDate(this.state.LogDate, 'yyyy-MM-dd', 'en-US');
    }
    else if (value == '9') {
      //This year fixed
      this.setHidden('fromDate', true);
      this.setHidden('toDate', true);
      let NewDate = new Date()
      this.state.endDate = formatDate(NewDate, 'yyyy-MM-dd', 'en-US');
      // let threeMonth = new Date(NewDate.setMonth(NewDate.getMonth() - 11))
      let threeMonth = moment().startOf('year').format('yyyy-MM-DD');
      this.state.startDate = formatDate(threeMonth, 'yyyy-MM-dd', 'en-US');
    }
    else if(value =='10') {
      //7 years fixed
      this.setHidden('fromDate', false);
      this.setHidden('toDate', false);
      this.reset('fromDate', "")
      this.reset('toDate', "")
      let newDate = new Date();
      this.state.fromDate.minDate = moment(newDate).subtract(72, 'months');
      this.state.fromDate.maxDate = new Date();
      this.state.toDate.maxDate = new Date();
      this.state.toDate.minDate = this.state.fromDate.minDate;
    }
    else {
      this.setHidden('fromDate', false);
      this.setHidden('toDate', false);
      this.reset('fromDate', "")
      this.reset('toDate', "")
      let newDate = new Date();
      this.state.fromDate.minDate = moment(newDate).subtract(12, 'months');
      this.state.fromDate.maxDate = new Date();
      this.state.toDate.maxDate = new Date();
      this.state.toDate.minDate = this.state.fromDate.minDate;
    }
  }
}
 
public handleFormOnLoad() {
  // WRITE CODE HERE TO HANDLE
  this.setValue('rangeType', this._dialogData?.rangeType == undefined ? '6' : this._dialogData.rangeType);
  if (this._dialogData.rangeType != '10') {
    this.setHidden('fromDate', true);
    this.setHidden('toDate', true);
  }

  if (this._dialogData.fromDate && this._dialogData.toDate && this._dialogData.rangeType == '10') {
    this.setValue('fromDate', this._dialogData?.fromDate);
    this.setValue('toDate', this._dialogData?.toDate);
  }

}
  public override preSubmitInterceptor(payload: Retailloantrandtlsfilterform):any {
  // WRITE CODE HERE TO HANDLE 
  return payload;
}
  
  
 public override postDataFetchInterceptor(payload: Retailloantrandtlsfilterform){
  // WRITE CODE HERE TO HANDLE 
  return payload;
}
  
public onResetClick: BaseFpxControlEventHandler = (payload: any) => {
  this.reset('fromDate');
  this.reset('toDate');
  this.reset('rangeType');

  this.setValue('rangeType', '1');
  if (this.getValue('rangeType') != 10) {
    this.setHidden('fromDate', true);
    this.setHidden('toDate', true);
  }

  // this.handleFormOnLoad();
}
  public onViewClick: BaseFpxControlEventHandler = (payload: any) => {
  let raw = this.formGroup.getRawValue();
  this.state.formValues = {
    ...this.formGroup.value,
    fromDate: this.state.startDate,
    toDate: this.state.endDate,
    accountNumber: this.getRoutingParam('accountNumber')
  }
  this._dialogRef.close(this.state.formValues);
}

  public override postSubmitInterceptor(response: any): RoutingInfo {
  console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
  routingInfo.setNavigationURL("confirmation");
  if (response.success) {
    routingInfo.setQueryParams({
      transRef: response.success?.body?.retailloantrandtlsfilterform,
      status: "success",
    });
  } else if (response.error) {
    routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
  }
  return routingInfo;
}

close() {
  this._dialogRef.close(0);
}
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}


