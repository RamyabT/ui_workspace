import { Inject, Injectable, NgZone } from '@angular/core';
// import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth, { AccessToken, AuthState, IDToken, RefreshToken, SigninWithCredentialsOptions, SignoutOptions } from '@okta/okta-auth-js';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import OktaSignIn from '@okta/okta-signin-widget';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DeviceDetectorService } from '@dep/core';
import { OAuthService, AuthConfig, LoginOptions } from 'angular-oauth2-oidc';
import { SpinnerDialog } from '@awesome-cordova-plugins/spinner-dialog/ngx';
import { NativeStorageManager } from '@dep/native';
import { TestLoginService } from 'src/app/login/test-services/test-login.service';
import { AppConfigService, DepHttpConfig, UserAuthService } from '@dep/services';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed, IHttpSuccessPayload } from '@fpx/core';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';
import { HandleOpenUrlService } from 'src/app/common-service/handle-open-url.service';

declare let window: any;
const SIGN_IN_STEPS: any = {
  INIT: "show_login",
  FETCH_PROFILE: "fetch_profile",
  DONE: "done"
}
@Injectable({
  providedIn: 'root'
})
export class OktaAuthService extends BaseFpxFunctionality{
  isAuthenticated$!: Observable<boolean>;
  dialogRef: any;
  oktaConfig: any;
  biometricRegistered$: BehaviorSubject<any> = new BehaviorSubject(null);
  biometricVerified$: BehaviorSubject<any> = new BehaviorSubject(null);
  deskLoginStatus$: BehaviorSubject<any> = new BehaviorSubject(null);
  loginRes: any;
  _oktaAuth!: OktaAuth;
  _authConfig!: AuthConfig;
  isAccessTokenCheck: boolean = false;
  isUserClaimsCheck: boolean = false;
  private storeBiometric: boolean = false;
  refreshToken: string = "";
  lastLoginTime: string = ""
  logonInventory: string = "";
  currentLoginTime: string = "";
  memberProfiles: any = null;
  // private _dialogRef: MatDialogRef<any>;
  constructor(
    // private _oktaStateService: OktaAuthStateService,
    // private _oktaSignIn: OktaSignIn,
    private _router: Router,
    // @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth,
    private _mobileService: DeviceDetectorService,
    public _oAuthService: OAuthService,
    private _spinner: SpinnerDialog,
    private _loginService: TestLoginService,
    private _nativeStorageMgr: NativeStorageManager,
    private _depHttpConfig: DepHttpConfig,
    private _ngZone: NgZone,
    private _userAuth: UserAuthService,
    private commonService:CommonService,
    private _fp: FingerprintAIO,
    private _appConfig: AppConfigService,
    private _handleOpenUrl: HandleOpenUrlService,
    private _commonService: CommonService
  ) { 
    super();
    
  }
  setConfig(){
    this.setOktaConfig();
    this._oktaAuth = this.getOktaConfig();
    this._authConfig = this.getAuthConfig();
    this._oAuthService.configure(this._authConfig);
    this.initAuthConfig();
  }
  async setOktaConfig() {
    console.log("setOktaConfig");
    let clientId = environment.okta?.oidc?.clientId;
    let redirectUri = environment.okta?.oidc?.redirectUri;
    let postLogoutRedirectUri = environment.okta?.oidc?.postLogoutRedirectUri;
    if(this._mobileService.isHybrid()) {
      clientId = environment.okta?.oidc?.mobileClientId;
      redirectUri = environment.okta?.oidc?.mobileRedirectUri;
      postLogoutRedirectUri = environment.okta?.oidc?.mobilePostLogoutRedirectUri;
    } else if(sessionStorage.getItem('mobileLogin') == 'true') {
      clientId = environment.okta?.oidc?.mobileClientId;
    }

    this._oktaAuth = new OktaAuth({
      "issuer": environment.okta?.oidc?.issuer,
      "clientId": clientId,
      "redirectUri": redirectUri,
      "postLogoutRedirectUri": postLogoutRedirectUri,
      "scopes": environment.okta?.oidc?.scopes,
      "responseType": "code"
    })
    // const oauth2 = await this.buildOAuthLoginUrl();
    this._authConfig = new AuthConfig({
      "issuer": environment.okta?.oidc?.issuer,
      // loginUrl: oauth2.loginUrl,
      "clientId": clientId,
      "redirectUri": redirectUri,
      "postLogoutRedirectUri": postLogoutRedirectUri,
      "scope": environment.okta?.oidc?.scopes.join(" "),
      "responseType": "code"
    })
  }
  getOktaConfig(): OktaAuth {
    console.log("AuthConfig");
    if(!this._oktaAuth) this.setOktaConfig();
    return this._oktaAuth;
  }
  getAuthConfig(): AuthConfig {
    console.log("getOktaConfig");
    if(!this._authConfig) this.setOktaConfig();
    return this._authConfig;
  }
  private initAuthConfig():void{
    // this._oktaAuth = this.getOktaConfig();
    // this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
    //   filter((s:AuthState) => !!s),
    //   map((s:AuthState) => s.isAuthenticated ?? false)
    // );
  }
  public async signIn(): Promise<void>{
    this.storeBiometric = false;
    sessionStorage.removeItem("enroll");
    sessionStorage.setItem('isOktaLogin', 'true');
    sessionStorage.setItem('signInStep', SIGN_IN_STEPS.INIT);
    if(this._mobileService.isHybrid()) {
      new Promise((resolve, reject)=> {
        this.retrieveMemberProfile()
          .then(
            async (value: any) => {
              if(this.biometricVerified$) this.biometricVerified$.unsubscribe();
              this.biometricVerified$ = new BehaviorSubject(null);
              this.biometricVerified$.asObservable().subscribe({
                next:async (res: any) => {
                  if(res == null) return;
                  if (res) {
                    this._loginService.refreshToken(value).subscribe({
                      next: (logres: any) => {
                        if(logres == null) return;
                        let result = logres.body;
                        this.storeBiometric = true;
                        sessionStorage.setItem('signInStep', SIGN_IN_STEPS.FETCH_PROFILE);
                        let claims = {
                          userId: value.userId,
                          customerCode: value.customerCode,
                          accessToken: result?.access_token,
                          idToken: value.idToken,
                          refreshToken: result?.refresh_token,
                          firstName: value.firstName
                        }
                        this.refreshToken = result?.refresh_token;
                        this._ngZone.run(()=>{
                          sessionStorage.setItem('signInStep', SIGN_IN_STEPS.DONE);
                          sessionStorage.setItem('username', claims.userId);
                          sessionStorage.setItem("customerCode", claims.customerCode as string);
                          this._depHttpConfig.setCommonHeaderParams('accesstoken', claims.accessToken);
                          this._depHttpConfig.setCommonHeaderParams('idtoken', claims.idToken);
                          this._depHttpConfig.setCommonHeaderParams('authorization', claims.accessToken + "|" + claims.idToken);
                          this.storeMemberProfile();
                          this.commonService.fetchLoginDetails(true).subscribe({
                            next: (loggedonres: any) => {
                              if(loggedonres.errorCode) {
                                if(loggedonres.errorCode == 'DEPIAM0001') {
                                  this._router.navigate(['noaccess'])
                                }
                                return;
                              }
                              this.logonInventory = loggedonres.inventoryNumber;
                              this.lastLoginTime = loggedonres.lastLogin;
                              this.currentLoginTime = loggedonres.currentLogin;
                              this.loginRes = {
                                "inventoryNumber": loggedonres.inventoryNumber,
                                "refreshTokenExpiresIn": "3600",
                                // "accessTokenExpiresIn": "1800",
                                "lastLogin": loggedonres.lastLogin,
                                // "ticket": sessionStorage.getItem('access_token'),
                                "processId": loggedonres.inventoryNumber,
                                "authToken": "",
                                "accessToken": claims.accessToken,
                                "idToken": claims.idToken,
                                "refreshToken": claims.refreshToken,
                                "lastLoginFailed": "2025-02-19 06:44:34",
                                "currentLogin": loggedonres.currentLogin
                              }
                              this._loginService.storeCustomerName$?.asObservable().subscribe({next: (res: any) => {
                                if(res) this.storeMemberProfile();
                              }})
                              this._loginService.onAuthTokenReceived(this.loginRes, this.signOut.bind(this));
                              this._router.navigate(['home']);
                              resolve(true);
                            },
                            error: (err:any) => {
                              if(err.error?.errorCode) {
                                if(err.error?.errorCode == 'DEPIAM0001') {
                                  this._router.navigate(['noaccess'])
                                }
                                return;
                              }
                            }
                          });
                        })
                      },
                      error:async (err: any) => {
                        if(sessionStorage.getItem('mobileLogin') == 'true') {
                          await this._oktaAuth.signInWithRedirect();
                        } else {
                          this.mobileSignIn().then(async (res) => {
                            // resolve(this.getUserInfo());
                            resolve(true);
                          }, (reason) => {
                            this.showErrorMessage(reason)
                          });
                        }
                      },
                    });
                  } else {
                    if(sessionStorage.getItem('mobileLogin') == 'true') {
                      await this._oktaAuth.signInWithRedirect();
                    } else {
                      sessionStorage.clear();
                      this.mobileSignIn().then(async (res) => {
                        // resolve(this.getUserInfo());
                        resolve(true);
                      }, (reason) => {
                        this.showErrorMessage(reason)
                      });
                    }
                  }
                }
              })
              this._router.navigate(['login-space', 'entry-shell', 'login', 'mpin-login-form']);
            }
          )
          .catch(async (err: any) => {
            if(sessionStorage.getItem('mobileLogin') == 'true') {
              await this._oktaAuth.signInWithRedirect();
            } else {
              this.mobileSignIn().then(async (res) => {
                // resolve(this.getUserInfo());
                resolve(true);
              }, (reason) => {
                this.showErrorMessage(reason)
              });
            }
          })
      })
    } else {
      // await this._oktaAuth.signInWithRedirect();
      new Promise(async(resolve, reject) => {
        this.deskLoginStatus$.asObservable().subscribe({   
          next: (value: any) => {
            this.hideSpinner();
            resolve(true);
          }
        })
        await this._oktaAuth.signInWithRedirect();
      })
      
    }
  }
  refreshSessionTimer(){
    this._loginService.refreshOktaSession$.asObservable().subscribe({
      next: (res: any) => {
        if(res == null) return;
        this.refreshOktaSession();
      }
    })
  }
  private generateStateNonce(){

  }
  mobileSignInWidget() {
    this._router.navigate(['oktalogin']);
  }
  mobileSignInWithoAuth2(){
    
  }
  public mobileSignIn(): Promise<any> {
    this.showSpinner();
    this.setupMobileRedirectHandler();
    return new Promise(async(resolve, reject)=>{
      this.deskLoginStatus$.asObservable().subscribe(() => {
        next: (value: any) => {
          this.hideSpinner();
          resolve(this);
        }
      })
      await this._oktaAuth.signInWithRedirect();
    })
    return new Promise(async (resolve, reject) => {
      const oauth2 = await this.buildOAuthLoginUrl();
      console.log("loginUrl: " + oauth2.loginUrl);
      let target = '_blank';
      let options = 'location=no,toolbar=no,hidenavigationbuttons=yes,zoom=no,user-scalable=no';
      if (window.cordova && window.cordova.InAppBrowser) {
        this.dialogRef = window.cordova.InAppBrowser.open(oauth2.loginUrl, target, options);
      } else {
        this.dialogRef = window.open(environment.baseURL, target, options);
      }
      this.dialogRef.addEventListener('loadstart', async (event: any) => {
        if (event.url.indexOf("vansit:/callback") >= 0) {
          this.dialogRef.hide();
          const authCode = this.getParameterByName('code', event.url);
          const state = this.getParameterByName('code', event.url);
          let oktaStorage = JSON.parse(sessionStorage.getItem('okta-transaction-storage') || "{}");
          oktaStorage.codeVerifier = oauth2.codeVerifier;
          sessionStorage.setItem('okta-transaction-storage', JSON.stringify(oktaStorage));
          if(authCode) {
            this.dialogRef.closeAll();
            this.tokenExchange(authCode, state);
          }
        }
      });
      this.deskLoginStatus$.asObservable().subscribe({
        next: (value: any) => {
          this.hideSpinner();
          resolve(this);
        }
      })
      // this.dialogRef.addEventListener('exit', function (event: any) {
      //   // reject('The Okta sign in flow was canceled');
      //   reject({error: "", error_description: 'The Okta sign in flow was canceled'});
      // });
    })
    return new Promise(async (resolve, reject) => {
      const loginUrl = environment.baseURL + "/dit-dep24-retail/home";
      let target = '_blank';
      let options = 'location=no,toolbar=no,hidenavigationbuttons=yes,zoom=no,user-scalable=no';
      if (window.cordova && window.cordova.InAppBrowser) {
        this.dialogRef = window.cordova.InAppBrowser.open(loginUrl, target, options);
      } else {
        this.dialogRef = window.open(environment.baseURL, target, options);
      }
      this.dialogRef.addEventListener('loadstop', (event: any) => {
        // if(event.url == loginUrl) {
          // executeScript();
        // }
      });
      this.dialogRef.addEventListener('loadstart', async (event: any) => {
        if(event.url == loginUrl) {
          this.executeScript();
        } else if (event.url.indexOf("/login/callback") >= 0) {
          this.dialogRef.hide();
        }
      });
      this.deskLoginStatus$.asObservable().subscribe({
        next: (value: any) => {
          this.hideSpinner();
          resolve(this);
        }
      })
      // this.dialogRef.addEventListener('exit', function (event: any) {
      //   // reject('The Okta sign in flow was canceled');
      //   reject({error: "", error_description: 'The Okta sign in flow was canceled'});
      // });
    })
      
    return new Promise(async (resolve, reject) => {
      const oauth2 = await this.buildOAuthLoginUrl();
      console.log("loginUrl: " + oauth2.loginUrl);
      let target = '_blank';
      let options = 'location=no,toolbar=no,hidenavigationbuttons=yes,zoom=no,user-scalable=no';
      if (window.cordova && window.cordova.InAppBrowser) {
        this.dialogRef = window.cordova.InAppBrowser.open(oauth2.loginUrl, target, options);
      } else {
        this.dialogRef = window.open(oauth2.loginUrl, target, options);
      }
      this.dialogRef.addEventListener('loadstart', async (event: any) => {
        if ((event.url).indexOf(environment.okta.oidc.mobileRedirectUri) === 0) {
          this.dialogRef.removeEventListener('exit', () => {});
          this.dialogRef.close();
          // this._oktaAuth.storeTokensFromRedirect()
          let isAuthenticated = await this._oktaAuth.isAuthenticated();
          console.log("is mobile app login authenticated: " + isAuthenticated + " : " + event.url);
          this.isAuthenticated$.subscribe((res: any) => {
            console.log("Okta auth service auth check result" + res);
            console.dir(res);
          })
          // await this.
          const responseParameters = event.url.indexOf('#') ? ((event.url).split('#')[1]).split('&') : ((event.url).split('?')[1]).split('&');
          const parsedResponse:any = {};
          let hasError = true, defaultError = 'Problem authenticating with Okta';
          for (let i = 0; i < responseParameters.length; i++) {
            parsedResponse[responseParameters[i].split('=')[0]] =
            responseParameters[i].split('=')[1];
          }
          parsedResponse.nonce = oauth2.nonce;
          if(parsedResponse['error']) {
            console.log("Okta Login issue");
            console.error(parsedResponse['error']);
            console.error(parsedResponse['error_description']);
            reject({error: parsedResponse['error'], error_description: parsedResponse['error_description']?.replace(/\+/g, "")});
          } else if (parsedResponse['state'] !== oauth2.state) {
            // reject(defaultError);
            reject({error: "", error_description: defaultError});
          } else if (parsedResponse['access_token'] !== undefined &&
            parsedResponse['access_token'] !== null) {
            // resolve(parsedResponse);
            resolve(this.oauthLoginForMobileApp(parsedResponse));
          } else {
            // reject(defaultError);
            reject({error: "", error_description: defaultError});
          }
        }
      });
      // this.dialogRef.addEventListener('exit', function (event: any) {
      //   // reject('The Okta sign in flow was canceled');
      //   reject({error: "", error_description: 'The Okta sign in flow was canceled'});
      // });
    })
  }
  private executeScript() {
    let script = "sessionStorage.setItem('isOktaLogin', 'true');\
    sessionStorage.setItem('mobileLogin', 'true');\
    if(iabPostMessage) iabPostMessage();"
    this.dialogRef.executeScript({
    code: script
    }, (params: any) => {
      console.log("hello world");
      if(params[0]) {
        if(params[0].isAccessTokenObtained == true && !this.isAccessTokenCheck) {
          this.isAccessTokenCheck = true;
          
        }
        if(this.isAccessTokenCheck) {
          this.dialogRef.hide();
        }
        if(params[0].claimsObtained == true && !this.isUserClaimsCheck) {
          let claims = params[0];
          if(claims && claims.customerCode && claims.accessToken && claims.idToken && claims.refreshToken) {
            claims.userId = claims.userId || claims.customerCode;
            claims.username = claims.username || claims.customerCode;
            this.isUserClaimsCheck = true;
            console.dir(claims);
            this.dialogRef.close();
            this._ngZone.run(()=>{
              this.setUserInfoFromWeb(claims);
              // resolve(true);
            })
          }
        }
      }
    })
    if(!this.isUserClaimsCheck) setTimeout(this.executeScript.bind(this), 1000);
  }
  private async oauthLoginForMobileApp(res: any): Promise<any>{
    return new Promise((resolve, reject) => {
      console.log("mobile signin response handler");
      console.dir(res);
      const idToken = res.id_token;
      const accessToken = res.access_token;
      const nonce = res.nonce;
      console.log(`ID TOKEN = '${idToken}'`);
      console.log(`ACCESS TOKEN = '${accessToken}'`);
      const keyValuePair = `#client_id=${this._mobileService.isHybrid() ? environment.okta.oidc.mobileClientId : environment.okta.oidc.clientId}&id_token=${encodeURIComponent(idToken)}&access_token=${encodeURIComponent(accessToken)}&nonce=${nonce}&state=${res.state}&code_challenge=${res.code}&=code_challenge_method=${this._oktaAuth.pkce.DEFAULT_CODE_CHALLENGE_METHOD}`;
      console.log("keyValuePair: " + keyValuePair);
      this._depHttpConfig.setCommonHeaderParams('accesstoken',   accessToken);
        this._depHttpConfig.setCommonHeaderParams('idtoken',  idToken);
      this._oAuthService.tryLogin({
        customHashFragment: keyValuePair,
        disableOAuth2StateCheck: true,
        disableNonceCheck: true
      }).then(async () => {
        console.log("Am I authenticated2: " + this._oAuthService.hasValidAccessToken());
        resolve(true);
        // this._router.navigate(['welcome', 'welcomeuser']);
      }, (error) => {
        console.log(`ERROR DURING LOGIN = ${JSON.stringify(error)}`);
        reject(`ERROR DURING LOGIN = ${JSON.stringify(error)}`);
        reject({error: "ERROR DURING LOGIN", error_description: JSON.stringify(error)});
      })
    })
  }
  private buildOAuthLoginUrl(): Promise<any>{
    console.log("buildOAuthLoginUrl");
    return this._oAuthService.createAndSaveNonce().then((nonce: string) => {
      let state: string = Math.floor(Math.random() * 1000000000).toString();
      if (window.crypto) {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        state = array.join().toString();
        const codeVerifier = this._oktaAuth.pkce.generateVerifier('');
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
            'code_challenge_method=' + this._oktaAuth.pkce.DEFAULT_CODE_CHALLENGE_METHOD +'&' +
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
  private buildOAuthLogoutUrl() {
    return environment.okta?.oidc?.issuer + "v1/logout?post_logout_redirect_uri" + environment.okta?.oidc?.mobilePostLogoutRedirectUri;
  }
  
  public signOut(_isSignout: number = 1) {
    if(this._mobileService.isHybrid()) {
      this.mobileSignout(_isSignout);
    } else {
      this.desktopSignout(_isSignout);
    }
  }
  async desktopSignout(_isSignout: number) {
    let signoutOptions: SignoutOptions = {
      // postLogoutRedirectUri: 'https://igcbdemos18.intellectfabric.io/dep-retail-online/'
      postLogoutRedirectUri: this._mobileService.isHybrid() ? environment.okta.oidc.mobilePostLogoutRedirectUri : environment.okta.oidc.postLogoutRedirectUri,
      clearTokensBeforeRedirect: true
      // idToken: {'idToken': this._oktaAuth.getIdToken(), issuer: environment.okta.oidc.issuer, clientId: this._mobileService.isHybrid() ? environment.okta.oidc.mobileClientId : environment.okta.oidc.clientId} as IDToken,
    };
    this._depHttpConfig.commonHeaderParam.delete('refreshtoken');
    this._depHttpConfig.commonHeaderParam.delete('accesstoken');
    this._depHttpConfig.commonHeaderParam.delete('idtoken');
    if(_isSignout) {
      sessionStorage.removeItem('isOktaLogin');
      sessionStorage.removeItem('signInStep');
      sessionStorage.removeItem('id_token');
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('customerCode');
      await this._oktaAuth.signOut(signoutOptions);
    } else {
      await this._oktaAuth.revokeRefreshToken({refreshToken: this._depHttpConfig.commonHeaderParam.get('refreshtoken')} as RefreshToken);
      await this._oktaAuth.revokeAccessToken({accessToken: this._depHttpConfig.commonHeaderParam.get('accesstoken')} as AccessToken);
    }
    
  }
  mobileSignout(_isSignout: number) {
    sessionStorage.clear();
    this._depHttpConfig.commonHeaderParam.delete('refreshtoken');
    this._depHttpConfig.commonHeaderParam.delete('accesstoken');
    this._depHttpConfig.commonHeaderParam.delete('idtoken');
    if(_isSignout) window.location = "index.html";
    // this._router.navigate(['welcome']);
    // this._oktaAuth.revokeAccessToken();
    // this._oAuthService.revokeTokenAndLogout();
    // const logoutRedirectUri = environment.okta.oidc.mobilePostLogoutRedirectUri || environment.okta.oidc.postLogoutRedirectUri;
    // const logoutUrl = environment.okta?.oidc?.issuer + "/v1/logout?post_logout_redirect_uri=" + logoutRedirectUri;
    // console.log("logoutUrl: " + logoutUrl);
    // let target = '_blank';
    // let options = 'location=no,clearsessioncache=yes,clearcache=yes,toolbar=no,hidenavigationbuttons=yes,zoom=no';
    // if (window.cordova && window.cordova.InAppBrowser) {
    //   this.dialogRef = window.cordova.InAppBrowser.open(logoutUrl, target, options);
    // } else {
    //   this.dialogRef = window.open(logoutUrl, target, options);
    // }
    // this.dialogRef.addEventListener('loadstart', async (event: any) => {
    //   if ((event.url).indexOf(logoutRedirectUri) === 0) {
    //     this.dialogRef.removeEventListener('exit', () => {});
    //     this.dialogRef.close();
    //   }
    // });
    // this.dialogRef.addEventListener('exit', function (event: any) {
      
    // });
  }
  public getToken(): string {
    const accessToken = this._oktaAuth.getAccessToken() || "";
    this._depHttpConfig.setCommonHeaderParams('accesstoken', '' + accessToken);
    return accessToken;
  }
  async getUserInfo(claims?:any): Promise<boolean>{
    console.log("getUserInfo");
    return new Promise(async(resolve, reject) => {
      sessionStorage.setItem('signInStep', SIGN_IN_STEPS.DONE);
      console.log("Signin process completed");
      let userClaims: any, accessToken: any, idToken:any;
      // if(this._mobileService.isHybrid()){
      //   // userClaims = claims;
      //   userClaims = this._oAuthService.getIdentityClaims();
      //   console.log(this._oAuthService.refreshToken);
      //   console.log(this._oAuthService.getAccessTokenExpiration());
      //   console.log(this._oAuthService.getIdTokenExpiration());
      //   this._oAuthService.logoutUrl = this.buildOAuthLogoutUrl();
      //   console.dir(userClaims);
        
      //   refreshToken = this._oAuthService.getRefreshToken() || "";
      //   accessToken = this._oAuthService.getAccessToken() || "";
      //   idToken = this._oAuthService.getIdToken() || "";
      // } else {
      //   refreshToken = this._oktaAuth.getRefreshToken() || "";
      //   accessToken = this._oktaAuth.getAccessToken() || "";
      //   idToken = this._oktaAuth.getIdToken() || "";
      //   userClaims = await this._oktaAuth.getUser();
      // }

      this.refreshToken = this._oktaAuth.getRefreshToken() || "";
      accessToken = this._oktaAuth.getAccessToken() || "";
      idToken = this._oktaAuth.getIdToken() || "";
      userClaims = await this._oktaAuth.getUser();
      
      console.log("refreshToken: " + this.refreshToken);
      console.log("accessToken: " + accessToken);
      console.log("idToken: " + idToken);
      console.log("-----------------------o>> User Claims <<o-----------------------")
      console.dir(userClaims);
      let userId: string = (userClaims.currentAuthPAN || userClaims.preferred_username) as string;
      console.log("userId from userID: " + userId);
      let customerCode: string = userClaims.preferred_username as string;
      if(!customerCode) customerCode = userClaims.preferred_username as string;
      console.log("userId from customerCode: " + customerCode);
      if(!userId) {
        console.error('Current CIF is not found in the user info. Unable to proceed further!');
        reject({error: "", error_description: 'Current CIF is not found in the user info. Unable to proceed further!'});
        return;
      }
      
      sessionStorage.setItem('username', userId);
      sessionStorage.setItem("customerCode", customerCode as string);
      if(sessionStorage.getItem('mobileLogin') == 'true') {
        sessionStorage.setItem('access_token', accessToken);
        sessionStorage.setItem('id_token', idToken);
        sessionStorage.setItem('refreshToken', this.refreshToken);
        reject("This is mobile login");
      } else {
        this._depHttpConfig.setCommonHeaderParams('accesstoken', accessToken);
        this._depHttpConfig.setCommonHeaderParams('idtoken', idToken);
        this._depHttpConfig.setCommonHeaderParams('authorization', accessToken + "|" + idToken);

        // this._spinner.show();
        // resolve(true);
        this.commonService.fetchLoginDetails(true).subscribe({
          next: (res: any) => {
            if(res.errorCode) {
              if(res.errorCode == 'DEPIAM0001') {
                this._router.navigate(['noaccess'])
              }
              return;
            }
            this.loginRes = {
              "inventoryNumber": res.inventoryNumber,
              "refreshTokenExpiresIn": 3600,
              // "accessTokenExpiresIn": 180, // this._oAuthService.getAccessTokenExpiration(),
              "lastLogin": res.lastLogin,
              // "ticket": sessionStorage.getItem('access_token'),
              "processId": res.inventoryNumber,
              "authToken": "",
              "accessToken": accessToken,
              "idToken": idToken,
              "refreshToken": this.refreshToken,
              "lastLoginFailed": "2025-02-19 06:44:34",
              "currentLogin": res.currentLogin
            }
            this.refreshSessionTimer();
            if (!this._mobileService.isHybrid()) {

              this._loginService.onAuthTokenReceived(this.loginRes, this.signOut.bind(this));
              resolve(true);
            } else {
              this.retrieveMemberProfile()
                .then(
                  async (value: any) => {
                    this._loginService.onAuthTokenReceived(this.loginRes, this.signOut.bind(this));
                    resolve(true);
                  }
                )
                .catch(async (err: any) => {
                  this._loginService.onAuthTokenReceived(this.loginRes, this.signOut.bind(this));
                  this.biometricRegisteredHandler().then(() => {
                    this._loginService.onAuthTokenReceived(this.loginRes, this.signOut.bind(this));
                    this._router.navigate(['home']);
                    resolve(true);
                  })
                  this._router.navigate(["login-space", "entry-shell", "login", "enable-biometric"]);
                })
            }
          },
          error: (err:any) => {
            if(err.error?.errorCode) {
              if(err.error?.errorCode == 'DEPIAM0001') {
                this._router.navigate(['noaccess'])
              }
              return;
            }
          }
        });
      }
    })
  }
  setUserInfoFromWeb(claims?:any){
    new Promise((resolve, reject) => {
      this.refreshToken = claims.refreshToken;
      sessionStorage.setItem('signInStep', SIGN_IN_STEPS.DONE);
      sessionStorage.setItem('username', claims.userId);
      sessionStorage.setItem("customerCode", claims.customerCode as string);
      this._depHttpConfig.setCommonHeaderParams('accesstoken', claims.accessToken);
      this._depHttpConfig.setCommonHeaderParams('idtoken', claims.idToken);
      this._depHttpConfig.setCommonHeaderParams('authorization', claims.accessToken + "|" + claims.idToken);
      
      this.commonService.fetchLoginDetails(true).subscribe({
        next: (res: any) => {
          if(res.errorCode) {
            if(res.errorCode == 'DEPIAM0001') {
              this._router.navigate(['noaccess'])
            }
            return;
          }
          this.loginRes = {
            "inventoryNumber": res.inventoryNumber,
            "refreshTokenExpiresIn": "3600",
            // "accessTokenExpiresIn": "1800",
            "lastLogin": res.lastLogin,
            // "ticket": sessionStorage.getItem('access_token'),
            "processId": res.inventoryNumber,
            "authToken": "",
            "accessToken": claims.accessToken,
            "idToken": claims.idToken,
            "refreshToken": claims.refreshToken,
            "lastLoginFailed": "2025-02-19 06:44:34",
            "currentLogin": res.currentLogin
          }
          this._loginService.storeCustomerName$?.asObservable().subscribe({
            next: (res: any) => {
              if(res) this.storeMemberProfile();
            }
          })
          this.refreshSessionTimer();
          this._nativeStorageMgr
            .loadData("deviceAuthEnabled")
            .then((res: any) => {
              if (res == "0" || res == "1") {
                this._loginService.onAuthTokenReceived(
                  this.loginRes,
                  this.signOut.bind(this)
                );
                this._router.navigate(["home"]);
                resolve(true);
                this.deskLoginStatus$.next(true);

                // this.retrieveMemberProfile()
                //   .then(async (value: any) => {
                //     this._loginService.onAuthTokenReceived(
                //       this.loginRes,
                //       this.signOut.bind(this)
                //     );
                //     this._router.navigate(["home"]);
                //     resolve(true);
                //     this.deskLoginStatus$.next(true);
                //   })
                //   .catch(async (err: any) => {
                //     this.deskLoginStatus$.next(true);
                //   });
              } else {
                this._fp.isAvailable()
                .then((value: any) => {
                  this.biometricRegisteredHandler().then((res) => {
                    this._loginService.onAuthTokenReceived(
                      this.loginRes,
                      this.signOut.bind(this)
                    );
                    this._router.navigate(["home"]);
                    resolve(true);
                    this.deskLoginStatus$.next(true);
                  });
                  this._router.navigate([
                    "prelogin-space",
                    "entry-shell",
                    "onboarding",
                    "register-device",
                  ]);
                  // this._router.navigate(["login-space", "entry-shell", "login", "enable-biometric"]);
                  this.deskLoginStatus$.next(true);
                })
                .catch((error: any) => {
                  this._loginService.onAuthTokenReceived(
                    this.loginRes,
                    this.signOut.bind(this)
                  );
                  this._router.navigate(["home"]);
                  resolve(true);
                  this.deskLoginStatus$.next(true);
                })
                // reject("Register biometric");
              }

              // if (this.state.deviceAuthInfo.invalidAttemptCount == 2) {
              //   this.deRegisterDevice();
              // } else {
              //   if(!this.state.deviceAuthInfo.invalidAttemptCount) this.state.deviceAuthInfo.invalidAttemptCount = 0;
              //   this.state.deviceAuthInfo.invalidAttemptCount = (this.state.deviceAuthInfo.invalidAttemptCount + 1);
              //   let data = btoa(JSON.stringify(this.state.deviceAuthInfo));
              //   this._nativeStorageMgr.storeData("deviceAuthInfo", data).then((value: any) => {});

              //   let errorMsg = this._translateService.instant('mpinLoginForm.invalidMPIN',{count: (3-this.state.deviceAuthInfo.invalidAttemptCount)});
              //   this.state.errorMessage = errorMsg;
              // }
            })
            .catch((reason: any) => {
              this._fp.isAvailable()
              .then((value: any) => {
                this.biometricRegisteredHandler().then((res) => {
                  this._loginService.onAuthTokenReceived(
                    this.loginRes,
                    this.signOut.bind(this)
                  );
                  this._router.navigate(["home"]);
                  resolve(true);
                  this.deskLoginStatus$.next(true);
                });
                this._router.navigate([
                  "prelogin-space",
                  "entry-shell",
                  "onboarding",
                  "register-device",
                ]);
                // this._router.navigate(["login-space", "entry-shell", "login", "enable-biometric"]);
                this.deskLoginStatus$.next(true);
                // reject("Register biometric");
              })
              .catch((error: any) => {
                this._loginService.onAuthTokenReceived(
                  this.loginRes,
                  this.signOut.bind(this)
                );
                this._router.navigate(["home"]);
                resolve(true);
                this.deskLoginStatus$.next(true);
              })
              
            });
        },
        error: (err:any) => {
          if(err.error?.errorCode) {
            if(err.error?.errorCode == 'DEPIAM0001') {
              this._router.navigate(['noaccess'])
            }
            return;
          }
        }
      });
    })
  }
  biometricRegisteredHandler (): Promise<boolean>  {
    return new Promise((resolve, reject) => {
      this.biometricRegistered$.asObservable().subscribe({
        next: (res: any) => {
          if(res) this.storeMemberProfile();
          if(res != null) resolve(true);
        }
      })
    })
  }
  public refreshOktaSession(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if(this._mobileService.isHybrid()) resolve(this.refreshOktaMobSession());
      else this.refreshOktaMobSession();
    })
  }
  public refreshOktaDeskSession(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      // const accessToken = await this._oktaAuth.getOrRenewAccessToken();
      // this._depHttpConfig.setCommonHeaderParams('accesstoken', '' + accessToken);
      this._oktaAuth.session.refresh().then(res => {
        this.refreshToken = this._oktaAuth.getRefreshToken() || "";
        sessionStorage.setItem('signInStep', SIGN_IN_STEPS.FETCH_PROFILE);
        const idToken = this._oktaAuth.getIdToken() || "";
        const accessToken = this._oktaAuth.getAccessToken() || "";
        console.log(`ID TOKEN = '${idToken}'`);
        console.log(`ACCESS TOKEN = '${accessToken}'`);
        this._depHttpConfig.setCommonHeaderParams('accesstoken', '' + accessToken);
        this._depHttpConfig.setCommonHeaderParams('idtoken', '' + idToken);
        this._depHttpConfig.setCommonHeaderParams('authorization', accessToken + "|" + idToken);
        console.log("refreshOktaSession");
        console.dir(res);
        resolve(true);
      }).catch(error => {
        resolve(false);
      })
    })
  }
  public refreshOktaMobSession(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const claims = {
        username: sessionStorage.getItem('userId'),
        refreshToken: this.refreshToken
      }
      this._loginService.refreshToken(claims).subscribe({
        next: (logres: any) => {
          if(logres == null) return;
          let result = logres.body;
          this.storeBiometric = true;
          this.refreshToken = result?.refresh_token;
          this._depHttpConfig.setCommonHeaderParams('accesstoken', result?.access_token);
          this._depHttpConfig.setCommonHeaderParams('authorization', result?.access_token + "|" + this._depHttpConfig.commonHeaderParam.get('idtoken'));
          if(result?.id_token) this._depHttpConfig.setCommonHeaderParams('idtoken', result?.id_token);
          if(this._mobileService.isHybrid()) this.storeMemberProfile();
          this.loginRes = {
            "inventoryNumber": this.logonInventory,
            "refreshTokenExpiresIn": "3600",
            // "accessTokenExpiresIn": "1800",
            "lastLogin": this.lastLoginTime,
            // "ticket": sessionStorage.getItem('access_token'),
            "processId": this.logonInventory,
            "authToken": "",
            "accessToken": result?.access_token,
            "idToken": this._depHttpConfig.commonHeaderParam.get('idtoken'),
            "refreshToken": result?.refresh_token,
            "lastLoginFailed": "2025-02-19 06:44:34",
            "currentLogin": this.currentLoginTime
          }
          this._loginService.refreshTokenService?.start();
          // if(this._mobileService.isHybrid()) {
          //   this._loginService.storeCustomerName$?.asObservable().subscribe({next: (res: any) => {
          //     if(res) this.storeMemberProfile();
          //   }})
          // }
        },
        error:async (err: any) => {
          this._loginService.logout(false, true);
          // this._appConfig.appSpinner$.next(true);
          // this.signOut(1);
        }
      });
    })
  }
  showErrorMessage(error: any){
    let modal = new FpxModal();
      modal.setComponent(DepAlertComponent);
      modal.setPanelClass("dep-alert-popup");
      modal.setBackDropClass(["etransfer-send-limits"]);
      modal.setDisableClose(false);
      modal.setAfterClosed(this.contextmenuModelAfterClose);
      modal.setData({
        title: error.error,
        message: error.error_description,
        okBtnLbl: "DEFAULT.DIALOG.ALERT.okBtnLbl",
      });
      this.openModal(modal);
  }
  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    // this._dialogRef.close(0);
  }
  storeMemberProfile(){
    this._nativeStorageMgr.loadData('deviceAuthEnabled')
    .then((res: any) => {
      if(res == "1") {
        let profile: any = {
          userId: sessionStorage.getItem('username'), 
          username: sessionStorage.getItem('username'), 
          customerCode: sessionStorage.getItem('customerCode'), 
          refreshToken: this.refreshToken,
          // idToken: this._depHttpConfig.commonHeaderParam.get('idtoken'),
          firstName: sessionStorage.getItem('username')
        };
        if(this._userAuth.customerDetails?.firstName) profile.firstName = this._userAuth.customerDetails?.firstName;
        this._nativeStorageMgr.storeData('deviceAuthInfo', btoa(JSON.stringify(profile)));
      }
    })
  }
  retrieveMemberProfile(): Promise<any>{
    return new Promise((resolve, reject) => {
      return this._nativeStorageMgr.loadData('deviceAuthInfo').then((res: any) => {
        if(res) {
          this.memberProfiles = JSON.parse(atob(res));
        } else {
          this.memberProfiles = null;
        }
        resolve(this.memberProfiles);
        
        // if (this.state.deviceAuthInfo.invalidAttemptCount == 2) {
        //   this.deRegisterDevice();
        // } else {
        //   if(!this.state.deviceAuthInfo.invalidAttemptCount) this.state.deviceAuthInfo.invalidAttemptCount = 0;
        //   this.state.deviceAuthInfo.invalidAttemptCount = (this.state.deviceAuthInfo.invalidAttemptCount + 1);
        //   let data = btoa(JSON.stringify(this.state.deviceAuthInfo));
        //   this._nativeStorageMgr.storeData("deviceAuthInfo", data).then((value: any) => {});
  
        //   let errorMsg = this._translateService.instant('mpinLoginForm.invalidMPIN',{count: (3-this.state.deviceAuthInfo.invalidAttemptCount)});
        //   this.state.errorMessage = errorMsg;
        // }
      }).catch((reason: any) => {
        this.memberProfiles = null;
        resolve(this.memberProfiles);
        // reject("No profile found");
      });
    })
  }
  clearMemberProfile(){
    this._nativeStorageMgr.deleteData('deviceAuthEnabled').then((res: any) => { });
    this._nativeStorageMgr.deleteData('deviceAuthInfo').then((value: any) => {} );
  }
  async mobileAuthCheck(): Promise<boolean> {
    let claims = await this.retrieveMemberProfile();
    if(claims) {
      sessionStorage.setItem('username', claims.username);
      sessionStorage.setItem('userId', claims.username);
      sessionStorage.setItem("customerCode", claims.customerCode as string);
      return true
    }
    return false;
  }
  setupMobileRedirectHandler() {
    this._handleOpenUrl.handleOpenUrl$.asObservable().subscribe({
      next: (res) => {
        if(res?.hint == 'login_callback') {
          this.tokenExchange("login", {authn: res?.authCode, state: res?.state});
        }
      }
    })
    // let self = this;
    // window.handleOpenURL = async function(url: string) {
    //   console.log('Received URL: ' + url);
    //   var authCode = self.getParameterByName('code', url);
    //   var state = self.getParameterByName('state', url);
    //   // await self._oktaAuth.handleLoginRedirect();
    //   // self._router.navigate(['login/callback']);
    //   if(authCode) {
    //     self.exchangeCodeForToken(authCode, state);
    //     // let tokens = await self._oktaAuth.handleLoginRedirect({undefined, url});
    //     // console.log("token received: " + tokens);
    //   } else {
    //     console.log('No authorization code found in URL.');
    //   }
    // }
  }
  
  getParameterByName(name: any, url: any) {
    if (!url) url = window.location.href;
    name = name.replace(/[[]]/g, '\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  private exchangeCodeForToken(authCode: any, state: any){
    let oktaStorage = JSON.parse(sessionStorage.getItem('okta-transaction-storage') || "{}");
    const oktaDomain = "dev-91649780.okta.com";
    const clientId = "0oao4zcj79QnRWNfL5d7";
    const redirectUri = "vansit:/callback";
    const tokenUrl = `https://${oktaDomain}/oauth2/default/v1/token`;

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', clientId);
    params.append('code', authCode);
    params.append('redirect_uri', redirectUri);
    params.append('code_verifier', oktaStorage.codeVerifier);
    // params.append('code_challenge_method', this._oktaAuth.pkce.DEFAULT_CODE_CHALLENGE_METHOD);
    // params.append('state', state);

    fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
    })
    .then(response => response.json())
    .then(data => {
        if(data.access_token){
          sessionStorage.setItem('signInStep', SIGN_IN_STEPS.DONE);
          const accessToken = data.access_token;
          const idToken = data.id_token;
          this.refreshToken = data.refresh_token;
          console.log("Access Token: ", data.access_token);
          const toobj = this.decodeMe(idToken);
          sessionStorage.setItem('username', toobj.username);
          sessionStorage.setItem("customerCode", toobj.customerCode as string);
          this._depHttpConfig.setCommonHeaderParams('accesstoken', accessToken);
          this._depHttpConfig.setCommonHeaderParams('idtoken', idToken);
          this._depHttpConfig.setCommonHeaderParams('authorization', accessToken + "|" + idToken);
          
          // this._spinner.show();
          // resolve(true);
          this.loginRes = {
            "inventoryNumber": "20250219180135108484",
            "refreshTokenExpiresIn": data.expires_in,
            // "accessTokenExpiresIn": data.expires_in,
            "lastLogin": "2025-02-19 17:42:36",
            // "ticket": sessionStorage.getItem('access_token'),
            "processId": "20250219180135108484",
            "authToken": "",
            "accessToken": accessToken,
            "idToken": idToken,
            "refreshToken": this.refreshToken,
            "lastLoginFailed": "2025-02-19 06:44:34",
            "currentLogin": "2025-02-19 18:01:35"
        }
        this.refreshSessionTimer();
        this._loginService.storeCustomerName$?.asObservable().subscribe({next: (res: any) => {
          if(res) this.storeMemberProfile();
        }})
        if(!this._mobileService.isHybrid()) {
          this._loginService.onAuthTokenReceived(this.loginRes, this.signOut.bind(this));
        } else {
          this.retrieveMemberProfile()
          .then(
            async (value: any) => {
              this._loginService.onAuthTokenReceived(this.loginRes, this.signOut.bind(this));
              this._router.navigate(['home']);
              this.deskLoginStatus$.next(true);
            }
          )
          .catch(async (err: any) => {
            this._loginService.onAuthTokenReceived(this.loginRes, this.signOut.bind(this)); 
            this.biometricRegisteredHandler().then(()=> {
              this._loginService.onAuthTokenReceived(this.loginRes, this.signOut.bind(this)); 
              this._router.navigate(['home']);
            })
            this._router.navigate(["prelogin-space", "entry-shell", "onboarding", "register-device" ]);
            // this._router.navigate(['home']);
            // this._router.navigate(["login-space", "entry-shell", "login", "enable-biometric"]);
            this.deskLoginStatus$.next(true);
          })
        }
            // this._oktaAuth.handleLoginRedirect({
            //   accessToken: data.access_token,
            //   idToken: data.id_token,
            //   refreshToken: data.refresh_token
            // }).then((res) => {
            //   this.getUserInfo();
            // })
            
            //Store the access token securely.
        } else{
            console.error("Token exchange failed", data);
        }
    })
    .catch(error => console.error("Error during token exchange", error));
  }

  tokenExchange(hint: string, args: any){
    this.showSpinner()
    let oktaStorage = JSON.parse(sessionStorage.getItem('okta-transaction-storage') || "{}");
    let payload;
    if(hint == "login") {
      payload = {
        hint: "login_token",
        codeVerifier: oktaStorage.codeVerifier,
        authCode: args?.authn,
        redirectUri: this._mobileService.isHybrid() ? environment.okta?.oidc?.mobileRedirectUri : environment.okta?.oidc?.redirectUri,
        // secret: "RnmbrPLFmUvzSZHf2R7jpt0N6A2VZjlWCyoYIPk6Kc5egQDc_BpgCapZNmP41C_Z",
        postLogoutRedirectUri: this._mobileService.isHybrid() ? environment.okta?.oidc?.mobilePostLogoutRedirectUri : environment.okta?.oidc?.postLogoutRedirectUri,
      }
    } else if (hint == "biometric_login") {
      payload = {
        hint: "biometric_login",
        refreshToken: args?.refreshToken,
        redirectUri: this._mobileService.isHybrid() ? environment.okta?.oidc?.mobileRedirectUri : environment.okta?.oidc?.redirectUri,
        // secret: "RnmbrPLFmUvzSZHf2R7jpt0N6A2VZjlWCyoYIPk6Kc5egQDc_BpgCapZNmP41C_Z",
        postLogoutRedirectUri: this._mobileService.isHybrid() ? environment.okta?.oidc?.mobilePostLogoutRedirectUri : environment.okta?.oidc?.postLogoutRedirectUri,
      }
    } else {
      payload = {
        hint: "refresh_token",
        refreshToken: args?.refreshToken,
        redirectUri: this._mobileService.isHybrid() ? environment.okta?.oidc?.mobileRedirectUri : environment.okta?.oidc?.redirectUri,
        // secret: "RnmbrPLFmUvzSZHf2R7jpt0N6A2VZjlWCyoYIPk6Kc5egQDc_BpgCapZNmP41C_Z",
        postLogoutRedirectUri: this._mobileService.isHybrid() ? environment.okta?.oidc?.mobilePostLogoutRedirectUri : environment.okta?.oidc?.postLogoutRedirectUri,
      }
    }
    return this._commonService.TokenExchangeAPI(payload);
  }
  decodeMe(token: string){
    var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      let jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c: string) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      let det = JSON.parse(jsonPayload);
      return {username: det?.currentAuthPAN, customerCode: det?.preferred_username}
  }
  // proceedFurther(){
  //   this.refreshSessionTimer();
  //   if(!this._mobileService.isHybrid()) {
  //     // this._loginService.onAuthTokenReceived(this.loginRes, this.signOut.bind(this));
  //     // this._router.navigate(['home']);
  //     this.goto();
  //     this.deskLoginStatus$.next(true);
  //   } else {
  //     this._loginService.storeCustomerName$?.asObservable().subscribe({next: (res: any) => {
  //       if(res) this.storeMemberProfile();
  //     }})
  //     this.retrieveMemberProfile()
  //     .then(
  //       async (value: any) => {
  //         // this._loginService.onAuthTokenReceived(this.loginRes, this.signOut.bind(this));
  //         // this._router.navigate(['home']);
  //         this.goto();
  //         this.deskLoginStatus$.next(true);
  //       }
  //     )
  //     .catch(async (err: any) => {
  //       // this._loginService.onAuthTokenReceived(this.loginRes, this.signOut.bind(this)); 
  //       this.biometricRegisteredHandler().then(()=> {
  //         this.goto();
  //       })
  //       this._router.navigate(["prelogin-space", "entry-shell", "onboarding", "register-device" ]);
  //       // this._router.navigate(['home']);
  //       // this._router.navigate(["login-space", "entry-shell", "login", "enable-biometric"]);
  //       this.deskLoginStatus$.next(true);
  //     })
  //   }
  // }
  goto(){
    this._loginService.onAuthTokenReceived(this.loginRes, this.signOut.bind(this)); 
    this._router.navigate(['home']);
  }
}
