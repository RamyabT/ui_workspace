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
  import moment from "moment";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { formatDate } from "@angular/common";
import { AppConfigService } from "@dep/services";
import { wallettransactiondtls } from "../trans-history-service/transactionhistory.model";
import { WallethistroyService } from "../trans-history-service/wallethistroy.service";


export class WalletFilterTransactionFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  fromDate: any = {
    minDate: "",
    maxDate: "",
  }
  toDate: any = {
    minDate: "",
    maxDate: "",
  }
  formValues: any;
  LogDate = new Date()
  startDate: any
  startDate1: any
  endDate: any
  transType: any
  // transType: any

  transactionAmount: any = {
    min: 100,
    max: 10000,
    step: 100,
    currencyCode: this._appConfig.baseCurrency
  }
}
export enum Status {
  Debit = 'Debit',
  Credit = 'Credit',
 }

@Injectable()
export class WalletFilterTransactionFormHelper extends BaseFpxFormHelper<WalletFilterTransactionFormState> {
  enumKeys: any;
  public statusEnum = Status;
   public transType: Status;
   constructor(private retailFilterTransactionService: WallethistroyService, private _httpProvider: HttpProviderService, private _router: Router,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _dialogRef: MatDialogRef<any>,) {
    super(new WalletFilterTransactionFormState());
    this.transType = Status.Debit

  }

  override doPreInit(): void {
    this.setServiceCode("wallettransactiondtls");
   }
 

  public handleFormOnLoad() {
    this.setHidden('fromDate', true);
    this.setHidden('toDate', true);
  }

  onStatusChange(event: any) {
    this.transType = event.value; // Update selected status
    console.log('Selected Status:', this.transType);
  }
 

