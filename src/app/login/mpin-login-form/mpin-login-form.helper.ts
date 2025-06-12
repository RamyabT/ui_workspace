import { Inject, Injectable } from '@angular/core';
import { AppConfigService, CustomCurrAmountService, UserAuthService } from '@dep/services';

import {
  BaseFpxChangeHandler,
  BaseFpxComponentState,
  BaseFpxFormHelper,
  FpxModal,
  FpxSubmitHandler,
} from '@fpx/core';
import { BaseFpxPostSubmitInterceptor, SpinnerService, RoutingInfo } from '@fpx/core';
import { Router } from '@angular/router';
import { NativeStorageManager } from '@dep/native';
import { FormControlStatus, FormGroup } from '@angular/forms';
import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { TranslateService } from '@ngx-translate/core';
import { OktaAuthService } from 'src/app/okta-integration/okta/okta-auth.service';

export class MpinLoginFormState extends BaseFpxComponentState {
  errorMessage: string = '';
  pinSize: number = 4;
  deviceAuthInfo: any;
  deviceAuthValue: boolean = false;
  deviceAuthEnabled: boolean = false;
  userId: string = '';
  biometricAvailable: string = 'face';
  formSubmitTriggered: boolean = false;
}

@Injectable()
export class MpinLoginFormHelper extends BaseFpxFormHelper<MpinLoginFormState> {
  // welcomeMessage: string = '';
  private availableOption: any;
  constructor(
    public _userAuth: UserAuthService,
    private _customCurrAmountService: CustomCurrAmountService,
    private _router: Router,
    private _nativeStorageMgr: NativeStorageManager,
    private _fp: FingerprintAIO,
    private _appConfig: AppConfigService,
    private _translateService: TranslateService,
    private _oktaAuthService: OktaAuthService
  ) {
    super(new MpinLoginFormState());
  }

  override doPreInit() {
    this.setServiceCode("RETAILMPINLOGIN");
    this.hideShellActions();

    this.state.formSubmitTriggered = false;
    // this._nativeStorageMgr.loadData('deviceAuthEnabled').then(
    //   (value: any) => {
    //     if (value == "1") {
    //       this.state.deviceAuthEnabled = true;
    //     }
    //   }
    // ).catch((reason) => {
    //   this.state.deviceAuthEnabled = false;
    // }
    // );
  }

  override doPostInit() {
    this._oktaAuthService.retrieveMemberProfile().then(profile => {
      if(profile) {
        this.state.deviceAuthInfo = profile;
        this.state.userId = profile?.firstName || 'Guest';
        this.doDeviceAuth();
        // this.addSubmitHandler('submit', this.customSubmitHandler);
      }      
    })
    
    // this._nativeStorageMgr.loadData('deviceAuthInfo')
    //   .then((res: any) => {
    //     // this.state.deviceAuthInfo = JSON.parse(atob(res));
    //     // this.state.userId = this.state.deviceAuthInfo?.firstName || 'Guest';
    //     this.state.deviceAuthInfo = res;
    //   });
    //   this.doDeviceAuth();
    // this.addValueChangeHandler("mpin", this.onMpinValueChangeHandler);
    // setTimeout(() => {
    //   this.setFocus('mpin');
    // }, 1000);
  }

