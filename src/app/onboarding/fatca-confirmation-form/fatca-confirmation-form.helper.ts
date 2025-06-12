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
import { FatcaConfirmationService } from '../fatcaConfirmation-service/fatcaConfirmation.service';
import { FatcaConfirmation } from '../fatcaConfirmation-service/fatcaConfirmation.model';
import { AppConfigService } from "@dep/services";
export class FatcaConfirmationState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
}


@Injectable()
export class FatcaConfirmationHelper extends BaseFpxFormHelper<FatcaConfirmationState>{

   constructor( private fatcaConfirmationService: FatcaConfirmationService, private _httpProvider : HttpProviderService,private _router: Router,public _appConfig: AppConfigService) 
    {
        super(new FatcaConfirmationState());
        
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILCOBFATCACONFIRMATION");
 }
   

  public override doPostInit(): void {
  
  }
  
 
  public override preSubmitInterceptor(payload: FatcaConfirmation):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: FatcaConfirmation){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
  
    if (response.success) {
      routingInfo.setQueryParams({
        response: response.success?.body?.fatcaConfirmation,
        transRef: response.success?.body?.fatcaConfirmation.applicantId,
        status: "success",
      });
      this._appConfig.setData('applicantId', response.success?.body?.fatcaConfirmation.applicantId)
      this._appConfig.setData('processId', response.success?.body?.fatcaConfirmation.processId)
    }else if (response.error) {
      routingInfo.setQueryParams({ 
        response: response.error.error,
        status: "failed" });
     }
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