  public handleTransactionPeriodOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value == "") {
      this.setHidden('fromDate', true);
      this.setHidden('toDate', true);
      this.reset('fromDate');
      this.reset('toDate');
      this.reset('transactionReference');
      this.reset('walletName');
      // this.setValue('transactionPeriod','1');
      this.reset('transactionAmount');
      this.reset('purpose');
      this.reset('transType');
    }
    else if (value == '1') {
      this.setHidden('fromDate', true);
      this.setHidden('toDate', true);
      this.reset('fromDate');
      this.reset('toDate');
      this.reset('transactionReference');
      this.reset('walletName');
      // this.setValue('transactionPeriod','1');
      this.reset('transactionAmount');
      this.reset('purpose');
      this.reset('transType');
    }
    else if (value == "2") {
      //Current Month
      this.setHidden('fromDate', true);
      this.setHidden('toDate', true);
      this.reset('fromDate');
      this.reset('toDate');
      this.reset('transactionReference');
      this.reset('walletName');
      // this.setValue('transactionPeriod','1');
      this.reset('transactionAmount');
      this.reset('purpose');
      this.reset('transType');
      let newDate = new Date();
      let date = newDate.getDate();
      this.state.startDate = formatDate(newDate.setDate(newDate.getDate() - Number(date) + 1), 'yyyy-MM-dd', 'en-US');
      this.state.endDate = formatDate(this.state.LogDate, 'yyyy-MM-dd', 'en-US');

    }
    else if (value == "3") {
      //Last Month
      this.reset('fromDate');
      this.reset('toDate');
      this.reset('transactionReference');
      this.reset('walletName');
      // this.setValue('transactionPeriod','1');
      this.reset('transactionAmount');
      this.reset('purpose');
      this.reset('transType');
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
      this.reset('fromDate');
      this.reset('toDate');
      this.reset('transactionReference');
      this.reset('walletName');
      // this.setValue('transactionPeriod','1');
      this.reset('transactionAmount');
      this.reset('purpose');
      this.reset('transType');
      this.setHidden('fromDate', true);
      this.setHidden('toDate', true);
      let NewDate = new Date()
      this.state.endDate = formatDate(NewDate, 'yyyy-MM-dd', 'en-US');
      let threeMonth = new Date(NewDate.setMonth(NewDate.getMonth() - 3))
      this.state.startDate = formatDate(threeMonth, 'yyyy-MM-dd', 'en-US');
    }
    // Vancity range type conditions
    else if (value == '6') {
      //last 14 days  fixed
      this.reset('fromDate');
      this.reset('toDate');
      this.reset('transactionReference');
      this.reset('walletName');
      // this.setValue('transactionPeriod','1');
      this.reset('transactionAmount');
      this.reset('purpose');
      this.reset('transType');
      this.setHidden('fromDate', true);
      this.setHidden('toDate', true);
      let newDate = new Date();
      let date = newDate.getDate();
      // this.state.startDate = formatDate(newDate.setDate(newDate.getDate() - Number(date) + 13), 'yyyy-MM-dd', 'en-US');
      // this.state.endDate = formatDate(this.state.LogDate, 'yyyy-MM-dd', 'en-US');
      this.state.startDate1 = moment(newDate).subtract(13, 'days');
      this.state.startDate = formatDate(this.state.startDate1, 'yyyy-MM-dd', 'en-US');
      this.state.endDate = formatDate(this.state.LogDate, 'yyyy-MM-dd', 'en-US');
    }
    else if (value == "7") {
      //last 30 days fixed
      this.reset('fromDate');
      this.reset('toDate');
      this.reset('transactionReference');
      this.reset('walletName');
      // this.setValue('transactionPeriod','1');
      this.reset('transactionAmount');
      this.reset('purpose');
      this.reset('transType');
      this.setHidden('fromDate', true);
      this.setHidden('toDate', true);
      let newDate = new Date();
      let date = newDate.getDate();
      this.state.startDate1 = moment(newDate).subtract(29, 'days');
      this.state.startDate = formatDate(this.state.startDate1, 'yyyy-MM-dd', 'en-US');
      this.state.endDate = formatDate(this.state.LogDate, 'yyyy-MM-dd', 'en-US');
    }
    else if (value == "8") {
      //Last 90 days  fixed
      this.reset('fromDate');
      this.reset('toDate');
      this.reset('transactionReference');
      this.reset('walletName');
      // this.setValue('transactionPeriod','1');
      this.reset('transactionAmount');
      this.reset('purpose');
      this.reset('transType');
      this.setHidden('fromDate', true);
      this.setHidden('toDate', true);
      let NewDate = new Date()
      // this.state.endDate = formatDate(NewDate, 'yyyy-MM-dd', 'en-US');
      // let threeMonth = new Date(NewDate.setMonth(NewDate.getMonth() - 3))
      // this.state.startDate = formatDate(threeMonth, 'yyyy-MM-dd', 'en-US');
      this.state.startDate1 = moment(NewDate).subtract(89, 'days');
      this.state.startDate = formatDate(this.state.startDate1, 'yyyy-MM-dd', 'en-US');
      this.state.endDate = formatDate(this.state.LogDate, 'yyyy-MM-dd', 'en-US');
    }
    else if (value == '9') {
      //This year fixed
      this.reset('fromDate');
      this.reset('toDate');
      this.reset('transactionReference');
      this.reset('walletName');
      // this.setValue('transactionPeriod','1');
      this.reset('transactionAmount');
      this.reset('purpose');
      this.reset('transType');
      this.setHidden('fromDate', true);
      this.setHidden('toDate', true);
      let NewDate = new Date()
      this.state.endDate = formatDate(NewDate, 'yyyy-MM-dd', 'en-US');
      // let threeMonth = new Date(NewDate.setMonth(NewDate.getMonth() - 11))
      let threeMonth = moment().startOf('year').format('YYYY-MM-DD');
      this.state.startDate = formatDate(threeMonth, 'yyyy-MM-dd', 'en-US');
    }
    else if (value == '10') {
      //7 years fixed
      this.reset('fromDate');
      this.reset('toDate');
      this.reset('transactionReference');
      this.reset('walletName');
      // this.setValue('transactionPeriod','1');
      this.reset('transactionAmount');
      this.reset('purpose');
      this.reset('transType');
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
      this.reset('fromDate');
      this.reset('toDate');
      this.reset('transactionReference');
      this.reset('walletName');
      // this.setValue('transactionPeriod','1');
      this.reset('transactionAmount');
      this.reset('purpose');
      this.reset('transType');
      let newDate = new Date();
      this.state.fromDate.minDate = moment(newDate).subtract(12, 'months');
      this.state.fromDate.maxDate = new Date();
      this.state.toDate.maxDate = new Date();
      this.state.toDate.minDate = this.state.fromDate.minDate;
    }

  }


  public override doPostInit(): void {
    this.addValueChangeHandler("transactionPeriod", this.handleTransactionPeriodOnvalueChange);
    this.addValueChangeHandler("fromDate", this.handleFromDateOnvalueChange);
    this.addValueChangeHandler("toDate", this.handleToDateOnvalueChange);

    this.handleFormOnLoad();
  }


  public onResetClick: BaseFpxControlEventHandler = (payload: any) => {
    this.reset('fromDate');
    this.reset('toDate');
    this.reset('transactionReference');
    this.reset('walletName');
    this.reset('transactionPeriod');
    this.reset('transactionAmount');
    this.reset('purpose');
    this.reset('transType');


    if (this.getValue('transactionPeriod') != 5) {
      this.setHidden('fromDate', true);
      this.setHidden('toDate', true);
    }

    // this.handleFormOnLoad();
  }
  public handleFromDateOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      this.reset('toDate')
      this.state.toDate.minDate = value;
      if (this.getValue('transactionPeriod') == '5') {
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
      if (this.getValue('transactionPeriod') == '5') {
        this.state.endDate = value;
      }

    }
  }
  public onViewClick: BaseFpxControlEventHandler = (payload: any) => {
    console.log('Clicked');

    this.state.formValues = {
      ...this.formGroup.value,
      fromDate: this.state.startDate,
      toDate: this.state.endDate
    }

    this._dialogRef.close(this.state.formValues);


  }
  onSearchResultPopupClose() {

  }


  public override preSubmitInterceptor(payload: wallettransactiondtls): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: wallettransactiondtls) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.completedpymnts.flowInstanceId,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }
}