import { Injectable } from "@angular/core";
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
import { Loans } from '../loans-service/loans.model';
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { MatDialogRef } from "@angular/material/dialog";
import { DeviceDetectorService } from "src/app/dep/core/class/device-detector.service";
import { FileOpenerService } from "@dep/native";
import moment from "moment";
import { ActiveSpaceInfoService } from "@dep/core";
export class RetailViewLoanRepaymentDetailsFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	maturityDate:any={
	   minDate:"",
       maxDate:"",
     }
	loanCalculationDate:any={
	   minDate:"",
       maxDate:"",
     }
     details:any;
     fields: string[] = [
      "loanAccountNumber",
      "productDesc",
      "loanAmount",
      "interestRate",
      "tenure",
      "repaymentFreqencyDesc",
      "maturityDate",
      "loanCalculationDate"
    ];
  fieldsFormat: string[] =
      ["text",
          "text",
          "amount",
          "precentage",
          "string",
          "text",
          "date",
          "date"
        ];
  gridData: any = [];
  years: any = [];
  currentYear: any;
  yearCount: any;
  currentYearData: any;
}


@Injectable()
export class RetailViewLoanRepaymentDetailsFormHelper extends BaseFpxFormHelper<RetailViewLoanRepaymentDetailsFormState>{

   constructor( 
    private _httpProvider : HttpProviderService,
    private commonService:CommonService,
    private _router: Router,
    private _dialogRef: MatDialogRef<any>,
    private deviceDetectorService: DeviceDetectorService,
    private _fileOpener: FileOpenerService,
    private _device: DeviceDetectorService,
    private _activeSpaceInfoService: ActiveSpaceInfoService
  ) 
    {
        super(new RetailViewLoanRepaymentDetailsFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILLOANREPAYMENTSCHEDULE");

 }

override doPostInit(): void{
  this.handleFormOnLoad();
}
 public handleFormOnLoad() {
  // WRITE CODE HERE TO HANDLE
  // this.removeShellBtn('BACK')
  this.addShellButton('RetailViewLoanRepaymentDetailsForm.back', 'BACK', 'secondary', 'DISPLAY', 'button');
  this.setShellBtnMethod('BACK', this.backToRepaymentSchedule.bind(this));
  this.addShellButton('RetailViewLoanRepaymentDetailsForm.download', 'DOWNLOAD', 'primary', 'DISPLAY', 'button');
  this.setShellBtnMethod('DOWNLOAD', this.downloadRepaymentSchedule.bind(this));
}

downloadRepaymentSchedule(){
  console.log('qwerty');
  let loanAccountNumber = this._activeSpaceInfoService.getAccountNumber();
  this.showSpinner();
  this.commonService.downloadRepaymentScheduleReport(loanAccountNumber).subscribe({
    next: (response: any) => {
      this.hideSpinner();
      if (this._device.isHybrid()) {
        this._fileOpener.openPDF(
          response,
          "application/pdf",
          "RepaymentScheduleReport.pdf"
        );
      } else {
        let documentURL = URL.createObjectURL(
          new Blob([response.body], { type: "application/pdf" })
        );
        const downloadLink = document.createElement("a");
        downloadLink.href = documentURL;
        const fileName = "RepaymentScheduleReport.pdf";
        downloadLink.download = fileName;
        // downloadLink.click();
      }
    }
  });
  
}

backToRepaymentSchedule(){
  this._router.navigate(['accounts-space','display-shell','loans','retail-loan-details-schedule-form'])
}

onLoadRepaymentGrid($event:any){
  if($event.eventName == 'afterDataFetch'){
    this.state.gridData = $event.payload;
    this.state.years = [];
    this.state.gridData.forEach((element: any) => {
      if(!this.state.years.includes(moment(element.repaymentDate).year())) {
        this.state.years.push(moment(element.repaymentDate).year());
      }
    });
    this.state.years.sort();
    if(this.state.years.includes(moment().year())) {
      this.state.yearCount = this.state.years.indexOf(moment().year());
      this.state.currentYear = moment().year();
    }
    else {
      this.state.yearCount = this.state.years.length - 1;
      this.state.currentYear = this.state.years[this.state.yearCount]
    }
    setTimeout(() => {
      this.setCurrentYearData();
    });
  }
}

previous() {
  --this.state.yearCount;
  this.state.currentYear = this.state.years[this.state.yearCount];
  this.setCurrentYearData();
}

next() {
  ++this.state.yearCount;
  this.state.currentYear = this.state.years[this.state.yearCount];
  this.setCurrentYearData();
}

setCurrentYearData() {
  this.state.currentYearData = this.state.gridData.filter((element: any)=>{
    return moment(element.repaymentDate).year() == this.state.currentYear
  });
  this.setGridData('repaymentSchedule',this.state.currentYearData)
}

  public override preSubmitInterceptor(payload: Loans):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Loans){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.loans.loanAccountNumber,
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
 
 
