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
import { OverridempinService } from '../overridempin-service/overridempin.service';
import { Overridempin } from '../overridempin-service/overridempin.model';
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
export class RetailOverrideMpinState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  decision: any;
}


@Injectable()
export class RetailOverrideMpinHelper extends BaseFpxFormHelper<RetailOverrideMpinState> {

  constructor(private retailOverrideMpinService: OverridempinService,
    private _appConfig: AppConfigService,
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _httpProvider: HttpProviderService, private _router: Router) {
    super(new RetailOverrideMpinState());
  }

  override doPreInit(): void {
    if (this._dialogData) {
      this._dialogData.title = "RetailOverrideMpin.devreg";
    }
    this.setServiceCode("RETAILOVERRIDEMPIN");
  }

  public cancelEvent() {
    this.state.decision = 'R';
  }

  public submitEvent() {
    this.state.decision = 'A';
  }
  public override doPostInit(): void {

  }


  public override preSubmitInterceptor(payload: Overridempin): any {
    // WRITE CODE HERE TO HANDLE 
    payload = {
      // ticket :this._appConfig.getData('ticket'),
      reqRef: this._appConfig.getData('reqRef'),
      decision: this.state.decision
    };
    return payload;
    return payload;
  }


  public override postDataFetchInterceptor(payload: Overridempin) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();

    if (response.success) {
      let serviceCode = this._appConfig.getData('otpService');
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


