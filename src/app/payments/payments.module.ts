import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { MaterialModule } from '../dep/core/material.module';

import { TranslateModule } from '@ngx-translate/core';
import { AccountsModule } from '../accounts/accounts.module';
import { FoundationModule } from '../foundation/foundation.module';
import { DepCoreModule } from '../dep/core/dep-core.module';
import { PaymentsHomeComponent } from './payments-home/payments-home.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import { RetailSavedBillerRoGridComponent } from './retail-saved-biller-ro-grid/retail-saved-biller-ro-grid.component';
import { BilleraccountService } from './billeraccount-service/billeraccount.service';
import { PaymentsQuickActionsComponent } from './payments-quick-actions/payments-quick-actions.component';
import { RetailBillerCategoryRoGridComponent } from './retail-biller-category-ro-grid/retail-biller-category-ro-grid.component';
import { BillercategoryService } from './billercategory-service/billercategory.service';
import { RetailUpcomingBillRoGridComponent } from './retail-upcoming-bill-ro-grid/retail-upcoming-bill-ro-grid.component';
import { UpcomingbillService } from './upcomingbill-service/upcomingbill.service';
import { RetailBillHistoryRoGridComponent } from './retail-bill-history-ro-grid/retail-bill-history-ro-grid.component';
import { BillsummaryService } from './billsummary-service/billsummary.service';
import { RetailBillerListRoGridComponent } from './retail-biller-list-ro-grid/retail-biller-list-ro-grid.component';
import { BillerService } from './biller-service/biller.service';
import { RetailSavedBillerRoGridFormComponent } from './retail-saved-biller-ro-grid-form/retail-saved-biller-ro-grid-form.component';
import { RetailAddBillerFormComponent } from './retail-add-biller-form/retail-add-biller-form.component';
import { BilleraccountreqService } from './billeraccountreq-service/billeraccountreq.service';
import { BillerListControlComponent } from './biller-list-control/biller-list-control.component';
import { BillerEnabledFlagControlComponent } from './billerenabledflag-control/billerenabledflag-control.component';
import { CreditCardsModule } from '../credit-cards/credit-cards.module';
import { PymentTypeControlComponent } from './payment-type-control/payment-type-control.component';
import { BillerIdFetchValidatorService } from './biller-list-control/billerListFetch-validator.service';
import { RetailSingleBillPaymentFormComponent } from './retail-single-bill-payment-form/retail-single-bill-payment-form.component';
import { BillRequestService } from './billRequest-service/billRequest.service';
import { BilleraccountListControlComponent } from './billeraccount-list-control/billeraccount-list-control.component';
import { CorpBillRefNumberControlComponent } from './corp-bill-ref-number-control/corp-bill-ref-number-control.component';
import { PaymentsConfirmationReceiptFormComponent } from './payments-confirmation-receipt-form/payments-confirmation-receipt-form.component';
import { RetailBillerListRoGriFormComponent } from './retail-biller-list-ro-grid-form/retail-biller-list-ro-grid-form.component';
import { BillerNickNameControlComponent } from './biller-nickname-control/biller-nickname-control.component';
import { RetailBillerCategoryRoGriFormComponent } from './retail-biller-category-ro-grid-form/retail-biller-category-ro-grid-form.component';
import { BillerAccountFetchValidatorService } from './billeraccount-list-control/billerAccount-validator.service';
import { BillerNicknameValidator } from './biller-nickname-control/nickName-validator.service';
import { BaseCurrencyAccountListTemplateControlComponent } from '../foundation/base-currency-account-list-template-control/base-currency-account-list-template-control.component';
import { BillsExtensionComponents, BillsExtensionServices, BillsImportExtension } from './payments-module-extension';
import { ContactNameControlComponent } from './contact-name-control/contact-name-control.component';
import { BpPaymentTypeFormControlComponent } from './bp-payment-type-form-control/bp-payment-type-form-control.component';
import { BpScheduleTypeFormControlComponent } from './bp-schedule-type-control/bp-schedule-type-control.component';
import { BpPaymentTypeFormControlService } from './bp-payment-type-form-control/bp-payment-type-form-control.service';
import { BpScheduleTypeFormControlService } from './bp-schedule-type-control/bp-schedule-type-control.service';
import { TransfersModule } from '../transfers/transfers.module';
import { MultibillrequestService } from './multibillrequest-service/multibillrequest.service';

import { RetailupcomingBillSummaryExFilterComponent } from './retail-upcoming-bill-summary-filter/retail-upcoming-bill-summary-filter.component';
import { RetailupcomingBillSummaryexfilterService } from './retail-upcoming-bill-summary-filter-service/retail-upcoming-bill-summary-filter.service';
import { RetailBillSummaryFormComponent } from './retail-bill-summary-form/retail-bill-summary-form.component';
import { BillerCategoryListControlComponent } from './billercategory-list-control/billercategory-list-control.component';
import { RetailMultiBillRequestFormComponent } from './retail-multi-bill-request-form/retail-multi-bill-request-form.component';
import { RetailMultiBillRequestInputGridComponent } from './retail-multi-bill-request-input-grid/retail-multi-bill-request-input-grid.component';

const components = [
  PaymentsHomeComponent,
  RetailSavedBillerRoGridComponent,
  PaymentsQuickActionsComponent,
  RetailBillerCategoryRoGridComponent,
  RetailUpcomingBillRoGridComponent,
  RetailBillHistoryRoGridComponent,
  RetailBillerListRoGridComponent,
  RetailSavedBillerRoGridFormComponent,
  RetailAddBillerFormComponent,
  BillerListControlComponent,
  BillerEnabledFlagControlComponent,
  PymentTypeControlComponent,
  RetailSingleBillPaymentFormComponent,
  BilleraccountListControlComponent,
  CorpBillRefNumberControlComponent,
  PaymentsConfirmationReceiptFormComponent,
  RetailBillerListRoGriFormComponent,
  BillerNickNameControlComponent,
  RetailBillerCategoryRoGriFormComponent,
 RetailupcomingBillSummaryExFilterComponent,
   BillerCategoryListControlComponent,
     RetailBillSummaryFormComponent,
  BaseCurrencyAccountListTemplateControlComponent,
  ContactNameControlComponent,
  BpPaymentTypeFormControlComponent,
  BpScheduleTypeFormControlComponent,
  RetailMultiBillRequestFormComponent,
  RetailMultiBillRequestInputGridComponent,
  ...BillsExtensionComponents
]
@NgModule({
  declarations : [
...components
],
  imports : [
   CommonModule,
   PaymentsRoutingModule,
   TranslateModule,
   FormsModule,
   ReactiveFormsModule,
   FpxCoreModule,
   MaterialModule,
   FoundationModule,
   DepCoreModule,
   CreditCardsModule,
   TransfersModule,
   ...BillsImportExtension
],
  providers : [
   DatePipe,
   BilleraccountService,
   BillercategoryService,
   UpcomingbillService,
   BillsummaryService,
   BillerService,
   BilleraccountreqService,
   BillerIdFetchValidatorService,
   BillRequestService,
   BillerAccountFetchValidatorService,
   RetailupcomingBillSummaryexfilterService,
   BillerCategoryListControlComponent,
   BillerNicknameValidator,
   BpPaymentTypeFormControlService,
   BpScheduleTypeFormControlService,
   MultibillrequestService,
   ...BillsExtensionServices
],
  exports : [
    ...components    
  ],
})
export class PaymentsModule {}
