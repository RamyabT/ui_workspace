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
import { RetailpctransactionexfilterService } from "../retailpctransactionexfilter-service/retailpctransactionexfilter.service";
import { Retailpctransactionexfilter } from "../retailpctransactionexfilter-service/retailpctransactionexfilter.model";
export class RetailPcTransactionExFilterState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	fromDate:any={
	   minDate: new Date("01-07-2023"),
       maxDate: new Date("31-07-2023"),
     }
	toDate:any={
	   minDate: new Date("01-07-2023"),
       maxDate: new Date("31-07-2023"),
     }
	FieldId_4:any={
	 text:" Amount&nbsp; Range"
	}
}


@Injectable()
export class RetailPcTransactionExFilterHelper extends BaseFpxFormHelper<RetailPcTransactionExFilterState>{

   constructor( private retailPcTransactionExFilterService: RetailpctransactionexfilterService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new RetailPcTransactionExFilterState());
    }
   
  override doPreInit(): void {
  this.hideShellActions();
 this.setServiceCode("RETAILPCTRANSACTION");
 }
   

  public override doPostInit(): void {
  
  }
  
 
  public override preSubmitInterceptor(payload: Retailpctransactionexfilter):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Retailpctransactionexfilter){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.retailpctransactionexfilter,
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
 
 
