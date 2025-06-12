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
import { ExpensesDetailsService } from '../expensesDetails-service/expensesDetails.service';
import { ExpensesDetails } from '../expensesDetails-service/expensesDetails.model';
export class expensesDetailsState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	monthlyExpenses:any={
	  isCurrEditable: false,
	  CurrencyList: [],
	   amountInWords : false,
	   initCurrency : '',
	   defaultFetch : false,
	}
	otherLoanEMI:any={
	  isCurrEditable: false,
	  CurrencyList: [],
	   amountInWords : false,
	   initCurrency : '',
	   defaultFetch : false,
	}
	annualPropertyTax:any={
	  isCurrEditable: false,
	  CurrencyList: [],
	   amountInWords : false,
	   initCurrency : '',
	   defaultFetch : false,
	}
	monthlyCondominiumFees:any={
	  isCurrEditable: false,
	  CurrencyList: [],
	   amountInWords : false,
	   initCurrency : '',
	   defaultFetch : false,
	}
}


@Injectable()
export class expensesDetailsHelper extends BaseFpxFormHelper<expensesDetailsState>{

   constructor( private expensesDetailsService: ExpensesDetailsService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new expensesDetailsState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("expensesDetails");
 }
   

  public override doPostInit(): void {
  
  }
  
 
  public override preSubmitInterceptor(payload: ExpensesDetails):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: ExpensesDetails){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.expensesDetails.tenantId.applicantId,
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
 

