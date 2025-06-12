import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmbTransactionManagementSpaceRoutingModule } from './smb-transaction-management-space-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@dep/core';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { FoundationModule } from '../foundation/foundation.module';
import { SmbModule } from '../smb/smb.module';
import { TransactionManagementSpaceContainerComponent } from './transaction-management-space-container/transaction-management-space-container.component';


@NgModule({
  declarations: [
    TransactionManagementSpaceContainerComponent
  ],
  imports: [
    CommonModule,
    SmbTransactionManagementSpaceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    MaterialModule,
    TranslateModule,
    FoundationModule,
    SmbModule
  ]
})
export class SmbTransactionManagementSpaceModule { }
