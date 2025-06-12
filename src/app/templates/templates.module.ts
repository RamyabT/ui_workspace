import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../dep/core/material.module';
import { SavingsAccountListRoTmpltComponent } from './savings-account-list-ro-tmplt/savings-account-list-ro-tmplt.component';
import { ContactsBeneListTmpltComponent } from './contacts-bene-list-tmplt/contacts-bene-list-tmplt.component';
import { FoundationModule } from '../foundation/foundation.module';
import { CasaAccDtlListTmpltComponent } from './casa-acc-dtl-list-tmplt/casa-acc-dtl-list-tmplt.component';
import { CasaTransactionsDtlsTmpltComponent } from './casa-transactions-dtls-tmplt/casa-transactions-dtls-tmplt.component';
import { RetailScheduleBillsTemplateComponent } from './retail-schedule-bills-template/retail-schedule-bills-template.component';
import { RetailScheduleTransferTemplateComponent } from './retail-schedule-transfer-template/retail-schedule-transfer-template.component';
import { LoanDtlListTmpltComponent } from './loan-dtl-list-tmplt/loan-dtl-list-tmplt.component';
import { TemplatesExtensionComponents, TemplatesExtensionModules } from './template-module-extension';
import { LoanTransactionsDtlsTmpltComponent } from './loan-transactions-dtls-tmplt/loan-transactions-dtls-tmplt.component';
import { DocumentChecklistRoTmplt } from './document-checklist-ro-tmplt/document-checklist-ro-tmplt.component';
import { VirtualCardSelectionRoTmplt } from './virtualcard-selection-ro-tmplt/virtualcard-selection-ro-tmplt.component';
import { RetailNomineeDtlTemplateComponent } from '../dep/core/component/panning-component/retail-nominee-dtl-template/retail-nominee-dtl-template.component';
import { FavEtransactionsTmpltComponent } from './fav-etransactions-tmplt/fav-etransactions-tmplt.component';
import { EtransfercontacttmpltComponent } from './etransfercontacttmplt/etransfercontacttmplt.component';
import { RetailManageDelegateTemplateComponent } from '../dep/core/component/panning-component/retail-manage-delegate-template/retail-manage-delegate-template.component';
import { RetailTransactionManagementTemplateComponent } from '../dep/core/component/panning-component/retail-transaction-management-template/retail-transaction-management-template.component';
import { EtransferHistoryTemplateComponent } from '../etransfers/etransfer-history-template/etransfer-history-template.component';
import { DepositsTransactionsDtlsTmpltComponent } from './deposits-transactions-dtls-tmplt/deposits-transactions-dtls-tmplt.component';
import { DepCoreModule } from '../dep/core/dep-core.module';
import { DepositAccountSummaryTmpltComponent } from './deposit-account-summary-tmplt/deposit-account-summary-tmplt.component';
import { WalletAccDtlListTmpltComponent } from './wallet-acc-dtl-list-tmplt/wallet-acc-dtl-list-tmplt.component';
import { NgxMaskModule } from 'ngx-mask';

const templateComponents = [
  SavingsAccountListRoTmpltComponent,
  ContactsBeneListTmpltComponent,
  CasaAccDtlListTmpltComponent,
  CasaTransactionsDtlsTmpltComponent,
  RetailScheduleBillsTemplateComponent,
  RetailScheduleTransferTemplateComponent,
  LoanDtlListTmpltComponent,
  LoanTransactionsDtlsTmpltComponent,
  DocumentChecklistRoTmplt,
  VirtualCardSelectionRoTmplt,
  RetailNomineeDtlTemplateComponent,
  FavEtransactionsTmpltComponent,
  EtransfercontacttmpltComponent,
  RetailManageDelegateTemplateComponent,
  RetailTransactionManagementTemplateComponent,
  EtransferHistoryTemplateComponent,
  DepositsTransactionsDtlsTmpltComponent,
  DepositAccountSummaryTmpltComponent,
  WalletAccDtlListTmpltComponent,
  ...TemplatesExtensionComponents
]

@NgModule({
  declarations: [
    ...templateComponents,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    MaterialModule,
    TranslateModule,
    FoundationModule,
    DepCoreModule,
    NgxMaskModule.forRoot(),
    ...TemplatesExtensionModules
  ],
  exports: [
    ...templateComponents
  ]
})
export class TemplatesModule { }
