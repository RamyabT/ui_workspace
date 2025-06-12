import { Component, Inject, NgZone, OnInit } from '@angular/core';
import OktaAuth, { OktaAuthOptions } from '@okta/okta-auth-js';
import { oktaAuth } from '../okta-config';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { DepHttpConfig, UserAuthService } from '@dep/services';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { OktaAuthService } from '../okta-auth.service';
import { DeviceDetectorService } from '@dep/core';
import { BaseFpxFunctionality } from '@fpx/core';
import { environment } from 'src/environments/environment';
import { TestLoginService } from 'src/app/login/test-services/test-login.service';
import { HandleOpenUrlService } from 'src/app/common-service/handle-open-url.service';

const SIGN_IN_STEPS: any = {
  INIT: "show_login",
  FETCH_PROFILE: "fetch_profile",
  DONE: "done"
}

@Component({
  selector: 'app-custom-okta-callback',
  templateUrl: './custom-okta-callback.component.html',
  styleUrls: ['./custom-okta-callback.component.scss']
})
export class CustomOktaCallbackComponent extends BaseFpxFunctionality implements OnInit {

  error: any;
  accesstoken:any;
  loginRes: any;

  constructor(
    // private _oktaAuthStateService: OktaAuthStateService,
    // @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth,
    // private _userService: UserAuthService,
    private _router: Router,
    private route: ActivatedRoute,
    private _oktaAuthService: OktaAuthService,
    private _depHttpConfig: DepHttpConfig,
    private _loginService: TestLoginService,
    private _ngZone: NgZone
  ) {  
    super();
  }

  async ngOnInit(): Promise<void> {
    let authCode:any, state: any;
    this._oktaAuthService.setConfig();
    if(this.route?.snapshot.queryParams){
      authCode=this.route?.snapshot.queryParams?.['code'];
      state=this.route?.snapshot.queryParams?.['state']
      if(authCode) {
        console.log("authCode: " + " : " +  authCode + " : " + state);
        this._oktaAuthService.tokenExchange("login", {authn:authCode, state: state}).subscribe({
          next: (res: any) => {
            this.hideSpinner();
            if (res?.access_token) {
              this._depHttpConfig.setCommonHeaderParams('accesstoken', res?.access_token);
              this._depHttpConfig.setCommonHeaderParams('idtoken', res?.id_token);
              this._depHttpConfig.setCommonHeaderParams('authorization', res?.access_token + "|" + res?.id_token);
              // this..refreshToken = res?.refresh_token;
              this._oktaAuthService.refreshToken = res?.refresh_token;
              if(res?.id_token) {
                let claims = this._oktaAuthService.decodeMe(res.id_token);
                // sessionStorage.setItem('signInStep', SIGN_IN_STEPS.DONE);
                sessionStorage.setItem('username', claims.username);
                sessionStorage.setItem("customerCode", claims.customerCode as string);
              }
              this.loginRes = {
                  "inventoryNumber": res?.inventoryNumber,
                  "refreshTokenExpiresIn": res?.expires_in,
                  "lastLogin": res?.lastLogin,
                  "processId": res?.inventoryNumber,
                  "authToken": "",
                  "accessToken": res?.access_token,
                  "idToken": res?.id_token,
                  "refreshToken": this._oktaAuthService.refreshToken,
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
  }
  proceedFurther() {
    this._oktaAuthService.refreshSessionTimer();
    this._ngZone.run(()=>{
      this._loginService.onAuthTokenReceived(this.loginRes, this._oktaAuthService.signOut.bind(this._oktaAuthService)); 
      this._router.navigate(['home']);
    })
  }
  // private exchangeCodeForToken(){
  //   let oktaStorage = JSON.parse(sessionStorage.getItem('okta-transaction-storage') || "{}");
  //   const oktaDomain = "dev-91649780.okta.com";
  //   const tokenUrl = `https://${oktaDomain}/oauth2/default/v1/token`;
  //   const secret ="RnmbrPLFmUvzSZHf2R7jpt0N6A2VZjlWCyoYIPk6Kc5egQDc_BpgCapZNmP41C_Z";
  //   const mobilePostLogoutRedirectUri="vansit:/logout"
  //   let authCode:any
  //   if(this.route?.snapshot.queryParams){
  //     authCode=this.route?.snapshot.queryParams?.['code']
  //   }
  //   const params = new URLSearchParams();
  //   params.append('grant_type', 'authorization_code');
  //   params.append('client_id', environment.okta?.oidc?.clientId);
  //   params.append('code', authCode);
  //   params.append('redirect_uri', environment.okta?.oidc?.redirectUri);
  //   params.append('code_verifier', oktaStorage.codeVerifier);
  //   params.append('client_secret', secret);

  //   fetch(tokenUrl, {
  //       method: 'POST',
  //       headers: {
  //           'Content-Type': 'application/x-www-form-urlencoded'
  //       },
  //       body: params.toString()
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     if(data.access_token){
  //       sessionStorage.setItem('signInStep', SIGN_IN_STEPS.DONE);
  //       const accessToken = data.access_token;
  //       const idToken = data.id_token;
  //       this._oktaAuthService.refreshToken = data.refresh_token;
  //       console.log("Access Token: ", data.access_token);
  //       const toobj = this.decodeMe(idToken);
  //       sessionStorage.setItem('username', toobj.username);
  //       sessionStorage.setItem("customerCode", toobj.customerCode as string);
  //       this._depHttpConfig.setCommonHeaderParams('accesstoken', accessToken);
  //       this._depHttpConfig.setCommonHeaderParams('idtoken', idToken);
  //       this._depHttpConfig.setCommonHeaderParams('authorization', accessToken + "|" + idToken);
        
  //       // this._spinner.show();
  //       // resolve(true);
  //       let loginRes = {
  //         "inventoryNumber": "20250219180135108484",
  //         "refreshTokenExpiresIn": data.expires_in,
  //         // "accessTokenExpiresIn": data.expires_in,
  //         "lastLogin": "2025-02-19 17:42:36",
  //         // "ticket": sessionStorage.getItem('access_token'),
  //         "processId": "20250219180135108484",
  //         "authToken": "",
  //         "accessToken": accessToken,
  //         "idToken": idToken,
  //         "refreshToken": this._oktaAuthService.refreshToken,
  //         "lastLoginFailed": "2025-02-19 06:44:34",
  //         "currentLogin": "2025-02-19 18:01:35"
  //       }
  //       this._oktaAuthService.refreshSessionTimer();
  //       this._loginService.storeCustomerName$?.asObservable().subscribe({next: (res: any) => {
  //         if(res) this._oktaAuthService.storeMemberProfile();
  //       }})
  //       this._loginService.onAuthTokenReceived(loginRes, this._oktaAuthService.signOut.bind(this));
  //       this._router.navigate(['/home']);
  //       } else{
  //           console.error("Token exchange failed", data);
  //       }
  //   })
  //   .catch(error => console.error("Error during token exchange", error));
  // }
  // decodeMe(token: string){
  //   var base64Url = token.split(".")[1];
  //     var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  //     let jsonPayload = decodeURIComponent(
  //       window
  //         .atob(base64)
  //         .split("")
  //         .map(function (c: string) {
  //           return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  //         })
  //         .join("")
  //     );
  //     let det = JSON.parse(jsonPayload);
  //     return {username: det?.currentAuthPAN || "5813530073319511", customerCode: det?.preferred_username || "90102543"}
  // }
  // signOut(){
  //   // this._oktaAuth.signOut();
  // }

}
