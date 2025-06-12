import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginSpaceRoutingModule } from './login-space-routing.module';
import { LoginComponent } from '../login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../dep/core/material.module';
import { ResumebackService } from '../onboarding/resumeback-service/resumeback.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginSpaceRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    MaterialModule,
    TranslateModule
  ],
  providers: [
    ResumebackService
  ]
})
export class LoginSpaceModule { }
