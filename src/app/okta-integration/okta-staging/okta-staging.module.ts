import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OktaStagingRoutingModule } from './okta-staging-routing.module';
import { OktaStagingComponent } from './okta-staging.component';
import { OktaCallbackComponent } from '@okta/okta-angular';


@NgModule({
  declarations: [
    OktaStagingComponent
  ],
  imports: [
    CommonModule,
    OktaStagingRoutingModule
  ]
})
export class OktaStagingModule { }
