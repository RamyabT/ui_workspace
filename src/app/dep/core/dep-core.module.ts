import { NgModule } from "@angular/core";
import { DepAlertComponent } from "./component/dep-alert/dep-alert.component";
import { RetailSchedulePaymentTemplateComponent } from "./component/panning-component/retail-schedule-payment-template/retail-schedule-payment-template.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FpxCoreModule } from "@fpx/core";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "./material.module";
import { ThirdPartyModule } from "./third-party.module";
import { RetailTransferHistoryTemplateComponent } from "./component/panning-component/retail-transfer-history-template/retail-transfer-history-template.component";
import { RetailManageBeneficiaryTemplateComponent } from "./component/panning-component/retail-manage-beneficiary-template/retail-manage-beneficiary-template.component";
import { RetailDcTransferHistoryTemplateComponent } from "./component/panning-component/retail-dc-transfer-history-template/retail-dc-transfer-history-template.component";
import { DepConfirmationComponent } from './component/dep-confirmation/dep-confirmation.component';
import { RetailViewAllFaTransferTemplateComponent } from "./component/panning-component/retail-view-all-fav-transfer-template/retail-view-all-fav-transfer-template.component";
import { FavouriteBeneficiariesValidator } from "src/app/transfers/favouriteBeneficiaries-validator.service";
import { FoundationModule } from "src/app/foundation/foundation.module";
import { BlockCopyPasteDirective } from "./directive/app-block-copy-paste";
import { DcTransactionInfoComponent } from "src/app/debit-card/dc-transaction-info/dc-transaction-info.component";
import { RetailSavedBillerTemplateComponent } from "src/app/payments/retail-saved-biller-template/retail-saved-biller-template.component";
import { RetailBillHistoryTemplateComponent } from "src/app/payments/retail-bill-history-template/retail-bill-history-template.component";
import { RetailCcTransferHistoryTemplateComponent } from "./component/panning-component/retail-cc-transfer-history-template/retail-cc-transfer-history-template.component";
import { NativeStorage } from "@awesome-cordova-plugins/native-storage/ngx";
import { FingerprintAIO } from "@awesome-cordova-plugins/fingerprint-aio/ngx";
import { RetailBillerCategoryTemplateComponent } from "src/app/payments/retail-biller-category-template/app-retail-biller-category-template.component";
import { RetailPcTransferHistoryTemplateComponent } from "./component/panning-component/retail-pc-transfer-history-template/retail-pc-transfer-history-template.component";
import { RetailManageAlertTemplateComponent } from "./component/panning-component/retail-manage-alert-template/retail-manage-alert-template.component";
import { RetailManageUserAlertTemplateComponent } from "./component/panning-component/retail-manage-user-alert-template/retail-manage-user-alert-template.component";
import { RetailManageAuthenticatedDeviceTemplateComponent } from "./component/panning-component/retail-manage-authenticated-device-template/retail-manage-authenticated-device-template.component";
import { DepSessionAlertComponent } from "./component/dep-session-alert/dep-session-alert.component";
import { RetailProfileDocTemplateComponent } from "./component/panning-component/retail-profile-doc-template/retail-profile-doc-template.component";
import { DepAppVersionUpdateComponent } from "./component/dep-app-version-update/dep-app-version-update.component";
import { RetailViewAllFavETransferTemplateComponent } from "./component/panning-component/retail-view-all-fav-etransfer-template/retail-view-all-fav-etransfer-template.component";
import { RetailEtransferAutoDepositTemplateComponent } from "./component/panning-component/retail-etransfer-auto-deposit-template/retail-etransfer-auto-deposit-template.component";
import { DepExtensionComponents } from "../core/dep-core-extension-module";
import { RetailViewPortfolioHoldingTemplateComponent } from "./component/retail-view-portfolio-holdings-template/retail-view-portfolio-holdings-template/retail-view-portfolio-holdings-template.component";
import { DepositQuickActionsComponent } from "./component/deposit-quick-actions/deposit-quick-actions.component";
import { RetailTrackGoalsTemplateComponent } from "./component/panning-component/retail-track-goals-template/retail-track-goals-template.component";
import { RetailTrackBudgetTemplateComponent } from "./component/panning-component/retail-track-budget-template/retail-track-budget-template.component";
import { PfmbudgetService } from "src/app/pfm/pfmbudget-service/pfmbudget.service";
import { PfmgoalsreqService } from "src/app/pfm/pfmgoalsreq-service/pfmgoalsreq.service";
import { RetailPfmTransactionTemplateComponent } from "./component/panning-component/retail-pfm-transaction-history-template/retail-pfm-transaction-history-template.component";
import { RetailMemberGoalsTemplatesComponent } from "./component/panning-component/retail-member-goals-templates/retail-member-goals-templates.component";
import { RetailMemberChoresTemplatesComponent } from "./component/panning-component/retail-member-chores-templates/retail-member-chores-templates.component";
import { RetailFbmemberScheduleTemplateComponent } from "./component/panning-component/retail-fbmember-schedule-template/retail-fbmember-schedule-template.component";
import { RetailWalletTransactionHistoryComponent } from "./component/panning-component/retail-wallet-transaction-history/retail-wallet-transaction-history.component";
import { RetailWalletReceivedHistoryComponent } from "./component/panning-component/retail-wallet-received-history/retail-wallet-received-history.component";
import { RetailWalletRequestedHistoryComponent } from "./component/panning-component/retail-wallet-requested-history/retail-wallet-requested-history.component";
import { RetailRewardTransactionTemplateComponent } from "./component/panning-component/retail-reward-transaction-template/retail-reward-transaction-template.component";
import { NumberOnlyDirective } from "./directive/app-number-only";

