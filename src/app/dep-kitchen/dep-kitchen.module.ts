import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepKitchenRoutingModule } from './dep-kitchen-routing.module';
import { FormControlsFormComponent } from './form-controls-form/form-controls-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    FormControlsFormComponent
  ],
  imports: [
    CommonModule,
    DepKitchenRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    TranslateModule
  ]
})
export class DepKitchenModule { }
