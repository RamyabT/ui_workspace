import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransfersSpaceRoutingModule } from './transfers-space-routing.module';
import { TransfersContainerComponent } from './transfers-container/transfers-container.component';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../dep/core/material.module';
import { TransfersModule } from '../transfers/transfers.module';
import { FoundationModule } from '../foundation/foundation.module';
import { TransfersNavigationFormComponent } from './transfers-navigation-form/transfers-navigation-form.component';
import { AccountsSpaceModule } from '../accounts-space/accounts-space.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransfersSummaryContainerComponent } from './transfers-summary-container/transfers-summary-container.component';
import { TransfersSpaceExtensionComponents, TransfersSpaceImportsExtension } from './transfers-space-module-extension';


@NgModule({
  declarations: [
    TransfersContainerComponent,
    TransfersNavigationFormComponent,
    TransfersSummaryContainerComponent,
    ...TransfersSpaceExtensionComponents
  ],
  imports: [
    CommonModule,
    TransfersSpaceRoutingModule,
    TranslateModule,
    FpxCoreModule,
    MaterialModule,
    TransfersModule,
    FoundationModule,
    FormsModule,
    ReactiveFormsModule,
    ...TransfersSpaceImportsExtension
  ]
})
export class TransfersSpaceModule { }
