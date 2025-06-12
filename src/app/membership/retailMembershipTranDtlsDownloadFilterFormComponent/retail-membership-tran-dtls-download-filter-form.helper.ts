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
  CriteriaQuery,
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { RetailmembershiptrandtlsdownloadfilterformService } from "../retailmembershiptrandtlsdownloadfilterform-service/retailmembershiptrandtlsdownloadfilterform.service";
import { Retailmembershiptrandtlsdownloadfilterform } from "../retailmembershiptrandtlsdownloadfilterform-service/retailmembershiptrandtlsdownloadfilterform.model";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DeviceDetectorService, ActiveSpaceInfoService } from "@dep/core";
import { FileOpenerService } from "@dep/native";
import { AppConfigService } from "@dep/services";
import { TranslateService } from "@ngx-translate/core";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { formatDate } from "@angular/common";
import moment from "moment";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
export class retailmembershiptrandtlsdownloadfilterformState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  fromDate: any = {
    minDate: new Date("01-07-2023"),
    maxDate: new Date("31-07-2023"),
  }
  toDate: any = {
    minDate: new Date("01-07-2023"),
    maxDate: new Date("31-07-2023"),
  }
  LogDate = new Date()
  startDate: any
  startDate1: any
  endDate: any
  transType: any
}


@Injectable()
export class retailmembershiptrandtlsdownloadfilterformHelper extends BaseFpxFormHelper<retailmembershiptrandtlsdownloadfilterformState> {

  constructor(private retailmembershiptrandtlsdownloadfilterformService: RetailmembershiptrandtlsdownloadfilterformService, 
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
    super(new retailmembershiptrandtlsdownloadfilterformState());
  }

  override doPreInit(): void {
    this.hideShellActions();
    this.setServiceCode("RETAILMEMBERSHIPTRANSACTION");
    this.addValueChangeHandler("rangeType", this.handleRangeTypeOnvalueChange);
    this.addValueChangeHandler("fromDate", this.handleFromDateOnvalueChange);
    this.addValueChangeHandler("toDate", this.handleToDateOnvalueChange);
  }


