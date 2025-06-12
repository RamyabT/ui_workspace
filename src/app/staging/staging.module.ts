import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StagingRoutingModule } from './staging-routing.module';
import { StagingHomeComponent } from './staging-home/staging-home.component';
import { AccessDeniedFormComponent } from './access-denied-form/access-denied-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { MaterialModule } from '../dep/core/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FoundationModule } from '../foundation/foundation.module';
import { SettingsModule } from '../settings/settings.module';
import { LoginReadTermsAndConditionsComponent } from './login-read-terms-and-conditions/login-read-terms-and-conditions.component';
import { StagingConfirmationReceiptFormComponent } from './staging-confirmation-receipt-form/staging-confirmation-receipt-form.component';
import { AppPayIntroComponent } from './app-pay-intro/app-pay-intro.component';

const components = [
  AccessDeniedFormComponent,
  LoginReadTermsAndConditionsComponent,
  StagingConfirmationReceiptFormComponent,
  AppPayIntroComponent
]

@NgModule({
  declarations: [
    StagingHomeComponent,
    ...components
  ],
  imports: [
    CommonModule,
    StagingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    MaterialModule,
    TranslateModule,
    FoundationModule,
    SettingsModule
  ],
  exports: [
    ...components
  ]
})
export class StagingModule { }
