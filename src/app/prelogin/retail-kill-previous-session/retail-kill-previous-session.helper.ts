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
import { KillprevioussessionService } from "../killprevioussession-service/killprevioussession.service";
import { Killprevioussession } from "../killprevioussession-service/killprevioussession.model";
import { AppConfigService, UserAuthService } from "@dep/services";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
export class RetailKillPreviousSessionState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  decision: any;
}

@Injectable()
export class RetailKillPreviousSessionHelper extends BaseFpxFormHelper<RetailKillPreviousSessionState>{

  constructor(private retailKillPreviousSessionService: KillprevioussessionService,
    private _appConfig: AppConfigService,
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _httpProvider: HttpProviderService, private _router: Router
  ) {
    super(new RetailKillPreviousSessionState());
  }

  override doPreInit(): void {
    if(this._dialogData?.reqRef){
      this._dialogData.title = "RetailKillPreviousSessionForm.title";
    }
    this.setServiceCode("RETAILKILLPREVSESSION");

  }

  public cancelEvent() {
    this.state.decision = 'R';
  }

  public submitEvent() {
    this.state.decision = 'A';
  }
  public override doPostInit(): void {

  }

  public override preSubmitInterceptor(payload: Killprevioussession): any {
    // WRITE CODE HERE TO HANDLE 
    payload = {
      // ticket :this._appConfig.getData('ticket'),
      reqRef: this._appConfig.getData('reqRef'),
      decision: this.state.decision
    };
    return payload;
  }


  public override postDataFetchInterceptor(payload: Killprevioussession) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    if (response?.success) {
      if(!response.success?.body?.authToken){
        let serviceCode = this._appConfig.getData('otpService');
        if(serviceCode == "RETAILNPSSLOGIN"){
          this._appConfig.setData('otpService', "RETAILNPSSLOGIN");
        }
        else{
          this._appConfig.setData('otpService', "PRELOGIN");
        }
      }

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


