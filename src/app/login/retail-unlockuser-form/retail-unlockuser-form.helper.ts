import { ChangeDetectorRef, Injectable } from "@angular/core";
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
import { RetailunlockuserService } from "../retailunlockuser-service/retailunlockuser.service";
import { Retailunlockuser } from "../retailunlockuser-service/retailunlockuser.model";
import { AppConfigService } from "@dep/services";
export class RetailUnlockuserFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	Message:any={
	 text:" Sample Text"
	}
}


@Injectable()
export class RetailUnlockuserFormHelper extends BaseFpxFormHelper<RetailUnlockuserFormState>{

   constructor( private retailUnlockuserFormService: RetailunlockuserService, 
    private _appConfig : AppConfigService,
    private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new RetailUnlockuserFormState());
        this.hideShellActions();
    }
   
  override doPreInit(): void {
  this.setServiceCode("RETAILUNLOCKUSER");

 }
   

  public override doPostInit(): void {
  }
  gotoWelcome(){
    this._angularRouter.navigate(['welcome']);
  }
  public navToUnlockUser(){
    this._router.navigate(["prelogin-space","entry-shell","login","retail-customer-verification-form"],
    {
      queryParams: {
        serviceCode:"RETAILUNLOCKUSER" 
      }
    })
  }
 
  public override preSubmitInterceptor(payload: Retailunlockuser):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Retailunlockuser){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      this._appConfig.setData('otpService', "UNLOCKUSER");
      routingInfo.setQueryParams({
        transRef: response.success?.body?.retailunlockuser,
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
 
 
