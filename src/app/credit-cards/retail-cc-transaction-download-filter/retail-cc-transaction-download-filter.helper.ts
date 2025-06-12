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
  CriteriaQuery
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { Retaildctransactiondownloadfilter } from "../retail-cc-transaction-download-filter-service/retail-cc-transaction-download-filter.model";
import { formatDate } from "@angular/common";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { DeviceDetectorService } from "src/app/dep/core/class/device-detector.service";
import { FileOpenerService } from "src/app/dep/native/file-opener.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { RetailcctransactiondownloadfilterService } from "../retail-cc-transaction-download-filter-service/retail-cc-transaction-download-filter.service";
import { Creditcard } from "../creditcard-service/creditcard.model";
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
import moment from "moment";
export class RetailCcTransactionDownloadFilterState extends BaseFpxComponentState {
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
export class RetailCcTransactionDownloadFilterHelper extends BaseFpxFormHelper<RetailCcTransactionDownloadFilterState>{

  fromDate: any;
  toDate: any;
  maximumAmount: any;
  minAmount: any;
  constructor(
    private commonService: CommonService,
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private deviceDetectorService: DeviceDetectorService,
    private _appConfig:AppConfigService,
    private _fileOpener: FileOpenerService,
    private retailCcTransactionDownloadFilterService: RetailcctransactiondownloadfilterService, private _httpProvider: HttpProviderService, private _router: Router) {
    super(new RetailCcTransactionDownloadFilterState());
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
    this.setValue('downloadFileFormat', this._dialogData?.downloadFileFormat == undefined ? '1' : this._dialogData.downloadFileFormat);
    if (this._dialogData.fromDate && this._dialogData.toDate && this._dialogData.transactionRangeType == '5') {
      this.setValue('fromDate', this._dialogData?.fromDate);
      this.setValue('toDate', this._dialogData?.toDate);
    }
    this.setValue('minAmount', this._dialogData.minAmount);
    this.setValue('maximumAmount', this._dialogData.maximumAmount);
    this.setValue('cardRefNumber',  this._dialogData.cardRefNumber);
    this.setValue('isBuild',  this._dialogData.isBuild);
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
        let date = newDate.getDate()
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
    this.addValueChangeHandler('transactionRangeType', this.handleRangeTypeOnvalueChange);
    this.addValueChangeHandler("fromDate", this.handleFromDateOnvalueChange);
    this.addValueChangeHandler("toDate", this.handletoDateOnvalueChange);
    this.addValueChangeHandler("maximumAmount", this.handlemaximumAmountOnvalueChange);
    this.addValueChangeHandler("minAmount", this.handleminAmountOnvalueChange);

    this.handleFormOnLoad();

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

  public onDownloadClick: BaseFpxControlEventHandler = (payload: any) => {
    this.fromDate = this.getValue('fromDate');
    this.toDate = this.getValue('toDate');
    this.minAmount = this.getValue('minAmount');
    this.maximumAmount = this.getValue('maximumAmount');

    const criteriaQuery = new CriteriaQuery();
    let accountNumber= this.cardData.primaryCardAccNumber;
    let cardRefNumber = this.getValue('cardRefNumber');
    // criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', { searchText: accountNumber });
    criteriaQuery.addFilterCritertia('cardRefNumber', 'String', 'equals', { searchText: cardRefNumber });
    criteriaQuery.addFilterCritertia('isBuild', 'String', 'equals', { searchText: this.getValue('isBuild') });

    criteriaQuery.addFilterCritertia('transactionDate', 'Date', 'inRange', { dateFrom: this.fromDate, dateTo: this.toDate });
    criteriaQuery.addFilterCritertia('transactionAmount', 'Numeric', 'inRange', {
      fromValue: this.minAmount,
      toValue: this.maximumAmount
    })
    criteriaQuery.addSortCriteria('transactionDate', 'desc', 'String');
    criteriaQuery.setPageCount(10000)
    this.setGridCriteria('dctransactionSummaryGrid', criteriaQuery);
    let raw=this.formGroup.getRawValue();
    let formValues = {
      ...this.formGroup.value,
      fromDate: raw.fromDate,
      minAmount: this.formGroup.value.minAmount,
      maximumAmount: this.formGroup.value.maximumAmount,
      downloadFileFormat: this.formGroup.value.downloadFileFormat,
      cardRefNumber: this.getValue('cardRefNumber'),
      toDate: raw.toDate,
      accountNumber: this.cardData.primaryCardAccNumber
    }
    if (this.getValue('downloadFileFormat') == 1) {
      this.commonService.downloadCCTransactionStatement(criteriaQuery).subscribe({
        next: (response: any) => {
          if (this.deviceDetectorService.isHybrid()) {
            this._fileOpener.openPDF(
              response,
              "application/pdf",
              "CreditCardTransactionHistory.pdf"
            );
          } else {

            let documentURL = URL.createObjectURL(
              new Blob([response.body], { type: "application/pdf" })
            );
            const downloadLink = document.createElement("a");
            downloadLink.href = documentURL;
            const fileName = "CreditCardTransactionHistory.pdf";
            downloadLink.download = fileName;
            
          }
        }
      });
    }
    else if (this.getValue('downloadFileFormat') == 2) {
      this.commonService.downloadCCTransactionStatementCSV(criteriaQuery).subscribe({
        next: (response: any) => {
          if (this.deviceDetectorService.isHybrid()) {
            this._fileOpener.openPDF(
              response,
              "application/pdf",
              "CreditCardTransactionHistory.csv"
            );
          } else {

            let documentURL = URL.createObjectURL(
              new Blob([response.body], { type: "application/octet-stream" })
            );
            const downloadLink = document.createElement("a");
            downloadLink.href = documentURL;
            const fileName = "CreditCardTransactionHistory.csv";
            downloadLink.download = fileName;
          }
        }
      });

    }
    this._dialogRef.close(formValues);
  }


  public override preSubmitInterceptor(payload: Retaildctransactiondownloadfilter): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: Retaildctransactiondownloadfilter) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.retaildctransactiondownloadfilter,
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


