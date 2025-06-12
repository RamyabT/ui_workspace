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
import { RetailselfregisterService } from '../retailselfregister-service/retailselfregister.service';
import { Retailselfregister } from '../retailselfregister-service/retailselfregister.model';
export class RetailSelfRegisterFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
   dob:any={
    minDate:"",
    maxDate:"",
    }
}


@Injectable()
export class RetailSelfRegisterFormHelper extends BaseFpxFormHelper<RetailSelfRegisterFormState>{
	dob:any={
    minDate:"",
      maxDate:"",
    }
   constructor( private retailSelfRegisterFormService: RetailselfregisterService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new RetailSelfRegisterFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("retailselfregister");
 }
   

  public override doPostInit(): void {
  
  }
  
 
  public override preSubmitInterceptor(payload: Retailselfregister):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Retailselfregister){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.retailselfregister,
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
 
 
