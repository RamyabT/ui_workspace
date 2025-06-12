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
import { FatcaRejectedService } from '../fatcaRejected-service/fatcaRejected.service';
import { FatcaRejected } from '../fatcaRejected-service/fatcaRejected.model';
export class FatcaRejectedState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
}


@Injectable()
export class FatcaRejectedHelper extends BaseFpxFormHelper<FatcaRejectedState>{

   constructor( private fatcaRejectedService: FatcaRejectedService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new FatcaRejectedState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("fatcaRejected");
 this.hideShellActions();
 }
   

  public override doPostInit(): void {
  
  }
  
 
  public override preSubmitInterceptor(payload: FatcaRejected):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: FatcaRejected){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.fatcaRejected,
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
 
 
