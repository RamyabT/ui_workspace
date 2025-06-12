import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { WalletSummaryCardCarouselComponent } from './wallet-summary-card-carousel/wallet-summary-card-carousel.component';
import { WalletSummaryCardComponent } from './wallet-summary-card/wallet-summary-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, ThirdPartyModule } from '@dep/core';
import { WalletRoutingModule } from './wallet-routing.module';
import { RetailShowWalletQrComponent } from './show-wallet-qr/show-wallet-qr.component';
import { TranslateModule } from '@ngx-translate/core';
import { FpxCoreModule } from '@fpx/core';
import { RetailScanWalletQrComponent } from './scan-wallet-qr/scan-wallet-qr.component';
import { FoundationModule } from '../foundation/foundation.module';
import { RetailWalletTransferFormComponent } from './retail-wallet-tansfer-form/retail-wallet-transfer-form.component';
import { WalletTransferService } from './walletTransfer-service/walletTransfer.service';
import { WalletAccountNumberDropdownControlComponent } from './components/wallet-account-number-dropdown-control/wallet-account-number-dropdown-control.component';
import { WalletService } from './components/wallet-service/wallet.service';
import { MobileNumberSearchFormComponent } from './mobile-number-search-form/mobile-number-search-form.component';
import { NpssModule } from '../npss/npss.module';
import { WalletrequestmoneyService } from './walletrequestmoney-service/walletrequestmoney.service';
import { WalletSelectContactROGRIDComponent } from './wallet-select-contact-ro-grid/wallet-select-contact-ro-grid.component';
import { WalletConfirmationReceiptFormComponent } from './wallet-confirmation-receipt-form/wallet-confirmation-receipt-form.component';
import { RetailWalletAddMoneyFormComponent } from './retail-wallet-add-money-form/retail-wallet-add-money-form.component';
import { WalletaddmoneyService } from './walletaddmoney-service/walletaddmoney.service';
import { widgetModule } from '../widget/widget.module';
import { WalletNavigationFormComponent } from './wallet-navigation-form/wallet-navigation-form.component';
import { WalletAccountDtlListControlComponent } from './wallet-account-dtl-list-control/wallet-account-dtl-list-control.component';
import { WalletTransactionSummaryComponent } from './wallet-transaction-summary/wallet-transaction-summary.component';
import { WalletTransactionSummaryRoGridComponent } from './wallet-transaction-summary-ro-grid/wallet-transaction-summary-ro-grid.component';
import { WalletHomeComponent } from './wallet-home/wallet-home.component';
import { WalletFilterTransactionFormComponent } from './wallet-filter-transaction-form/wallet-filter-transaction-form.component';
import { TransfersModule } from '../transfers/transfers.module';
import { WallethistroyService } from './trans-history-service/wallethistroy.service';
import { WalletQuickActionComponent } from './wallet-quick-action/wallet-quick-action.component';
import { WalletContextMenuComponent } from './wallet-context-menu/wallet-context-menu.component';
import { WalletDetailFormComponent } from './wallet-detail-form/wallet-detail-form.component';
import { WalletwithdrawmoneyService } from './walletwithdrawmoney-service/walletwithdrawmoney.service';
import { RetailWalletWithDrawMoneyFormComponent } from './retail-wallet-withdraw-money/retail-wallet-withdraw-money.component';
import { WalletRequestedSummaryComponent } from './wallet-requested-summary/wallet-requested-summary.component';
import { WalletRequestedSummaryRoGridComponent } from './wallet-requested-summary-ro-grid/wallet-requested-summary-ro-grid.component';
import { WalletReceivedSummaryRoGridComponent } from './wallet-received-summary-ro-grid/wallet-received-summary-ro-grid.component';
import { WalletReceivedSummaryComponent } from './wallet-received-summary/wallet-received-summary.component';
import { RetailWalletRegistrationFormComponent } from './retail-wallet-registration-form/retail-wallet-registration-form.component';
import { WalletregistrationService } from './walletregistration-service/walletregistration.service';
import { RetailWalletTransactionLimitFormComponent } from './retail-wallet-tranlimit-form/retail-wallet-tranlimit-form.component';
import { WallettranlimitService } from './wallettranlimit-service/wallettranlimit.service';
import { DebitcardModule } from '../debit-card/debitcard.module';
import { FulfillRequestApprovalComponent } from './fulfill-request-approval-form/fulfill-request-approval-form.component';
import { RetailWalletReqMoneyFormComponent } from './retail-wallet-req-money/retail-wallet-req-money.component';
import { WalletreceiveService } from './trans-history-service/walletreceive.service';
import { WalletRegFormComponent } from './wallet-reg-form/wallet-reg-form.component';
import { WalletFilterReceivedFormComponent } from './wallet-filter-received-form/wallet-filter-received-form.component';
const WALLET_COMPONENTS = [
  RetailShowWalletQrComponent,
  RetailScanWalletQrComponent,
  RetailWalletTransferFormComponent,
  WalletAccountNumberDropdownControlComponent,
  MobileNumberSearchFormComponent,
  WalletSelectContactROGRIDComponent,
   RetailWalletAddMoneyFormComponent,
  WalletConfirmationReceiptFormComponent,
   WalletSummaryCardCarouselComponent,
WalletSummaryCardComponent,
WalletNavigationFormComponent,
WalletAccountDtlListControlComponent,
WalletTransactionSummaryComponent,
WalletTransactionSummaryRoGridComponent,
WalletFilterTransactionFormComponent,
WalletHomeComponent,
WalletQuickActionComponent,
WalletContextMenuComponent,
WalletDetailFormComponent,
  RetailWalletAddMoneyFormComponent,
  WalletAccountNumberDropdownControlComponent,
  WalletConfirmationReceiptFormComponent,
  RetailWalletWithDrawMoneyFormComponent,
  WalletRequestedSummaryComponent,
  WalletRequestedSummaryRoGridComponent,
  WalletReceivedSummaryRoGridComponent,
  WalletReceivedSummaryComponent,
  RetailWalletRegistrationFormComponent,
   RetailWalletTransactionLimitFormComponent,
  FulfillRequestApprovalComponent,
  RetailWalletReqMoneyFormComponent,
  WalletFilterReceivedFormComponent,
    WalletRegFormComponent
]

@NgModule({
  declarations: [
    ...WALLET_COMPONENTS
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    FpxCoreModule,
    FoundationModule,
    ThirdPartyModule,
    widgetModule ,
    TransfersModule,
     DebitcardModule,
     NpssModule
    
  ],
  providers:[
    WalletTransferService,
    WalletService,
    WalletrequestmoneyService,
     WalletaddmoneyService,
      WallethistroyService,
      WalletwithdrawmoneyService,
      WalletregistrationService,
      WallettranlimitService,
      DatePipe,
      WalletreceiveService
  ],
   exports: [
    ...WALLET_COMPONENTS
  ]
})
export class WalletModule { }
