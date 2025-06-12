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
import { CobaddressinfoService } from '../cobaddressinfo-service/cobaddressinfo.service';
import { Cobaddressinfo } from '../cobaddressinfo-service/cobaddressinfo.model';
export class RetailAddressDetailsFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
}


@Injectable()
export class RetailAddressDetailsFormHelper extends BaseFpxFormHelper<RetailAddressDetailsFormState>{

   constructor( private retailAddressDetailsFormService: CobaddressinfoService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new RetailAddressDetailsFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("cobaddressinfo");
 }
   

  public override doPostInit(): void {
  
  }
  
 
  public override preSubmitInterceptor(payload: Cobaddressinfo):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Cobaddressinfo){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.cobaddressinfo.inventoryNumber.addressType,
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
 
 
