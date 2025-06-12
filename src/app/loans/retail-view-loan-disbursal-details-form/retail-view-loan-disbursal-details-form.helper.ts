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
  FpxModal
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { LoansService } from '../loans-service/loans.service';
import { Loans } from '../loans-service/loans.model';
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { DeviceDetectorService } from "src/app/dep/core/class/device-detector.service";
import { FileOpenerService } from "src/app/dep/native/file-opener.service";
import { MatDialogRef } from "@angular/material/dialog";
import { ActiveSpaceInfoService } from "@dep/core";
export class RetailViewLoanDisbursalDetailsFormState extends BaseFpxComponentState {
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
}


@Injectable()
export class RetailViewLoanDisbursalDetailsFormHelper extends BaseFpxFormHelper<RetailViewLoanDisbursalDetailsFormState>{

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
        super(new RetailViewLoanDisbursalDetailsFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILLOANDISBURSALSCHEDULE");
 
 }
 public handleFormOnLoad() {
  // WRITE CODE HERE TO HANDLE
  // this.removeShellBtn('BACK')
  // this.addShellButton('RetailViewLoanDisbursalDetailsForm.back', 'BACK', 'secondary', 'DISPLAY', 'button');
  this.setShellBtnMethod('BACK', this.backToDisbursalSchedule.bind(this));
  this.addShellButton('RetailViewLoanDisbursalDetailsForm.download', 'DOWNLOAD', 'primary', 'DISPLAY', 'button');
  this.setShellBtnMethod('DOWNLOAD', this.downloadDisbursalSchedule.bind(this));
}
downloadDisbursalSchedule(){
  console.log('qwerty');
  let accountNumber = this._activeSpaceInfoService.getAccountNumber();
  this.showSpinner();
  this.commonService.downloadDisbursalScheduleReport(accountNumber).subscribe({
    next: (response: any) => {
      this.hideSpinner();
      if (this._device.isHybrid()) {
        this._fileOpener.openPDF(
          response,
          "application/pdf",
          accountNumber+"LoanDisbursementSchedule.pdf"
        );
      } else {
        let documentURL = URL.createObjectURL(
          new Blob([response.body], { type: "application/pdf" })
        );
        const downloadLink = document.createElement("a");
        downloadLink.href = documentURL;
        const fileName = accountNumber+"LoanDisbursementSchedule.pdf";
        downloadLink.download = fileName;
        // downloadLink.click();
      }
    }
  });
  
}
backToDisbursalSchedule(){
  this._router.navigate(['accounts-space','display-shell','loans','retail-loan-disbursal-details-form'])
}

override doPostInit(): void{
  this.handleFormOnLoad();
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
 
 
