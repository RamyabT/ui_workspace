import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TranslateModule } from '@ngx-translate/core';
import { FpxCoreModule } from '@fpx/core';
import { MaterialModule } from '../dep/core/material.module';
import { DepositsModule } from '../deposits/deposits.module';
import { FoundationModule } from '../foundation/foundation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoansModule } from '../loans/loans.module';
import { InsuranceSpaceRoutingModule } from './insurance-space-routing.module';
import { InsuranceModule } from '../insurance/insurance.module';
import { InsuranceContainerComponent } from './insurance-container/insurance-container.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    InsuranceSpaceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    FpxCoreModule,
    MaterialModule,
    DepositsModule,
    FoundationModule,
    LoansModule
  ]
})
export class InsuranceSpaceModule { }
