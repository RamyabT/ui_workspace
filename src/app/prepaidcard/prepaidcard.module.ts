import { PrepaidcardRoutingModule } from "./prepaidcard-routing.module";
import { PrepaidLoadMoneyService } from "./prepaidLoadMoney-service/prepaidLoadMoney.service";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { FpxCoreModule } from "@fpx/core";
import { TranslateModule } from "@ngx-translate/core";
import { MaterialModule } from "../dep/core/material.module";
import { DebitcardModule } from "../debit-card/debitcard.module";
import { CreditCardsModule } from "../credit-cards/credit-cards.module";
import { FoundationModule } from "../foundation/foundation.module";
import { AccountsModule } from "../accounts/accounts.module";
import { ThirdPartyModule } from "../dep/core/third-party.module";
import { PrepaidCardListControlComponent } from "./prepaidcard-list-control/prepaidcard-list-control.component";
import { ConfirmationReceiptFormComponent } from "../accounts/confirmation-receipt-form/confirmation-receipt-form.component";
import { PpcardBlockedService } from "./ppcardBlocked-service/ppcardBlocked.service";
import { PrepaidCardListComponent } from "./prepaid-card-list-control/prepaid-card-list-control.component";
import { prepaidCardBlockedreasonComponent } from "./prepaid-card-reason/ppCardReason.component";
import { RetailPrepaidBlockFormComponent } from "./retail-prepaid-card-block-form/retail-prepaid-card-block-form.component";
import { PrepaidCardNumberComponent } from "./prepaid-card-number-list-control/prepaid-card-number-list-control.component";
import { CorpAddressDetailsFormComponent } from "../debit-card/corp-address-details-form/corp-address-details-form.component";
import { blockPrepaidCardListComponent } from "./block-prepaidcard-list/blockPrepaidCardList.component";
import { pcUnblockReasonComponent } from "./pc-unblockreason-list/pcUnblockReason.component";
import { retailpcunblockComponent } from "./retail-pc-unblock-form/retail-pc-unblock-form.component";
import { CobaddressinfoService } from "../foundation/cobaddressinfo-service/cobaddressinfo.service";
import { BlockPrepaidCardListService } from "./blockPrepaidCardList-service/blockPrepaidCardList.service";
import { PcardonrequestService } from "./pcardonrequest-service/pcardonrequest.service";
import { PcunblockrequestService } from "./pcunblockrequest-service/pcunblockrequest.service";
import { PpCardService } from "./ppCard-service/ppCard.service";
import { PpCardReasonService } from "./ppCardReason-service/ppCardReason.service";
import { RetailPrepaidChanfePinComponent } from "./retail-prepaid-change-pin/retail-prepaid-change-pin.component";
import { PcPinRequestService } from "./pcPinRequest-service/pcPinRequest.service";
import { PrepaidCardCarouselComponent } from "./prepaidcard-carousel/prepaidcard-carousel.component";
import { PrepaidCardComponent } from "./prepaidcard/prepaidcard.component";
import { CommonModule } from "@angular/common";
import { PrePaidActivationService } from "./prePaidActivation-service/prePaidActivation.service";
import { retailActivePrepaidCardComponent } from "./retail-pp-activate-card-form/retail-pp-activate-card-form.component";
import { InactivePPCardListControlComponent } from "./inActive-pp-card-list-control/inActive-pp-card-list-control.component";
import { raisedisputePrepaidCardComponent } from "./retail-ppcard-dispute-form/retail-ppcard-dispute-form.component";
import { RaisedisputePrepaidCardService } from "./raisedisputePrepaidCard-service/raisedisputePrepaidCard.service";
import { RetailPrepaidCardsSummaryRoGridComponent } from "./retail-prepaid-cards-summary-ro-grid/retail-prepaid-cards-summary-ro-grid.component";
import { RetailPCDetailsFormComponent } from "./retail-pc-details-form/retail-pc-details-form.component";
import { PrepaidCardTypeListControlComponent } from "./prepaid-card-type-list-control/prepaid-card-type-list-control.component";
import { PrepaidCardRefNumberListControlComponent } from "./prepaid-cardref-list-control/prepaid-cardref-list-control.component";
import { RetailFlashPrepaidCardRequestFormComponent } from "./retail-pp-flash-form/retail-pp-flash-form.component";
import { FlashprepaidcardrequestService } from "./flashprepaidcardrequest-service/flashprepaidcardrequest.service";
import { RetailPCTransactiondtlsFormComponent } from "./retail-pc-transactiondtls-form/retail-pc-transactiondtls-form.component";
import { RetailPcTransactionExFilterComponent } from "./retailPCTransactionExFilter/retail-pc-transaction-ex-filter.component";
import { RetailpctransactionexfilterService } from "./retailpctransactionexfilter-service/retailpctransactionexfilter.service";
import { PctransactiondtlsService } from "./pctransactiondtls-service/pctransactiondtls.service";
import { RetailPcTransactionDtlsRoGridComponent } from "./retail-pc-transaction-dtls-ro-grid/retail-pc-transaction-dtls-ro-grid.component";
import { PrepaidcardContextMenuComponent } from "./prepaidcard-context-menu/prepaidcard-context-menu.component";
//mport { ContextualActionsComponent } from "./contextual-actions/contextual-actions.component";
import { PrepaidcardContextualActionsComponent } from "./prepaidcard-contextual-actions/prepaidcard-contextual-actions.component";
import { PrepaidcardConfirmationReceiptFormComponent } from "./prepaidcard-confirmation-receipt-form/prepaidcard-confirmation-receipt-form.component";
import { RetailPrepaidWalletTransferFormComponent } from "./retail-prepaid-wallet-transfer-form/retail-prepaid-wallet-transfer-form.component";
import { PrepaidwallettransferreqService } from "./prepaidwallettransferreq-service/prepaidwallettransferreq.service";
import { RetailPrepaidTopUpFormComponent } from "./retail-prepaid-topup-form/retail-prepaid-topup-form.component";
import { RetailpcTransactionFilterComponent } from "./retail-pc-transaction-filter/retail-pc-transaction-filter.component";
import { RetailpcTransactionFilterService } from "./retail-pc-transaction-filter-service/retail-pc-transaction-filter.service";
import { RetailPCChangeLimitFormComponent } from './retail-pc-change-limit-form/retail-pc-change-limit-form.component';
import { PcChangeLimitService } from './pcChangeLimit-service/pcChangeLimit.service';
import { PCServiceFlagControlComponent } from './pc-service-flag-control/pc-service-flag-control.component';
import { PcTransactionInfoComponent } from "./pc-transaction-info/pc-transaction-info.component";
import { RetailPcTransactionDownloadFilterComponent } from "./retail-pc-transaction-download-filter/retail-pc-transaction-download-filter.component";
import { RetailPctransactiondownloadfilterService } from "./retail-pc-transaction-download-filter-service/retail-pc-transaction-download-filter.service";
import { PrepaidcardSpendingSummaryComponent } from "./prepaidcard-spending-summary/prepaidcard-spending-summary.component";
import { PCVerifyPinValidationFormComponent } from "./pc-verify-pin-validation-form/pc-verify-pin-validation-form.component";
import { RetailPCFlashDetailsFormComponent } from "./retail-pc-flash-details-form/retail-pc-flash-details-form.component";
import { PcpinvalidationService } from "./pcpinvalidation-service/pcpinvalidation.service";
import { PrepaidcardDetailsService } from "./prepaidcard-details-service/prepaidcard-details.service";
import { PcCardBalanceInfoComponent } from "./pc-card-balance-info/pc-card-balance-info.component";
import { PrepaidcardHomeComponent } from "./prepaidcard-home/prepaidcard-home.component";

