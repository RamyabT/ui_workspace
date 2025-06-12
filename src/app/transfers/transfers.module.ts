import { NgModule, TemplateRef } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { MaterialModule } from '../dep/core/material.module';
import { FavouriteTransactionComponent } from './favourite-transaction/favourite-transaction.component';
import { FavouriteTransactionComponentHelper } from './favourite-transaction/favourite-transaction.helper';
import { TransfersQuickActionsComponent } from './transfers-quick-actions/transfers-quick-actions.component';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { TransferSummaryFormComponent } from './transfer-summary-form/transfer-summary-form.component';
import { TempScheduleRepService } from './tempScheduleRep-service/tempScheduleRep.service';
import { RetailSchedulePaymentsRoGridComponent } from './retail-schedule-payments-ro-grid/retail-schedule-payments-ro-grid.component';
import { RetailTransferHistoryRoGridComponent } from './retail-transfer-history-ro-grid/retail-transfer-history-ro-grid.component';
import { TransferhistoryService } from './transferhistory-service/transferhistory.service';
import { TransfersInfoFormComponent } from './transfers-info-form/transfers-info-form.component';
import { RetailFavouritePaymentsRoGridComponent } from './retail-favourtie-payments-ro-grid/retail-favourtie-payments-ro-grid.component';
import { RetailFavouritePaymentsRoGridHelper } from './retail-favourtie-payments-ro-grid/retail-favourtie-payments-ro-grid.helper';
import { SelectBeneTypeFormComponent } from './select-bene-type-form/select-bene-type-form.component';
import { RetailSelectBeneRoGridComponent } from './retail-select-bene-ro-grid/retail-select-bene-ro-grid.component';
import { BeneSelectService } from './beneSelect-service/beneSelect.service';
import { SelectBeneTypeFormComponentHelper } from './select-bene-type-form/select-bene-type-form.helper';
import { RetailManageBeneFormComponent } from './retail-manage-bene-form/retail-manage-bene-form.component';
import { RetailManageBeneRoGridComponent } from './retail-manage-bene-ro-grid/retail-manage-bene-ro-grid.component';
import { RetailBeneInternationalReqFormComponent } from './retail-bene-International-req-form/retail-bene-International-req-form.component';
import { InternationalBeneficiaryValidator } from './international-account-number-control/internationalBeneficiary-validator.service';
import { InternationalIbanBeneficiaryValidator } from './international-iban-control/internationalIbanBeneficiaryValidator-validator.service';
import { InternationalBeneficiaryBICValidator } from './international-bic-code-control/internationalBeneficiaryBIC-validator.service';
import { BeneAccountTypeComponent } from './bene-account-type/bene-account-type.component';
import { InternationalIbanControlComponent } from './international-iban-control/international-iban-control.component';
import { InternationalAccountNumberControlComponent } from './international-account-number-control/international-account-number-control.component';
import { InternationalBICCodeControlComponent } from './international-bic-code-control/international-bic-code-control.component';
import { BeneAccountTypeService } from './bene-account-type/bene-account-type.service';
import { BeneInternationalReqService } from './beneInternationalReq-service/beneInternationalReq.service';
import { RetailBeneaedreqFormComponent } from './retail-beneaedreq-form/retail-beneaedreq-form.component';
import { BeneaedService } from './beneaed-service/beneaed.service';
import { BeneaedreqService } from './beneaedreq-service/beneaedreq.service';
import { AedAccountNumberControlComponent } from './aed-account-number-control/aed-account-number-control.component';
import { AedBeneficiaryValidator } from './aed-account-number-control/aedBeneficiary-validator.service';
import { RetailBeneInternalFormComponent } from './retail-bene-internal-form/retail-bene-internal-form.component';
import { BeneintbtreqService } from './beneintbtreq-service/beneintbtreq.service';
import { BeneinternalService } from './beneinternal-service/beneinternal.service';
import { BeneNicknameControlComponent } from './bene-nickname-control/bene-nickname-control.component';
import { InternalAccountNumberControlComponent } from './internal-account-number-control/internal-account-number-control.component';
import { ConfirmAccountNumberControlComponent } from './confirm-account-number-control/confirm-account-number-control.component';
import { NicknameValidator } from './bene-nickname-control/nickName-validator.service';
import { WithinBankBeneficiaryValidator } from './internal-account-number-control/withinBankBeneficiary-validator.service';
import { RetailBeneDomReqComponent } from './retail-bene-dom-req/retail-bene-dom-req.component';
import { BenedomreqService } from './benedomreq-service/benedomreq.service';
import { DomesticAccountNumberControlComponent } from './domestic-account-number-control/domestic-account-number-control.component';
import { DomesticBicControlComponent } from './domestic-bic-control/domestic-bic-control.component';
import { DomesticBeneficiaryValidator } from './domestic-account-number-control/domesticBeneficiaryValidator-validator.service';
import { DomesticBICBeneficiaryValidator } from './domestic-bic-control/domesticBeneficiaryBIC-validator.service';
import { BenedomesticService } from './benedomestic-service/benedomestic.service';
import { CreditCardNumberControlComponent } from './credit-card-number-control/credit-card-number-control.component';
import { RetailBeneCCReqFormComponent } from './retail-bene-cc-req-form/retail-bene-cc-req-form.component';
import { CreditCardBeneficiaryValidator } from './credit-card-number-control/creditCardBeneficiary-validator.service';
import { BeneccService } from './benecc-service/benecc.service';
import { BeneccreqService } from './beneccreq-service/beneccreq.service';
import { InstallmentNumberControlComponent } from '../foundation/installment-number-control/installment-number-control.component';
import { aedPurposeControlComponent } from './aed-purpose-control/aed-purpose-control.component';
import { BeneAdviceControlComponent } from './bene-advice-control/bene-advice-control.component';
import { beneInternallistControlComponent } from './bene-internal-list-control/bene-internal-list-control.component';
import { BeneInternationalListComponent } from './bene-international-list/bene-international-list.component';
import { BeneccListControlComponent } from './benecc-list-control/benecc-list-control.component';
import { CcPurposeControlComponent } from './cc-purpose-control/cc-purpose-control.component';
import { CctransferService } from './cctransfer-service/cctransfer.service';
import { ChargesborneService } from '../foundation/chargesborne-service/chargesborne.service';
import { DomesticBeneListComponent } from './domestic-bene-list/domestic-bene-list.component';
import { DomesticPurposeListComponent } from './domestic-purpose-list/domestic-purpose-list.component';
import { DomestictransferService } from './domestictransfer-service/domestictransfer.service';
import { RetailManageBeneFormHelper } from './retail-manage-bene-form/retail-manage-bene-form.helper';
import { RetailSelectBeneRoGridHelper } from './retail-select-bene-ro-grid/retail-select-bene-ro-grid.helper';
import { TransferConfirmationReceiptFormComponent } from './transfer-confirmation-receipt-form/transfer-confirmation-receipt-form.component';
import { EndDateControlComponentComponent } from './end-date-control/end-date-control.component';
import { InternationalPurposeComponent } from './international-purpose/international-purpose.component';
import { IntlScheduleService } from './intlSchedule-service/intlSchedule.service';
import { PymtsService } from './pymts-service/pymts.service';
import { RetailCCTransferFormComponent } from './retail-cc-transfer-form/retail-cc-transfer-form.component';
import { RetailDomesticTransferFormComponent } from './retail-domestic-transfer/retail-domestic-transfer.component';
import { RetailAedTransferFormComponent } from './retail-aed-transfer-form/retail-aed-transfer-form.component';
import { RetailInternationalTransferFormComponent } from './retail-international-transfer-form/retail-international-transfer-form.component';
import { RetailScheduleTransferHandlerComponent } from './retail-schedule-handler-form/retail-schedule-handler-form.component';
import { RetailWithinBankTransferFormComponent } from './retail-within-bank-transfer-form/retail-within-bank-transfer-form.component';
import { ScheduleTypeFormControlComponent } from './schedule-type-control/schedule-type-control.component';
import { ScheduleIntlReqService } from './scheduleIntlReq-service/scheduleIntlReq.service';
import { ScheduleccService } from './schedulecc-service/schedulecc.service';
import { ScheduleccreqService } from './scheduleccreq-service/scheduleccreq.service';
import { SidomService } from './sidom-service/sidom.service';
import { SidomreqService } from './sidomreq-service/sidomreq.service';
import { SiintbtService } from './siintbt-service/siintbt.service';
import { SiintbtreqService } from './siintbtreq-service/siintbtreq.service';
import { TransferTypeComponent } from './transfer-type-control/transfer-type-control.component';
import { WithinbanktransferService } from './withinbanktransfer-service/withinbanktransfer.service';
import { internalPurposeControlComponent } from './internal-purpose-control/internal-purpose-control.component';
import { beneaedListControlComponent } from './beneaed-list-control/beneaed-list-control.component';
import { BeneConfirmationReceiptFormComponent } from './bene-confirmation-receipt-form/bene-confirmation-receipt-form.component';
import { BeneInternationalService } from './beneInternational-service/beneInternational.service';
import { RetailOwnAccountTransferFormComponent } from './retail-own-account-transfer-form/retail-own-account-transfer-form.component';
import { OwnaccounttransferService } from './ownaccounttransfer-service/ownaccounttransfer.service';
import { SiownService } from './siown-service/siown.service';
import { SiownreqService } from './siownreq-service/siownreq.service';
import { beneInternallistControlHelper } from './bene-internal-list-control/bene-internal-list-control.helper';
import { InternationalTransferService } from './internationalTransfer-service/internationalTransfer.service';
import { BeneInternationalListHelper } from './bene-international-list/bene-international-list.helper';
import { FavouriteBeneficiariesValidator } from './favouriteBeneficiaries-validator.service';
import { IsFavouriteControlComponent } from './is-favourite-control/is-favourite-control.component';
import { completedpymntsComponent } from './retail-completed-payments-ro-grid/retail-completed-payments-ro-grid.component';
import { AccountsModule } from '../accounts/accounts.module';
import { FavouritePaymentsValidator } from './favouritePayments-validator.service';
import { CompletedpymntsService } from './completedpymnts-service/completedpymnts.service';
import { RetailManageFavouriteTransferFormComponent } from './retail-manage-favourite-transfer-form/retail-manage-favourite-transfer-form.component';
import { RetailViewAllFavouritePaymentsRoGridComponent } from './retail-view-all-favourtie-payments-ro-grid/retail-view-all-favourtie-payments-ro-grid.component';
import { InstaPurposeComponent } from './insta-purpose-list-control/insta-purpose-list-control.component';
import { InstaPayIbanControlComponent } from './instapay-iban-control/instapay-iban-control.component';
import { RetailInstaPayFormComponent } from './retail-insta-pay-form/retail-insta-pay-transfer-form.component';
import { InstapayService } from './instapay-service/instapay.service';
import { FoundationModule } from '../foundation/foundation.module';
import { InstaPayIbanValidator } from './instapay-iban-control/instaPayIbanValidator-validator.service';
import { RoutingCodeControlComponent } from './routing-code-control/routing-code-control.component';
import { BeneficiaryNameControlComponent } from './beneficiary-name-control/beneficiary-name-control.component';
import { retailDownloadTransactionFormComponent } from './retail-download-transaction-form/retail-download-transaction-form.component';
import { retailDownloadTransactionFormHelper } from './retail-download-transaction-form/retail-download-transaction-form.helper';
import { RetailFilterTransactionComponent } from './retail-filter-transaction-form/retail-filter-transaction-form.component';
import { RetailFilterTransactionHelper } from './retail-filter-transaction-form/retail-filter-transaction-form.helper';
import { TransactionPeriodComponent } from './transaction-period-control/transaction-period-control.component';
import { TransfersHomeComponent } from './transfers-home/transfers-home.component';
import { TransfersContextMenuComponent } from './transfers-context-menu/transfers-context-menu.component';
import { AedtransferService } from './aedtransfer-service/aedtransfer.service';
import { ConfirmInternalAccountNumberControlComponent } from './confirm-internal-account-number-control/confirm-internal-account-number-control.component';
import { ConfirmCreditCardNumberControlComponent } from './confirm-credit-card-number-control/confirm-credit-card-number-control.component';
import { ConfirmDomesticAcccountNumberControlComponent } from './confirm-domestic-acccount-number-control/confirm-domestic-acccount-number-control.component';
import { DepCoreModule } from '../dep/core/dep-core.module';
import { TransfersRoutingModule } from './transfers-routing.module';
import { RetailTransferGridComponent } from './retail-transfer-type-ro-grid/retail-transfer-type-ro-grid.component';
import { InitATransferFormComponent } from './init-a-transfer-form/init-a-transfer-form.component';
import { TransferService } from '../foundation/validator-service/transfers-service';
import { PaymentDaysInteravalComponent } from './payment-days-interval/payment-days-interval.component';
import { beneBankNameComponent } from './bene-bank-name-control/bene-bank-name-control.component';
import { tranAmountControlComponent } from './tran-amount-control/tran-amount-control.component';
import { transfersTypeControlComponent } from './transfers-type-control/transfers-type-control.component';
import { fileFormatControlComponent } from './file-format-control/file-format-control.component';
import { allpurposeListControlComponent } from './allpurpose-list-control/allpurpose-list-control.component';
import { TransferTypeListControlComponent } from './transfer-type-list-control/transfer-type-list-control.component';
import { BeneNameControlComponent } from './bene-name-control/bene-name-control.component';
import { TranhistoryService } from './tranhistory-service/tranhistory.service';
import { BeneAdditionalBicComponent } from './bene-additional-bic-control/bene-additional-bic-control.component';
import { BicSearchFormComponent } from './bic-search-form/bic-search-form.component';
import { BeneBankNameListControlComponent } from './bene-bank-name-list-control/bene-bank-name-list-control.component';
import { BeneBankCountryListControlComponent } from './bene-bank-country-list-control/bene-bank-country-list-control.component';
import { BicDtlsRoGridComponent } from './bic-dtls-ro-grid/bic-dtls-ro-grid.component';
import { SchedulebillpaymentService } from './schedulebillpayment-service/schedulebillpayment.service';
import { TransfersExtensionComponents, TransfersImportExtension, TransfersExtensionServices } from './transfers-module-extension';
import { TransferTypeValidaton } from './domestic-purpose-list/transferTypeValidator';


