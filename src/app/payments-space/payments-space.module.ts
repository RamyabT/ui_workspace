import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsSpaceRoutingModule } from './payments-space-routing.module';
import { PaymentsContainerComponent } from './payments-container/payments-container.component'
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../dep/core/material.module';
import { TransfersModule } from '../transfers/transfers.module';
import { FoundationModule } from '../foundation/foundation.module';
import { PaymentsNavigationFormComponent } from './payments-navigation-form/payments-navigation-form.component';
import { AccountsSpaceModule } from '../accounts-space/accounts-space.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentsSummaryContainerComponent } from './payments-summary-container/payments-summary-container.component';
import { PaymentsModule } from '../payments/payments.module';
import { BillsSpaceExtensionComponents, BillsSpaceImportsExtension } from './payments-space-module-extension';


@NgModule({
  declarations: [
    PaymentsContainerComponent,
    PaymentsNavigationFormComponent,
    PaymentsSummaryContainerComponent,
    ...BillsSpaceExtensionComponents
  ],
  imports: [
    CommonModule,
    PaymentsSpaceRoutingModule,
    TranslateModule,
    FpxCoreModule,
    MaterialModule,
    PaymentsModule,
    FoundationModule,
    FormsModule,
    ReactiveFormsModule,
    ...BillsSpaceImportsExtension
  ]
})
export class PaymentsSpaceModule { }
