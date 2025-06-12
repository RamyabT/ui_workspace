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
import { ChangempinService } from '../changempin-service/changempin.service';
import { Changempin } from '../changempin-service/changempin.model';
import { AppConfigService, UserAuthService } from "@dep/services";
import { NativeStorageManager } from "@dep/native";
export class RetailChangeMpinFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  pinSize: number = 4;
  currentMPIN: string = "";
  confirmPINStatus: boolean = true;
  deviceAuthInfo: any;
}

@Injectable()
export class RetailChangeMpinFormHelper extends BaseFpxFormHelper<RetailChangeMpinFormState> {
  newMPIN: any;
  constructor(
    private retailChangeMpinFormService: ChangempinService, 
    private _httpProvider: HttpProviderService, 
    private _router: Router,
    private _userAuth: UserAuthService,
    private _nativeStorageMgr: NativeStorageManager,
    private _appConfig: AppConfigService
  ) {
    super(new RetailChangeMpinFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILCHANGEMPIN");
    
    this.showSpinner();
    this._nativeStorageMgr.loadData("deviceAuthInfo").then(
      (data:any) => {
        this.hideSpinner();
        this.state.deviceAuthInfo = JSON.parse(atob(data));
        this.state.currentMPIN = this.state.deviceAuthInfo.mpin;
      }
    ).catch(
      (reason:any) => {
        this.hideSpinner();
      }
    );
  }

  public override doPostInit(): void {
    this.addValueChangeHandler("currentMpin", this.handlecurrentMpinOnvalueChange);
    this.addValueChangeHandler("newMpin", this.handlenewMpinOnvalueChange);
    this.addValueChangeHandler("confirmMpin", this.handleConfirmMpinOnvalueChange);
  }

  private handlecurrentMpinOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value.length == 4) {
      if (this.state.currentMPIN == value) {
        this.setValue('confirmPINStatus', 1);
        this.state.confirmPINStatus = true;
      }else{
        this.setValue('confirmPINStatus', 0);
        this.state.confirmPINStatus = false;
      }
    }
  }

  private handlenewMpinOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup,
  ) => {
    this.reset('confirmMpin');
    this.newMPIN = value;
  }

  private handleConfirmMpinOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup,
  ) => {
    if (status === "VALID") {
      if (value != this.newMPIN) {
        this.setErrors('confirmMpin', "mpinNotMatch");
      }
    }
  };

  public override preSubmitInterceptor(payload: Changempin): any {
    // WRITE CODE HERE TO HANDLE 
    payload.currentMpin = this._userAuth.encryptPassword(payload.currentMpin);
    payload.newMpin = this._userAuth.encryptPassword(payload.newMpin);
    payload.confirmMpin = this._userAuth.encryptPassword(payload.confirmMpin);


    return payload;
  }


  public override postDataFetchInterceptor(payload: Changempin) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      this.state.deviceAuthInfo.mpin = this.getValue('newMpin');
      let _deviceAuthInfo = btoa(JSON.stringify(this.state.deviceAuthInfo));
      this._appConfig.setData('deviceAuthInfo', _deviceAuthInfo);

      routingInfo.setQueryParams({
        response: response.success?.body,
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


