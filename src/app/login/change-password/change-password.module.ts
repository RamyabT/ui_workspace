import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordHelper } from './services/changes-password.helper'; 
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from '../login.module';
import { ChangePasswordControlComponent } from '../change-password-control/change-password-control.component';

import { TranslateModule } from '@ngx-translate/core';
import { FpxCoreModule, MaterialModule } from '@fpx/core';


@NgModule({
  declarations: [
    ChangePasswordComponent,
    ChangePasswordControlComponent
  ],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    FpxCoreModule, 
    ReactiveFormsModule,
    LoginModule,
    MaterialModule,
    TranslateModule
  ],
  providers : [
    ChangePasswordHelper
  ]
})
export class ChangePasswordModule { }
