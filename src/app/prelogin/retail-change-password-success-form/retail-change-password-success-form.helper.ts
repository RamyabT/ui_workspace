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
import { ChangepassService } from '../../login/changepass-service/changepass.service';
import { Changepass } from '../../login/changepass-service/changepass.model';
export class RetailChangePasswordSuccessFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	message:any={
	 text:" Sample Text"
	}
}


@Injectable()
export class RetailChangePasswordSuccessFormHelper extends BaseFpxFormHelper<RetailChangePasswordSuccessFormState>{

   constructor( private retailChangePasswordSuccessFormService: ChangepassService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new RetailChangePasswordSuccessFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILCHANGEPASS");
 }
   

  public override doPostInit(): void {
  
  }
  
 
  public override preSubmitInterceptor(payload: Changepass):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Changepass){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.changepass,
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
 
 
