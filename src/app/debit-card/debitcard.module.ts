import { DebitcardRoutingModule } from "./debitcard-routing.module";
import { debitcardComponent } from "./retail-debitcard-summary-ro-grid/retail-debitcard-summary-ro-grid.component";
import { DepositsModule } from "../deposits/deposits.module";
import { AccountsModule } from "../accounts/accounts.module";
import { FoundationModule } from "../foundation/foundation.module";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FpxCoreModule } from "@fpx/core";
import { MaterialModule } from "../dep/core/material.module";
import { NgModule } from "@angular/core";
import { CreditCardsModule } from "../credit-cards/credit-cards.module";
import { retaildebitcardformComponent } from "./retail-debitcard-details-form/retail-debitcard-details-form.component";
import { RetailDebitCardLimitRequestComponent } from "./retail-debit-card-limit-request/retail-debit-card-limit-request.component";
import { DclimitrequestService } from "./dclimitrequest-service/dclimitrequest.service";
import { DCAmountSliderControlComponent } from "./dc-amount-slider/dc-amount-slider.component";
import { DcServiceFlagControlComponent } from "./dc-service-flag/dc-service-flag.component";
import { activedcComponent } from "./active-dc-list-control/active-dc-list-control.component";
import { CanceldebitcardService } from "./canceldebitcard-service/canceldebitcard.service";
import { ActivedcService } from "./activedc-service/activedc.service";
//import { BlockeddcService } from './blockeddc-service/blockeddc.service';
import { DCBlockReasonListControlComponent } from "./dc-block-reason-list-control/dc-block-reason-list-control.component";
import { DebitCardListControlComponent } from "./debit-card-list-control/debit-card-list-control.component";
//import { retaildcblockComponent } from './retail-dc-block-form/retail-dc-block-form.component';
import { retaildccancelComponent } from "./retail-dc-cancel-form/retail-dc-cancel.component";
import { raisedisputedebitcardComponent } from "./retail-raise-dispute-debitcard-form/retail-raise-dispute-debitcard-form.component";
import { RaisedisputedebitcardService } from "./raisedisputedebitcard-service/raisedisputedebitcard.service";
import { DisputeReasonListControlComponent } from "./dispute-reason-list-control/dispute-reason-list-control.component";
import { retaildcreplacementComponent } from "./retail-dc-replacement-form/retail-dc-replacement-form.component";
import { DcaddonrequestService } from "./dcaddonrequest-service/dcaddonrequest.service";
import { CorpAddressDetailsFormComponent } from "./corp-address-details-form/corp-address-details-form.component";
import { CobaddressinfoService } from "./cobaddressinfo-service/cobaddressinfo.service";
import { dcpinrequestComponent } from "./retail-dc-change-pin-request/retail-dc-change-pin-request.component";
import { DCReEnterPinControlComponent } from "./dc-reenterpin-control/dc-reenterpin-control.component";
import { InactiveDCListComponent } from "./inactive-dc-list/inactive-dc-list.component";
import { DcpinrequestService } from "./dcpinrequest-service/dcpinrequest.service";
import { DCPinControlComponent } from "./dc-pin-control/dc-pin-control.component";
import { retaildcunblockComponent } from "./retail-dc-unblock-form/retail-dc-unblock-form.component";
import { DcunblockrequestService } from "./dcunblockrequest-service/dcunblockrequest.service";
import { DebitCardBlockReasonListComponent } from "./debit-card-block-reason-list/debit-card-block-reason-list.component";
import { DebitUnblockReasonListControlComponent } from "./debit-unblock-reason-list-control/debit-unblock-reason-list-control.component";
import { DCUnblockReasonComponent } from "./dc-unblock-list-control/dc-unblock-list-control.component";
import { DebitcardUnblockReasonListComponent } from "./debitcard-unblock-reason-list/debitcard-unblock-reason-list.component";
import { RetailDebitCardBlockFormComponent } from "./retail-debit-card-block-form/retail-debit-card-form.component";
import { DcstatusrequestService } from "./dcstatusrequest-service/dcstatusrequest.service";
import { ConfirmationReceiptFormComponent } from "./confirmation-receipt-form/confirmation-receipt-form.component";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { BlockedDebitCardControlComponent } from "./blocked-dc-list-control/blocked-dc-list-control.component";
import { BlockeddcService } from "./blockeddc-service/blockeddc.service";
//import { RetailDebitCardFlashFormComponent } from './retail-dc-flash-form/retail-dc-flash-form.component';
import { DcvvPinControlComponent } from "./dcvv-pin-control/dcvv-pin-control.component";
import { DebitCardNumberControlComponent } from "./debit-card-number-control/debit-card-number-control.component";
import { DcactivatecardService } from "./dcactivatecard-service/dcactivatecard.service";
import { RetailDcActivateCardFormComponent } from "./retail-dc-activate-card-form/retail-dc-activate-card-form.component";
//import { ExpiryMonthListControlComponent } from './expiry-month-list-control/expiry-month-list-control.component';
//import { CCExpiryYearListControlComponent } from './cc-expiry-year-list-control/cc-expiry-year-list-control.component';
import { RetailDcTransactionDtlsRoGridComponent } from "./retail-dc-transaction-dtls-ro-grid/retail-dc-transaction-dtls-ro-grid.component";
import { RetailDcTransactionDtlsFormComponent } from "./retail-dc-transaction-dtls-form/retail-dc-transaction-dtls-form.component";
import { DctransactiondtlsService } from "./dctransactiondtls-service/dctransactiondtls.service";
import { RetailDcTransactionExFilterComponent } from "./retailDCTransactionExFilter/retail-dc-transaction-ex-filter.component";
import { RetaildctransactionexfilterService } from "./retaildctransactionexfilter-service/retaildctransactionexfilter.service";
import { TransactionRangeTypeControlComponent } from "./transaction-range-type-control/transaction-range-type-control.component";
import { FlashdebitcardrequestService } from "./flashdebitcardrequest-service/flashdebitcardrequest.service";
import { RetailFlashDebitCardRequestFormComponent } from "./retail-flash-debit-card-request-form/retail-flash-debit-card-request-form.component";
import { ContextualActionsComponent } from "./contextual-actions/contextual-actions.component";
import { DebitCardCarouselComponent } from "./debitcard-carousel/debitcard-carousel.component";
import { DebitCardComponent } from "./debitcard/debitcard.component";
import { ThirdPartyModule } from "../dep/core/third-party.module";
import { DebitcardContextMenuComponent } from "./debitcard-context-menu/debitcard-context-menu.component";
import { DebitcardConfirmationReceiptFormComponent } from "./debitcard-confirmation-receipt-form/debitcard-confirmation-receipt-form.component";
import { RetailDcTransactionSummaryFormComponent } from "./retail-dc-transaction-summary-form/retail-dc-transaction-summary-form.component";
import { RetailDebitcardFlashDetailsFormComponent } from "./retail-debitcard-flash-details-form/retail-debitcard-flash-details-form.component";
import { DebitcardDetailsService } from "./debitcard-details-service/debitcard-details.service";
import { dcCardTypeComponent } from './dcCardType/dcCardType.component';
import { RetailApplyDebitCardComponent } from "./retail-apply-debit-card/retail-apply-debit-card.component";
import { ApplyDebitCardService } from "./applyDebitCard-service/applyDebitCard.service";
import { DebitcardSpendingSummaryComponent } from "./debitcard-spending-summary/debitcard-spending-summary.component";
import { CCUnblockReasonListControlComponent } from "./cc-unblock-reason-list-control/cc-unblock-reason-list-control.component";
import { DCVerifyPinValidationFormComponent } from "./dc-verify-pin-validation-form/dc-verify-pin-validation-form.component";
import { RetailDcTransactionDownloadFilterComponent } from "./retailDcTransactionDownloadFilter/RetailDcTransactionDownloadFilter.component";
import { RetaildctransactiondownloadfilterService } from "./retaildctransactiondownloadfilter-service/retaildctransactiondownloadfilter.service";
import { RetailDebitCardSetPinFormComponent } from "./retail-debit-card-set-pin-form/retail-debit-card-set-pin-form.component";
import { DebitcardsetpinService } from "./debitcardsetpin-service/debitcardsetpin.service";
import { DcTransactionDownloadTypeControlComponent } from "./DcTransactionDownloadType-control/DcTransactionDownloadType-control.component";
import { DcTransactionDownloadTypeControlService } from "./DcTransactionDownloadType-control/DcTransactionDownloadType-control.service";
import { DisputeRemarksControlComponent } from "./dispute-remarks-control/dispute-remarks-control.component";
import { GoalsComponent } from "./goals/goals.component";
import { DebitcardHomeComponent } from "./debitcard-home/debitcard-home.component";
import { RetailDcTransactionDtlsRoGridHelper } from "./retail-dc-transaction-dtls-ro-grid/retail-dc-transaction-dtls-ro-grid.helper";

