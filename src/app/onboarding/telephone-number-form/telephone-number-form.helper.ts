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
import { TelephonenumberService } from '../telephonenumber-service/telephonenumber.service';
import { Telephonenumber } from '../telephonenumber-service/telephonenumber.model';
export class telephonenumberformState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
}


@Injectable()
export class telephonenumberformHelper extends BaseFpxFormHelper<telephonenumberformState>{

   constructor( private telephonenumberformService: TelephonenumberService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new telephonenumberformState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("telephonenumberform");
 }
   

  public override doPostInit(): void {
  
  }
  
 
  public override preSubmitInterceptor(payload: Telephonenumber):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Telephonenumber){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.telephonenumber.iSOCode,
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
 

