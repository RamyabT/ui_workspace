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
import { Retaildctransactionexfilter } from "../retail-cc-transaction-filter-service/retail-cc-transaction-filter.model";
import { formatDate } from "@angular/common";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import moment from "moment";
import { RetailCcTransactionFilterService } from "../retail-cc-transaction-filter-service/retail-cc-transaction-filter.service";
import { AppConfigService } from "@dep/services";
import { Creditcard } from "../creditcard-service/creditcard.model";
export class RetailDcTransactionExFilterState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
   LogDate=new Date()
	fromDate:any={
	   minDate: "",
       maxDate: "",
     }
    
	toDate:any={
	   minDate: "",
       maxDate: "",
     }
  startDate: any
  endDate: any
  formValues: any;
  maximumAmount: any
}



@Injectable()
export class RetailCcTransactionFilterHelper extends BaseFpxFormHelper<RetailDcTransactionExFilterState>{

   constructor(private _dialogRef: MatDialogRef<any>,
    private _appConfig:AppConfigService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,) 
    {
        super(new RetailDcTransactionExFilterState());
    }
    cardData!: Creditcard;
   
  override doPreInit(): void {
  this.hideShellActions();
 this.setServiceCode("RETAILCCTRANSACTION");
 this.cardData = this._appConfig.getData('creditCardData');
 }
 public handleFormOnLoad() {
  // WRITE CODE HERE TO HANDLE
  this.setValue('transactionRangeType', this._dialogData?.transactionRangeType == undefined ? '1' : this._dialogData.transactionRangeType);
  if (this._dialogData.fromDate && this._dialogData.toDate && this._dialogData.transactionRangeType == '5') {
    this.setValue('fromDate', this._dialogData?.fromDate);
    this.setValue('toDate', this._dialogData?.toDate);
  }
  this.setValue('minAmount', this._dialogData.minAmount);
  this.setValue('maximumAmount', this._dialogData.maximumAmount);
  this.setValue('cardRefNumber',  this._dialogData.cardRefNumber);
  this.setValue('accountNumber',  this._dialogData.accountNumber);
  
}
 public handleRangeTypeOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
) => {
  if (value) {
    if (value == "1") {
      //This Month
      let newDate = new Date();
      let date = newDate.getDate()
      let dateReset: any = new Date(newDate.setDate(newDate.getDate() - Number(date) + 1));
      let finalDate = dateReset.setMonth(dateReset.getMonth());
      this.setValue('fromDate', formatDate(finalDate, 'yyyy-MM-dd', 'en-US'))
      let lastDate = new Date();
      this.setValue('toDate', formatDate(lastDate, 'yyyy-MM-dd', 'en-US'));
      this.setHidden('fromDate', true);
      this.setHidden('toDate', true);
      // this.state.startDate=this.setValue('fromDate', formatDate(finalDate, 'yyyy-MM-dd', 'en-US'));
      // this.state.endDate=this.setValue('toDate', formatDate(lastDate, 'yyyy-MM-dd', 'en-US'));

    }
    else if (value == "2") {
      //Last Month
      let newDate = new Date();
      let date = newDate.getDate();
      let dateReset: any = new Date(newDate.setDate(newDate.getDate() - Number(date) + 1));
      let finalDate = dateReset.setMonth(dateReset.getMonth() - 1);
      this.setValue('fromDate', formatDate(finalDate, 'yyyy-MM-dd', 'en-US'))
      let lastDate = new Date(dateReset.getFullYear(), dateReset.getMonth() + 1, 0)
      this.setValue('toDate', formatDate(lastDate, 'yyyy-MM-dd', 'en-US'));
      this.setHidden('fromDate', true);
      this.setHidden('toDate', true);

    }
    else if (value == "3") {
      //Last 3 Month
      let NewDate = new Date()
      this.setValue('toDate', formatDate(NewDate, 'yyyy-MM-dd', 'en-US'))
      let threeMonth = new Date(NewDate.setMonth(NewDate.getMonth() - 3))
      this.setValue('fromDate', formatDate(threeMonth, 'yyyy-MM-dd', 'en-US'));
      this.setHidden('fromDate', true);
      this.setHidden('toDate', true);


    }
    else if (value == "4") {
      //Last 6 Month
      let NewDate = new Date()
      this.setValue('toDate', formatDate(NewDate, 'yyyy-MM-dd', 'en-US'))
      let sixMonth = new Date(NewDate.setMonth(NewDate.getMonth() - 6))
      this.setValue('fromDate', formatDate(sixMonth, 'yyyy-MM-dd', 'en-US'));
      this.setHidden('fromDate', true);
      this.setHidden('toDate', true);
    }
    else {
      this.reset('fromDate', "");
      this.reset('toDate', "");
      this.setHidden('fromDate', false);
      this.setHidden('toDate', false);
      this.state.fromDate.maxDate=new Date();
      this.state.toDate.maxDate=new Date();
        let newDate = new Date();
        this.state.fromDate.minDate = moment(newDate).subtract(12, 'months');
        this.state.toDate.minDate = this.state.fromDate.minDate;
    }
  }
}

public handleFromDateOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
) => {
  if(value){
  this.state.toDate.minDate = value
  }
}
public handletoDateOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
) => {
  if(value){
  this.state.fromDate.maxDate = value
  }
}
public handlemaximumAmountOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
) => {
    if (value) { 
      if(this.getValue('minAmount') == '') {
        this.setErrors('minAmount', 'minAmountManERR');
      }
      else if(value == this.getValue('minAmount') && this.getValue('minAmount') != ''){
        this.formGroup.get('minAmount')?.setErrors(null);
      }
      else if(value <= this.getValue('minAmount') && this.getValue('minAmount') != ''){
        this.setErrors('maximumAmount', 'maxAmountERR');
      }
      else if(value >= this.getValue('minAmount') && this.getValue('minAmount') != ''){
        this.formGroup.get('minAmount')?.setErrors(null);
      }
    }
    else if (value == 0) {
      this.reset('maximumAmount');
      if(this.getValue('minAmount')) {
        this.setErrors('maximumAmount', 'maxAmountManERR');
      }
      if(this.getValue('minAmount') == '') {
        this.reset('minAmount');
      }
    }
    // else if(value>this.getValue('minAmount') && this.getValue('minAmount')!=null){
    //   this.formGroup.controls['minAmount'].setErrors({ 'minAmountERR': false }, { emitEvent: false });
    //   this.formGroup.get("minAmount")?.enable();
    //   this.formGroup.get("maximumAmount")?.enable();
    // }
}
public handleminAmountOnvalueChange: BaseFpxChangeHandler = (
  name: string,
  status: FormControlStatus,
  value: any,
  formGroup: FormGroup
) => {
    if (value) {
      if(this.getValue('maximumAmount') == '') {
        this.setErrors('maximumAmount', 'maxAmountManERR')
      }
      else if(value == this.getValue('maximumAmount') && this.getValue('maximumAmount') != ''){
        this.formGroup.get('maximumAmount')?.setErrors(null);
      }
      else if(value >= this.getValue('maximumAmount')&& this.getValue('maximumAmount') != ''){
        this.setErrors('minAmount', 'minAmountERR');
      }
      else if(value <= this.getValue('maximumAmount') && this.getValue('maximumAmount') != ''){
        this.formGroup.get('maximumAmount')?.setErrors(null);
      }
    }
    else if (value == 0) { 
      if(!this.getValue('maximumAmount')) {
        this.reset('minAmount');
        this.reset('maximumAmount');
      }
      else if(this.getValue('maximumAmount')) {
        this.reset('minAmount');
      }
    }
    // else if(value<this.getValue('maximumAmount')&& this.getValue('maximumAmount')!=null && value==0){
    //   this.formGroup.controls['maximumAmount'].setErrors({ 'maxAmountERR': false }, { emitEvent: false })
    //   this.formGroup.get("minAmount")?.enable();
    //   this.formGroup.get("maximumAmount")?.enable();
    // }
}


  public override doPostInit(): void {
    this.addValueChangeHandler('transactionRangeType',this.handleRangeTypeOnvalueChange);
    this.addValueChangeHandler("fromDate", this.handleFromDateOnvalueChange);
    this.addValueChangeHandler("toDate", this.handletoDateOnvalueChange);
    this.addValueChangeHandler("maximumAmount", this.handlemaximumAmountOnvalueChange);
    this.addValueChangeHandler("minAmount", this.handleminAmountOnvalueChange);
    this.handleFormOnLoad();
  
  }
  public onResetClick: BaseFpxControlEventHandler = (payload: any) => {
    this.reset('fromDate');
    this.reset('toDate');
    this.reset('maximumAmount');
    this.reset('minAmount');

    this.setValue('transactionRangeType','1');

  }


  public onViewClick: BaseFpxControlEventHandler = (payload: any) => {
let raw=this.formGroup.getRawValue();
// console.log('raw values',raw.fromDate);
if(this.formGroup.value.minAmount == undefined || this.formGroup.value.minAmount == null || this.formGroup.value.minAmount == "" ){
  this.formGroup.value.minAmount = 0;
}
if(this.formGroup.value.maximumAmount == undefined || this.formGroup.value.maximumAmount == null || this.formGroup.value.maximumAmount == "" ){
  this.formGroup.value.maximumAmount = 0;
}
    this.state.formValues = {
      // ...this.formGroup.value,
      fromDate: raw.fromDate,
      minAmount:this.formGroup.value.minAmount,
      maximumAmount:this.formGroup.value.maximumAmount,
      toDate: raw.toDate,
      cardRefNumber: this.getValue('cardRefNumber'),
      accountNumber: this.cardData.primaryCardAccNumber
    }

    this._dialogRef.close(this.state.formValues);
  }
  
 
  public override preSubmitInterceptor(payload: Retaildctransactionexfilter):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Retaildctransactionexfilter){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.retaildctransactionexfilter,
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
 
 
