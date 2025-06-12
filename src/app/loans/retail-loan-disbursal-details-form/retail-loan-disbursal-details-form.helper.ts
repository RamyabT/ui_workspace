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
import { LoansService } from '../../loans/loans-service/loans.service';
import { Loans } from '../../loans/loans-service/loans.model';
import { LoandisbursalscheduleService } from "../loandisbursalschedule-service/loandisbursalschedule.service";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
export class RetailLoanDisbursalDetailsFormState extends BaseFpxComponentState {
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
      "noOfInstallments",
      "repaymentFreqencyDesc",
      "maturityDate",
      "loanCalculationDate",
      "repaymentFrequency"
    ];
  fieldsFormat: string[] =
      ["text",
          "text",
          "amount",
          "precentage",
          "string",
          "text",
          "date",
          "date",
          "text"
        ];
}


@Injectable()
export class RetailLoanDisbursalDetailsFormHelper extends BaseFpxFormHelper<RetailLoanDisbursalDetailsFormState>{
  spendData: any = [];
  totalSummary: any;

   constructor( private retailLoanDisbursalDetailsFormService: LoansService, private _httpProvider : HttpProviderService,private _router: Router,
    private _loandisbursalscheduleService: LoandisbursalscheduleService,
    public _device: DeviceDetectorService,
    private _activeSpaceInfoService: ActiveSpaceInfoService
  ) 
    {
        super(new RetailLoanDisbursalDetailsFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILLOANDISBURSALSCHEDULE");
 this.removeShellBtn("BACK");
this.addShellButton('RetailLoanDetailsScheduleForm.viewSchedule.label', 'VIEW', 'primary', 'DISPLAY', 'button');
 this.setShellBtnMethod('VIEW', this.viewSchedule.bind(this));
 }
 viewSchedule (payload:any){
  this._loandisbursalscheduleService.accountNumber = this._activeSpaceInfoService.getAccountNumber();
  this._router.navigate(['accounts-space','display-shell','loans','retail-view-loan-disbursal-schedule-form']);
 }

 public handleFormOnLoad() {
  // WRITE CODE HERE TO HANDLE
  let accountNumber = this._activeSpaceInfoService.getAccountNumber();
  let keys: any = {
      loanAccountNumber: accountNumber
  }
  this.retailLoanDisbursalDetailsFormService.findByKey(keys)().subscribe({
      next: (res) => {
          let d = res as Loans;
          this.state.details = d;
          this.state.details.noOfInstallments = this.state.details.noOfInstallments+' '+this.getRepaymentFrequency(this.state.details.repaymentFrequency);
          this.state.details.repaymentFrequency = this.getRepaymentFrequency(this.state.details.repaymentFrequency);
          this.spendData = [
            {
              category: "Disbursed",
              value: d.disbursalAmount,
              currency: d.currency
            },
            {
              category: "Pending",
              value: d.pendingDisbursalAmount,
              currency: d.currency
            }
          ];
          this.totalSummary =  {"amount":d.loanAmount, "currency": d.currency};
      },
      error: (err) => {
          console.log("Loans details fetch problem!");
      }
  })
}
getRepaymentFrequency(repaymentFrequencyDesc: any) {
  let repaymentFrequency;
  switch (repaymentFrequencyDesc) {
    case '1': repaymentFrequency ='Daily'; break;
    case '2': repaymentFrequency ='Monthly'; break;
    case '3': repaymentFrequency ='Yearly'; break
  }
  return repaymentFrequency;
}
  public override doPostInit(): void {
    this.handleFormOnLoad()
  
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
 
 