@NgModule({
  declarations : [
   FavouriteTransactionComponent,
   TransfersQuickActionsComponent,
   ScheduleFormComponent,
   TransferSummaryFormComponent,
   RetailSchedulePaymentsRoGridComponent,
   RetailTransferHistoryRoGridComponent,
   BeneAdviceControlComponent,
   beneInternallistControlComponent,
   RetailWithinBankTransferFormComponent,
   ScheduleTypeFormControlComponent,
   RetailScheduleTransferHandlerComponent,
   EndDateControlComponentComponent,
   TransfersInfoFormComponent,
   RetailAedTransferFormComponent,
   RetailInternationalTransferFormComponent,
   RetailFavouritePaymentsRoGridComponent,
   InstallmentNumberControlComponent,
   SelectBeneTypeFormComponent,
   RetailSelectBeneRoGridComponent,
   RetailManageBeneFormComponent,
   RetailManageBeneRoGridComponent,
   RetailBeneInternalFormComponent,
   BeneNicknameControlComponent,
   InternalAccountNumberControlComponent,
   ConfirmAccountNumberControlComponent,
   RetailBeneDomReqComponent,
   DomesticAccountNumberControlComponent,
   DomesticBicControlComponent,
   aedPurposeControlComponent,
   BeneInternationalListComponent,
   InternationalPurposeComponent,
   CreditCardNumberControlComponent,
   RetailBeneCCReqFormComponent,
   RetailDomesticTransferFormComponent,
   DomesticBeneListComponent,
   DomesticPurposeListComponent,
   TransferTypeComponent,
   RetailCCTransferFormComponent,
   CcPurposeControlComponent,
   RetailBeneInternationalReqFormComponent,
   BeneAccountTypeComponent,
   InternationalIbanControlComponent,
   InternationalAccountNumberControlComponent,
   InternationalBICCodeControlComponent,
   RetailBeneaedreqFormComponent,
   AedAccountNumberControlComponent,
   BeneccListControlComponent,
   TransferConfirmationReceiptFormComponent,
   internalPurposeControlComponent,
   beneaedListControlComponent,
   BeneConfirmationReceiptFormComponent,
   RetailOwnAccountTransferFormComponent,
   IsFavouriteControlComponent,
   completedpymntsComponent,
   RetailViewAllFavouritePaymentsRoGridComponent,
   RetailManageFavouriteTransferFormComponent,
   InstaPurposeComponent,
   InstaPayIbanControlComponent,
   RetailInstaPayFormComponent,
   RoutingCodeControlComponent,
   RetailFilterTransactionComponent,
   TransactionPeriodComponent,
   BeneficiaryNameControlComponent,
   retailDownloadTransactionFormComponent,
   TransfersHomeComponent,
   TransfersContextMenuComponent,
   ConfirmInternalAccountNumberControlComponent,
   ConfirmCreditCardNumberControlComponent,
   ConfirmDomesticAcccountNumberControlComponent,
   RetailTransferGridComponent,
   InitATransferFormComponent,
   PaymentDaysInteravalComponent,
   beneBankNameComponent,
   tranAmountControlComponent,
   allpurposeListControlComponent,
   transfersTypeControlComponent,
   fileFormatControlComponent,
   TransferTypeListControlComponent,
   BeneNameControlComponent,
   BeneAdditionalBicComponent,
   BicSearchFormComponent,
   BeneBankNameListControlComponent,
   BeneBankCountryListControlComponent,
   BicDtlsRoGridComponent,
   ...TransfersExtensionComponents
],
  imports : [
   CommonModule,
   TransfersRoutingModule,
   TranslateModule,
   FormsModule,
   ReactiveFormsModule,
   FpxCoreModule,
   MaterialModule,
   AccountsModule,
   FoundationModule,
   DepCoreModule,
   ...TransfersImportExtension
],
  providers : [
   FavouriteTransactionComponentHelper,
   TempScheduleRepService,
   SchedulebillpaymentService,
   TransferhistoryService,
   RetailFavouritePaymentsRoGridHelper,
   SelectBeneTypeFormComponentHelper,
   BeneSelectService,
   RetailSelectBeneRoGridHelper,
   RetailManageBeneFormHelper,
   BeneintbtreqService,
   BeneinternalService,
   NicknameValidator,
   WithinBankBeneficiaryValidator,
   BenedomreqService,
   BenedomesticService,
   DomesticBeneficiaryValidator,
   DomesticBICBeneficiaryValidator,
   SiintbtService,
   SiintbtreqService,
   ScheduleIntlReqService,
   IntlScheduleService,
   ChargesborneService,
   BeneccService,
   BeneccreqService,
   CreditCardBeneficiaryValidator,
   DomestictransferService,
   PymtsService,
   SidomreqService,
   SidomService,
   CctransferService,
   ScheduleccService,
   ScheduleccreqService,
   InternationalBeneficiaryValidator,
   InternationalIbanBeneficiaryValidator,
   InternationalBeneficiaryBICValidator,
   BeneInternationalService,
   BeneInternationalReqService,
   BeneAccountTypeService,
   BeneaedService,
   BeneaedreqService,
   AedBeneficiaryValidator,
   WithinbanktransferService,
   OwnaccounttransferService,
   DatePipe,
   SiownService,
   SiownreqService,
   beneInternallistControlHelper,
   InternationalTransferService,
   BeneInternationalListHelper,
   FavouriteBeneficiariesValidator,
   FavouritePaymentsValidator,
   CompletedpymntsService,
   InstapayService,
   InstaPayIbanValidator,
   RetailFilterTransactionHelper,
   retailDownloadTransactionFormHelper,
   AedtransferService,
   TransferService,
   TranhistoryService,
   TransferTypeValidaton,
   ...TransfersExtensionServices
    
],
  exports : [
   FavouriteTransactionComponent,
   TransfersQuickActionsComponent,
   ScheduleFormComponent,
   TransferSummaryFormComponent,
   RetailSchedulePaymentsRoGridComponent,
   RetailTransferHistoryRoGridComponent,
   TransfersInfoFormComponent,
   BeneAdviceControlComponent,
   beneInternallistControlComponent,
   RetailWithinBankTransferFormComponent,
   ScheduleTypeFormControlComponent,
   EndDateControlComponentComponent,
   RetailAedTransferFormComponent,
   RetailInternationalTransferFormComponent,
   RetailFavouritePaymentsRoGridComponent,
   InstallmentNumberControlComponent,
   SelectBeneTypeFormComponent,
   RetailSelectBeneRoGridComponent,
   RetailManageBeneFormComponent,
   RetailManageBeneRoGridComponent,
   RetailBeneInternalFormComponent,
   BeneNicknameControlComponent,
   InternalAccountNumberControlComponent,
   ConfirmAccountNumberControlComponent,
   RetailBeneDomReqComponent,
   DomesticAccountNumberControlComponent,
   DomesticBicControlComponent,
   aedPurposeControlComponent,
   BeneInternationalListComponent,
   InternationalPurposeComponent,
   RetailScheduleTransferHandlerComponent,
   CreditCardNumberControlComponent,
   RetailBeneCCReqFormComponent,
   RetailDomesticTransferFormComponent,
   DomesticBeneListComponent,
   DomesticPurposeListComponent,
   TransferTypeComponent,
   RetailCCTransferFormComponent,
   BeneccListControlComponent,
   CcPurposeControlComponent,
   RetailOwnAccountTransferFormComponent,
   TransferConfirmationReceiptFormComponent,
   RetailBeneInternationalReqFormComponent,
   BeneAccountTypeComponent,
   InternationalIbanControlComponent,
   InternationalAccountNumberControlComponent,
   InternationalBICCodeControlComponent,
   RetailBeneaedreqFormComponent,
   AedAccountNumberControlComponent,
   internalPurposeControlComponent,
   beneaedListControlComponent,
   BeneConfirmationReceiptFormComponent,
   IsFavouriteControlComponent,
   completedpymntsComponent,
   RetailViewAllFavouritePaymentsRoGridComponent,
   RetailManageFavouriteTransferFormComponent,
   InstaPurposeComponent,
   InstaPayIbanControlComponent,
   RetailInstaPayFormComponent,
   RoutingCodeControlComponent,
   RetailFilterTransactionComponent,
   TransactionPeriodComponent,
   BeneficiaryNameControlComponent,
   retailDownloadTransactionFormComponent,
   TransfersHomeComponent,
   TransfersContextMenuComponent,
   ConfirmInternalAccountNumberControlComponent,
   ConfirmCreditCardNumberControlComponent,
   ConfirmDomesticAcccountNumberControlComponent,
   RetailTransferGridComponent,
   PaymentDaysInteravalComponent,
   beneBankNameComponent,
   tranAmountControlComponent,
   allpurposeListControlComponent,
   transfersTypeControlComponent,
   fileFormatControlComponent,
   TransferTypeListControlComponent,
   BeneNameControlComponent,
   BeneAdditionalBicComponent,
   BicSearchFormComponent,
   BeneBankNameListControlComponent,
   BeneBankCountryListControlComponent,
   BicDtlsRoGridComponent,
   ...TransfersExtensionComponents
],
})
export class TransfersModule {}
