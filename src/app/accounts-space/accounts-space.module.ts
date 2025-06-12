import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsSpaceRoutingModule } from './accounts-space-routing.module';
import { AccountsContainerComponent } from './accounts-container/accounts-container.component';
import { TranslateModule } from '@ngx-translate/core';
import { FpxCoreModule } from '@fpx/core';
import { MaterialModule } from '../dep/core/material.module';
import { CasaTabContainerComponent } from './casa-tab-container/casa-tab-container.component';
import { DepositsTabContainerComponent } from './deposits-tab-container/deposits-tab-container.component';
import { DepositsModule } from '../deposits/deposits.module';
import { FoundationModule } from '../foundation/foundation.module';
import { CasaNavigationFormComponent } from './casa-navigation-form/casa-navigation-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FinantialRecordComponent } from './finantial-record/finantial-record.component';
import { GoalsComponent } from '../widget/goals/goals.component';
import { LoanTabContainerComponent } from './loan-tab-container/loan-tab-container.component';
import { LoansModule } from '../loans/loans.module';
import { DepositNavigationFormComponent } from './deposit-navigation-form/deposit-navigation-form.component';
import { DepositFinantialRecordComponent } from './deposit-finantial-record/deposit-finantial-record.component';
import { AccountsModule } from '../accounts/accounts.module';
import { LoansNavigationFormComponent } from './loans-navigation-form/loans-navigation-form.component';
import { AccountsSpaceExtensionComponents, AccountsSpaceImportsExtension } from './accounts-space-module-extension';

@NgModule({
  declarations: [
    AccountsContainerComponent,
    CasaTabContainerComponent,
    DepositsTabContainerComponent,
    CasaNavigationFormComponent,
    FinantialRecordComponent,
    GoalsComponent,
    LoanTabContainerComponent,
    DepositNavigationFormComponent,
    DepositFinantialRecordComponent,
    LoansNavigationFormComponent,
    ...AccountsSpaceExtensionComponents
  ],
  imports: [
    CommonModule,
    AccountsSpaceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    FpxCoreModule,
    MaterialModule,
    AccountsModule,
    DepositsModule,
    FoundationModule,
    LoansModule,
    ...AccountsSpaceImportsExtension
  ]
})
export class AccountsSpaceModule { }
