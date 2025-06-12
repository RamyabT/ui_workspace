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
import { formatDate } from "@angular/common";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { DeviceDetectorService } from "src/app/dep/core/class/device-detector.service";
import { FileOpenerService } from "src/app/dep/native/file-opener.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { RetailPctransactiondownloadfilterService } from "../retail-pc-transaction-download-filter-service/retail-pc-transaction-download-filter.service";
import { RetailPctransactiondownloadfilter } from "../retail-pc-transaction-download-filter-service/retail-pc-transaction-download-filter.model";
import { Prepaidcard } from "../prepaidcard-service/prepaidcard.model";
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
import moment from "moment";
import { ActiveSpaceInfoService } from "@dep/core";
export class RetailPcTransactionDownloadFilterState extends BaseFpxComponentState {
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
export class RetailPcTransactionDownloadFilterHelper extends BaseFpxFormHelper<RetailPcTransactionDownloadFilterState>{

  fromDate: any;
  toDate: any;
  maximumAmount: any;
  minAmount: any;
  transactionReference: any;
  constructor(
    private commonService: CommonService,
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private deviceDetectorService: DeviceDetectorService,
    private _appConfig:AppConfigService,
    private _fileOpener: FileOpenerService,
    private retailPcTransactionDownloadFilterService: RetailPctransactiondownloadfilterService, private _httpProvider: HttpProviderService, private _router: Router,
    private _activeSpaceInfoService: ActiveSpaceInfoService
  ) {
    super(new RetailPcTransactionDownloadFilterState());
  }
  cardData!: Prepaidcard;

  override doPreInit(): void {
    this.hideShellActions();
    this.setServiceCode("RETAILDCTRANSACTIONSUMMARY");
    this.cardData = this._appConfig.getData('prepaidCardData');
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
    this.setValue('accountNumber',  this._dialogData.accountNumber);
    this.setValue('transactionReference',this._dialogData.transactionReference);
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
      if (value && this.getValue('minAmount')==null) {
        this.setErrors('minAmount', 'minAmountManERR');
      }
      else if (value==0 && this.getValue('minAmount')!=null) {
        this.setErrors('maximumAmount', 'maxAmountManERR');
      }
      else if(value<this.getValue('minAmount') && this.getValue('minAmount')!=null){
        this.setErrors('maximumAmount', 'maxAmountERR');
      }
      else if(value>this.getValue('minAmount') && this.getValue('minAmount')!=null){
        this.formGroup.controls['minAmount'].setErrors({ 'minAmountERR': false }, { emitEvent: false });
        this.formGroup.get("minAmount")?.enable();
        this.formGroup.get("maximumAmount")?.enable();
      }
  
  
  
  }
  public handleminAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
      if (value && this.getValue('maximumAmount')==null) {
        this.setErrors('maximumAmount', 'maxAmountManERR')
      }
      else if (value==0 && this.getValue('maximumAmount')!=null) {
        this.setErrors('minAmount', 'minAmountManERR')
      }
      else if(value>this.getValue('maximumAmount')&& this.getValue('maximumAmount')!=null){
        this.setErrors('minAmount', 'minAmountERR');
      }
      else if(value<this.getValue('maximumAmount')&& this.getValue('maximumAmount')!=null && value==0){
        this.formGroup.controls['maximumAmount'].setErrors({ 'maxAmountERR': false }, { emitEvent: false })
        this.formGroup.get("minAmount")?.enable();
        this.formGroup.get("maximumAmount")?.enable();
      }
   
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
    this.transactionReference= this.getValue('transactionReference');
    const criteriaQuery = new CriteriaQuery();
    let accountNumber = this.cardData.accountNumber;
    let cardRefNumber = this.getRoutingParam('cardRefNumber');
    // criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', { searchText: accountNumber });
    criteriaQuery.addFilterCritertia('cardRefNumber', 'String', 'equals', { searchText: cardRefNumber });
    criteriaQuery.addFilterCritertia('transactionReference', 'String', 'equals', { searchText: this.transactionReference });

    criteriaQuery.addFilterCritertia('transactionDate', 'Date', 'inRange', { dateFrom: this.fromDate, dateTo: this.toDate });
    criteriaQuery.addFilterCritertia('transactionAmount', 'Numeric', 'inRange', {
      fromValue: this.minAmount,
      toValue: this.maximumAmount
    })
    criteriaQuery.addSortCriteria('transactionDate', 'desc', 'String');
    criteriaQuery.setPaginator('CLIENT');
    this.setGridCriteria('dctransactionSummaryGrid', criteriaQuery);
    let raw=this.formGroup.getRawValue();
    let formValues = {
      ...this.formGroup.value,
      fromDate: raw.fromDate,
      minAmount: this.formGroup.value.minAmount,
      maximumAmount: this.formGroup.value.maximumAmount,
      transactionReference:this.formGroup.value.transactionReference,
      downloadFileFormat: this.formGroup.value.downloadFileFormat,
      cardRefNumber: this.getRoutingParam('cardRefNumber'),
      toDate: raw.toDate,
      accountNumber: this._activeSpaceInfoService.getAccountNumber()
    }
    if (this.getValue('downloadFileFormat') == 1) {
      this.commonService.downloadPCTransactionStatement(criteriaQuery).subscribe({
        next: (response: any) => {
          if (this.deviceDetectorService.isHybrid()) {
            this._fileOpener.openPDF(
              response,
              "application/pdf",
              "PcTransactiondtlsReport.pdf"
            );
          } else {

            let documentURL = URL.createObjectURL(
              new Blob([response.body], { type: "application/pdf" })
            );
            const downloadLink = document.createElement("a");
            downloadLink.href = documentURL;
            const fileName = "PcTransactiondtlsReport.pdf";
            downloadLink.download = fileName;
            
          }
        }
      });
    }
    else if (this.getValue('downloadFileFormat') == 2) {
      this.commonService.downloadPCTransactionStatementCSV(criteriaQuery).subscribe({
        next: (response: any) => {
          if (this.deviceDetectorService.isHybrid()) {
            this._fileOpener.openPDF(
              response,
              "application/pdf",
              "PrepaidCardTransactionHistory.csv"
            );
          } else {

            let documentURL = URL.createObjectURL(
              new Blob([response.body], { type: "application/octet-stream" })
            );
            const downloadLink = document.createElement("a");
            downloadLink.href = documentURL;
            const fileName = "PrepaidCardTransactionHistory.csv";
            downloadLink.download = fileName;
          }
        }
      });

    }
    this._dialogRef.close(formValues);
  }


  public override preSubmitInterceptor(payload: RetailPctransactiondownloadfilter): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: RetailPctransactiondownloadfilter) {
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


