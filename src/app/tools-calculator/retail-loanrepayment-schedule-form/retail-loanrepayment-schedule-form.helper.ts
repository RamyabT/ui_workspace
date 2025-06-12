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
import { LoanrepaymentscheduleService } from '../loanrepaymentschedule-service/loanrepaymentschedule.service';
import { Loanrepaymentschedule } from '../loanrepaymentschedule-service/loanrepaymentschedule.model';
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
import moment from "moment";
export class loanrepaymentscheduleState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;

loanCalculationDate:any={
  minDate:"",
    maxDate:"",
  }
  gridData: any = [];
years: any = [];
currentYear: any;
yearCount: any;
currentYearData: any;
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
    data: any;
}


@Injectable()
export class loanrepaymentscheduleHelper extends BaseFpxFormHelper<loanrepaymentscheduleState>{

 
   constructor( private loanrepaymentscheduleService: LoanrepaymentscheduleService, private _httpProvider : HttpProviderService,private _router: Router,
    private _appConfig:AppConfigService
   ) 
    {
        super(new loanrepaymentscheduleState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILREPAYMENTSCH");
 this.addShellButton('loanrepaymentschedule.download', 'DOWNLOAD', 'primary', 'DISPLAY', 'button');
 this.setShellBtnMethod('DOWNLOAD', this.onDownloadClick.bind(this));

 let loanBreakupData=this._appConfig.getData('loansBreakUpData');
 this.state.data= this._appConfig.getData('formData');
 this.setGridData('repaymentSchedule',loanBreakupData.loancalc.schedule);
 }
   

  public override doPostInit(): void {

  }
  
 
  public override preSubmitInterceptor(payload: Loanrepaymentschedule):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Loanrepaymentschedule){
   // WRITE CODE HERE TO HANDLE 
  return payload;
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

onDownloadClick() {
  this.showSpinner();
  const httpRequest = new HttpRequest();
  httpRequest.setMethod('POST');
  httpRequest.setResource('/loancalcreport');
  httpRequest.setContextPath('Loans');
  let bodyContent = {
    "loancalcreport": {
        // "loanAmount": this.getValue('loanAmount'),
        // "tenure": this.getValue('loantenurevalue'),
        // "currency": this._appConfig.baseCurrency,
        // "loanType": this.getValue('loanProductType')
        "loanAmount": this.state.data.loanAmount,
        "tenure": this.state.data.tenure,
        "currency": this.state.data.currency,
        "loanType": this.state.data.loanType,
        "loanInterestRate":this.state.data.loanInterestRate
    }
  }
  httpRequest.setBody(bodyContent);
  httpRequest.addHeaderParamter('serviceCode', 'LOANCALCREPORTADP')
  this._httpProvider.invokeDownloadApi(httpRequest).pipe(
    map((res: IHttpSuccessPayload<ILookupResponse>) => {
      return res.body;
    })
  ).subscribe((response:any) => {
    this.hideSpinner();
    // let documentURL = URL.createObjectURL(
    //   new Blob([response.body], { type: "application/pdf" })
    // );
    // const downloadLink = document.createElement("a");
    // downloadLink.href = documentURL;
    // const fileName = "loan.pdf";
    // downloadLink.download = fileName;
   
  })

// else{
// this.showWarningAlert('Warning',this._translate.instant('loancalculator.properDataWarning'))
// }
}






  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.loanrepaymentschedule.loanAccountNumber,
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
 

