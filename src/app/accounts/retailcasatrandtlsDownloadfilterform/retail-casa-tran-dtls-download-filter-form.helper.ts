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
  CriteriaQuery,
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { Retailcasatrandtlsfilterform } from "../retailcasatrandtlsfilterform-service/retailcasatrandtlsfilterform.model";
import { RetailcasatrandtlsfilterformService } from "../retailcasatrandtlsfilterform-service/retailcasatrandtlsfilterform.service";
import { AppConfigService } from "@dep/services";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { formatDate } from "@angular/common";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { FileOpenerService } from "@dep/native";
import moment from "moment";
import { TranslateService } from "@ngx-translate/core";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
export class retailcasatrandtlsDownloadfilterformState extends BaseFpxComponentState {
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
}


@Injectable()
export class retailcasatrandtlsDownloadfilterformHelper extends BaseFpxFormHelper<retailcasatrandtlsDownloadfilterformState>{

  constructor(private retailcasatrandtlsfilterformService: RetailcasatrandtlsfilterformService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private commonService: CommonService,
    public deviceDetectorService: DeviceDetectorService,
    private _fileOpener: FileOpenerService,
    private _appConfig: AppConfigService,
    private _dialogRef: MatDialogRef<any>,
    private _translate: TranslateService,
    protected device: DeviceDetectorService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _activeSpaceInfoService: ActiveSpaceInfoService
  ) {
    super(new retailcasatrandtlsDownloadfilterformState());
  }

  override doPreInit(): void {
    this.hideShellActions();
    this.setServiceCode("RETAILCASATRANDTLSFILTER");
    this.addValueChangeHandler("rangeType", this.handleRangeTypeOnvalueChange);
    //this.addValueChangeHandler("transType", this.handleTransactionTypeOnvalueChange);
    
    this.addValueChangeHandler("fromDate", this.handleFromDateOnvalueChange);
    this.addValueChangeHandler("toDate", this.handleToDateOnvalueChange);

    this.addValueChangeHandler("filterSearch", this.handleFilterSearchOnvalueChange);
  }


  public override doPostInit(): void {
    this.handleFormOnLoad();

  }

