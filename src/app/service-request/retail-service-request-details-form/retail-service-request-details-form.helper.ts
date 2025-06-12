import { Inject, Injectable } from "@angular/core";
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
import { ServicerequestadhocService } from '../servicerequestadhoc-service/servicerequestadhoc.service';
import { Servicerequestadhoc } from '../servicerequestadhoc-service/servicerequestadhoc.model';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AppConfigService } from "@dep/services";
export class RetailServiceRequestDetailsFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	FieldId_2:any={
	 text:" Sample text"
	}
	FieldId_3:any={
	 text:" Sample text"
	}
}


@Injectable()
export class RetailServiceRequestDetailsFormHelper extends BaseFpxFormHelper<RetailServiceRequestDetailsFormState>{
  requestDetails:{[key:string]:string}={};
   constructor( private retailServiceRequestDetailsFormService: ServicerequestadhocService, private _httpProvider : HttpProviderService,private _router: Router,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _appConfig: AppConfigService
    ) 
    {
        super(new RetailServiceRequestDetailsFormState());
    }
   
  override doPreInit(): void {
  this.setServiceCode("RETAILSERVICEREQUESTADHOC");
  console.log(this._dialogData);
  this.requestDetails=this._appConfig.getData('serviceRequestDetails');
  // this._appConfig.clearData('serviceRequestDetails');
 }
   

  public override doPostInit(): void {
  
  }
  
 
  public override preSubmitInterceptor(payload: Servicerequestadhoc):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Servicerequestadhoc){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.servicerequestadhoc.inventoryNumber,
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
 
 
