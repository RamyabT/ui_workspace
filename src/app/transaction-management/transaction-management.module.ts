import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionManagementRoutingModule } from './transaction-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { TransactionManagementHomeComponent } from './transaction-management-home/transaction-management-home.component';
import { MaterialModule } from '@dep/core';
import { FoundationModule } from '../foundation/foundation.module';
import { AccountnicknameService } from '../accounts/accountnickname-service/accountnickname.service';
import { CasaaccountService } from '../foundation/casaaccount-service/casaaccount.service';

const transactionManagementComponents = [
  TransactionManagementHomeComponent
]

@NgModule({
  declarations: [
    ...transactionManagementComponents
  ],
  providers:[
    AccountnicknameService,
    CasaaccountService
  ],
  imports: [
    CommonModule,
    TransactionManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    TranslateModule,
    MaterialModule,
    FoundationModule
  ],
  exports: [
    ...transactionManagementComponents
  ]
})
export class TransactionManagementModule { }