  public handleFilterSearchOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      if (value == '1') {
        this.setHidden('transactionDescription',false)
        this.setHidden('transactionAmount',true);
        this.setHidden('chequeNumber',true);
        this.setHidden('confirmationNumber',true);
        this.reset('transactionAmount');
        this.reset('chequeNumber');
        this.reset('confirmationNumber');
      }
      else if(value == '2'){
        this.setHidden('transactionDescription',true)
        this.setHidden('transactionAmount',false);
        this.setHidden('chequeNumber',true);
        this.setHidden('confirmationNumber',true);
        this.reset('transactionDescription');
        this.reset('chequeNumber');
        this.reset('confirmationNumber');
      }
      else if(value == '3'){
        this.setHidden('transactionDescription',true)
        this.setHidden('transactionAmount',true);
        this.setHidden('chequeNumber',false);
        this.setHidden('confirmationNumber',true);
        this.reset('transactionAmount');
        this.reset('transactionDescription');
        this.reset('confirmationNumber');
      }
      else if(value == '4'){
        this.setHidden('transactionDescription',true)
        this.setHidden('transactionAmount',true);
        this.setHidden('chequeNumber',true);
        this.setHidden('confirmationNumber',false);
 	this.reset('transactionAmount');
        this.reset('chequeNumber');
        this.reset('transactionDescription');
      }
    }
    else{
      this.setHidden('transactionDescription',true)
      this.setHidden('transactionAmount',true);
      this.setHidden('chequeNumber',true);
      this.setHidden('confirmationNumber',true);
    }
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
      if(this.getValue('rangeType')=='5' || this.getValue('rangeType')=='10'){
      this.state.startDate=this.getValue('fromDate');
      }}
  }
  public handleToDateOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      if(this.getValue('rangeType')=='5' || this.getValue('rangeType')=='10'){
        this.state.endDate=value;
      }

    }
  }
  // public handleTransactionTypeOnvalueChange: BaseFpxChangeHandler = (
  //   name: string,
  //   status: FormControlStatus,
  //   value: any,
  //   formGroup: FormGroup
  // ) => {
  //   if (value) {
  //     if (value == 'C') {
  //       this.state.transType = 'C';

  //     }
  //     else if (value == 'D') {
  //       this.state.transType = 'D';
  //     }
  //   }
  // }

  close() {
    this._dialogRef.close(0);
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
      else if(value =='06'){
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
      else if (value == "07") {
        //last 30 days fixed
      this.setHidden('fromDate',true);
      this.setHidden('toDate',true);
      let newDate = new Date();
      let date = newDate.getDate();
      this.state.startDate1 =  moment(newDate).subtract(29, 'days');
      this.state.startDate = formatDate(this.state.startDate1, 'yyyy-MM-dd', 'en-US');
      this.state.endDate = formatDate(this.state.LogDate, 'yyyy-MM-dd', 'en-US');
      }
      else if (value == "08") {
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
      else if (value == '09') {
        //This year fixed
        this.setHidden('fromDate', true);
        this.setHidden('toDate', true);
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
    this.setHidden('transType',true)
    this.setHidden('transactionDescription',true)
    this.setHidden('transactionAmount',true);
    this.setHidden('chequeNumber',true);
    this.setHidden('confirmationNumber',true);
    

    this.setValue('rangeType', this._dialogData?.rangeType == undefined ? '06' : this._dialogData.rangeType);
    this.setValue('transType', this._dialogData?.transType == undefined ? 'B' : this._dialogData.transType);
    
    this.setValue('transactionCategoryId', this._dialogData?.transactionCategoryId == undefined ? '1' : this._dialogData.transactionCategoryId);
    
    this.setValue('filterSearch', this._dialogData?.filterSearch == undefined ? '' : this._dialogData.filterSearch)
    if(this._dialogData.filterSearch=='1'){
      this.setValue('transactionDescription',this._dialogData?.transactionDescription);
    }
    else if(this._dialogData.filterSearch=='2'){
      this.setValue('transactionAmount',this._dialogData?.transactionAmount);
    }
    else if(this._dialogData.filterSearch=='3'){
      this.setValue('chequeNumber',this._dialogData?.chequeNumber);
    }
    else if(this._dialogData.filterSearch=='4'){
      this.setValue('confirmationNumber',this._dialogData?.confirmationNumber);
    }
    this.setValue('downloadFileFormat', this._dialogData?.downloadFileFormat == undefined ? '' : this._dialogData.downloadFileFormat)
    if (this._dialogData.rangeType != '5') {
      this.setHidden('fromDate', true);
      this.setHidden('toDate', true);
    }
    if (this._dialogData.fromDate && this._dialogData.toDate && this._dialogData.rangeType == '5') {
      this.setValue('fromDate', this._dialogData?.fromDate);
      this.setValue('toDate', this._dialogData?.toDate);
    }
  }

  public override preSubmitInterceptor(payload: Retailcasatrandtlsfilterform): any {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postDataFetchInterceptor(payload: Retailcasatrandtlsfilterform) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  public onClearFilterReset(){
    this.reset('fromDate');
    this.reset('toDate');
    this.reset('rangeType');
    this.reset('transType');
    this.reset('transactionCategoryId');
    this.reset('filterSearch');
    this.reset('transactionDescription');
    this.reset('transactionAmount');
    this.reset('chequeNumber');
    this.reset('confirmationNumber');
    this.reset('downloadFileFormat');
    this.setHidden('transactionDescription',true);
    this.setHidden('transactionAmount',true);
    this.setHidden('chequeNumber',true);
    this.setHidden('confirmationNumber',true);
    this.setValue('rangeType','06');
    this.setValue('transactionCategoryId','1');
    this.setValue('transType','B');
    if(this.getValue('rangeType') != 10){
      this.setHidden('fromDate',true);
      this.setHidden('toDate',true);
    }
  }
  public onResetClick: BaseFpxControlEventHandler = (payload: any) => {
    this.reset('fromDate');
    this.reset('toDate');
    this.reset('rangeType');
    this.reset('transType');
    this.reset('transactionCategoryId');
    this.reset('filterSearch');
    this.reset('transactionDescription');
    this.reset('transactionAmount');
    this.reset('chequeNumber');
    this.reset('confirmationNumber');
    this.reset('downloadFileFormat');
    this.setHidden('transactionDescription',true);
    this.setHidden('transactionAmount',true);
    this.setHidden('chequeNumber',true);
    this.setHidden('confirmationNumber',true);
    this.setValue('rangeType','06');
    this.setValue('transactionCategoryId','1');
    this.setValue('transType','B');
    if(this.getValue('rangeType') != 10){
      this.setHidden('fromDate',true);
      this.setHidden('toDate',true);
    }

    // this.handleFormOnLoad();
  }

  public onDownloadClick: BaseFpxControlEventHandler = (payload: any) => {

    const criteriaQuery = new CriteriaQuery();
    let accountNumber = this._activeSpaceInfoService.getAccountNumber();
    criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', { searchText: accountNumber });
    if ((this.state.startDate != "") && (this.state.endDate != "") &&(this.getValue('rangeType')!='10')) {
      this.setValue('fromDate', this.state.startDate);
      this.setValue('toDate', this.state.endDate);
      criteriaQuery.addFilterCritertia('transactionDate', 'Date', 'inRange', { dateFrom: this.state.startDate, dateTo: this.state.endDate });
    }
    else {
      criteriaQuery.addFilterCritertia('transactionDate', 'Date', 'inRange', { dateFrom: this.getValue('fromDate'), dateTo: this.state.endDate });
    }
    let filterSearch=this.getValue('filterSearch');
    if(filterSearch=='1'){
      criteriaQuery.addFilterCritertia('transactionDescription', 'String', 'contains', { searchText: this.getValue('transactionDescription') });
    }
    else if(filterSearch=='2'){
      criteriaQuery.addFilterCritertia('transactionAmount', 'String', 'equals', { searchText: this.getValue('transactionAmount') });
    }
    else if(filterSearch=='3'){
      criteriaQuery.addFilterCritertia('chequeNumber', 'String', 'equals', { searchText: this.getValue('chequeNumber') });
    }
    else if(filterSearch=='4'){
      criteriaQuery.addFilterCritertia('confirmationNumber', 'String', 'equals', { searchText: this.getValue('confirmationNumber') });
    }
    let transactionCategoryId=this.getValue('transactionCategoryId');
    if(transactionCategoryId == "1"){
      criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', { searchText: accountNumber });
      }
      else if(transactionCategoryId=="2"){
  
        criteriaQuery.addFilterCritertia('debitCreditFlag', 'String', 'equals', { searchText: 'C' });
      }
      else if(transactionCategoryId=="3"){
        criteriaQuery.addFilterCritertia('debitCreditFlag', 'String', 'equals', { searchText: 'D' });
      }
      else if(transactionCategoryId=="4"){
        criteriaQuery.addFilterCritertia('transactionCategoryId', 'String', 'equals', { searchText: transactionCategoryId });
      }
      else if(transactionCategoryId=="5"){
        criteriaQuery.addFilterCritertia('transactionCategoryId', 'String', 'equals', { searchText: transactionCategoryId });
      }

    let downloadFileFormat=this.getValue('downloadFileFormat');
    if(downloadFileFormat=='3'){
      criteriaQuery.addSortCriteria('transactionReference', 'asc', 'String');
      // criteriaQuery.addSortCriteria('transactionDate', 'asc', 'String');
    }
    else{
      criteriaQuery.addSortCriteria('transactionReference', 'desc', 'String');
      // criteriaQuery.addSortCriteria('transactionDate', 'desc', 'String');

    }
    this.setGridCriteria('casatransactiondetailsGrid', criteriaQuery);
    let formValues = {
      ...this.formGroup.value,
      fromDate: this.state.startDate,
      toDate: this.state.endDate,
      filterSearch:this.formGroup.value.filterSearch,
      transactionDescription:this.formGroup.value.transactionDescription,
      transactionAmount:this.formGroup.value.transactionAmount,
      chequeNumber:this.formGroup.value.chequeNumber,
      confirmationNumber:this.formGroup.value.confirmationNumber,
      accountNumber: this._activeSpaceInfoService.getAccountNumber()
    }
    this.showSpinner();
    criteriaQuery.setPaginator('CLIENT');
    if (this.getValue('downloadFileFormat') == 1) {
      this.commonService.downloadStatement(criteriaQuery).subscribe({
        next: (response: any) => {
          if (this.deviceDetectorService.isHybrid()) {
            this.hideSpinner();
            this._fileOpener.openPDF(
              response,
              "application/pdf",
              "AccountsDetails.pdf"
            );
          } else {
            this.hideSpinner();
            let documentURL = URL.createObjectURL(
              new Blob([response.body], { type: "application/pdf" })
            );
            const downloadLink = document.createElement("a");
            downloadLink.href = documentURL;
            const fileName = "Statement.pdf";
            downloadLink.download = fileName;
            // downloadLink.click();
          }
        },
        error: (error) => {
          this.hideSpinner();
          let errMsg :any;
          let titleMsg:any;
          if (error.status == 500) {
            titleMsg = this._translate.instant('retailcasatrandtlsfilterform.dataErr');
            errMsg = this._translate.instant('retailcasatrandtlsfilterform.dataErrMsg')
          }
          const fpxModal = new FpxModal();
          // fpxModal.setComponent(DepAlertComponent);
          // fpxModal.setDisableClose(false);
          fpxModal.setPanelClass('dep-alert-popup');
          // fpxModal.setBackDropClass('etransfer-send-limits');
          fpxModal.setComponent(DepConfirmationComponent);
          fpxModal.setPanelClass('dep-alert-popup');
          fpxModal.setBackDropClass(['dep-popup-back-drop', 'dep-confirmation-backdrop-2', 'logout-backdrop', 'bottom-transparent-overlay']);
          fpxModal.setDisableClose(true);
          fpxModal.setAfterClosed(this.MenuClose);
          fpxModal.setData({
            title: titleMsg,
            message: errMsg,
            confirmationIcon: 'alert',
            okBtnLbl: 'viewCasaTransactionForm.okBtnLbl',
            cancelBtnLbl: 'viewCasaTransactionForm.cancelBtnLbl'
          });
          this.openModal(fpxModal);
        }
      });
    }
    else if (this.getValue('downloadFileFormat') == 2) {
      this.commonService.downloadAccountStatement(criteriaQuery).subscribe({
        next: (response: any) => {
          if (this.deviceDetectorService.isHybrid()) {
            this.hideSpinner();
            this._fileOpener.openPDF(
              response,
              "application/octet-stream",
              "AccountsDetails.csv"
            );
          } else {
            this.hideSpinner();
            let documentURL = URL.createObjectURL(
              new Blob([response.body], { type: "application/octet-stream" })
            );
            const downloadLink = document.createElement("a");
            downloadLink.href = documentURL;
            const fileName = "AccountDetails.csv";
            downloadLink.download = fileName;
            // downloadLink.click();
          }
        },
        error: (error) => {
          this.hideSpinner();
          let errMsg :any;
          let titleMsg:any;
          if (error.status == 500) {
            titleMsg = this._translate.instant('retailcasatrandtlsfilterform.dataErr');
            errMsg = this._translate.instant('retailcasatrandtlsfilterform.dataErrMsg')
          }
          const fpxModal = new FpxModal();
          // fpxModal.setPanelClass('dep-alert-popup');
          // fpxModal.setBackDropClass('etransfer-send-limits');
          fpxModal.setComponent(DepConfirmationComponent);
          fpxModal.setPanelClass('dep-alert-popup');
          fpxModal.setBackDropClass(['dep-popup-back-drop', 'dep-confirmation-backdrop-2', 'logout-backdrop', 'bottom-transparent-overlay']);
          fpxModal.setDisableClose(true);
          fpxModal.setAfterClosed(this.MenuClose);
          fpxModal.setData({
            title: titleMsg,
            message: errMsg,
            confirmationIcon: 'alert',
            okBtnLbl: 'viewCasaTransactionForm.okBtnLbl',
            cancelBtnLbl: 'viewCasaTransactionForm.cancelBtnLbl'
          });
          this.openModal(fpxModal);
        }
      });
    }
    else if (this.getValue('downloadFileFormat') == 3) {
      this.commonService.downloadAccountStatementOTN(criteriaQuery).subscribe({
        next: (response: any) => {
          if (this.deviceDetectorService.isHybrid()) {
            this.hideSpinner();
            this._fileOpener.openPDF(
              response,
              "application/octet-stream",
              "AccountsDetails.csv"
            );
          } else {
            this.hideSpinner();
            let documentURL = URL.createObjectURL(
              new Blob([response.body], { type: "application/octet-stream" })
            );
            const downloadLink = document.createElement("a");
            downloadLink.href = documentURL;
            const fileName = "AccountDetails.csv";
            downloadLink.download = fileName;
            // downloadLink.click();
          }
        },
        error: (error) => {
          this.hideSpinner();
          let errMsg :any;
          let titleMsg:any;
          if (error.status == 500) {
            titleMsg = this._translate.instant('retailcasatrandtlsfilterform.dataErr');
            errMsg = this._translate.instant('retailcasatrandtlsfilterform.dataErrMsg')
          }
          const fpxModal = new FpxModal();
          fpxModal.setPanelClass('dep-alert-popup');
          // fpxModal.setBackDropClass('etransfer-send-limits');
          fpxModal.setComponent(DepConfirmationComponent);
          fpxModal.setPanelClass('dep-alert-popup');
          fpxModal.setBackDropClass(['dep-popup-back-drop', 'dep-confirmation-backdrop-2', 'logout-backdrop', 'bottom-transparent-overlay']);
          fpxModal.setDisableClose(true);
          fpxModal.setAfterClosed(this.MenuClose);
          fpxModal.setData({
            title: titleMsg,
            message: errMsg,
            confirmationIcon: 'alert',
            okBtnLbl: 'viewCasaTransactionForm.okBtnLbl',
            cancelBtnLbl: 'viewCasaTransactionForm.cancelBtnLbl'
          });
          this.openModal(fpxModal);
        }
      });
    }
    else if (this.getValue('downloadFileFormat') == 4) {
      this.commonService.downloadQFXAccountStatement(criteriaQuery).subscribe({
        next: (response: any) => {
          if (this.deviceDetectorService.isHybrid()) {
            this.hideSpinner();
            this._fileOpener.openPDF(
              response,
              "application/qfx",
              "AccountsDetails.qfx"
            );
          } else {
            this.hideSpinner();
            let documentURL = URL.createObjectURL(
              new Blob([response.body], { type: "application/qfx" })
            );
            const downloadLink = document.createElement("a");
            downloadLink.href = documentURL;
            const fileName = "AccountDetails.qfx";
            downloadLink.download = fileName;
            // downloadLink.click();
          }
        },
        error: (error) => {
          this.hideSpinner();
          let errMsg :any;
          let titleMsg:any;
          if (error.status == 500) {
            titleMsg = this._translate.instant('retailcasatrandtlsfilterform.dataErr');
            errMsg = this._translate.instant('retailcasatrandtlsfilterform.dataErrMsg')
          }
          const fpxModal = new FpxModal();
          fpxModal.setPanelClass('dep-alert-popup');
          // fpxModal.setBackDropClass('etransfer-send-limits');
          fpxModal.setComponent(DepConfirmationComponent);
          fpxModal.setPanelClass('dep-alert-popup');
          fpxModal.setBackDropClass(['dep-popup-back-drop', 'dep-confirmation-backdrop-2', 'logout-backdrop', 'bottom-transparent-overlay']);
          fpxModal.setDisableClose(true);
          fpxModal.setAfterClosed(this.MenuClose);
          fpxModal.setData({
            title: titleMsg,
            message: errMsg,
            confirmationIcon: 'alert',
            okBtnLbl: 'viewCasaTransactionForm.okBtnLbl',
            cancelBtnLbl: 'viewCasaTransactionForm.cancelBtnLbl'
          });
          this.openModal(fpxModal);
        }
      });
    }
    else if (this.getValue('downloadFileFormat') == 5) {
      this.commonService.downloadOFXAccountStatement(criteriaQuery).subscribe({
        next: (response: any) => {
          if (this.deviceDetectorService.isHybrid()) {
            this.hideSpinner();
            this._fileOpener.openPDF(
              response,
              "application/ofx",
              "AccountsDetails.ofx"
            );
          } else {
            this.hideSpinner();
            let documentURL = URL.createObjectURL(
              new Blob([response.body], { type: "application/ofx" })
            );
            const downloadLink = document.createElement("a");
            downloadLink.href = documentURL;
            const fileName = "AccountDetails.ofx";
            downloadLink.download = fileName;
            // downloadLink.click();
          }
        },
        error: (error) => {
          this.hideSpinner();
          let errMsg :any;
          let titleMsg:any;
          if (error.status == 500) {
            titleMsg = this._translate.instant('retailcasatrandtlsfilterform.dataErr');
            errMsg = this._translate.instant('retailcasatrandtlsfilterform.dataErrMsg')
          }
          const fpxModal = new FpxModal();
          fpxModal.setPanelClass('dep-alert-popup');
          // fpxModal.setBackDropClass('etransfer-send-limits');
          fpxModal.setComponent(DepConfirmationComponent);
          fpxModal.setPanelClass('dep-alert-popup');
          fpxModal.setBackDropClass(['dep-popup-back-drop', 'dep-confirmation-backdrop-2', 'logout-backdrop', 'bottom-transparent-overlay']);
          fpxModal.setDisableClose(true);
          fpxModal.setAfterClosed(this.MenuClose);
          fpxModal.setData({
            title: titleMsg,
            message: errMsg,
            confirmationIcon: 'alert',
            okBtnLbl: 'viewCasaTransactionForm.okBtnLbl',
            cancelBtnLbl: 'viewCasaTransactionForm.cancelBtnLbl'
          });
          this.openModal(fpxModal);
        }
      });
    }
    else if (this.getValue('downloadFileFormat') == 6) {
      this.commonService.downloadOFXAccountStatement(criteriaQuery).subscribe({
        next: (response: any) => {
          if (this.deviceDetectorService.isHybrid()) {
            this.hideSpinner();
            this._fileOpener.openPDF(
              response,
              "application/ofx",
              "AccountsDetails.ofx"
            );
          } else {
            this.hideSpinner();
            let documentURL = URL.createObjectURL(
              new Blob([response.body], { type: "application/ofx" })
            );
            const downloadLink = document.createElement("a");
            downloadLink.href = documentURL;
            const fileName = "AccountDetails.ofx";
            downloadLink.download = fileName;
            // downloadLink.click();
          }
        },
        error: (error) => {
          this.hideSpinner();
          let errMsg :any;
          let titleMsg:any;
          if (error.status == 500) {
            titleMsg = this._translate.instant('retailcasatrandtlsfilterform.dataErr');
            errMsg = this._translate.instant('retailcasatrandtlsfilterform.dataErrMsg')
          }
          const fpxModal = new FpxModal();
          fpxModal.setPanelClass('dep-alert-popup');
          // fpxModal.setBackDropClass('etransfer-send-limits');
          fpxModal.setComponent(DepConfirmationComponent);
          fpxModal.setPanelClass('dep-alert-popup');
          fpxModal.setBackDropClass(['dep-popup-back-drop', 'dep-confirmation-backdrop-2', 'logout-backdrop', 'bottom-transparent-overlay']);
          fpxModal.setDisableClose(true);
          fpxModal.setAfterClosed(this.MenuClose);
          fpxModal.setData({
            title: titleMsg,
            message: errMsg,
            confirmationIcon: 'alert',
            okBtnLbl: 'viewCasaTransactionForm.okBtnLbl',
            cancelBtnLbl: 'viewCasaTransactionForm.cancelBtnLbl'
          });
          this.openModal(fpxModal);
        }
      });
    }
    else if (this.getValue('downloadFileFormat') == 7) {
      this.commonService.downloadQBOAccountStatement(criteriaQuery).subscribe({
        next: (response: any) => {
          if (this.deviceDetectorService.isHybrid()) {
            this.hideSpinner();
            this._fileOpener.openPDF(
              response,
              "application/qbo",
              "AccountsDetails.qbo"
            );
          } else {
            this.hideSpinner();
            let documentURL = URL.createObjectURL(
              new Blob([response.body], { type: "application/qbo" })
            );
            const downloadLink = document.createElement("a");
            downloadLink.href = documentURL;
            const fileName = "AccountDetails.qbo";
            downloadLink.download = fileName;
            // downloadLink.click();
          }
        },
        error: (error) => {
          this.hideSpinner();
          let errMsg :any;
          let titleMsg:any;
          if (error.status == 500) {
            titleMsg = this._translate.instant('retailcasatrandtlsfilterform.dataErr');
            errMsg = this._translate.instant('retailcasatrandtlsfilterform.dataErrMsg')
          }
          const fpxModal = new FpxModal();
          // fpxModal.setComponent(DepAlertComponent);
          fpxModal.setPanelClass('dep-alert-popup');
          // fpxModal.setBackDropClass('etransfer-send-limits');
          fpxModal.setComponent(DepConfirmationComponent);
          fpxModal.setPanelClass('dep-alert-popup');
          fpxModal.setBackDropClass(['dep-popup-back-drop', 'dep-confirmation-backdrop-2', 'logout-backdrop', 'bottom-transparent-overlay']);
          fpxModal.setDisableClose(true);
          fpxModal.setAfterClosed(this.MenuClose);
          fpxModal.setData({
            title: titleMsg,
            message: errMsg,
            confirmationIcon: 'alert',
            okBtnLbl: 'viewCasaTransactionForm.okBtnLbl',
            cancelBtnLbl: 'viewCasaTransactionForm.cancelBtnLbl'
          });
          this.openModal(fpxModal);
        }
      });
    }
    else if (this.getValue('downloadFileFormat') == 8) {
      this.commonService.downloadQFXAccountStatement(criteriaQuery).subscribe({
        next: (response: any) => {
          if (this.deviceDetectorService.isHybrid()) {
            this.hideSpinner();
            this._fileOpener.openPDF(
              response,
              "application/qfx",
              "AccountsDetails.qfx"
            );
          } else {
            this.hideSpinner();
            let documentURL = URL.createObjectURL(
              new Blob([response.body], { type: "application/qfx" })
            );
            const downloadLink = document.createElement("a");
            downloadLink.href = documentURL;
            const fileName = "AccountDetails.qfx";
            downloadLink.download = fileName;
            // downloadLink.click();
          }
        },
        error: (error) => {
          this.hideSpinner();
          let errMsg :any;
          let titleMsg:any;
          if (error.status == 500) {
            titleMsg = this._translate.instant('retailcasatrandtlsfilterform.dataErr');
            errMsg = this._translate.instant('retailcasatrandtlsfilterform.dataErrMsg')
          }
          const fpxModal = new FpxModal();
          fpxModal.setPanelClass('dep-alert-popup');
          // fpxModal.setBackDropClass('etransfer-send-limits');
          fpxModal.setComponent(DepConfirmationComponent);
          fpxModal.setPanelClass('dep-alert-popup');
          fpxModal.setBackDropClass(['dep-popup-back-drop', 'dep-confirmation-backdrop-2', 'logout-backdrop', 'bottom-transparent-overlay']);
          fpxModal.setDisableClose(true);
          fpxModal.setAfterClosed(this.MenuClose);
          fpxModal.setData({
            title: titleMsg,
            message: errMsg,
            confirmationIcon: 'alert',
            okBtnLbl: 'viewCasaTransactionForm.okBtnLbl',
            cancelBtnLbl: 'viewCasaTransactionForm.cancelBtnLbl'
          });
          this.openModal(fpxModal);
        }
      });
    }
    this._dialogRef.close(formValues);
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.retailcasatrandtlsfilterform,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }
  MenuClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    setTimeout(() => {
        if (this.device.isMobile()) {
            this._router.navigate(['/home']);
        }
        else {
            if (this._appConfig.hasData('moduleRefresh$')) {
                this._appConfig.getData('moduleRefresh$').subject.next({ action: 'ACCOUNTSQUICKACTION', data: { serviceCode: null } });
            }
            this._router.navigate(['accounts-space/accounts']);
        }
    });
}
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