@NgModule({
  declarations: [
    // copy the below generated  in  declarations array  in module route.ts
    PrepaidCardListControlComponent,
    RetailPrepaidBlockFormComponent,
    prepaidCardBlockedreasonComponent,
    PrepaidCardNumberComponent,
    PrepaidCardListComponent,
    PrepaidCardListComponent,
    retailpcunblockComponent,
    prepaidCardBlockedreasonComponent,
    pcUnblockReasonComponent,
    blockPrepaidCardListComponent,
    RetailPrepaidChanfePinComponent,
    PrepaidCardCarouselComponent,
    PrepaidCardComponent,
    retailActivePrepaidCardComponent,
    InactivePPCardListControlComponent,
    raisedisputePrepaidCardComponent,
    RetailPrepaidCardsSummaryRoGridComponent,
    RetailPCDetailsFormComponent,
    PrepaidCardTypeListControlComponent,
    PrepaidCardRefNumberListControlComponent,
    RetailFlashPrepaidCardRequestFormComponent,
    RetailPcTransactionExFilterComponent,
    RetailPCTransactiondtlsFormComponent,
    RetailPcTransactionDtlsRoGridComponent,
    PrepaidcardContextMenuComponent,
    PrepaidcardContextualActionsComponent,
    PrepaidcardConfirmationReceiptFormComponent,
    RetailPrepaidWalletTransferFormComponent,
    RetailPrepaidTopUpFormComponent,
    RetailpcTransactionFilterComponent,
    PCServiceFlagControlComponent,
   RetailPCChangeLimitFormComponent,
    PcTransactionInfoComponent,
    RetailPcTransactionDownloadFilterComponent,
    PrepaidcardSpendingSummaryComponent,
    PCVerifyPinValidationFormComponent,
    RetailPCFlashDetailsFormComponent,
    PcCardBalanceInfoComponent,
    PrepaidcardHomeComponent
  ],

  imports: [
    // copy the below generated  in  imports  array  in module route.ts
    PrepaidcardRoutingModule,
    DebitcardModule,
    CreditCardsModule,
    FoundationModule,
    AccountsModule,
    ThirdPartyModule,
    ReactiveFormsModule,
    FormsModule,
    FpxCoreModule,
    MaterialModule,
    TranslateModule,
    CommonModule,
  ],
  providers: [
    // copy the below generated  in  providers array  in module route.ts
    PrepaidLoadMoneyService,
    PpcardBlockedService,
    PcardonrequestService,
    CobaddressinfoService,
    PpCardService,
    PcunblockrequestService,
    PpcardBlockedService,
    PpCardReasonService,
    BlockPrepaidCardListService,
    PcPinRequestService,
    PrePaidActivationService,
    RaisedisputePrepaidCardService,
    FlashprepaidcardrequestService,
    RetailpctransactionexfilterService,
    PctransactiondtlsService,
    PrepaidwallettransferreqService,
    PrepaidLoadMoneyService,
    RetailpcTransactionFilterService,
    PcChangeLimitService,
    RetailPctransactiondownloadfilterService,
    PcpinvalidationService,
    PrepaidcardDetailsService
  ],
  exports: [
    // copy the below generated  in  exports array  in module route.ts
    PrepaidCardListControlComponent,
    RetailPrepaidBlockFormComponent,
    // PrepaidCardNumberComponent,
    prepaidCardBlockedreasonComponent,
    // raisedisputePrepaidCardComponent,
    PrepaidCardNumberComponent,
    PrepaidCardListComponent,
    //PrepaidCardNumberControlComponen

    PrepaidCardListComponent,
    retailpcunblockComponent,

    prepaidCardBlockedreasonComponent,
    pcUnblockReasonComponent,
    blockPrepaidCardListComponent,
    RetailPrepaidChanfePinComponent,
    PrepaidCardCarouselComponent,
    PrepaidCardComponent,
    retailActivePrepaidCardComponent,
    InactivePPCardListControlComponent,
    raisedisputePrepaidCardComponent,
    RetailPrepaidCardsSummaryRoGridComponent,
    RetailPCDetailsFormComponent,
    PrepaidCardTypeListControlComponent,
    PrepaidCardRefNumberListControlComponent,
    RetailFlashPrepaidCardRequestFormComponent,
    RetailPCTransactiondtlsFormComponent,
    RetailPcTransactionExFilterComponent,
    RetailPcTransactionDtlsRoGridComponent,
    PrepaidcardContextMenuComponent,
    PrepaidcardContextualActionsComponent,
    PrepaidcardConfirmationReceiptFormComponent,
    RetailPrepaidWalletTransferFormComponent,
    RetailPrepaidTopUpFormComponent,
    RetailpcTransactionFilterComponent,
    PCServiceFlagControlComponent,
   RetailPCChangeLimitFormComponent,
    PcTransactionInfoComponent,
    RetailPcTransactionDownloadFilterComponent,
    PrepaidcardSpendingSummaryComponent,
    PCVerifyPinValidationFormComponent,
    RetailPCFlashDetailsFormComponent,
    PcCardBalanceInfoComponent,
    PrepaidcardHomeComponent
  ],
})
export class PrepaidcardModule {}
