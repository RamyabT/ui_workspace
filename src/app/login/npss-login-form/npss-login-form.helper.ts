import { Inject, Injectable } from '@angular/core';
import { AppConfigService, CustomCurrAmountService, UserAuthService } from '@dep/services';
import { Location } from '@angular/common';

import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  FpxModal,
  FpxModalAfterClosed,
} from '@fpx/core';
import { BaseFpxPostSubmitInterceptor, SpinnerService, RoutingInfo } from '@fpx/core';
import { Router } from '@angular/router';
import { LoginState } from 'src/app/login/login-form/login-helper';
import { TransferService } from 'src/app/foundation/validator-service/transfers-service';
import { NPSSLoginService } from '../services/npss-login.service';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import { DepPanningComponent } from 'src/app/dep/core/component/dep-panning.component';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';

export class NPSSLoginState extends BaseFpxComponentState {
  verificationCode: string = '';
  redirectionUrl:any;

  rememberDevice: any = {
    textPosition: "after",
    ckValues: { checked: "1", unchecked: "0" }
  };
  errorMessage: string = '';

}

@Injectable()
export class NPSSLoginHelper extends BaseFpxFormHelper<NPSSLoginState> {
  constructor(
    private _userAuth: UserAuthService,
    private _customCurrAmountService: CustomCurrAmountService,
    private _spinnerService: SpinnerService,
    private _router: Router,
    private _appConfig: AppConfigService,
    private _location: Location,
    private _npssLoginService: NPSSLoginService
  ) {
    super(new NPSSLoginState());
  }

  override doPreInit() {
    this.setServiceCode("RETAILNPSSLOGIN");
    this.hideShellActions();
    this.removeShellBtn("BACK");
    this.removeShellBtn("SUBMIT");
  }


  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...", payload);
    window.open(this.state.redirectionUrl, "_blank");

  }

  public override doPostInit(): void {
    this.state.redirectionUrl=this.getRoutingParam('redirect_uri');
   
    this._appConfig.setData('NPSSLoginRequest', this.getRoutingParam('redirect_uri'));
    this._npssLoginService
      .validateNPSSCustomer(this.getRoutingParam('client_id'), this.getRoutingParam('request'), this.getRoutingParam('response_type'), this.getRoutingParam('redirect_uri'), this.getRoutingParam('scope'))
      .subscribe(res => {
        console.log("res", res);
  
        if (res?.tokenResult?.status == "true") {
          this.state.verificationCode = res?.tokenResult?.verificationCode
        }
        // else if (res.error?.tokenResult?.status == "false") {
          else{
          let modal = new FpxModal();
          modal.setComponent(DepAlertComponent);
          modal.setPanelClass('dep-alert-popup');
          modal.setBackDropClass('dep-popup-back-drop');
          modal.setDisableClose(false);
          modal.setData({
            title: "Failed",
            message: "User Verification Failed. Please go back to Aani App",
            okBtnLbl: "Okay"
          });
          modal.setAfterClosed(this.contextmenuModelAfterClose);
          this.openModal(modal);

        }

      })
    this.handleFormOnLoad();
  }
  public handleFormOnLoad() {
    
  }
  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
    if(!this.state.verificationCode){
      this.setErrors('password','verificationFailed');
    }
  }

  public override preSubmitInterceptor(payload: any) {
    this.handleFormOnPresubmit(payload);

    this.state.errorMessage = '';
    payload = {
      username: payload.username.toUpperCase(),
      password: this._userAuth.encryptPassword(payload.password),
      rememberDevice: (this.getValue('rememberDevice') == true) ? "1" : "0",
      verificationCode: this.state.verificationCode,
      clientId: this.getRoutingParam('client_id'),
      requestToken: this.getRoutingParam('request'),
      scope: this.getRoutingParam('scope'),
      redirect_uri: this.getRoutingParam('redirect_uri'),
      response_type: this.getRoutingParam('response_type'),
      state:this.getRoutingParam('state')
    };
    return payload;
  }
  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    // routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      // this._customCurrAmountService.fetchCurrency();
      this._appConfig.setData('ticket', response.success?.body?.ticket);
      this._appConfig.setData('NPSSLogin', response);
      this._appConfig.setData('otpService', "RETAILNPSSLOGIN");
      this._appConfig.setData('reqRef', response.success?.body?.inventoryNumber);
      routingInfo.setQueryParams({
        response: response.success?.body,
        transRef: response.success?.body?.processId,
        status: "success"
      });
    } else if (response?.error?.error) {
      let errorCode = response.error.error.errorCode;
      this.state.errorMessage = errorCode + ": " + response.error.error.errorMsg;
      if (response.error?.error?.errorCode == 'DEPIAM0002') {
        this._router.navigate(["login-space", "entry-shell", "login", "retail-unlockuser-form"]);
      } else if (response.error?.error?.errorCode == 'DEPIAM0001') {
        this.setErrors('password', { 'username_invalid': response.error?.error?.errorDesc });
        // this.setErrors('username',{ 'username_invalid' : response.error?.error?.errorDesc});
      }
      routingInfo.setQueryParams({
        errMsg: response.error?.error?.errorMsg,
        status: "failed",
      });
    }
    return routingInfo;
  }

  gotoWelcome() {
    this._angularRouter.navigate(['welcome']);
  }
}
