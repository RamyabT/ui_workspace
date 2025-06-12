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
import { CustomerActivationService } from '../customerActivation-service/customerActivation.service';
import { CustomerActivation } from '../customerActivation-service/customerActivation.model';
export class RetailCustomerActivationState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	termsFlag:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}
}


@Injectable()
export class RetailCustomerActivationHelper extends BaseFpxFormHelper<RetailCustomerActivationState>{

   constructor( private retailCustomerActivationService: CustomerActivationService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new RetailCustomerActivationState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILCUSTOMERACTIVATION");
 }
   

  public override doPostInit(): void {
  
  }
  
 
  public override preSubmitInterceptor(payload: CustomerActivation):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: CustomerActivation){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
    console.log(response)
    let routingInfo: RoutingInfo = new RoutingInfo()
    routingInfo.setNavigationURL('confirmation')
    if (response.success) {
      let res = response.success?.body?.customerActivation
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
          serviceCode: this.serviceCode,
        }
      });
    }
   return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
