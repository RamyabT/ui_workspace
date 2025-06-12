import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OKTA_AUTH, OKTA_CONFIG } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { resolve } from 'dns';

const SIGN_IN_STEPS: any = {
  INIT: "show_login",
  FETCH_PROFILE: "fetch_profile",
  DONE: "done"
}

@Component({
  selector: 'app-dep-okta-callback',
  templateUrl: './dep-okta-callback.component.html',
  styleUrls: ['./dep-okta-callback.component.scss']
})
export class DepOktaCallbackComponent implements OnInit {

  constructor(
    @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth,
    private _router: Router) {
    
   }

  async ngOnInit(): Promise<void> {
    if(this._oktaAuth.isLoginRedirect()){
      this._oktaAuth.token.parseFromUrl().then(async (res) => {
        console.log("--------------------Login Redirect--------------------");
        const {accessToken, idToken} = res.tokens;
        sessionStorage.setItem('access_token', accessToken?.accessToken || "");
        sessionStorage.setItem('id_token', idToken?.idToken || "");
        sessionStorage.setItem('signInStep', SIGN_IN_STEPS.FETCH_PROFILE);
        let auth = await this._oktaAuth.authn.createTransaction().status;
        console.dir(auth);
        this._router.navigate(['welcome', 'welcomeuser']);
      })
    } else {
      this._router.navigate(['welcome', 'welcomeuser']);
    }
  }

}
