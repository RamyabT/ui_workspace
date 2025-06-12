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
  FpxSubmitHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { DepositCalculatorService } from '../depositCalculator-service/depositCalculator.service';
import { AppConfigService } from "@dep/services";

export class RetailDepositBreakupFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	amount:any={
	  isCurrEditable: false,
	  CurrencyList: [{ id: 'INR', text: 'INR' }],
	   amountInWords : false,
	   initCurrency : 'INR',
	   defaultFetch : false,
	};
  breakupDetails:{
    depositAmount:{
    lbl:string,
    amount:string,
    date:string
  },
  totalInterest:{
    lbl:string,
    amount:string,
    date:string

  },
  maturityAmount:{
    lbl:string,
    amount:string,
    date:string

  },
  maturityDate:{
    lbl:string,
    amount:string,
    date:string
  }
}={
    depositAmount:{
      lbl:'Prinicipal Amount',
      amount:'',
      date:''
    },
    totalInterest:{
      lbl:'Interest Amount',
      amount:'',
      date:''
    },
    maturityAmount:{
      lbl:'Maturity Amount',
      amount:'',
      date:''
    },
    maturityDate:{
      lbl:'Maturity Date',
      amount:'',
      date:''
    }
  };
  depositBreakupData:any;
}


@Injectable()
export class RetailDepositBreakupFormHelper extends BaseFpxFormHelper<RetailDepositBreakupFormState>{

   constructor( private retailDepositCalculatorFormService: DepositCalculatorService, private _httpProvider : HttpProviderService,private _router: Router,
    private _appConfig: AppConfigService
   ) 
    {
        super(new RetailDepositBreakupFormState());
    }
   
  override doPreInit(): void {
  this.setServiceCode("RETAILDEPOSITBREAKUP");
  this.addShellButton('RetailDepositBreakupForm.submit', 'SUBMIT', 'primary', 'DISPLAY', 'button');
  this.setShellBtnMethod('SUBMIT', this.customSubmitHandler.bind(this));
 }
   

  public override doPostInit(): void {
    this.state.depositBreakupData=this._appConfig.getData('depositBreakUpData');
    this.state.breakupDetails.depositAmount.amount=this.state.depositBreakupData?.depositAmount;
    this.state.breakupDetails.totalInterest.amount=this.state.depositBreakupData?.interestAmount;
    this.state.breakupDetails.maturityAmount.amount=this.state.depositBreakupData?.endInvestment;
    this.state.breakupDetails.maturityDate.date=this.state.depositBreakupData?.maturityDate;

  }
  customSubmitHandler(){
    this._router.navigate(['accounts-space','entry-shell','deposits','retail-deposit-request-form'],
      {
        queryParams: {
          depositCalculator:true
        }
      }
    );
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
 

