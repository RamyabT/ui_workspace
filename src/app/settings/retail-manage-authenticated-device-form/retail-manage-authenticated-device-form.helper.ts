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
import { UserdeviceService } from '../userdevice-service/userdevice.service';
import { Userdevice } from '../userdevice-service/userdevice.model';
export class RetailManageAuthenticatedDeviceFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
   _gridData:any=[];
}


@Injectable()
export class RetailManageAuthenticatedDeviceFormHelper extends BaseFpxFormHelper<RetailManageAuthenticatedDeviceFormState>{

   constructor( private retailManageAuthenticatedDeviceFormService: UserdeviceService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new RetailManageAuthenticatedDeviceFormState());
    }
   
  override doPreInit(): void {
    this.addControlEventHandler("MANAGEMYDEVICEDDATAEMIT", this.onManageMyDeviceReceived);
    this.setServiceCode("MANAGEAUTHDEVICE");
 }
   

  public override doPostInit(): void {
    this.setHidden('noManageMyDeviceGridGroup',true)
    this.setHidden('manageMyDeviceGridGroup',false)
    this.removeShellBtn('BACK');
  }

  public onManageMyDeviceReceived: BaseFpxControlEventHandler = (res: any) => {
    this.state._gridData = res?.data
    if(res?.data?.length>0){ 
        this.setHidden('noManageMyDeviceGridGroup',true)
        this.setHidden('manageMyDeviceGridGroup',false)
        // this.setHidden('searchTextGroup',false)

    }else{
      this.setHidden('noManageMyDeviceGridGroup',false);
      this.setHidden('manageMyDeviceGridGroup',true);
      // this.setHidden('searchTextGroup',true)

    }
  }
  
 
  public override preSubmitInterceptor(payload: Userdevice):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Userdevice){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.userdevice.userId.deviceId,
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
 
 
