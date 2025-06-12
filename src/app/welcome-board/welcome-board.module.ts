import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeBoardRoutingModule } from './welcome-board-routing.module';
import { WelcomeBoardComponent } from './welcome-board.component';
import { FpxCoreModule } from '@fpx/core';
import { MaterialModule } from '@dep/core';
import { TranslateModule } from '@ngx-translate/core';
import { HammerModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from '../login/login.module';


@NgModule({
  declarations: [
    WelcomeBoardComponent
  ],
  imports: [
    CommonModule,
    WelcomeBoardRoutingModule,
        FpxCoreModule,
        MaterialModule,
        TranslateModule,
        HammerModule,
        FormsModule,
        ReactiveFormsModule,
        LoginModule
  ]
})
export class WelcomeBoardModule { }
