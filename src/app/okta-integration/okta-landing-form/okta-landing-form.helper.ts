import { Injectable, NgZone } from "@angular/core";
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
  FpxModal,
  FpxModalAfterClosed
} from "@fpx/core";
import { BehaviorSubject, Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { OktalandingformService } from "../oktalandingform-service/oktalandingform.service";
import { Oktalandingform } from "../oktalandingform-service/oktalandingform.model";
import { DeviceDetectorService } from "@dep/core";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
import { OktaAuthService } from "../okta/okta-auth.service";
import { TestLoginService } from "src/app/login/test-services/test-login.service";
import { DepHttpConfig } from "@dep/services";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { HandleOpenUrlService } from "src/app/common-service/handle-open-url.service";
import { environment } from 'src/environments/environment';
import { FingerprintAIO } from "@awesome-cordova-plugins/fingerprint-aio/ngx";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
import { NativeStorageManager } from "@dep/native";

declare let window: any;
export class OktaLandingFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  enabledBiometric: boolean = false;
  availableBiometricOption: string = "";
  showBiometricRegistration: boolean = false;
  isBiometricLogin: boolean = false;
}


@Injectable()
export class OktaLandingFormHelper extends BaseFpxFormHelper<OktaLandingFormState> {
  private isHybrid: boolean = false;
  loginRes: any;
  dialogRef: any;
  refreshToken: string = "";
  lastLoginTime: string = ""
  logonInventory: string = "";
  currentLoginTime: string = "";
  constructor(
    private oktaLandingFormService: OktalandingformService, 
    private _httpProvider: HttpProviderService, 
    private _router: Router, 
    private _mobileService: DeviceDetectorService,
    private _oktaAuthService: OktaAuthService,
    private _loginService: TestLoginService,
    private _depHttpConfig: DepHttpConfig,
    private commonService: CommonService,
    private _handleOpenUrl: HandleOpenUrlService,
    private _fp: FingerprintAIO,
    private _nativeStorageMgr: NativeStorageManager,
    private _ngZone: NgZone
  ) {
    super(new OktaLandingFormState());
  }

  override doPreInit(): void {
    this.hideShellActions();
    this.setServiceCode("RETAILOKTALOGIN");
  }

  public override doPostInit(): void {
    this.handleFormOnLoad();
  }

