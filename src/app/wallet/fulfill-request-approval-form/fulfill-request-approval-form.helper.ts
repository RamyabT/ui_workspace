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
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DeviceDetectorService } from "@dep/core";
import { AppConfigService } from "@dep/services";
export class FulfillRequestApprovalFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  isResultMode: any;
  isDecline: boolean = false;
}


@Injectable()
export class FulfillRequestApprovalFormHelper extends BaseFpxFormHelper<FulfillRequestApprovalFormState>{

  constructor(
    public deviceDedector: DeviceDetectorService,
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any, private _httpProvider: HttpProviderService, private _router: Router,
    private _appConfig:AppConfigService) {
    super(new FulfillRequestApprovalFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILWALLETTRANSFER");
  }


  public override doPostInit(): void {

  }


  public override preSubmitInterceptor(payload:any): any {
    // WRITE CODE HERE TO HANDLE 
    let customPayload:any = this._appConfig.getData('DECLINEWALLETREQUEST');
    customPayload={...customPayload,
      operationMode:'D',
      remarks:payload.feedBackComments
    }
    return customPayload;
  }


  public override postDataFetchInterceptor() {
    // WRITE CODE HERE TO HANDLE 
    // return payload;
  }

  onAccept() {
    this._dialogRef.close(this.formGroup.value);
  }

  onSubmit(){
    this.triggerSubmit();
    this._dialogRef.close(this.formGroup.value);
  }

  onDecline() {
    this._dialogRef.close(0);
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    if (response.success) {
      routingInfo.setQueryParams({
        response: response.success?.body?.walletTransfer,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n

}