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
import { CompletedpymntsService } from '../completedpymnts-service/completedpymnts.service';
import { Completedpymnts } from '../completedpymnts-service/completedpymnts.model';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { formatDate } from "@angular/common";
import moment from "moment";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { DeviceDetectorService } from "@dep/core";
import { FileOpenerService } from "@dep/native";
import { TransferService } from "src/app/foundation/validator-service/transfers-service";
import { AppConfigService } from "@dep/services";
export class retailDownloadTransactionFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
 	showSuggestion : boolean = false;
	// fromDate:any={
	//    minDate:"",
  //      maxDate:"",
  //    }
	// toDate:any={
	//    minDate:"",
  //      maxDate:"",
  //    }
     formValues: any;
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
   endDate: any
   transType: any
   toDate: any = {
     minDate: new Date("01-07-2023"),
     maxDate: new Date("31-07-2023"),
   }
  

paymentAmount:any={
  min: 100,
    max: 10000,
    step: 100,
    currencyCode: this._appConfig.baseCurrency
}
startDate1: any
}


@Injectable()
export class retailDownloadTransactionFormHelper extends BaseFpxFormHelper<retailDownloadTransactionFormState>{

   constructor( 
    private _dialogRef: MatDialogRef<any>,
    private transferService:TransferService,
    private _fileOpener: FileOpenerService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private deviceDetectorService: DeviceDetectorService) 
    {
        super(new retailDownloadTransactionFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("completedpymnts");
 }
 
 public handleFormOnLoad(){
  // WRITE CODE HERE TO HANDLE
    this.setHidden('fromDate', true);
    this.setHidden('toDate', true);
 }

public handleTransactionPeriodOnvalueChange: BaseFpxChangeHandler = (
		name: string,
		status: FormControlStatus,
		value: any,
		formGroup: FormGroup
		) => {
		 // WRITE CODE HERE TO HANDLE 
		   //tool generated code based on Orchestration Instructions
       if(value == ""){
        this.setHidden('fromDate',true);
        this.setHidden('toDate',true);
        this.reset('fromDate');
        this.reset('toDate');
        this.reset('beneficiaryName');
        this.reset('paymentAmount');
        this.reset('purpose');
        this.reset('fileFormat');
        this.reset('transferType');
       }
       else if (value == '1') {
        this.setHidden('fromDate', true);
        this.setHidden('toDate', true);
        this.reset('fromDate');
        this.reset('toDate');
        this.reset('transactionReference');
        this.reset('beneficiaryName');
        // this.setValue('transactionPeriod','1');
        this.reset('paymentAmount');
        this.reset('purpose');
        this.reset('transferType');
      }
      else if (value == "2") {
        //Current Month
        this.setHidden('fromDate', true);
        this.setHidden('toDate', true);
        this.reset('fromDate');
        this.reset('toDate');
        this.reset('transactionReference');
        this.reset('beneficiaryName');
        // this.setValue('transactionPeriod','1');
        this.reset('paymentAmount');
        this.reset('purpose');
        this.reset('transferType');
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
        this.reset('beneficiaryName');
        // this.setValue('transactionPeriod','1');
        this.reset('paymentAmount');
        this.reset('purpose');
        this.reset('transferType');
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
        this.reset('beneficiaryName');
        // this.setValue('transactionPeriod','1');
        this.reset('paymentAmount');
        this.reset('purpose');
        this.reset('transferType');
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
        this.reset('beneficiaryName');
        // this.setValue('transactionPeriod','1');
        this.reset('paymentAmount');
        this.reset('purpose');
        this.reset('transferType');
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
        this.reset('beneficiaryName');
        // this.setValue('transactionPeriod','1');
        this.reset('paymentAmount');
        this.reset('purpose');
        this.reset('transferType');
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
        this.reset('beneficiaryName');
        // this.setValue('transactionPeriod','1');
        this.reset('paymentAmount');
        this.reset('purpose');
        this.reset('transferType');
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
        this.reset('beneficiaryName');
        // this.setValue('transactionPeriod','1');
        this.reset('paymentAmount');
        this.reset('purpose');
        this.reset('transferType');
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
        this.reset('beneficiaryName');
        // this.setValue('transactionPeriod','1');
        this.reset('paymentAmount');
        this.reset('purpose');
        this.reset('transferType');
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
        this.reset('beneficiaryName');
        // this.setValue('transactionPeriod','1');
        this.reset('paymentAmount');
        this.reset('purpose');
        this.reset('transferType');
        let newDate = new Date();
        this.state.fromDate.minDate = moment(newDate).subtract(12, 'months');
        this.state.fromDate.maxDate = new Date();
        this.state.toDate.maxDate = new Date();
        this.state.toDate.minDate = this.state.fromDate.minDate;
      }
  
      }
public handleFromDateOnvalueChange: BaseFpxChangeHandler = (
		name: string,
		status: FormControlStatus,
		value: any,
		formGroup: FormGroup
		) => {
		 // WRITE CODE HERE TO HANDLE 
		   //tool generated code based on Orchestration Instructions
       
       if (value) {
        this.reset('toDate');
        this.state.toDate.minDate = value;
      }
}

  public override doPostInit(): void {
 this.addValueChangeHandler("transactionPeriod", this.handleTransactionPeriodOnvalueChange);
 this.addValueChangeHandler("fromDate", this.handleFromDateOnvalueChange);
 this.handleFormOnLoad();
  }
  
 
  public override preSubmitInterceptor(payload: Completedpymnts):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Completedpymnts){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

public onDownloadClick: BaseFpxControlEventHandler = (payload: any) => {
  // this.state.startDate = this.getValue('fromDate');
  // this.state.toDate = this.getValue('toDate');
  // this.state.endDate = this.getValue('toDate');
  // this.state.startDate = this.getValue('fromDate');
  // this.state.endDate = this.getValue('toDate');
 
  const criteriaQuery = new CriteriaQuery();
  let transactionReference = this.getValue('transactionReference');
  criteriaQuery.addFilterCritertia('transactionReference', 'String', 'equals', { searchText: transactionReference });
  criteriaQuery.addFilterCritertia('beneName', 'String', 'equals', { searchText: this.getValue('beneficiaryName') });

  criteriaQuery.addFilterCritertia('paymentAmount', 'Numeric', 'contains', { searchText: this.getValue('paymentAmount') });

  // criteriaQuery.addFilterCritertia('allPurpose', 'String', 'equals', { searchText: this.getValue('purpose')  });

  criteriaQuery.addFilterCritertia('transferType', 'String', 'contains', { searchText: this.getValue('transferType')  });

  if ((this.state.startDate) && (this.state.endDate)) {

    this.setValue('fromDate', this.state.startDate);
    this.setValue('toDate', this.state.endDate);
  criteriaQuery.addFilterCritertia('paymentDate', 'Date', 'inRange', { dateFrom: this.state.startDate, dateTo: this.state.endDate });
  
  }
  else{
    this.setValue('fromDate', this.getValue('fromDate'));
    this.setValue('toDate', this.getValue('toDate'));
    this.state.startDate = this.getValue('fromDate');
    this.state.endDate = this.getValue('toDate');
  criteriaQuery.addFilterCritertia('paymentDate', 'Date', 'inRange', { dateFrom: this.state.startDate, dateTo: this.state.endDate });
  }
  criteriaQuery.addSortCriteria('paymentDate', 'desc', 'String');
  // criteriaQuery.setPageCount(10000)
  this.setGridCriteria('transferHistoryGrid', criteriaQuery);
  let raw=this.formGroup.getRawValue();
  let formValues = {
    ...this.formGroup.value,
    fromDate:this.state.startDate,
    toDate: this.state.endDate
  }
  // criteriaQuery.setPaginator('CLIENT');
  if(this.getValue('transactionPeriod')=='1'){
    if (this.getValue('fileFormat') == 1) {
      this.transferService.downloadTransferHistory(criteriaQuery).subscribe({
        next: (response: any) => {
          if (this.deviceDetectorService.isHybrid()) {
            this._fileOpener.openPDF(
              response,
              "application/pdf",
              "PaymentHistory.pdf"
            );
          } else {
  
            let documentURL = URL.createObjectURL(
              new Blob([response.body], { type: "application/pdf" })
            );
            const downloadLink = document.createElement("a");
            downloadLink.href = documentURL;
            const fileName = "PaymentHistory.pdf";
            downloadLink.download = fileName;
            
          }
        }
      });
    }
    else if (this.getValue('fileFormat') == 2) {
      this.transferService.downloadTransferHistoryCSV(criteriaQuery).subscribe({
        next: (response: any) => {
          if (this.deviceDetectorService.isHybrid()) {
            this._fileOpener.openPDF(
              response,
              "application/octet-stream",
              "PaymentHistory.csv"
            );
          } else {
  
            let documentURL = URL.createObjectURL(
              new Blob([response.body], { type: "application/octet-stream" })
            );
            const downloadLink = document.createElement("a");
            downloadLink.href = documentURL;
            const fileName = "PaymentHistory.csv";
            downloadLink.download = fileName;
          }
        }
      });
    }
      else if (this.getValue('fileFormat') == 3) {
        this.transferService.downloadTransferHistoryExcel(criteriaQuery).subscribe({
          next: (response: any) => {
            if (this.deviceDetectorService.isHybrid()) {
              this._fileOpener.openPDF(
                response,
                "application/octet-stream",
                "PaymentHistory.xls"
              );
            } else {
    
              let documentURL = URL.createObjectURL(
                new Blob([response.body], { type: "application/octet-stream" })
              );
              const downloadLink = document.createElement("a");
              downloadLink.href = documentURL;
              const fileName = "PaymentHistory.xls";
              downloadLink.download = fileName;
            }
          }
        });
  
    }
  
  }

  else{
    criteriaQuery.setPaginator('CLIENT');
    if (this.getValue('fileFormat') == 1) {
      this.transferService.downloadTransferHistory(criteriaQuery).subscribe({
        next: (response: any) => {
          if (this.deviceDetectorService.isHybrid()) {
            this._fileOpener.openPDF(
              response,
              "application/pdf",
              "PaymentHistory.pdf"
            );
          } else {
  
            let documentURL = URL.createObjectURL(
              new Blob([response.body], { type: "application/pdf" })
            );
            const downloadLink = document.createElement("a");
            downloadLink.href = documentURL;
            const fileName = "PaymentHistory.pdf";
            downloadLink.download = fileName;
            
          }
        }
      });
    }
    else if (this.getValue('fileFormat') == 2) {
      this.transferService.downloadTransferHistoryCSV(criteriaQuery).subscribe({
        next: (response: any) => {
          if (this.deviceDetectorService.isHybrid()) {
            this._fileOpener.openPDF(
              response,
              "application/octet-stream",
              "PaymentHistory.csv"
            );
          } else {
  
            let documentURL = URL.createObjectURL(
              new Blob([response.body], { type: "application/octet-stream" })
            );
            const downloadLink = document.createElement("a");
            downloadLink.href = documentURL;
            const fileName = "PaymentHistory.csv";
            downloadLink.download = fileName;
          }
        }
      });
    }
      else if (this.getValue('fileFormat') == 3) {
        this.transferService.downloadTransferHistoryExcel(criteriaQuery).subscribe({
          next: (response: any) => {
            if (this.deviceDetectorService.isHybrid()) {
              this._fileOpener.openPDF(
                response,
                "application/octet-stream",
                "PaymentHistory.xls"
              );
            } else {
    
              let documentURL = URL.createObjectURL(
                new Blob([response.body], { type: "application/octet-stream" })
              );
              const downloadLink = document.createElement("a");
              downloadLink.href = documentURL;
              const fileName = "PaymentHistory.xls";
              downloadLink.download = fileName;
            }
          }
        });
  
    }
  }
  this._dialogRef.close(formValues);

}
  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.completedpymnts.flowInstanceId,
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
 
 
