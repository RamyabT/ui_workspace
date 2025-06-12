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
  FpxModal,
  FpxModalAfterClosed,
  CriteriaQuery
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { RetailupcomingBillSummaryexfilterService } from "../retail-upcoming-bill-summary-filter-service/retail-upcoming-bill-summary-filter.service";
import { RetailupcomingBillSummaryexfilter } from "../retail-upcoming-bill-summary-filter-service/retail-upcoming-bill-summary-filter.model";
import { formatDate } from "@angular/common";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import moment from "moment";
//import { Debitcard } from "../debitcard-details-service/debitcard-details.model";
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
import { RetailupcomingBillSummaryExFilterComponent } from "./retail-upcoming-bill-summary-filter.component";
export class RetailupcomingBillSummaryExFilterState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  LogDate = new Date()
  fromDate: any = {
    minDate: "",
    maxDate: "",
  }

  toDate: any = {
    minDate: "",
    maxDate: "",
  }
  startDate: any
  endDate: any
  paymentDate:any
  formValues:any
  maximumAmount: any
}



@Injectable()
export class RetailupcomingBillSummaryExFilterHelper extends BaseFpxFormHelper<RetailupcomingBillSummaryExFilterState> {
  fromDate: any;
  toDate: any;
  billerId: any;

  constructor(private retailupcomingBillSummaryExFilterService: RetailupcomingBillSummaryexfilterService, private _httpProvider: HttpProviderService, private _router: Router,
    private _dialogRef: MatDialogRef<any>,
    private _appConfig: AppConfigService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,) {
    super(new RetailupcomingBillSummaryExFilterState());
  }
 // cardData!: Debitcard;
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
      this.state.formValues = {
        ...this.formGroup.value,
        fromDate: raw.fromDate,
        billerId:raw.billerId,
        
        toDate: raw.toDate,
       // cardRefNumber: this.getRoutingParam('cardRefNumber'),
        
      }
  
      this._dialogRef.close(this.state.formValues);
    }
  override doPreInit(): void {
    this.hideShellActions();
    this.setServiceCode("RETAILupcomingBillSummarySUMMARY");
   // this.cardData = this._appConfig.getData('debitCardData');
  }
  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    // this.setValue('transactionRangeType', this._dialogData?.transactionRangeType == undefined ? '1' : this._dialogData.transactionRangeType);
    // if (this._dialogData.fromDate && this._dialogData.toDate && this._dialogData.transactionRangeType == '5') {
    //   this.setValue('fromDate', this._dialogData?.fromDate);
    //   this.setValue('toDate', this._dialogData?.toDate);
    // }
    // this.setValue('minAmount', this._dialogData.minAmount);
    // this.setValue('maximumAmount', this._dialogData.maximumAmount);
    // this.setValue('cardRefNumber', this._dialogData.cardRefNumber);
    // this.setValue('accountNumber', this._dialogData.accountNumber);

  }
  filter() {
    let modal = new FpxModal();
    modal.setComponent(RetailupcomingBillSummaryExFilterComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setDisableClose(false);
    modal.setData({
      title: "RetailupcomingBillSummaryExFilter.title",
      toDate:this.state.formValues?.toDate,
      fromDate:this.state.formValues?.fromDate,
      billerId:this.state.formValues?.billerId
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }
  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model cbjvbvlosed...", payload);
    this.fromDate = payload.fromDate;
    this.toDate = payload.toDate; 
    this.billerId = payload.billerId;
    
    // this.accountNumber = payload.debitAccountNumber;
    const criteriaQuery = new CriteriaQuery();
    // let cardRefNumber= this.getRoutingParam('cardRefNumber');
    //  criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', { searchText: payload.accountNumber });
     criteriaQuery.addFilterCritertia('paymentDate', 'String', 'equals', { dateFrom: this.fromDate, });
    criteriaQuery.addFilterCritertia('paymentDate', 'Date', 'inRange', {  dateTo: this.toDate });
    criteriaQuery.addFilterCritertia('billerId', 'String', 'equals', { searchText: payload.billerId });
    
    // if(payload.maximumAmount && payload.minAmount == '') {
    //   payload.minAmount = 0;
    // }
    // if((payload.minAmount != "" || payload.minAmount == 0) && payload.maximumAmount != "") {
    //   criteriaQuery.addFilterCritertia('transactionAmount','Numeric','inRange',{
    //     fromValue : payload.minAmount,
    //     toValue : payload.maximumAmount
    //   })
    // }
    
  this.state.formValues ={
    ...this.formGroup.value,
    transactionRangeType:payload.transactionRangeType,
    accountNumber:payload.accountNumber,
    cardRefNumber: payload.cardRefNumber,
    minAmount: payload.minAmount,
    maximumAmount:payload.maximumAmount,
    fromDate: payload.fromDate,
    toDate: payload.toDate,
    transactionReference:payload.transactionReference,
    downloadFileFormat: payload.downloadFileFormat
  }
    criteriaQuery.addSortCriteria('transactionDate', 'desc', 'Date');
    this.setGridCriteria('pctransactionSummaryGrid', criteriaQuery);
  }




  public override doPostInit(): void {
    //this.addValueChangeHandler('transactionRangeType', this.handleRangeTypeOnvalueChange);
    this.addValueChangeHandler("fromDate", this.onFromDateOnValueChange);
    this.addValueChangeHandler("toDate", this.onToDateOnValueChange);
    this.handleFormOnLoad();

  }
 
  public onFromDateOnValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
if(value){
  this.state.toDate.minDate = value;
}
  }

  public onToDateOnValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      this.state.fromDate.maxDate = value;
     }
  }



  public override preSubmitInterceptor(payload: RetailupcomingBillSummaryexfilter): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: RetailupcomingBillSummaryexfilter) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.retailupcomingBillSummaryexfilter,
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