  public override doPostInit(): void {
    this.handleFormOnLoad();
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE


    this.setValue('rangeType', this._dialogData?.rangeType == undefined ? '6' : this._dialogData.rangeType);

    this.setValue('downloadFileFormat', this._dialogData?.downloadFileFormat == undefined ? '' : this._dialogData.downloadFileFormat)
    if (this._dialogData.rangeType != '10') {
      this.setHidden('fromDate', true);
      this.setHidden('toDate', true);
    }
    if (this._dialogData.fromDate && this._dialogData.toDate && this._dialogData.rangeType == '10') {
      this.setValue('fromDate', this._dialogData?.fromDate);
      this.setValue('toDate', this._dialogData?.toDate);
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


  public override preSubmitInterceptor(payload: Retailmembershiptrandtlsdownloadfilterform): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: Retailmembershiptrandtlsdownloadfilterform) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  public onDownloadClick: BaseFpxControlEventHandler = (payload: any) => {

    const criteriaQuery = new CriteriaQuery();
    let loanAccountNumber = this._activeSpaceInfoService.getAccountNumber();
    criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', { searchText: loanAccountNumber });
    if ((this.state.startDate != "") && (this.state.endDate != "")) {
      this.setValue('fromDate', this.state.startDate);
      this.setValue('toDate', this.state.endDate);
      criteriaQuery.addFilterCritertia('transactionDate', 'Date', 'inRange', { dateFrom: this.state.startDate, dateTo: this.state.endDate });
    }
    else {
      criteriaQuery.addFilterCritertia('transactionDate', 'Date', 'inRange', { dateFrom: this.getValue('fromDate'), dateTo: this.state.endDate });
    }

    let downloadFileFormat=this.getValue('downloadFileFormat');
    if(downloadFileFormat=='3'){
      criteriaQuery.addSortCriteria('transactionReference', 'asc', 'String');
      criteriaQuery.addSortCriteria('transactionDate', 'asc', 'String');
    }
    else{
      criteriaQuery.addSortCriteria('transactionReference', 'desc', 'String');
      criteriaQuery.addSortCriteria('transactionDate', 'desc', 'String');
    }
    this.setGridCriteria('loantransactiondetailsGrid', criteriaQuery);
    let formValues = {
      ...this.formGroup.value,
      fromDate: this.state.startDate,
      toDate: this.state.endDate,
      accountNumber: this.getRoutingParam('accountNumber')
    }
    this.showSpinner();
    criteriaQuery.setPaginator('CLIENT');
    if (this.getValue('downloadFileFormat') == 1) {
      this.commonService.downloadMemberShipStatement(criteriaQuery).subscribe({
        next: (response: any) => {
          if (this.deviceDetectorService.isHybrid()) {
            this.hideSpinner();
            this._fileOpener.openPDF(
              response,
              "application/pdf",
              "MembershipDetails.pdf"
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
            titleMsg = this._translate.instant('DEFAULT.dataErr');
            errMsg = this._translate.instant('DEFAULT.dataErrMsg')
          }
          const fpxModal = new FpxModal();
          fpxModal.setComponent(DepAlertComponent);
          fpxModal.setDisableClose(false);
          fpxModal.setPanelClass('dep-alert-popup');
          fpxModal.setBackDropClass('dep-popup-back-drop');
          fpxModal.setData({
            title: titleMsg,
            message: errMsg
          });
          fpxModal.setAfterClosed(this.MenuClose);
          this.openModal(fpxModal);
        }
      });   
    }
    else if (this.getValue('downloadFileFormat') == 2) {
      this.commonService.downloadMemberShipAccountStatement(criteriaQuery).subscribe({
        next: (response: any) => {
          if (this.deviceDetectorService.isHybrid()) {
            this.hideSpinner();
            this._fileOpener.openPDF(
              response,
              "application/octet-stream",
              "MembershipDetails.xls"
            );
          } else {
            this.hideSpinner();
            let documentURL = URL.createObjectURL(
              new Blob([response.body], { type: "application/octet-stream" })
            );
            const downloadLink = document.createElement("a");
            downloadLink.href = documentURL;
            const fileName = "MembershipDetails.xls";
            downloadLink.download = fileName;
            // downloadLink.click();
          }
        },
        error: (error) => {
          this.hideSpinner();
          let errMsg :any;
          let titleMsg:any;
          if (error.status == 500) {
            titleMsg = this._translate.instant('DEFAULT.dataErr');
            errMsg = this._translate.instant('DEFAULT.dataErrMsg')
          }
          const fpxModal = new FpxModal();
          fpxModal.setComponent(DepAlertComponent);
          fpxModal.setDisableClose(false);
          fpxModal.setPanelClass('dep-alert-popup');
          fpxModal.setBackDropClass('dep-popup-back-drop');
          fpxModal.setData({
            title: titleMsg,
            message: errMsg
          });
          fpxModal.setAfterClosed(this.MenuClose);
          this.openModal(fpxModal);
        }
      });
    }
    else if (this.getValue('downloadFileFormat') == 3) {
      this.commonService.downloadMemberShipAccountStatementOTN(criteriaQuery).subscribe({
        next: (response: any) => {
          if (this.deviceDetectorService.isHybrid()) {
            this.hideSpinner();
            this._fileOpener.openPDF(
              response,
              "application/octet-stream",
              "MembershipDetails.csv"
            );
          } else {
            this.hideSpinner();
            let documentURL = URL.createObjectURL(
              new Blob([response.body], { type: "application/octet-stream" })
            );
            const downloadLink = document.createElement("a");
            downloadLink.href = documentURL;
            const fileName = "MembershipDetails.csv";
            downloadLink.download = fileName;
            // downloadLink.click();
          }
        },
        error: (error) => {
          this.hideSpinner();
          let errMsg :any;
          let titleMsg:any;
          if (error.status == 500) {
            titleMsg = this._translate.instant('DEFAULT.dataErr');
            errMsg = this._translate.instant('DEFAULT.dataErrMsg')
          }
          const fpxModal = new FpxModal();
          fpxModal.setComponent(DepAlertComponent);
          fpxModal.setDisableClose(false);
          fpxModal.setPanelClass('dep-alert-popup');
          fpxModal.setBackDropClass('dep-popup-back-drop');
          fpxModal.setData({
            title: titleMsg,
            message: errMsg
          });
          fpxModal.setAfterClosed(this.MenuClose);
          this.openModal(fpxModal);
        }
      });
    }
    else if (this.getValue('downloadFileFormat') == 4) {
      this.commonService.downloadMemberShipQFXAccountStatement(criteriaQuery).subscribe({
        next: (response: any) => {
          if (this.deviceDetectorService.isHybrid()) {
            this.hideSpinner();
            this._fileOpener.openPDF(
              response,
              "application/qfx",
              "MembershipDetails.qfx"
            );
          } else {
            this.hideSpinner();
            let documentURL = URL.createObjectURL(
              new Blob([response.body], { type: "application/qfx" })
            );
            const downloadLink = document.createElement("a");
            downloadLink.href = documentURL;
            const fileName = "MembershipDetails.qfx";
            downloadLink.download = fileName;
            // downloadLink.click();
          }
        },
        error: (error) => {
          this.hideSpinner();
          let errMsg :any;
          let titleMsg:any;
          if (error.status == 500) {
            titleMsg = this._translate.instant('DEFAULT.dataErr');
            errMsg = this._translate.instant('DEFAULT.dataErrMsg')
          }
          const fpxModal = new FpxModal();
          fpxModal.setComponent(DepAlertComponent);
          fpxModal.setDisableClose(false);
          fpxModal.setPanelClass('dep-alert-popup');
          fpxModal.setBackDropClass('dep-popup-back-drop');
          fpxModal.setData({
            title: titleMsg,
            message: errMsg
          });
          fpxModal.setAfterClosed(this.MenuClose);
          this.openModal(fpxModal);
        }
      });   
    }
    else if (this.getValue('downloadFileFormat') == 5) {
      this.commonService.downloadOFXMemberShipLoanAccountStatement(criteriaQuery).subscribe({
        next: (response: any) => {
          if (this.deviceDetectorService.isHybrid()) {
            this.hideSpinner();
            this._fileOpener.openPDF(
              response,
              "application/ofx",
              "MembershipDetails.ofx"
            );
          } else {
            this.hideSpinner();
            let documentURL = URL.createObjectURL(
              new Blob([response.body], { type: "application/ofx" })
            );
            const downloadLink = document.createElement("a");
            downloadLink.href = documentURL;
            const fileName = "MembershipDetails.ofx";
            downloadLink.download = fileName;
            // downloadLink.click();
          }
        },
        error: (error) => {
          this.hideSpinner();
          let errMsg :any;
          let titleMsg:any;
          if (error.status == 500) {
            titleMsg = this._translate.instant('DEFAULT.dataErr');
            errMsg = this._translate.instant('DEFAULT.dataErrMsg')
          }
          const fpxModal = new FpxModal();
          fpxModal.setComponent(DepAlertComponent);
          fpxModal.setDisableClose(false);
          fpxModal.setPanelClass('dep-alert-popup');
          fpxModal.setBackDropClass('dep-popup-back-drop');
          fpxModal.setData({
            title: titleMsg,
            message: errMsg
          });
          fpxModal.setAfterClosed(this.MenuClose);
          this.openModal(fpxModal);
        }
      });
    }
    else if (this.getValue('downloadFileFormat') == 6) {
      this.commonService.downloadOFXMemberShipLoanAccountStatement(criteriaQuery).subscribe({
        next: (response: any) => {
          if (this.deviceDetectorService.isHybrid()) {
            this.hideSpinner();
            this._fileOpener.openPDF(
              response,
              "application/ofx",
              "MembershipDetails.ofx"
            );
          } else {
            this.hideSpinner();
            let documentURL = URL.createObjectURL(
              new Blob([response.body], { type: "application/ofx" })
            );
            const downloadLink = document.createElement("a");
            downloadLink.href = documentURL;
            const fileName = "MembershipDetails.ofx";
            downloadLink.download = fileName;
            // downloadLink.click();
          }
        },
        error: (error) => {
          this.hideSpinner();
          let errMsg :any;
          let titleMsg:any;
          if (error.status == 500) {
            titleMsg = this._translate.instant('DEFAULT.dataErr');
            errMsg = this._translate.instant('DEFAULT.dataErrMsg')
          }
          const fpxModal = new FpxModal();
          fpxModal.setComponent(DepAlertComponent);
          fpxModal.setDisableClose(false);
          fpxModal.setPanelClass('dep-alert-popup');
          fpxModal.setBackDropClass('dep-popup-back-drop');
          fpxModal.setData({
            title: titleMsg,
            message: errMsg
          });
          fpxModal.setAfterClosed(this.MenuClose);
          this.openModal(fpxModal);
        }
      });
    }
    else if (this.getValue('downloadFileFormat') == 7) {
      this.commonService.downloadQBOMemberShipAccountStatement(criteriaQuery).subscribe({
        next: (response: any) => {
          if (this.deviceDetectorService.isHybrid()) {
            this.hideSpinner();
            this._fileOpener.openPDF(
              response,
              "application/qbo",
              "MembershipDetails.qbo"
            );
          } else {
            this.hideSpinner();
            let documentURL = URL.createObjectURL(
              new Blob([response.body], { type: "application/qbo" })
            );
            const downloadLink = document.createElement("a");
            downloadLink.href = documentURL;
            const fileName = "MembershipDetails.qbo";
            downloadLink.download = fileName;
            // downloadLink.click();
          }
        },
        error: (error) => {
          this.hideSpinner();
          let errMsg :any;
          let titleMsg:any;
          if (error.status == 500) {
            titleMsg = this._translate.instant('DEFAULT.dataErr');
            errMsg = this._translate.instant('DEFAULT.dataErrMsg')
          }
          const fpxModal = new FpxModal();
          fpxModal.setComponent(DepAlertComponent);
          fpxModal.setDisableClose(false);
          fpxModal.setPanelClass('dep-alert-popup');
          fpxModal.setBackDropClass('dep-popup-back-drop');
          fpxModal.setData({
            title: titleMsg,
            message: errMsg
          });
          fpxModal.setAfterClosed(this.MenuClose);
          this.openModal(fpxModal);
        }
      });
    }
    else if (this.getValue('downloadFileFormat') == 8) {
      this.commonService.downloadMemberShipQFXAccountStatement(criteriaQuery).subscribe({
        next: (response: any) => {
          if (this.deviceDetectorService.isHybrid()) {
            this.hideSpinner();
            this._fileOpener.openPDF(
              response,
              "application/qfx",
              "MembershipDetails.qfx"
            );
          } else {
            this.hideSpinner();
            let documentURL = URL.createObjectURL(
              new Blob([response.body], { type: "application/qfx" })
            );
            const downloadLink = document.createElement("a");
            downloadLink.href = documentURL;
            const fileName = "MembershipDetails.qfx";
            downloadLink.download = fileName;
            // downloadLink.click();
          }
        },
        error: (error) => {
          this.hideSpinner();
          let errMsg :any;
          let titleMsg:any;
          if (error.status == 500) {
            titleMsg = this._translate.instant('DEFAULT.dataErr');
            errMsg = this._translate.instant('DEFAULT.dataErrMsg')
          }
          const fpxModal = new FpxModal();
          fpxModal.setComponent(DepAlertComponent);
          fpxModal.setDisableClose(false);
          fpxModal.setPanelClass('dep-alert-popup');
          fpxModal.setBackDropClass('dep-popup-back-drop');
          fpxModal.setData({
            title: titleMsg,
            message: errMsg
          });
          fpxModal.setAfterClosed(this.MenuClose);
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
        transRef: response.success?.body?.retailmembershiptrandtlsdownloadfilterform,
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


  close() {
    this._dialogRef.close(0);
  }

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


