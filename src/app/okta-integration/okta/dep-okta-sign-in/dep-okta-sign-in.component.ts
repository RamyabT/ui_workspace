import { Component, Inject, OnInit } from '@angular/core';
import { DeviceDetectorService } from '@dep/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth, Tokens} from '@okta/okta-auth-js';
import OktaSignIn, { WidgetOktaAuthInterface, WidgetOptions } from '@okta/okta-signin-widget';
import { environment } from 'src/environments/environment';
import { OktaAuthService } from '../okta-auth.service';

@Component({
  selector: 'app-dep-okta-sign-in',
  templateUrl: './dep-okta-sign-in.component.html',
  styleUrls: ['./dep-okta-sign-in.component.scss']
})
export class DepOktaSignInComponent implements OnInit {
  signIn: any;
  oktaAuth: OktaAuth;
  constructor(private _oktaAuthService:OktaAuthService,
private _mobileService: DeviceDetectorService) { 
  this.oktaAuth = this._oktaAuthService.getOktaConfig();
  let clientId = environment.okta?.oidc?.clientId;
  let redirectUri = environment.okta?.oidc?.redirectUri;
  let postLogoutRedirectUri = environment.okta?.oidc?.postLogoutRedirectUri;
  if(this._mobileService.isHybrid()) {
    clientId = environment.okta?.oidc?.mobileClientId;
    redirectUri = environment.okta?.oidc?.mobileRedirectUri;
    postLogoutRedirectUri = environment.okta?.oidc?.mobilePostLogoutRedirectUri;
  }
  const originalUri = this.oktaAuth.getOriginalUri();
    console.log("originalUri: " + originalUri);
    if (!originalUri || originalUri === environment.baseURL) {
      this.oktaAuth.setOriginalUri(environment.okta.oidc.issuer);
    }
  this.signIn = new OktaSignIn({
    /**
     * Note: when using the Sign-In Widget for an OIDC flow, it still
     * needs to be configured with the base URL for your Okta Org. Here
     * we derive it from the given issuer for convenience.
     */
    // baseUrl: environment.okta.oidc.issuer.split('/oauth2')[0],
    "issuer": environment.okta?.oidc?.issuer,
    "clientId": clientId,
    "redirectUri": redirectUri,
    "scopes": environment.okta?.oidc?.scopes,
    authParams: {
      issuer: environment.okta.oidc.issuer
    },
    // logo: 'assets/angular.svg',
    // i18n: {
    //   en: {
    //     'primaryauth.title': 'Sign in to Vancity',
    //   },
    // },
    // authClient: this.oktaAuth as WidgetOktaAuthInterface,
    useClassicEngine: environment.okta.widget.USE_CLASSIC_ENGINE === 'true',
  });
  }
  
  ngOnInit(): void {
    this.signInDesktop();
  }
  signInDesktop() {
    // const originalUri = this.oktaAuth.getOriginalUri();
    // console.log("originalUri: " + originalUri);
    // if (!originalUri || originalUri === environment.baseURL) {
    //   this.oktaAuth.setOriginalUri(environment.okta.oidc.issuer);
    // }
    // this.oktaAuth.handleLoginRedirect();
    // this.signIn.showSignInAndRedirect()
    this.signIn.showSignInAndRedirect({
      el: '#depSignInWidgetWrapper',
      scopes: environment.okta.oidc.scopes,
      redirect: "always"
    }).then((tokens: Tokens) => {
      // Remove the widget
      this.signIn.remove();

      // In this flow the redirect to Okta occurs in a hidden iframe
      // this.oktaAuth.handleLoginRedirect(tokens);
    }).catch((err: any) => {
      // Typically due to misconfiguration
      throw err;
    });
    // this.signIn.showSignInToGetTokens({
    //   el: '#depSignInWidgetWrapper',
    //   scopes: environment.okta.oidc.scopes
    // }).then((tokens: Tokens) => {
    //   // Remove the widget
    //   this.signIn.remove();

    //   // In this flow the redirect to Okta occurs in a hidden iframe
    //   this.oktaAuth.handleLoginRedirect(tokens);
    // }).catch((err: any) => {
    //   // Typically due to misconfiguration
    //   throw err;
    // });
  }

}
