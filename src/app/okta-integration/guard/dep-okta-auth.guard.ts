import { Inject, Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';
import { DeviceDetectorService } from '@dep/core';
import { OktaAuthService } from '../okta/okta-auth.service';
import { DepHttpConfig } from '@dep/services';

// declare let window: any;
// const SIGN_IN_STEPS: any = {
//   INIT: "show_login",
//   FETCH_PROFILE: "fetch_profile",
//   DONE: "done"
// }
@Injectable({
  providedIn: 'root'
})
export class DepOktaAuthGuard implements CanActivate {
  dialogRef: any;
  constructor(
    // @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth, 
    private _router: Router,
    private _depHttpConfig: DepHttpConfig,
  ) {
    console.log("DepOktaAuthGuard");
    // this._oktaAuth = _oktaAuthService.getOktaConfig();
    // this._oAuthService.configure({
    //   issuer: environment.okta.oidc.issuer,
    //   clientId: this._mobileService.isHybrid() ? environment.okta.oidc.mobileClientId : environment.okta.oidc.clientId
    // })
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    sessionStorage.setItem('isOktaLogin', 'true');
    console.log("DepOktaAuthGuard");
    
    return new Promise(async(resolve, reject) => {
      console.log("inside promise before auth check: " + sessionStorage.getItem('signInStep'));
      
      let isAuthenticated: boolean = false;
      isAuthenticated = this._depHttpConfig.commonHeaderParam.get('accesstoken') != undefined && this._depHttpConfig.commonHeaderParam.get('idtoken') != null;
      console.log("Inside promise: " + isAuthenticated);
      
      if(isAuthenticated) {
        resolve(true);
      } else {
        console.log("show login screen");
        // this._oktaAuthService.signIn();
        // sessionStorage.setItem('signInStep', SIGN_IN_STEPS.INIT);
        reject(this._router.navigate(['login']));
      }
    })
  }
}
