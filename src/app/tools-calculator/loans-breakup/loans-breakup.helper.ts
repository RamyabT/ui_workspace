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
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";


export class RetailLoansBreakupFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	amount:any={
	  isCurrEditable: false,
	  CurrencyList: [{ id: 'INR', text: 'INR' }],
	   amountInWords : false,
	   initCurrency : 'INR',
	   defaultFetch : false,
	};
  breakupDetails:{
    monthlyEmi:{
      lbl:string,
      amount:string
    },
    loansAmount:{
    lbl:string,
    amount:string
  },
  totalInterest:{
    lbl:string,
    amount:string
  },
  principalAmount:{
    lbl:string,
    amount:string
  }}={
    monthlyEmi:{
      lbl:'Monthly EMI',
      amount:''
    },
    loansAmount:{
      lbl:'Total Amount',
      amount:''
    },
    totalInterest:{
      lbl:'Total Interest',
      amount:''
    },
    principalAmount:{
      lbl:'Principal Amount',
      amount:''
    }
  };
}


@Injectable()
export class RetailLoansBreakupFormHelper extends BaseFpxFormHelper<RetailLoansBreakupFormState>{

  loansBreakupData:any;
   constructor( private _httpProvider : HttpProviderService,private _router: Router,
    private _appConfig:AppConfigService
   ) 
    {
        super(new RetailLoansBreakupFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILLOANSBREAKUP");
 this.addShellButton('RetailLoansBreakupForm.submit','SUBMIT','primary','DISPLAY','button');
 this.setShellBtnMethod('SUBMIT',this.customSubmitHandler.bind(this));
 }
 
 
 customSubmitHandler(){
  this._router.navigate(['tools-space','display-shell','tools-calculator','retail-loan-repaymentschedule-calc-ro'])
  this._appConfig.setData('loansBreakUpGridData',this.loansBreakupData.loancalc.schedule);
 }

  public override doPostInit(): void {
  
    this.loansBreakupData=this._appConfig.getData('loansBreakUpData');
    let interestRate=this.loansBreakupData.loancalc.summary.interestRate;
    let loansAmount=this.loansBreakupData.loancalc.summary.interestPayable;
    let totalLoansAmount=this.loansBreakupData.loancalc.summary.totalLoanAmount;
    this.state.breakupDetails.totalInterest.amount=this.loansBreakupData.loancalc.summary.interestPayable;
    this.state.breakupDetails.loansAmount.amount=this.loansBreakupData.loancalc.summary.totalLoanAmount;
    this.state.breakupDetails.monthlyEmi.amount=this.loansBreakupData.loancalc.summary.loanEmi;
    let principal:any=totalLoansAmount-loansAmount;
    // let principal:any=((loansAmount/totalLoansAmount)*100);
    this.state.breakupDetails.principalAmount.amount=principal;
    
  }
  
 
  public override preSubmitInterceptor(payload: any):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: any){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.depositCalculator.depositProducts,
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
 

