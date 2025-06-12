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
import { OverridempinService } from '../overridempin-service/overridempin.service';
import { Overridempin } from '../overridempin-service/overridempin.model';
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
import { MatDialogRef } from "@angular/material/dialog";
export class RetailMigratedUserState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
  decision: any;
}


@Injectable()
export class RetailMigratedUserHelper extends BaseFpxFormHelper<RetailMigratedUserState>{

   constructor( private retailOverrideMpinService: OverridempinService,
    private _appConfig: AppConfigService,private _dialogRef: MatDialogRef<any>,
     private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new RetailMigratedUserState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILMIGRATEDUSER");
 
 }
   
 public cancelEvent() {
  this._dialogRef.close()


}

public submitEvent() {
  // public navToSelfRegister(){
    this._dialogRef.close()

    this._router.navigate(["prelogin-space","entry-shell","login","retail-customer-verification-form"],
    {
      queryParams: {
        serviceCode:"RETAILMIGRATEDUSER" 
      // serviceCode:"RETAILSELFREG"
      }
    })
// }
}
  public override doPostInit(): void {
  
  }
  
 
  public override preSubmitInterceptor(payload: Overridempin):any {
     // WRITE CODE HERE TO HANDLE 
     payload = {
      // ticket :this._appConfig.getData('ticket'),
      reqRef: this._appConfig.getData('reqRef'),
      decision: this.state.decision
    };
    return payload;
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Overridempin){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      let serviceCode=this._appConfig.getData('otpService')
      this._dialogRef.close({
        processId: response.success?.body?.processId
      });
      routingInfo.setQueryParams({
        response: response.success?.body,
        transRef: response.success?.body?.processId,
        status: "success"
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
