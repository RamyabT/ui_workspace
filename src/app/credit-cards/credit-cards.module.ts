import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditCardsRoutingModule } from './credit-cards-routing.module';
import { ActiveCCListControlComponent } from './active-cc-list-control/active-cc-list-control.component';
import { CcbillpaymentrequestService } from './ccbillpaymentrequest-service/ccbillpaymentrequest.service';
import { ActiveccService } from './activecc-service/activecc.service';
import { DepositsModule } from '../deposits/deposits.module';
import { FoundationModule } from '../foundation/foundation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { AccountsModule } from '../accounts/accounts.module';
//import { ExpiryMonthListControlComponent } from './expiry-month-list-control/expiry-month-list-control.component';
import { RetailCCActivationFormComponent } from './retail-cc-activation-form/retail-cc-activation-form.component';
import { InactiveCreditCardListControlComponent } from './inactive-credit-card-list-control/inactive-credit-card-list-control.component';
import { CcactivationService } from './ccactivation-service/ccactivation.service';
import { CvvControlComponent } from './cvv-control/cvv-control.component';
import { retailcreditcardblockComponent } from './retail-credit-card-block-form/retail-credit-card-block-form.component';
import { CcstatusrequestService } from './ccstatusrequest-service/ccstatusrequest.service';
import { DebitcardModule } from '../debit-card/debitcard.module';
import { RetailCCReplacementFormComponent } from './retail-cc-replacment-form/retail-cc-replacment-form.component';
import { CcaddonrequestService } from './ccaddonrequest-service/ccaddonrequest.service';
import { CcunblockedService } from './ccunblocked-service/ccunblocked.service';
import { retailccunblockedComponent } from './retail-cc-unblocked-form/retail-cc-unblocked-form.component';
import { retailccCancelformComponent } from './retail-cc-cancel-form/retail-cc-cancel-form.component';
import { CcCancelService } from './ccCancel-service/ccCancel.service';
import { BlockCCListControlComponent } from './block-cc-list-control/block-cc-list-control.component';
import { RetailCCPinrequestFormComponent } from './retail-cc-pin-request/retail-cc-pin-request.component';
import { CcpinrequestService } from './ccpinrequest-service/ccpinrequest.service';
import { CreditCardListControlComponent } from './credit-card-list-control/credit-card-list-control.component';
import { CreditPinControlComponent } from './credit-pin-control/credit-pin-control.component';
import { CCConfirmPinControlComponent } from './cc-confirm-pin-control/cc-confirm-pin-control.component';
import { CCReEnterPinControlComponent } from './cc-reenter-pin-control/cc-reenter-pin-control.component';
import { RetailCCTransactionSummaryROGridComponent } from './retail-cc-transaction-summary-ro-grid/retail-cc-transaction-summary-ro-grid.component';
import { cctransactionsummaryComponent } from './retail-cc-transaction-summary/retail-cc-transaction-summary.component';
import { CctransactionsummaryService } from './cctransactionsummary-service/cctransactionsummary.service';
import { RetailLimitRequestControlComponent } from './retail-cc-limit-request-form/retail-cc-limit-request-form.component';
import { CclimitrequestService } from './cclimitrequest-service/cclimitrequest.service';
import { CCAmountSliderComponent } from './cc-limit-amount/cc-limit-amount.component';
import { CCServiceFlagControlComponent } from './credit-card-service-flag/credit-card-service-flag.component';
import { CreditCardComponent } from './creditcard/creditcard.component';
import { CreditCardCarouselComponent } from './creditcard-carousel/creditcard-carousel.component';
import { ThirdPartyModule } from '../dep/core/third-party.module';
import { CreditcardContextMenuComponent } from './creditcard-context-menu/creditcard-context-menu.component';
import { RetailCcstatementFormComponent } from './retail-ccstatement-form/retail-ccstatement-form.component';
import { CCTransactionsControlComponent } from './CCTransactions-control/CCTransactions-control.component';
import { RetailCcstatementdetailRoGridComponent } from './retail-ccstatementdetail-ro-grid/retail-ccstatementdetail-ro-grid.component';
import { RetailCreditcardDetailsFormComponent } from './retail-creditcard-details-form/retail-creditcard-details-form.component';
import { RetailCreditCardsSummaryRoGridComponent } from './retail-credit-cards-summary-ro-grid/retail-credit-cards-summary-ro-grid.component';
import { CardCategoryControlComponent } from './card-category-control/card-category-control.component';
import { CreditCardStatusListControlComponent } from './creditCardStatus-list-control/creditCardStatus-list-control.component';
import { RetailCcLimitChangeFormComponent } from './retail-cc-limit-change-form/retail-cc-limit-change-form.component';
import { CCLimitControlComponent } from './CCLimit-control/CCLimit-control.component';
import { CclimitchangeService } from './cclimitchange-service/cclimitchange.service';
import { RetailCCFlashRequestFormComponent } from './retail-cc-flash-request-form/retail-cc-flash-request-form.component';
import { CcflashrequestService } from './ccflashrequest-service/ccflashrequest.service';
import { CreditBlockReasonListControlComponent } from './credit-block-reason-list-control/credit-block-reason-list-control.component';
import { CredcardblockreasonService } from './credcardblockreason-service/credcardblockreason.service';
import { CreditcardConfirmationReceiptFormComponent } from './creditcard-confirmation-receipt-form/creditcard-confirmation-receipt-form.component';
import { CcstatementService } from './ccstatement-service/ccstatement.service';
import { CcstatementdetailService } from './ccstatementdetail-service/ccstatementdetail.service';
import { MaterialModule } from '../dep/core/material.module';
import { CreditcardSpendingSummaryComponent } from './creditcard-spending-summary/creditcard-spending-summary.component';
import { RetailCcTransactionFilterComponent } from './retail-cc-transaction-filter/retail-cc-transaction-filter.component';
import { RetailCcTransactionFilterService } from './retail-cc-transaction-filter-service/retail-cc-transaction-filter.service';
import { RetailCcTransactionDownloadFilterComponent } from './retail-cc-transaction-download-filter/retail-cc-transaction-download-filter.component';
import { RetailcctransactiondownloadfilterService } from './retail-cc-transaction-download-filter-service/retail-cc-transaction-download-filter.service';
import { RetailCCBillPaymentFormComponent } from './retail-cc-bill-payment-form/retail-cc-bill-payment-form.component';
import { ccraisedisputeComponent } from './retail-cc-raise-dispute-form/retail-cc-raise-dispute-form.component';
import { CcraisedisputeService } from './ccraisedispute-service/ccraisedispute.service';
import { CreditcardContextualActionsComponent } from './creditcard-contextual-actions/creditcard-contextual-actions.component';
import { CreditcardDetailsService } from './creditcard-details-service/creditcard-details.service';
import { RetailCreditcardFlashDetailsFormComponent } from './retail-creditcard-flash-details-form/retail-creditcard-flash-details-form.component';
import { CCVerifyPinValidationFormComponent } from './cc-verify-pin-validation-form/cc-verify-pin-validation-form.component';
import { CcpinvalidationService } from './ccpinvalidation-service/ccpinvalidation.service';
import { RetailApplyCreditCardComponent } from './retail-apply-credit-card/retail-apply-credit-card.component';
import { ApplyCreditCardService } from './applyCreditCard-service/applyCreditCard.service';
import { CreditcardHomeComponent } from './creditcard-home/creditcard-home.component';
import { SourceOfIncomeControlComponent } from './source-of-income-control/source-of-income-control.component';
import { LengthOfServiceCcontrolComponent } from './service-length-control/service-length-control.component';
import { CreditCardsListComponent } from './creditcards-list/creditcards-list.component';
import { CreditcardSharedBusinessLogic } from './creditcard-shared-business-logic/creditcard-shared-business-logic';
import { ccrewardsComponent } from './retail-cc-rewards/retail-cc-rewards.component';
import { CcrewardsService } from './ccrewards-service/ccrewards.service';
import { ccRewardBenefitsComponent } from './retail-cc-rewardsandbenefits/retail-cc-rewardsandbenefits.component';
import { CcRewardBenefitsService } from './ccRewardBenefits-service/ccRewardBenefits.service';
import { ccBenefitsInfoComponent } from './retail-cc-benefits-ro-grid/retail-cc-benefits-ro-grid.component';
import { ccRewardsInfoComponent } from './retail-cc-rewards-ro-grid/retail-cc-rewards-ro-grid.component';
//import { BlockCCListControl } from './block-cc-list-control/block-cc-list-control.component';
//import { DebitcardModule } from '../debit-card/debitcard.module';
//import { CCExpiryYearListControlComponent } from './cc-expiry-year-list-control/cc-expiry-year-list-control.component';


