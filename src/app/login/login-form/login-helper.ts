import { Inject, Injectable } from '@angular/core';
import { AppConfigService, CustomCurrAmountService, UserAuthService } from '@dep/services';
import {Location} from '@angular/common';

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
import { RetailOverrideMpinComponent } from 'src/app/prelogin/retail-override-mpin/retail-override-mpin.component';
import { RetailMigratedUserComponent } from 'src/app/prelogin/retail-migrated-user/retail-migrated-user.component';

export class LoginState extends BaseFpxComponentState { 
  rememberDevice:any={
    textPosition:"after",
    ckValues:{checked:"1",unchecked:"0"}
  };
  errorMessage: string = '';
}

@Injectable()
export class LoginHelper extends BaseFpxFormHelper<LoginState> {
  constructor(
    private _userAuth: UserAuthService,
    private _router: Router,
    private _ForgotpasswordService:ForgotpasswordService,
    private _appConfig : AppConfigService
  ) {
    super(new LoginState());
  }

  override doPreInit(){
    this.setServiceCode("RETAILLOGIN");
    this.hideShellActions();
    
  }
  public override doPostInit(): void {
    this.addValueChangeHandler("username", this.handleUserNameOnvalueChange);
  }
 
  public handleUserNameOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE
    //tool generated code based on Orchestration Instructions
    if(value){
      value=value.toUpperCase();
      this._ForgotpasswordService
        .validateuserstatus({
          "username": value
        })()
        .subscribe({
          next: (res) => {
            if(res.body.status==9){
  
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

  };
  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...", payload);
    // let paymentId = this.selectedData.paymentId;
    // if (payload == 1) {
    //   this._transferunfavService.unMarkFavouritePayments(paymentId)
    //     .subscribe((res:any) => {
    //       console.log("Response", res);
    //     });
    // }
    // if(this._device.isMobile()) this.doReverseAction();
  }
  public navToForgotUsername(){
    this._router.navigate(["prelogin-space","entry-shell","login","retail-customer-verification-form"],
    {
      queryParams: {
        serviceCode:"RETAILFORGOTUSERNAME" 
      }
    })
  }
  public navToForgotPassword(){
        this._router.navigate(["prelogin-space", "entry-shell", "login", "retail-forgot-password-form"])
  }

  public navToSelfRegister(){

    this._router.navigate(["prelogin-space","entry-shell","login","retail-customer-verification-form"],
    {
      queryParams: {
        serviceCode:"RETAILSELFREG" 
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
    return payload;
  }

  public override postSubmitInterceptor(
    response: BaseFpxPostSubmitInterceptor
  ): RoutingInfo | null {
    if (response.success) {
      this._appConfig.loadMerchant();
      // this._customCurrAmountService.fetchCurrency();
      const routingInfo = new RoutingInfo();
      routingInfo.setNavigationURL(
        '/dashboard'
      );
      return routingInfo;
    } else if (response.error) {
      // this.state.errorMessage = response.error.error.errorCode + ": " + response.error.error.errorMsg;
      this.state.errorMessage = response.error.error.errorMsg;
      let formError: any = {};
      // formError[errorCode] = true;
      // this.formGroup.setErrors(formError);
      return null;
    } else {
      return null;
    }
  }

  gotoWelcome(){
    this._angularRouter.navigate(['welcome']);
  }
}