@NgModule({
  declarations: [
    // copy the below generated  in  declarations array  in module route.ts
    DebitCardCarouselComponent,
    DebitCardComponent,
    ContextualActionsComponent,
    debitcardComponent,
    retaildebitcardformComponent,
    RetailDebitCardLimitRequestComponent,
    DCAmountSliderControlComponent,
    DcServiceFlagControlComponent,
    activedcComponent,
    retaildccancelComponent,
    //DebitCardListControlComponent,
    //retaildcblockComponent,
    DCBlockReasonListControlComponent,
    activedcComponent,
    DebitCardListControlComponent,
    raisedisputedebitcardComponent,
    DisputeReasonListControlComponent,
    retaildcreplacementComponent,
    CorpAddressDetailsFormComponent,
    dcpinrequestComponent,
    DCReEnterPinControlComponent,
    InactiveDCListComponent,
    DCPinControlComponent,
    retaildcunblockComponent,
    DebitCardBlockReasonListComponent,
    DebitUnblockReasonListControlComponent,
    DCUnblockReasonComponent,
    DebitcardUnblockReasonListComponent,
    RetailDebitCardBlockFormComponent,
    ConfirmationReceiptFormComponent,
    BlockedDebitCardControlComponent,
    // RetailDebitCardFlashFormComponent,
    DcvvPinControlComponent,
    DebitCardNumberControlComponent,
    //RetailDcActivateCardFormComponent
    RetailDcActivateCardFormComponent,
    RetailDcTransactionDtlsRoGridComponent,
    RetailDcTransactionDtlsFormComponent,
    RetailDcTransactionExFilterComponent,
    TransactionRangeTypeControlComponent,
    RetailFlashDebitCardRequestFormComponent,
    DebitcardContextMenuComponent,
    DebitcardConfirmationReceiptFormComponent,
    RetailDcTransactionSummaryFormComponent,
    RetailDebitcardFlashDetailsFormComponent,
    RetailApplyDebitCardComponent,
    dcCardTypeComponent,
    DebitcardSpendingSummaryComponent,
    CCUnblockReasonListControlComponent,
    DCVerifyPinValidationFormComponent,
    RetailDcTransactionDownloadFilterComponent,
    RetailDebitCardSetPinFormComponent,
    DcTransactionDownloadTypeControlComponent,
    DisputeRemarksControlComponent,
    GoalsComponent,
    DebitcardHomeComponent
  ],

  imports: [
    DebitcardRoutingModule,
    DepositsModule,
    // AccountsModule,
    FoundationModule,
    ReactiveFormsModule,
    FormsModule,
    FpxCoreModule,
    MaterialModule,
    TranslateModule,
    CommonModule,
    ThirdPartyModule,
    AccountsModule

  ],
  providers: [
    // copy the below generated  in  providers array  in module route.ts
    DclimitrequestService,
    CanceldebitcardService,
    // BlockeddcService,
    ActivedcService,
    RaisedisputedebitcardService,
    DcaddonrequestService,
    CobaddressinfoService,
    DcpinrequestService,
    DcunblockrequestService,
    DcstatusrequestService,
    BlockeddcService,
    //DcflashrequestService,
    DcactivatecardService,
    DctransactiondtlsService,
    RetaildctransactionexfilterService,
    FlashdebitcardrequestService,
    DebitcardDetailsService,
    ApplyDebitCardService,
    CurrencyPipe,
    RetaildctransactiondownloadfilterService,
    DebitcardsetpinService,
    DcTransactionDownloadTypeControlService,
    RetailDcTransactionDtlsRoGridHelper
  ],
  exports: [
    // copy the below generated  in  exports array  in module route.ts
    DebitCardCarouselComponent,
    DebitCardComponent,
    ContextualActionsComponent,
    debitcardComponent,
    retaildebitcardformComponent,
    RetailDebitCardLimitRequestComponent,
    DCAmountSliderControlComponent,
    DcServiceFlagControlComponent,
    activedcComponent,
    retaildccancelComponent,
    //DebitCardListControlComponent,
    // retaildcblockComponent,
    DCBlockReasonListControlComponent,
    activedcComponent,
    DebitCardListControlComponent,
    raisedisputedebitcardComponent,
    DisputeReasonListControlComponent,
    retaildcreplacementComponent,
    CorpAddressDetailsFormComponent,
    dcpinrequestComponent,
    DCReEnterPinControlComponent,
    InactiveDCListComponent,
    DCPinControlComponent,
    retaildcunblockComponent,
    DebitCardBlockReasonListComponent,
    DebitUnblockReasonListControlComponent,
    DCUnblockReasonComponent,
    DebitcardUnblockReasonListComponent,
    RetailDebitCardBlockFormComponent,
    ConfirmationReceiptFormComponent,
    BlockedDebitCardControlComponent,
    // RetailDebitCardFlashFormComponent,
    DcvvPinControlComponent,
    DebitCardNumberControlComponent,
    RetailDcActivateCardFormComponent,
    RetailDcTransactionDtlsRoGridComponent,
    RetailDcTransactionDtlsFormComponent,
    RetailDcTransactionExFilterComponent,
    TransactionRangeTypeControlComponent,
    RetailFlashDebitCardRequestFormComponent,
    DebitcardContextMenuComponent,
    DebitcardConfirmationReceiptFormComponent,
    RetailDcTransactionSummaryFormComponent,
    RetailDebitcardFlashDetailsFormComponent,
    RetailApplyDebitCardComponent,
    dcCardTypeComponent,
    DebitcardSpendingSummaryComponent,
    CCUnblockReasonListControlComponent,
    DCVerifyPinValidationFormComponent,
    RetailDcTransactionDownloadFilterComponent,
    RetailDebitCardSetPinFormComponent,
    DcTransactionDownloadTypeControlComponent,
    DisputeRemarksControlComponent,
    GoalsComponent,
    DebitcardHomeComponent
  ],
})
export class DebitcardModule { }
