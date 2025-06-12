import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NpssSpaceRoutingModule } from './npss-space-routing.module';
import { NpssContainerComponent } from './npss-container/npss-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../dep/core/material.module';
import { FoundationModule } from '../foundation/foundation.module';
import { NpssModule } from '../npss/npss.module';
import { NpssNavigationFormComponent } from './npss-navigation-form/npss-navigation-form.component';
import { HomeModule } from '../home/home.module';

@NgModule({
  declarations: [
    NpssContainerComponent,
    NpssNavigationFormComponent
  ],
  imports: [
    CommonModule,
    NpssSpaceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    FpxCoreModule,
    MaterialModule,
    FoundationModule,
    NpssModule,
    HomeModule
  ]
})
export class NpssSpaceModule { }