  onMpinValueChangeHandler: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(!this.state.formSubmitTriggered){
      this.state.formSubmitTriggered = true;
      if (value.length == 4) {
        setTimeout(() => {
          this.triggerSubmit();
        });
      } else {
        this.state.formSubmitTriggered = false;
      }
    } 
    
  }

  public navToForgotMpin() {
    this._appConfig.setData('retailForgotMpin', "1");
    if(sessionStorage.getItem('isOktaLogin') == 'true') {
      this._oktaAuthService.signOut();
    } else {
      this._router.navigate(['login-space', 'entry-shell', 'login', 'login-form']);
    }
  }

  public navToNormalLogin() {
    // this._oktaAuthService.biometricVerified$.next(false);
    // this._appConfig.setData("retailSecondLogin", "1");
    // if(sessionStorage.getItem('isOktaLogin') == 'true') {
    //   this._oktaAuthService.signOut();
    // } else {
    //   this._router.navigate(['login-space', 'entry-shell', 'login', 'login-form']);
    // }
  }

  public doDeviceAuth() {
    this.state.deviceAuthValue = false;
    this.state.deviceAuthInfo.invalidAttemptCount = 0;
    this._fp.isAvailable().then((result:any) => {
      this.availableOption=result;
      let title='',description='';
      if(this.availableOption=='face'){
          title='Do you want to allow "Vancity" to use Face ID?'
          description="Enabling Face ID allows you to quickly and securely access your account."
      }
      else if(this.availableOption=='biometric'){
        title='Do you want to allow "Vancity" to use biometric?'
        description="Enabling biometric allows you to quickly and securely access your account."
      }
      else{
        title='Do you want to allow "Vancity" to use Touch ID?'
        description="Enabling Touch ID allows you to quickly and securely access your account."
      }
      this._fp.show({ title: title,description: description, confirmationRequired: false, disableBackup: true })
      .then((res: any) => {
        if(res) {
          this.state.deviceAuthValue = true;
          this._oktaAuthService.biometricVerified$.next(true);
        } else {
          this.state.deviceAuthValue = false;
          this.invalidBiometricAttempt();
        }
        // this.triggerSubmit();
      })
      .catch((reason: any) => {
        this.state.deviceAuthValue = false;
        if(reason?.code == '-108') {
          // {code: -108, message: 'BIOMETRIC_DISMISSED'}
          this._oktaAuthService.biometricVerified$.next(false);
        } else if (reason?.code == '-111') { // Too many attempts
          this._oktaAuthService.biometricVerified$.next(false);
        }else {
          this.invalidBiometricAttempt();
        }
      });
    })
    .catch((reason: any) => {
      this._oktaAuthService.biometricVerified$.next(false);
      // const fpxModal = new FpxModal();
      // fpxModal.setComponent(DepAlertComponent);
      // fpxModal.setDisableClose(false);
      // fpxModal.setPanelClass('dep-alert-popup');
      // fpxModal.setBackDropClass('dep-popup-back-drop');

      // fpxModal.setData({
      //   title: "mpinLoginForm.invalidAttemptReached.title",
      //   message: "mpinLoginForm.invalidAttemptReached.message"
      // });

      // fpxModal.setAfterClosed(this._onCloseAlert.bind(this));
      // this.openModal(fpxModal);
    })
  }
  private customSubmitHandler: FpxSubmitHandler = (payload: any) => {
    // this._oktaAuthService.biometricVerified$.next(true);
    // this._nativeStorageMgr.loadData("deviceAuthInfo")
    // .then(
    //   async (value: any) => {
    //     payload.refreshToken = value;
    //     this.state.deviceAuthInfo.invalidAttemptCount = 0;
    //     this._oktaAuthService.biometricVerified$.next(true);
    //   }
    // )
    // .catch(async (err: any) => {
    //   this._oktaAuthService.biometricVerified$.next(false);
    // })
    return {
      success: (response: any) => {
        console.log('submit handler success');
      },
      error: (error: any) => {
        console.log("error");
      }
    }
  }
  public override preSubmitInterceptor(payload: any) {
    this.state.errorMessage = '';
    let mpin = payload.mpin;
    if (this.state.deviceAuthValue) {
      mpin = this.state.deviceAuthInfo.mpin
    }
    payload = {
      username: this.state.deviceAuthInfo.username.toUpperCase(),
      mpin: this._userAuth.encryptPassword(mpin),
      rememberDevice: "1"
    };
    return payload;
  }

  public override postSubmitInterceptor(response: BaseFpxPostSubmitInterceptor): RoutingInfo | null {
    // if(response?.success) {
    //   this._oktaAuthService.biometricVerified$.next(response?.success?.body);
    // } else {
    //   this._oktaAuthService.biometricVerified$.next(false);
    // }
    if (response?.success) {
      if (response.success?.body?.processId) this._appConfig.setData('reqRef', response.success?.body?.processId);
      this._customCurrAmountService.fetchCurrency();
      let res = response.success?.body;

      const routingInfo = new RoutingInfo();
      routingInfo.setQueryParams({
        response: res
      });
      
      this.state.deviceAuthInfo.invalidAttemptCount = 0;
      let data = btoa(JSON.stringify(this.state.deviceAuthInfo));
      this._nativeStorageMgr.storeData("deviceAuthInfo", data).then((value: any) => {});
      this._oktaAuthService.refreshOktaSession().then(res => {
        if(res) {
          return routingInfo;
        } else {
          return null;
        }
      }).catch(error => {
        return null;
      });
      return routingInfo;
    } else if (response?.error) {
      let errorMessage = "";
      
      if (response?.error?.error?.errorCode == "DEPIAM0010") {
        errorMessage = response.error?.error.errorMsg || response.error?.error.errorMessage || response.error?.error?.ErrorDescription || "";
        this.state.errorMessage = errorMessage;
        this.deRegisterDevice();
      } else if (response?.error?.error?.errorCode == "DEPIAM0026") {
        this._nativeStorageMgr.loadData('deviceAuthInfo')
          .then((res: any) => {
            this.state.deviceAuthInfo = JSON.parse(atob(res));
            if (this.state.deviceAuthInfo.invalidAttemptCount == 2) {
              this.deRegisterDevice();
            } else {
              if(!this.state.deviceAuthInfo.invalidAttemptCount) this.state.deviceAuthInfo.invalidAttemptCount = 0;
              this.state.deviceAuthInfo.invalidAttemptCount = (this.state.deviceAuthInfo.invalidAttemptCount + 1);
              let data = btoa(JSON.stringify(this.state.deviceAuthInfo));
              this._nativeStorageMgr.storeData("deviceAuthInfo", data).then((value: any) => {});

              let errorMsg = this._translateService.instant('mpinLoginForm.invalidMPIN',{count: (3-this.state.deviceAuthInfo.invalidAttemptCount)});
              this.state.errorMessage = errorMsg;
            }
          });
      } else {
        errorMessage = response.error?.error.errorMsg || response.error?.error.errorMessage || response.error?.error?.ErrorDescription || "";
        this.state.errorMessage = errorMessage;
      }
      this.state.formSubmitTriggered = false;
      return null;
    } else {
      this.state.formSubmitTriggered = false;
      return null;
    }
  }
  private invalidBiometricAttempt() {
    if (this.state.deviceAuthInfo.invalidAttemptCount == 2) {
      this.deRegisterDevice();
    } else {
      if(!this.state.deviceAuthInfo.invalidAttemptCount) this.state.deviceAuthInfo.invalidAttemptCount = 0;
      this.state.deviceAuthInfo.invalidAttemptCount = (this.state.deviceAuthInfo.invalidAttemptCount + 1);
      // let data = btoa(JSON.stringify(this.state.deviceAuthInfo));
      // this._nativeStorageMgr.storeData("deviceAuthInfo", data).then((value: any) => {});

      // let errorMsg = this._translateService.instant('mpinLoginForm.invalidMPIN',{count: (3-this.state.deviceAuthInfo.invalidAttemptCount)});
      // this.state.errorMessage = errorMsg;
    }
  }
  deRegisterDevice(){
    this._oktaAuthService.clearMemberProfile();

    const fpxModal = new FpxModal();
    fpxModal.setComponent(DepAlertComponent);
    fpxModal.setDisableClose(false);
    fpxModal.setPanelClass('dep-alert-popup');
    fpxModal.setBackDropClass('dep-popup-back-drop');

    fpxModal.setData({
      title: "mpinLoginForm.invalidAttemptReached.title",
      message: "mpinLoginForm.invalidAttemptReached.message"
    });

    fpxModal.setAfterClosed(this._onCloseAlert.bind(this));
    this.openModal(fpxModal);
  }

  _onCloseAlert(action: any) {
    // this._oktaAuthService.signOut();
    this._oktaAuthService.biometricVerified$.next(false);
    // this._angularRouter.navigate(['login-space', 'entry-shell', 'login', 'login-form']);
  }
}
