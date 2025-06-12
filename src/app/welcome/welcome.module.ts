import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeLayoutComponent } from '../app-layout/welcome-layout/welcome-layout.component';
import { WelcomeContainerComponent } from './welcome-container/welcome-container.component';
import { FpxCoreModule } from '@fpx/core';
import { MaterialModule } from '../dep/core/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SessionCheckComponent } from './session-check/session-check.component';
import { PreloginCheckComponent } from './prelogin-check/prelogin-check.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreloginCheckHelper } from './prelogin-check/prelogin-check.helper';
import { ResumebackService } from '../onboarding/resumeback-service/resumeback.service';


@NgModule({
  declarations: [
    WelcomeLayoutComponent,
    WelcomeContainerComponent,
    SessionCheckComponent,
    PreloginCheckComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    FpxCoreModule,
    MaterialModule,
    TranslateModule,
    HammerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PreloginCheckHelper, ResumebackService
  ]
})
export class WelcomeModule { }
