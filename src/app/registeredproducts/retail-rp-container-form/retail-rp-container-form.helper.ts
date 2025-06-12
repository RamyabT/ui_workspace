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
import { RpcontractinfoService } from '../rpcontractinfo-service/rpcontractinfo.service';
import { Rpcontractinfo } from '../rpcontractinfo-service/rpcontractinfo.model';
export class retailrpContainerFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
}


@Injectable()
export class retailrpContainerFormHelper extends BaseFpxFormHelper<retailrpContainerFormState>{

   constructor( private retailrpcontainerformService: RpcontractinfoService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new retailrpContainerFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILRPCONTAINER");
 }
   

  public override doPostInit(): void {
  
  }
  
 
  public override preSubmitInterceptor(payload: Rpcontractinfo):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Rpcontractinfo){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.rpcontractinfo.inventoryNumber,
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
 

