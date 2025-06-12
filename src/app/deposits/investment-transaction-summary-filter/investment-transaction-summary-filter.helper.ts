import { Inject, Injectable } from "@angular/core";
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
  FpxModal
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { InvestmenttransactionsummaryService } from '../investmenttransactionsummary-service/investmenttransactionsummary.service';
import { Investmenttransactionsummary } from '../investmenttransactionsummary-service/investmenttransactionsummary.model';
import { formatDate } from "@angular/common";
import moment from "moment";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ActiveSpaceInfoService } from "@dep/core";
export class InvestmentTransactionSummaryFilterState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	fromDate:any={
	   minDate:new Date("2023-07-01"),
       maxDate:new Date("2023-07-31"),
     }
     toDate:any={
      minDate:new Date("2023-07-01"),
       maxDate:new Date("2023-07-31"),
      }
      LogDate = new Date()
      startDate: any
  startDate1: any
  endDate: any
  formValues: any;
  productCode:any
}


@Injectable()
export class InvestmentTransactionSummaryFilterHelper extends BaseFpxFormHelper<InvestmentTransactionSummaryFilterState>{


   constructor( private investmentTransactionSummaryFilterService: InvestmenttransactionsummaryService, private _httpProvider : HttpProviderService,private _router: Router,
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _activeSpaceInfoService: ActiveSpaceInfoService
   ) 
    {
        super(new InvestmentTransactionSummaryFilterState());
    }
   
  override doPreInit(): void {
 //this.setServiceCode("RETAILINVESTMENTTRANSUMMARY");
 this.addValueChangeHandler("fromDate", this.handleFromDateOnvalueChange);
    this.addValueChangeHandler("toDate", this.handleToDateOnvalueChange);
    this.addValueChangeHandler("rangeType", this.handleRangeTypeOnvalueChange);
    this.setHidden('productCode',true);
 }



 public handleFromDateOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
) => {
  if (value) {
    this.state.toDate.minDate = value;
    if(this.getValue('rangeType')=='5'){
    this.state.startDate=this.getValue('fromDate');
    this.setHidden('productCode',true);
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
    if(this.getValue('rangeType')=='5'){
      this.state.endDate=value;
      this.setHidden('productCode',true);

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
    this.setHidden('productCode',true)
    }
    else if (value == "2") {
      //Current Month
      this.setHidden('fromDate', true);
      this.setHidden('toDate', true);
      this.setHidden('productCode',true)
      let newDate = new Date();
      let date = newDate.getDate();
      this.state.startDate = formatDate(newDate.setDate(newDate.getDate() - Number(date) + 1), 'yyyy-MM-dd', 'en-US');
      this.state.endDate = formatDate(this.state.LogDate, 'yyyy-MM-dd', 'en-US');

    }
    else if (value == "3") {
      //Last Month
      this.setHidden('fromDate', true);
      this.setHidden('toDate', true);
      this.setHidden('productCode',true)
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
      this.setHidden('productCode',true)
      let NewDate = new Date()
      this.state.endDate = formatDate(NewDate, 'yyyy-MM-dd', 'en-US');
      let threeMonth = new Date(NewDate.setMonth(NewDate.getMonth() - 3))
      this.state.startDate = formatDate(threeMonth, 'yyyy-MM-dd', 'en-US');
    }
    // Vancity range type conditions
    else if(value =='6'){
      //last 14 days  fixed
    this.setHidden('fromDate',true);
    this.setHidden('toDate',true);
    this.setHidden('productCode',true)
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
    this.setHidden('productCode',true)
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
      this.setHidden('productCode',true)
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
      this.setHidden('productCode',true)
      let NewDate = new Date()
      this.state.endDate = formatDate(NewDate, 'yyyy-MM-dd', 'en-US');
      // let threeMonth = new Date(NewDate.setMonth(NewDate.getMonth() - 11))
      let threeMonth = moment().startOf('year').format('YYYY-MM-DD');
      this.state.startDate = formatDate(threeMonth, 'yyyy-MM-dd', 'en-US');
    }
    else if(value =='10') {
      //7 years fixed
      this.setHidden('fromDate', false);
      this.setHidden('toDate', false);
      this.setHidden('productCode',true)
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
      this.setHidden('productCode',true)
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

public onResetClick: BaseFpxControlEventHandler = (payload: any) => {
  this.reset('fromDate');
  this.reset('toDate');
  this.reset('rangeType');
  if(this.getValue('rangeType') != 5){
    this.setHidden('fromDate',true);
    this.setHidden('toDate',true);
    this.setHidden('productCode',true)
  }
}

public onViewClick: BaseFpxControlEventHandler = (payload: any) => {
  let raw=this.formGroup.getRawValue();
  if(raw.rangeType=='10'){
    this.state.startDate=raw.fromDate,
    this.state.endDate=raw.toDate
  }
  this.state.formValues = {
    ...this.formGroup.value,
    fromDate: this.state.startDate,
    toDate: this.state.endDate,
    accountNumber: this._activeSpaceInfoService.getAccountNumber(),
    productCode:this.state.productCode
    }
    this._dialogRef.close(this.state.formValues);
  }




   

  public override doPostInit(): void {
    this.setHidden('fromDate', true);
    this.setHidden('toDate', true);
  }
  
 
  public override preSubmitInterceptor(payload: Investmenttransactionsummary):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Investmenttransactionsummary){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.investmenttransactionsummary.transactionReference,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
    }
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 