@NgModule({
  declarations: [
    RetailCCBillPaymentFormComponent,
    ActiveCCListControlComponent,
   // ExpiryMonthListControlComponent,
    RetailCCActivationFormComponent,
    InactiveCreditCardListControlComponent,
    CvvControlComponent,
// CCExpiryYearListControlComponent,
retailcreditcardblockComponent,
RetailCCReplacementFormComponent,
retailccunblockedComponent,
//BlockCCListControl,
retailccCancelformComponent,
BlockCCListControlComponent,
RetailCCPinrequestFormComponent,
CreditCardListControlComponent,
CreditPinControlComponent,
CCConfirmPinControlComponent,
CCReEnterPinControlComponent,
RetailCCTransactionSummaryROGridComponent,
cctransactionsummaryComponent,
RetailLimitRequestControlComponent,
CCAmountSliderComponent,
CCServiceFlagControlComponent,
CreditCardCarouselComponent,
CreditCardComponent,
CreditcardContextMenuComponent,
CreditcardContextualActionsComponent,
RetailCcstatementFormComponent,
CCTransactionsControlComponent,
RetailCcstatementdetailRoGridComponent,
RetailCreditcardDetailsFormComponent,
  RetailCreditCardsSummaryRoGridComponent,
  CardCategoryControlComponent,
  CreditCardStatusListControlComponent,
  RetailCcLimitChangeFormComponent,
  CCLimitControlComponent,
  RetailCCFlashRequestFormComponent,
  CreditBlockReasonListControlComponent,
  CreditcardConfirmationReceiptFormComponent,
  CreditcardSpendingSummaryComponent,
  RetailCcTransactionFilterComponent,
  RetailCcTransactionDownloadFilterComponent,
  ccraisedisputeComponent,
  RetailCCPinrequestFormComponent,
  RetailCreditcardFlashDetailsFormComponent,
  CCVerifyPinValidationFormComponent,
  RetailApplyCreditCardComponent,
  CreditcardHomeComponent,
  LengthOfServiceCcontrolComponent,
  SourceOfIncomeControlComponent,
  CreditCardsListComponent,
  ccrewardsComponent,
  ccRewardBenefitsComponent,
  ccBenefitsInfoComponent,
  ccRewardsInfoComponent
  ],
  imports: [
    CreditCardsRoutingModule,
    DepositsModule,
    FoundationModule,
    AccountsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    TranslateModule,
    ThirdPartyModule,
    DebitcardModule,
    MaterialModule
    ],
  providers : [
    CcbillpaymentrequestService,
    ActiveccService,
    CcactivationService,
    CcstatusrequestService,
    CcaddonrequestService,
    CcunblockedService,
    CcCancelService,
    CcpinrequestService,
    CctransactionsummaryService,
    CclimitrequestService,
    CclimitchangeService,
    CcflashrequestService,
    CredcardblockreasonService,
    CcstatementService,
    CcstatementdetailService,
    RetailCcTransactionFilterService,
    RetailcctransactiondownloadfilterService,
    CcraisedisputeService,
    CreditcardDetailsService,
    CcpinvalidationService,
    ApplyCreditCardService,
    CreditcardSharedBusinessLogic,
    CcrewardsService,
    CcRewardBenefitsService
   ],
     exports: [
      // copy the below generated  in  exports array  in module route.ts

   RetailCCBillPaymentFormComponent,
   ActiveCCListControlComponent,
   //ExpiryMonthListControlComponent,
   RetailCCActivationFormComponent,
   InactiveCreditCardListControlComponent,
   CvvControlComponent,
 //CCExpiryYearListControlComponent,
 retailcreditcardblockComponent,
 RetailCCReplacementFormComponent,
 retailccunblockedComponent,
 //BlockCCListControl
 retailccCancelformComponent,
 BlockCCListControlComponent,
 RetailCCPinrequestFormComponent,
 CreditCardListControlComponent,
 CreditPinControlComponent,
 CCConfirmPinControlComponent,
 CCReEnterPinControlComponent,
 cctransactionsummaryComponent,
 RetailCCTransactionSummaryROGridComponent,
 RetailLimitRequestControlComponent,
 CCAmountSliderComponent,
 CCServiceFlagControlComponent,
 CreditCardCarouselComponent,
  CreditCardComponent,
  CreditcardContextMenuComponent,
  CreditcardContextualActionsComponent,
  RetailCcstatementFormComponent,
  CCTransactionsControlComponent,
  RetailCcstatementdetailRoGridComponent,
  RetailCreditcardDetailsFormComponent,
  RetailCreditCardsSummaryRoGridComponent,
  CardCategoryControlComponent,
  CreditCardStatusListControlComponent,
  RetailCcLimitChangeFormComponent,
  CCLimitControlComponent,
  RetailCCFlashRequestFormComponent,
  CreditBlockReasonListControlComponent,
  CreditcardConfirmationReceiptFormComponent,
  CreditcardSpendingSummaryComponent,
  RetailCcTransactionFilterComponent,
  RetailCcTransactionDownloadFilterComponent,
  ccraisedisputeComponent,
  RetailCCPinrequestFormComponent,
  RetailCreditcardFlashDetailsFormComponent,
  CCVerifyPinValidationFormComponent,
  RetailApplyCreditCardComponent,
  CreditcardHomeComponent,
  LengthOfServiceCcontrolComponent,
  SourceOfIncomeControlComponent,
  ccrewardsComponent,
  ccRewardBenefitsComponent,
  ccBenefitsInfoComponent,
  ccRewardsInfoComponent
  ]
})
export class CreditCardsModule { }
