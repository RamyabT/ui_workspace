import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService, OktaCallbackComponent } from '@okta/okta-angular';
import OktaAuth, { AuthState } from '@okta/okta-auth-js';

@Component({
  selector: 'app-okta-staging',
  templateUrl: './okta-staging.component.html',
  styleUrls: ['./okta-staging.component.scss']
})
export class OktaStagingComponent {

  constructor(
    private _oktaAuthStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth,
  ) {
    this._oktaAuthStateService.authState$.subscribe({
      next: (oktaResponse:any) => {
        console.log("OKTA Response: ", oktaResponse);
      }
    });
  }

  signout(){
    this._oktaAuth.signOut();
  }

}