@NgModule({
    declarations: [
        DepAlertComponent,
        DepSessionAlertComponent,
        RetailSchedulePaymentTemplateComponent,
        RetailTransferHistoryTemplateComponent,
        RetailManageBeneficiaryTemplateComponent,
        RetailDcTransferHistoryTemplateComponent,
        DepConfirmationComponent,
        RetailViewAllFaTransferTemplateComponent,
        BlockCopyPasteDirective,
        DcTransactionInfoComponent,
        RetailSavedBillerTemplateComponent,
        RetailBillHistoryTemplateComponent,
        RetailCcTransferHistoryTemplateComponent,
        RetailBillerCategoryTemplateComponent,
        RetailPcTransferHistoryTemplateComponent,
        RetailManageAlertTemplateComponent,
        RetailManageUserAlertTemplateComponent,
        RetailManageAuthenticatedDeviceTemplateComponent,
        RetailProfileDocTemplateComponent,
        DepAppVersionUpdateComponent,
        RetailViewAllFavETransferTemplateComponent,
        RetailEtransferAutoDepositTemplateComponent,
        RetailViewPortfolioHoldingTemplateComponent,
        DepositQuickActionsComponent,
        RetailTrackGoalsTemplateComponent,
        RetailTrackBudgetTemplateComponent,
        RetailPfmTransactionTemplateComponent,
        RetailMemberGoalsTemplatesComponent,
        RetailMemberChoresTemplatesComponent,
        RetailFbmemberScheduleTemplateComponent,
        RetailWalletTransactionHistoryComponent,
        RetailWalletReceivedHistoryComponent,
        RetailWalletRequestedHistoryComponent,
        RetailRewardTransactionTemplateComponent,
        NumberOnlyDirective,
	    ...DepExtensionComponents

    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        FpxCoreModule,
        TranslateModule,
        FoundationModule,
        MaterialModule,
        ThirdPartyModule,
        CommonModule
    ],
    providers: [
        FavouriteBeneficiariesValidator,
        NativeStorage,
        FingerprintAIO,
        PfmbudgetService,
        PfmgoalsreqService
    ],
    exports: [
        DepAlertComponent,
        DepSessionAlertComponent,
        RetailSchedulePaymentTemplateComponent,
        RetailTransferHistoryTemplateComponent,
        RetailManageBeneficiaryTemplateComponent,
        RetailDcTransferHistoryTemplateComponent,
        DepConfirmationComponent,
        RetailViewAllFaTransferTemplateComponent,
        BlockCopyPasteDirective,
        RetailSavedBillerTemplateComponent,
        RetailBillHistoryTemplateComponent,
        RetailCcTransferHistoryTemplateComponent,
        RetailBillerCategoryTemplateComponent,
        RetailPcTransferHistoryTemplateComponent,
        RetailManageAlertTemplateComponent,
        RetailManageUserAlertTemplateComponent,
        RetailManageAuthenticatedDeviceTemplateComponent,
        RetailProfileDocTemplateComponent,
        DepAppVersionUpdateComponent,
        RetailViewAllFavETransferTemplateComponent,
        RetailEtransferAutoDepositTemplateComponent,
        RetailViewPortfolioHoldingTemplateComponent,
        DepositQuickActionsComponent,
        RetailTrackGoalsTemplateComponent,
        RetailTrackBudgetTemplateComponent,
        RetailPfmTransactionTemplateComponent,
        RetailMemberGoalsTemplatesComponent,
        RetailMemberChoresTemplatesComponent,
        RetailFbmemberScheduleTemplateComponent,
        RetailWalletTransactionHistoryComponent,
        RetailWalletReceivedHistoryComponent,
        RetailWalletRequestedHistoryComponent,
        RetailRewardTransactionTemplateComponent,
        NumberOnlyDirective,
        ...DepExtensionComponents
    ]
})

export class DepCoreModule { }