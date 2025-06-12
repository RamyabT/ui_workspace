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
import { LoancalcService } from '../loancalc-service/loancalc.service';
import { Loancalc } from '../loancalc-service/loancalc.model';
export class RetailLoanCalcFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	requestDate:any={
	   minDate:"",
       maxDate:"",
     }
	loanAmount:any={
	  isCurrEditable: false,
	  CurrencyList: [{ id: 'INR', text: 'INR' }],
	   amountInWords : false,
	   initCurrency : 'INR',
	   defaultFetch : false,
	}
	downPaymentAmount:any={
	  isCurrEditable: false,
	  CurrencyList: [{ id: 'INR', text: 'INR' }],
	   amountInWords : false,
	   initCurrency : 'INR',
	   defaultFetch : false,
	}
	vehicleCost:any={
	  isCurrEditable: false,
	  CurrencyList: [{ id: 'INR', text: 'INR' }],
	   amountInWords : false,
	   initCurrency : 'INR',
	   defaultFetch : false,
	}
	propertyValue:any={
	  isCurrEditable: false,
	  CurrencyList: [{ id: 'INR', text: 'INR' }],
	   amountInWords : false,
	   initCurrency : 'INR',
	   defaultFetch : false,
	}
}


@Injectable()
export class RetailLoanCalcFormHelper extends BaseFpxFormHelper<RetailLoanCalcFormState>{

   constructor( private retailLoanCalcFormService: LoancalcService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new RetailLoanCalcFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("loancalc");
 }
   

  public override doPostInit(): void {
  
  }
  
 
  public override preSubmitInterceptor(payload: Loancalc):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Loancalc){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.loancalc.loanType,
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
 

