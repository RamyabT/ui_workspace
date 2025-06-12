import { Inject, Injectable } from '@angular/core';
import { AppConfigService, CustomCurrAmountService, UserAuthService } from '@dep/services';
import { Location } from '@angular/common';

import {
  BaseFpxChangeHandler,
  BaseFpxComponentState,
  BaseFpxFormHelper,
  FpxModal,
  FpxModalAfterClosed,
} from '@fpx/core';
import { BaseFpxPostSubmitInterceptor, SpinnerService, RoutingInfo } from '@fpx/core';
import { Router } from '@angular/router';
import { FormControlStatus, FormGroup } from '@angular/forms';
import { ForgotpasswordService } from '../login-validator-services/forgot-password-validator.service';
import { RetailMigratedUserComponent } from 'src/app/prelogin/retail-migrated-user/retail-migrated-user.component';
import { TestLoginService } from '../test-services/test-login.service';
import { OktaAuthService } from 'src/app/okta-integration/okta/okta-auth.service';

export class LoginState extends BaseFpxComponentState {
  rememberDevice: any = {
    textPosition: "after",
    ckValues: { checked: "1", unchecked: "0" }
  };
  errorMessage: string = '';
  forgotMpin: boolean = false;
}

@Injectable()
export class LoginHelper extends BaseFpxFormHelper<LoginState> {
  constructor(
    private _userAuth: UserAuthService,
    private _router: Router,
    private _ForgotpasswordService: ForgotpasswordService,
    private _appConfig: AppConfigService,
    private _testLogin:TestLoginService,
    private _oktaAuthService: OktaAuthService
  ) {
    super(new LoginState());
  }

  override doPreInit() {
    this.setServiceCode("RETAILLOGINAUTH");
    sessionStorage.removeItem('isOktaLogin');
    sessionStorage.removeItem('signInStep');
    sessionStorage.removeItem('id_token');
    sessionStorage.removeItem('access_token');

    this.hideShellActions();

    this._testLogin.clearUserActivity(false);

    if(this._appConfig.hasData('retailForgotMpin')){
      this.state.forgotMpin = true;
    } else {
      this.state.forgotMpin = false;
    }
  }
  public override doPostInit(): void {
    this.addValueChangeHandler("username", this.handleUserNameOnvalueChange);
    this.addValueChangeHandler("password", this.handlePasswordOnvalueChange);
  }
  
  public handleUserNameOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE
    //tool generated code based on Orchestration Instructions
    this.state.errorMessage = "";

    if (value) {
      value = value.toUpperCase();
      this._appConfig.setData('username', value);

      this._ForgotpasswordService
        .validateuserstatus({
          "username": value
        })()
        .subscribe({
          next: (res) => {
            if (res.body.status == 9) {

              let modal = new FpxModal();
              modal.setComponent(RetailMigratedUserComponent);
              modal.setPanelClass('dep-alert-popup');
              modal.setBackDropClass('dep-popup-back-drop');
              modal.setDisableClose(false);
              modal.setData({
                title: "PreloginCheck.title"
              });
              modal.setAfterClosed(this.contextmenuModelAfterClose);
              this.openModal(modal);

            }
          },
          error: (err: any) => {
            console.log(err);
            this.setErrors('username', 'username_invalid')
          },
          complete: () => {

          }
        });
    }
    this.reset('password');
  };

  public handlePasswordOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE
    this.state.errorMessage = "";
  }
 
  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...", payload);
  }
  public navToForgotUsername() {
    this._router.navigate(["prelogin-space", "entry-shell", "login", "retail-customer-verification-form"],
      {
        queryParams: {
          serviceCode: "RETAILFORGOTUSERNAME"
        }
      })
  }
  public navToForgotPassword() {
    this._router.navigate(["prelogin-space", "entry-shell", "login", "retail-forgot-password-form"])
  }

  public navToSelfRegister() {

    this._router.navigate(["prelogin-space", "entry-shell", "login", "retail-customer-verification-form"],
      {
        queryParams: {
          serviceCode: "RETAILSELFREG"
        }
      })
  }

  public override preSubmitInterceptor(payload: any) {
    this.state.errorMessage = '';
    payload = {
      username: payload.username.toUpperCase(),
      password: this._userAuth.encryptPassword(payload.password),
      rememberDevice: (this.getValue('rememberDevice') == true) ? "1" : "0"
    };

    if (this.state.forgotMpin) {
      payload.retailForgotMpin = '1';
    }

    if (this._appConfig.hasData("retailSecondLogin")) {
      payload.retailSecondLogin = '1';
    }

    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    
    if (response.success) {
      this._appConfig.setData('ticket', response.success?.body?.ticket);
      this._appConfig.setData('reqRef', response.success?.body?.inventoryNumber);
      this._appConfig.setData('username', this.getValue('username'));
      this._appConfig.setData('otpService', "PRELOGIN");

      if(response.success?.body?.authToken){
        this._appConfig.removeData('otpService'); 
      }

      
    if (this.state.forgotMpin) {
      this._appConfig.setData('isForgotMpin',true);
    }
      routingInfo.setQueryParams({
        response: response.success?.body,
        transRef: response.success?.body?.processId,
        status: "success"
      });
    } 
    else if (response.error) {
      console.log("Error", response.error?.error)
      let errorCode = response.error.error?.errorCode || response.error.error?.ErrorCode || "";
      let errorMsg = response?.error?.error?.errorMsg || response?.error?.error?.errorMessage || response?.error?.error?.ErrorDescription || "";
      

      if (response.error?.error?.errorCode == 'DEPIAM0002') {
        // temp fix need FPX fix
        setTimeout(() => { this._router.navigate(["login-space", "entry-shell", "login", "retail-unlockuser-form"]); });
        // this.setErrors('username','username_locked',{ 'username_locked' : response.error?.error?.errorDesc}); 
      } else if (response.error?.error?.errorCode == 'DEPIAM0001') {
        this.setErrors('password', { 'userpassword_invalid': response.error?.error?.errorDesc });
        // this.setErrors('username',{ 'username_invalid' : response.error?.error?.errorDesc});
      } else if (response.error?.error?.errorCode == 'DEPIAM0003') {
        this.setErrors('password', 'userpassword_invalid', { 'userpassword_invalid': response.error?.error?.errorDesc });
        // this.setErrors('username',{ 'username_invalid' : response.error?.error?.errorDesc});
      } else if (response.error?.error?.errorCode == 'DEPIAM0005') {
        this.setErrors('password', 'user_invalid',
          { 'user_invalid': response.error?.error?.errorDesc });
        // this.setErrors('username',{ 'username_invalid' : response.error?.error?.errorDesc});
      }else if (response.error?.error?.errorCode == 'DEPERR11006') {
        this.setErrors('password', 'usermap_invalid', { 'usermap_invalid': response.error?.error?.errorDesc });
      } else if (response.error?.error?.errorCode == 'DEPERR11007') {
        this.setErrors('password', 'userblock', { 'userblock': response.error?.error?.errorDesc });
      }
      else {
        this.state.errorMessage = errorMsg;
      }

      routingInfo.setQueryParams({
        errMsg: response.error?.error?.errorMsg || response.error?.error?.errorMessage || response?.error?.error?.ErrorDescription,
        status: "failed",
      });
    }
    return routingInfo;
  }

  gotoWelcome() {
    this._angularRouter.navigate(['welcome']);
  }

  override doDestroy() {
    this._appConfig.removeData('retailForgotMpin');
    this._appConfig.removeData("retailSecondLogin");
  }
}
