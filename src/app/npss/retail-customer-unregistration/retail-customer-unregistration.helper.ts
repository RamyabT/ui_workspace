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
import { CustomerunregistrationService } from '../customerunregistration-service/customerunregistration.service';
import { Customerunregistration } from '../customerunregistration-service/customerunregistration.model';
export class RetailCustomerUnregistrationState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	termsFlag:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}
}


@Injectable()
export class RetailCustomerUnregistrationHelper extends BaseFpxFormHelper<RetailCustomerUnregistrationState>{

   constructor( private retailCustomerUnregistrationService: CustomerunregistrationService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new RetailCustomerUnregistrationState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILCUSTOMERUNREGISTER");
 }
   

  public override doPostInit(): void {
  
  }
  
 
  public override preSubmitInterceptor(payload: Customerunregistration):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Customerunregistration){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
    console.log(response)
    let routingInfo: RoutingInfo = new RoutingInfo()
    routingInfo.setNavigationURL('confirmation')
    if (response.success) {
      let res = response.success?.body?.customerunregistration
      routingInfo.setQueryParams({
        response: res
      })
    } else if (response.error) {
      let error = response.error.error
      routingInfo.setQueryParams({
        result: {
          statusCode: "FAILUR", //SUCCESS | FAILUR | WARNING
          message: error.ErrorMessage,
          description: error.ErrorDescription,
          code:error.ErrorCode,
          serviceCode: this.serviceCode
        }
      });
    }
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
