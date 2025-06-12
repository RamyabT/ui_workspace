import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OAuthModule } from 'angular-oauth2-oidc';
import { OKTA_CONFIG, OktaAuthModule, OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { Router } from '@angular/router';
import { OktaLandingFormComponent } from './okta-landing-form/okta-landing-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { ThirdPartyModule } from '../dep/core/third-party.module';
import { FoundationModule } from '../foundation/foundation.module';
import { CustomOktaCallbackComponent } from './okta/custom-okta-callback/custom-okta-callback.component';
import { DepCoreModule } from '../dep/core/dep-core.module';
import { MaterialModule } from '@dep/core';
import { environment } from 'src/environments/environment';

declare let window: any;

// export const OktaCallbackRoute = [
//   {
//     path: 'login/callback',
//     component: CustomOktaCallbackComponent
//   },
//   {
//     path: 'applogin/callback',
//     component: OktaCallbackComponent
//   },
//   {
//     path: 'vansit:/callback',
//     component: OktaCallbackComponent
//   }
// ]
// export const OktaComponentRoute = [
//   {
//     path: 'login',
//     component: OktaLandingFormComponent
//   }
// ]
@NgModule({
  declarations: [
    OktaLandingFormComponent,
    CustomOktaCallbackComponent
  ],
  providers: [
    OktaAuthStateService,
    {
      provide: OKTA_CONFIG,
      useFactory: () => {
        let oidc = environment.okta?.oidc;
        if (window.cordova) {
          oidc.clientId = oidc?.mobileClientId;
          oidc.redirectUri = oidc?.mobileRedirectUri;
          oidc.postLogoutRedirectUri = oidc?.mobilePostLogoutRedirectUri
        }
        const oktaAuth = new OktaAuth(oidc);
        return {
          oktaAuth,
          onAuthRequired: (oktaAuth: OktaAuth, injector: Injector) => {
            const triggerLogin = () => {
              const router = injector.get(Router);
              router.navigate(['/login']);
            };
            if (!oktaAuth.authStateManager.getPreviousAuthState()?.isAuthenticated) {
              triggerLogin();
            } else {
            }
          }
        }
      }
    }
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DepCoreModule,
    FpxCoreModule,
    ThirdPartyModule,
    FoundationModule,
    MaterialModule,
    OktaAuthModule.forRoot(),
    OAuthModule.forRoot()
  ],
  exports: [
    OktaLandingFormComponent,
    CustomOktaCallbackComponent
  ]
})
export class OktaIntegrationModule { }