  public override preSubmitInterceptor(payload: Oktalandingform): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  public override postDataFetchInterceptor(payload: Oktalandingform) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.oktalandingform,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
  public async handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    this._oktaAuthService.setConfig();
    this.isHybrid = this._mobileService.isHybrid();
    if(this.isHybrid) {
      this.setupMobileRedirectHandler();
      this.checkBiometricAvailability();
    } else {
      this.renderOktaLogin();
    }
  }
  async renderOktaLogin() {
    await this._oktaAuthService._oktaAuth.signInWithRedirect();
  }
  setupMobileRedirectHandler() {
    this._handleOpenUrl.handleOpenUrl$.asObservable().subscribe({
      next: (res) => {
        if(res?.hint == 'login_callback') {
          this._oktaAuthService.tokenExchange("login", {authn: res?.authCode, state: res?.state}).subscribe({
            next: (res: any) => {
              this.hideSpinner();
              if (res?.access_token) {
                // res.access_token = 'eyJraWQiOiI5MXRRMjdiTnlLaGJGWWRic0RaQzlpWjZGclpIQ21HQlFJZmhYS2RKNTBJIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULmNUM2F6M0JsYktYR2lObzFmVmtGTHE3b2tFMlA4aHBnY2VCcm4tTzF2Qmcub2FyMWJ5ZmN0cFYxbUx1d00xZDciLCJpc3MiOiJodHRwczovL2xvZ2luLWRldnByajEudmFuY2l0eS5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNzQ4ODY5Nzc2LCJleHAiOjE3NDg4NzMzNzYsImNpZCI6IjBvYWs4OHgxYTlpT3N6dW1JMWQ3IiwidWlkIjoiMDB1amtxN20waDRqSDNCTE4xZDciLCJzY3AiOlsib2ZmbGluZV9hY2Nlc3MiLCJlbWFpbCIsIm9wZW5pZCIsInByb2ZpbGUiXSwiYXV0aF90aW1lIjoxNzQ4ODY5NzY5LCJjdXJyZW50Q0lGIjoiOTAxNjEzNjQiLCJzdWIiOiI5MDE2MTM2NCJ9.ws1p81Non4MhzzgVrNnDmdfagu-mQwsLFbVNnspgOw2q_M_ZrBD7flvT66bghkCMr21xz7rhYjoCa77-TYqUNvCBModU6BdTUaGaEYG3n7p417Gx9nMSdILmCJ20WscL8m7Hzq-rUls2QLcr0yA0Sc_txZeJZ5e8vt3RwpeGUQeAaRAZceuI0SDXy3JANa5_NBgzAzEwNnmGkTiQlPZNKYDkJHCxrUmLGILjOdToLKOLJd7CRyAzqXth_Wa--TvJ9h4-TqR6tUVc3TqVLtFzqBd5v4V_OP1lbQll7VjWZ7qyAkRXViTH6dKCpJuKedYqcf5R9VakliIdQWpRLjyf6Q';
                // res.id_token = 'eyJraWQiOiI5MXRRMjdiTnlLaGJGWWRic0RaQzlpWjZGclpIQ21HQlFJZmhYS2RKNTBJIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIwMHVqa3E3bTBoNGpIM0JMTjFkNyIsIm5hbWUiOiJRQSBKViIsImVtYWlsIjoibm8tcmVwbHlAbG9naW4udmFuY2l0eS5jb20iLCJ2ZXIiOjEsImlzcyI6Imh0dHBzOi8vbG9naW4tZGV2cHJqMS52YW5jaXR5LmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6IjBvYWs4OHgxYTlpT3N6dW1JMWQ3IiwiaWF0IjoxNzQ4ODY5Nzc2LCJleHAiOjE3NDg4NzMzNzYsImp0aSI6IklELkhuYU4xaDI5Mi1wbldTakllZGJHVEUyaFU3R1JfcXdLU0h1TEJ5S19Wd0UiLCJhbXIiOlsicHdkIl0sImlkcCI6IjBvYWcwZ2h0N3F6dm5PcmNLMWQ3Iiwibm9uY2UiOiI4YzdqWTliaEVOeU5iR3dCem9SZEtlZXo5REdJeTBOaExFZ0xFSUVJYWoyTlVOVWdreUxSbmN4V05LV3V4RE5NIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiOTAxNjEzNjQiLCJhdXRoX3RpbWUiOjE3NDg4Njk3NjksImF0X2hhc2giOiJuSkpKSjNXS3g2ZFdsWEJ2SlRpb1ZnIiwiYXNzb2NpYXRlZFBBTiI6IiIsImN1cnJlbnRBdXRoUEFOIjoiNTgxMzUzMjMyNzk0ODg0OCJ9.rxtqmPu6qB-UjfAlQPD50ov6Bb0WKQTJhnB5tutLgBqQXy2BmaKgt1wdWZz6xafja9OLko3Mo__nUhE-CDp29o_cl28NrgiPRxJJaHpjAx7iySIbKu_CrjNXkHk3Hgyq-Riztu7Db5jRbK2dtVrOuHW5J3kIBmuZQBCKKwXacEltZfNiMCQ7gYpU82hwSZYjbAAo83lZ66V8yDXYYslMVr57K0vEEJnXD_5sQ-kgkf0TxSUmmZlzYDYodf4X_vw8ctqZsAjDMhm4OY4W51Ixgx9gRZ96R4WzSIP3kDDoOZWIq5rV6scdGHwLsxBBKjTQy5KnJ-LEIKGgPb_xpOnW-Q';
                this._depHttpConfig.setCommonHeaderParams('accesstoken', res?.access_token);
                this._depHttpConfig.setCommonHeaderParams('idtoken', res?.id_token);
                this._depHttpConfig.setCommonHeaderParams('authorization', res?.access_token + "|" + res?.id_token);
                this.refreshToken = res?.refresh_token;
                this._oktaAuthService.refreshToken = this.refreshToken;
                if(res?.id_token) {
                  let claims = this._oktaAuthService.decodeMe(res.id_token);
                  // sessionStorage.setItem('signInStep', SIGN_IN_STEPS.DONE);
                  sessionStorage.setItem('username', claims.username);
                  sessionStorage.setItem("customerCode", claims.customerCode as string);
                }
                this.loginRes = {
                    "inventoryNumber": res?.inventoryNumber,
                    "refreshTokenExpiresIn": res?.expires_in,
                    // "accessTokenExpiresIn": data.expires_in,
                    "lastLogin": res?.lastLogin,
                    // "ticket": sessionStorage.getItem('access_token'),
                    "processId": res?.inventoryNumber,
                    "authToken": "",
                    "accessToken": res?.access_token,
                    "idToken": res?.id_token,
                    "refreshToken": this.refreshToken,
                    "lastLoginFailed": "2025-02-19 06:44:34",
                    "currentLogin": res?.currentLogin
                }
                this.proceedFurther();
              } else {
                this._router.navigate(['login']);
              }
            }
          
          })
        }
      }
    })
  }
  checkBiometricAvailability(){
    this._fp.isAvailable()
    .then((result: any) => { //'finger' | 'face' | 'biometric'
      this.state.availableBiometricOption = result;
      this._oktaAuthService.retrieveMemberProfile()
      .then((res: any) => {
        if(res) {
          sessionStorage.setItem("username", res.username);
          sessionStorage.setItem('customerCode', res.customerCode),
          this.refreshToken = res.refreshToken;
          this._oktaAuthService.refreshToken = res.refreshToken;
          this.biometricLogin();
          // this._router.navigate(["login-space", "entry-shell", "login", "enable-biometric"]);
        } else this.renderOktaLogin();
      })
      .catch((err: any) => {
        this._oktaAuthService.memberProfiles = null;
        this.renderOktaLogin();
      });
    })
    .catch((reason) => {
      this.state.availableBiometricOption = "none";
      this.renderOktaLogin();
    })
  }
  // public async mobileSignIn(){
  //   let profile = this._oktaAuthService.memberProfiles;
  //   if(this._oktaAuthService.biometricVerified$) this._oktaAuthService.biometricVerified$.unsubscribe();
  //   this._oktaAuthService.biometricVerified$ = new BehaviorSubject(null);
  //   this._oktaAuthService.biometricVerified$.asObservable().subscribe({
  //     next:async (res: any) => {
  //       if(res == null) return;
  //       this._oktaAuthService.tokenExchange("refresh_token", {'refreshToken': profile.refreshToken })
  //     }
  //   })
  //   this._router.navigate(['login-space', 'entry-shell', 'login', 'mpin-login-form']);
  // }
  private buildOAuthLoginUrl(): Promise<any>{
    console.log("buildOAuthLoginUrl");
    return this._oktaAuthService._oAuthService.createAndSaveNonce().then((nonce: string) => {
      let state: string = Math.floor(Math.random() * 1000000000).toString();
      if (window.crypto) {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        state = array.join().toString();
        const codeVerifier = this._oktaAuthService._oktaAuth.pkce.generateVerifier('');
        const clientId = environment.okta.oidc.mobileClientId || environment.okta.oidc.clientId;
        const redirectUri = environment.okta.oidc.mobileRedirectUri || environment.okta.oidc.redirectUri;
        // return {
        //   "loginUrl": `${environment.okta.oidc.issuer}/v1/authorize?` +
        //     `client_id=${clientId}&` +
        //     'redirect_uri='+ redirectUri + '&' +
        //     'response_type=' + encodeURI('code token id_token') + '&' +
        //     'code_challenge=' + codeVerifier +'&' +
        //     'code_challenge_method=' + this._oktaAuth.pkce.DEFAULT_CODE_CHALLENGE_METHOD +'&' +
        //     'scope=' + encodeURI(environment.okta.oidc.scopes.join(' ')) + '&' +
        //     'state=' + state + '&nonce=' + nonce,
        //   "state": state,
        //   "nonce": nonce,
        //   "codeVerifier": codeVerifier
        // }
        return {
          "loginUrl": `${environment.okta.oidc.issuer}/v1/authorize?` +
            `client_id=${clientId}&` +
            'redirect_uri='+ redirectUri + '&' +
            'response_type=' + encodeURIComponent('code') + '&' +
            'code_challenge=' + codeVerifier +'&' +
            'code_challenge_method=' + this._oktaAuthService._oktaAuth.pkce.DEFAULT_CODE_CHALLENGE_METHOD +'&' +
            'client_secret=RnmbrPLFmUvzSZHf2R7jpt0N6A2VZjlWCyoYIPk6Kc5egQDc_BpgCapZNmP41C_Z' + '&' +
            'scope=' + encodeURIComponent(environment.okta.oidc.scopes.join(' ')) + '&' +
            'state=' + state + '&nonce=' + nonce,
          "state": state,
          "nonce": nonce,
          "codeVerifier": codeVerifier
        }
      }
      return undefined
    })
  }
  // showErrorMessage(error: any){
  //     let modal = new FpxModal();
  //       modal.setComponent(DepAlertComponent);
  //       modal.setPanelClass("dep-alert-popup");
  //       modal.setBackDropClass(["etransfer-send-limits"]);
  //       modal.setDisableClose(false);
  //       modal.setAfterClosed(this.contextmenuModelAfterClose);
  //       modal.setData({
  //         title: error.error,
  //         message: error.error_description,
  //         okBtnLbl: "DEFAULT.DIALOG.ALERT.okBtnLbl",
  //       });
  //       this.openModal(modal);
  // }
  // contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
  //   // this._dialogRef.close(0);
  // }
  proceedFurther(){
    this._oktaAuthService.refreshSessionTimer();
    if(!this._mobileService.isHybrid()) {
      this.goto();
    } else {
      this._loginService.storeCustomerName$?.asObservable().subscribe({next: (res: any) => {
        if(res) this._oktaAuthService.storeMemberProfile();
      }})
      this._oktaAuthService.retrieveMemberProfile()
      .then(
        async (value: any) => {
          if(value) this.goto();
          else {
            this.promptRegisterForBiometric();
            // this._oktaAuthService.biometricRegisteredHandler().then(()=> {
            //   this.goto();
            // })
            // this._router.navigate(["prelogin-space", "entry-shell", "onboarding", "register-device" ]);
          }
          // this.deskLoginStatus$.next(true);
        }
      )
      .catch(async (err: any) => {
        this.promptRegisterForBiometric();
        // this._loginService.onAuthTokenReceived(this.loginRes, this.signOut.bind(this)); 
        // this._oktaAuthService.biometricRegisteredHandler().then(()=> {
        //   this.goto();
        // })
        // this._router.navigate(["prelogin-space", "entry-shell", "onboarding", "register-device" ]);
        // this._router.navigate(['home']);
        // this._router.navigate(["login-space", "entry-shell", "login", "enable-biometric"]);
        // this.deskLoginStatus$.next(true);
      })
    }
  }
  promptRegisterForBiometric() {
    if(this.state.availableBiometricOption != 'none') {
      let title = this.getBiometricRegisterTitle();
      this._ngZone.run(() => {
        let modal = new FpxModal();
        modal.setComponent(DepConfirmationComponent);
        modal.setPanelClass('dep-alert-popup');
        modal.setBackDropClass(['dep-popup-back-drop', 'dep-confirmation-backdrop-2', 'logout-backdrop', 'bottom-transparent-overlay']);
        modal.setDisableClose(true);
        modal.setData({
          title: title.titleKey,
          message: 'registerDeviceForm.enableFaceId.message',
          confirmationIcon: title.result + '-id',
          okBtnLbl: 'registerDeviceForm.enableFaceId.okBtnLbl',
          cancelBtnLbl: 'registerDeviceForm.enableFaceId.cancelBtnLbl'
        });
        modal.setAfterClosed(this.registerBiometricContextCloseHandler);
        this.openModal(modal);
      })
    }
  }
  getBiometricRegisterTitle(): any {
    let titleKey = '', result = '';
    if (this.state.availableBiometricOption == 'finger') {
      titleKey = 'registerDeviceForm.enableFaceId.titleTouch';
      result = 'touch';
    }
    else if (this.state.availableBiometricOption == 'face') {
      titleKey = 'registerDeviceForm.enableFaceId.titleFace';
      result = 'face';
    } else if(this._mobileService.os?.toLowerCase() == 'android') {
      titleKey = 'registerDeviceForm.enableFaceId.titleBiometric';
      result = 'face';
    } else {
      titleKey = 'registerDeviceForm.enableFaceId.titleBiometric';
      result = 'face';
    }
    return {titleKey: titleKey, result: result};
  }
  registerBiometricContextCloseHandler: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (payload == 1) {
      this.registerBiometric();
    } else {
      this._nativeStorageMgr.storeData('deviceAuthEnabled', "0");
      // this._oktaAuthService.biometricRegistered$.next(false);
      this._oktaAuthService.storeMemberProfile();
      this._oktaAuthService.goto();
    }
  }
  registerBiometric() {
    this.state.showBiometricRegistration = true;
    let title='',description='';
    if(this.state.availableBiometricOption=='face'){
        title='Do you want to allow "Vancity" to use Face ID?'
        description="Enabling Face ID allows you to quickly and securely access your account."
    }
    else if(this.state.availableBiometricOption=='biometric'){
      title='Do you want to allow "Vancity" to use biometric?'
      description="Enabling biometric allows you to quickly and securely access your account."
    }
    else{
      title='Do you want to allow "Vancity" to use Touch ID?'
      description="Enabling Touch ID allows you to quickly and securely access your account."
    }
    this._ngZone.run(()=>{
      this._fp.show({title:title,description: description, disableBackup: true, confirmationRequired: false})
      .then((value: any) => {
        // Fingerprint/Face was successfully verified
        this.state.enabledBiometric = value;
        this._nativeStorageMgr.storeData('deviceAuthEnabled', value ? "1" : "0");
        if(value) {
          this._oktaAuthService.storeMemberProfile();
          this.goto();
        }
      }).catch((error: any) => {
        this.state.enabledBiometric = false;
        this.goto();
        console.error("Fingerprint/Face was not successfully verified: ", error.message);
      });
    })
  }
  biometricLogin(){
    let titleMessage = this.getBiometricLoginTitleMessage();
    this._fp.show({ title: titleMessage.title,description: titleMessage.description, confirmationRequired: false, disableBackup: true })
    .then((res: any) => {
      if(res) {
        this.state.isBiometricLogin = true;
        this.biometricLoginHandler(true);
        // this._oktaAuthService.biometricVerified$.next(true);
      } else {
        this.state.isBiometricLogin = false;
        this.invalidBiometricAttempt();
      }
      // this.triggerSubmit();
    })
    .catch((reason: any) => {
      this.state.isBiometricLogin = false;
      if(reason?.code == '-108') {
        // {code: -108, message: 'BIOMETRIC_DISMISSED'}
        this.biometricLoginHandler(false);
        // this._oktaAuthService.biometricVerified$.next(false);
      } else if (reason?.code == '-111') { // Too many attempts
        this.biometricLoginHandler(false);
        // this._oktaAuthService.biometricVerified$.next(false);
      }else {
        // this.invalidBiometricAttempt();
      }
    });
    // this._fp.isAvailable().then((result:any) => {
    //   this.state.availableBiometricOption=result;
    //   let title='',description='';
    //   if(this.state.availableBiometricOption=='face'){
    //       title='Do you want to allow "Vancity" to use Face ID?'
    //       description="Enabling Face ID allows you to quickly and securely access your account."
    //   }
    //   else if(this.state.availableBiometricOption=='biometric'){
    //     title='Do you want to allow "Vancity" to use biometric?'
    //     description="Enabling biometric allows you to quickly and securely access your account."
    //   }
    //   else{
    //     title='Do you want to allow "Vancity" to use Touch ID?'
    //     description="Enabling Touch ID allows you to quickly and securely access your account."
    //   }
    //   this._fp.show({ title: title,description: description, confirmationRequired: false, disableBackup: true })
    //   .then((res: any) => {
    //     if(res) {
    //       this.state.isBiometricLogin = true;
    //       this._oktaAuthService.biometricLoginHandler(true);
    //       // this._oktaAuthService.biometricVerified$.next(true);
    //     } else {
    //       this.state.isBiometricLogin = false;
    //       this.invalidBiometricAttempt();
    //     }
    //     // this.triggerSubmit();
    //   })
    //   .catch((reason: any) => {
    //     this.state.isBiometricLogin = false;
    //     if(reason?.code == '-108') {
    //       // {code: -108, message: 'BIOMETRIC_DISMISSED'}
    //       this._oktaAuthService.biometricLoginHandler(false);
    //       // this._oktaAuthService.biometricVerified$.next(false);
    //     } else if (reason?.code == '-111') { // Too many attempts
    //       this._oktaAuthService.biometricLoginHandler(false);
    //       // this._oktaAuthService.biometricVerified$.next(false);
    //     }else {
    //       // this.invalidBiometricAttempt();
    //     }
    //   });
    // })
    // .catch((reason: any) => {
    //   this._oktaAuthService.biometricLoginHandler(false);
    // })
  }
  biometricLoginHandler(status: boolean) {
    if(status) {
      this._oktaAuthService.tokenExchange("biometric_login", {refreshToken: this.refreshToken}).subscribe({
      next: (res: any) => {
        this.hideSpinner();
        if (res?.access_token) {
          // res.access_token = 'eyJraWQiOiI5MXRRMjdiTnlLaGJGWWRic0RaQzlpWjZGclpIQ21HQlFJZmhYS2RKNTBJIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULmNUM2F6M0JsYktYR2lObzFmVmtGTHE3b2tFMlA4aHBnY2VCcm4tTzF2Qmcub2FyMWJ5ZmN0cFYxbUx1d00xZDciLCJpc3MiOiJodHRwczovL2xvZ2luLWRldnByajEudmFuY2l0eS5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNzQ4ODY5Nzc2LCJleHAiOjE3NDg4NzMzNzYsImNpZCI6IjBvYWs4OHgxYTlpT3N6dW1JMWQ3IiwidWlkIjoiMDB1amtxN20waDRqSDNCTE4xZDciLCJzY3AiOlsib2ZmbGluZV9hY2Nlc3MiLCJlbWFpbCIsIm9wZW5pZCIsInByb2ZpbGUiXSwiYXV0aF90aW1lIjoxNzQ4ODY5NzY5LCJjdXJyZW50Q0lGIjoiOTAxNjEzNjQiLCJzdWIiOiI5MDE2MTM2NCJ9.ws1p81Non4MhzzgVrNnDmdfagu-mQwsLFbVNnspgOw2q_M_ZrBD7flvT66bghkCMr21xz7rhYjoCa77-TYqUNvCBModU6BdTUaGaEYG3n7p417Gx9nMSdILmCJ20WscL8m7Hzq-rUls2QLcr0yA0Sc_txZeJZ5e8vt3RwpeGUQeAaRAZceuI0SDXy3JANa5_NBgzAzEwNnmGkTiQlPZNKYDkJHCxrUmLGILjOdToLKOLJd7CRyAzqXth_Wa--TvJ9h4-TqR6tUVc3TqVLtFzqBd5v4V_OP1lbQll7VjWZ7qyAkRXViTH6dKCpJuKedYqcf5R9VakliIdQWpRLjyf6Q';
          // res.id_token = 'eyJraWQiOiI5MXRRMjdiTnlLaGJGWWRic0RaQzlpWjZGclpIQ21HQlFJZmhYS2RKNTBJIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIwMHVqa3E3bTBoNGpIM0JMTjFkNyIsIm5hbWUiOiJRQSBKViIsImVtYWlsIjoibm8tcmVwbHlAbG9naW4udmFuY2l0eS5jb20iLCJ2ZXIiOjEsImlzcyI6Imh0dHBzOi8vbG9naW4tZGV2cHJqMS52YW5jaXR5LmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6IjBvYWs4OHgxYTlpT3N6dW1JMWQ3IiwiaWF0IjoxNzQ4ODY5Nzc2LCJleHAiOjE3NDg4NzMzNzYsImp0aSI6IklELkhuYU4xaDI5Mi1wbldTakllZGJHVEUyaFU3R1JfcXdLU0h1TEJ5S19Wd0UiLCJhbXIiOlsicHdkIl0sImlkcCI6IjBvYWcwZ2h0N3F6dm5PcmNLMWQ3Iiwibm9uY2UiOiI4YzdqWTliaEVOeU5iR3dCem9SZEtlZXo5REdJeTBOaExFZ0xFSUVJYWoyTlVOVWdreUxSbmN4V05LV3V4RE5NIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiOTAxNjEzNjQiLCJhdXRoX3RpbWUiOjE3NDg4Njk3NjksImF0X2hhc2giOiJuSkpKSjNXS3g2ZFdsWEJ2SlRpb1ZnIiwiYXNzb2NpYXRlZFBBTiI6IiIsImN1cnJlbnRBdXRoUEFOIjoiNTgxMzUzMjMyNzk0ODg0OCJ9.rxtqmPu6qB-UjfAlQPD50ov6Bb0WKQTJhnB5tutLgBqQXy2BmaKgt1wdWZz6xafja9OLko3Mo__nUhE-CDp29o_cl28NrgiPRxJJaHpjAx7iySIbKu_CrjNXkHk3Hgyq-Riztu7Db5jRbK2dtVrOuHW5J3kIBmuZQBCKKwXacEltZfNiMCQ7gYpU82hwSZYjbAAo83lZ66V8yDXYYslMVr57K0vEEJnXD_5sQ-kgkf0TxSUmmZlzYDYodf4X_vw8ctqZsAjDMhm4OY4W51Ixgx9gRZ96R4WzSIP3kDDoOZWIq5rV6scdGHwLsxBBKjTQy5KnJ-LEIKGgPb_xpOnW-Q';
          this._depHttpConfig.setCommonHeaderParams('accesstoken', res?.access_token);
          this._depHttpConfig.setCommonHeaderParams('idtoken', res?.id_token);
          this._depHttpConfig.setCommonHeaderParams('authorization', res?.access_token + "|" + res?.id_token);
          this.refreshToken = res?.refresh_token;
          this._oktaAuthService.refreshToken = this.refreshToken;
          if(res?.id_token) {
            let claims = this._oktaAuthService.decodeMe(res.id_token);
            // sessionStorage.setItem('signInStep', SIGN_IN_STEPS.DONE);
            sessionStorage.setItem('username', claims.username);
            sessionStorage.setItem("customerCode", claims.customerCode as string);
          }
          this.loginRes = {
              "inventoryNumber": res?.inventoryNumber,
              "refreshTokenExpiresIn": res?.expires_in,
              // "accessTokenExpiresIn": data.expires_in,
              "lastLogin": res?.lastLogin,
              // "ticket": sessionStorage.getItem('access_token'),
              "processId": res?.inventoryNumber,
              "authToken": "",
              "accessToken": res?.access_token,
              "idToken": res?.id_token,
              "refreshToken": this.refreshToken,
              "lastLoginFailed": "2025-02-19 06:44:34",
              "currentLogin": res?.currentLogin
          }
          this.proceedFurther();
        } else {
          this._router.navigate(['login']);
        }
      }
    })
    } else {
      this.renderOktaLogin();
    }
  }
  getBiometricLoginTitleMessage(){
    let title = '', description = '';
    if(this.state.availableBiometricOption=='face'){
      title='Do you want to allow "Vancity" to use Face ID?'
      description="Enabling Face ID allows you to quickly and securely access your account."
    }
    else if(this.state.availableBiometricOption=='biometric'){
      title='Do you want to allow "Vancity" to use biometric?'
      description="Enabling biometric allows you to quickly and securely access your account."
    }
    else{
      title='Do you want to allow "Vancity" to use Touch ID?'
      description="Enabling Touch ID allows you to quickly and securely access your account."
    }
    return {title: title, description: description};
  }
  invalidBiometricAttempt() {
    this.renderOktaLogin();
  }
  goto(){
    this._ngZone.run(()=>{
      this._loginService.onAuthTokenReceived(this.loginRes, this._oktaAuthService.signOut.bind(this._oktaAuthService)); 
      this._router.navigate(['home']);
    })
  }
}


