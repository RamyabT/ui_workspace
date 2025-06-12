import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule, ThirdPartyModule } from '@dep/core';
import { ChequeBooksListControlComponent } from './cheque-books-list-control/cheque-books-list-control.component';
import { ChequeBookLeavesListControlComponent } from './cheque-book-leaves-list-control/cheque-book-leaves-list-control.component';
import { ConfirmationReceiptFormComponent } from './confirmation-receipt-form/confirmation-receipt-form.component';
import { PayableAtControlComponent } from './payable-at-control/payable-at-control.component';
import { AccountnicknameService } from './accountnickname-service/accountnickname.service';
import { RetailDDRequestFormComponent } from './retail-dd-request-form/retail-dd-request-form.component';
import { DdrequestService } from './ddrequest-service/ddrequest.service';
import { AccountTypeListControlComponent } from './account-type-list-control/account-type-list-control.component';
import { CasaProductListControlComponent } from './casa-product-list-control/casa-product-list-control.component';
import { CobaddressinfoService } from '../foundation/cobaddressinfo-service/cobaddressinfo.service';
import { DDBeneficiaryIDControlComponent } from './dd-beneficiary-id-control/dd-beneficiary-id-control.component';
import { DDBeneficiaryNameControlComponent } from './dd-beneficiary-name-control/dd-beneficiary-name-control.component';
import { CasaSummaryCardComponent } from './casa-summary-card/casa-summary-card.component';
import { ContextualActionsComponent } from './contextual-actions/contextual-actions.component';
import { CasaContextMenuComponent } from './casa-context-menu/casa-context-menu.component';
import { RetailAccountDetailsFormComponent } from './retail-account-details-form/retail-account-details-form.component';
import { RetailChequeBookRequestComponent } from './retail-cheque-book-request/retail-cheque-book-request.component';
import { ChequebookrequestService } from './chequebookrequest-service/chequebookrequest.service';
import { RetailEstmtRequestFormComponent } from './retail-estmt-request-form/retail-estmt-request-form.component';
import { EstmtrequestService } from './estmtrequest-service/estmtrequest.service';
import { StatementModeControlComponent } from './statement-mode-control/statement-mode-control.component';
import { CasaSummaryCardCarouselComponent } from './casa-summary-card-carousel/casa-summary-card-carousel.component';
import { ViewCasaTransactionFormComponent } from './view-casa-transaction-form/view-casa-transaction-form.component';
import { RetailCasaTransactionDtlsRoGridComponent } from './retail-casa-transaction-dtls-ro-grid/retail-casa-transaction-dtls-ro-grid.component';
import { CasaTransactionInfoComponent } from './casa-transaction-info/casa-transaction-info.component';
import { retailcasatrandtlsfilterformComponent } from './retailcasatrandtlsfilterform/retail-casa-tran-dtls-filter-form.component';
import { RetailcasatrandtlsfilterformService } from './retailcasatrandtlsfilterform-service/retailcasatrandtlsfilterform.service';
import { AccountsRoutingModule } from './accounts-routing.module';
import { RetailCasaTransactionStmtROGridComponent } from './retail-casatransaction-stmt-ro-grid/retail-casatransaction-stmt-ro-grid.component';
import { CasatransactiondtlsService } from './casatransactiondtls-service/casatransactiondtls.service';
import { RetailChequeStatusInquiryFormComponent } from './retail-cheque-status-inquiry-form/retail-cheque-status-inquiry-form.component';
import { ChequeNumberControlComponent } from './cheque-number-control/cheque-number-control.component';
import { ChequeStatusListControlComponent } from './cheque-status-list-control/cheque-status-list-control.component';
import { InquiryTypeComponent } from './inquiry-type/inquiry-type.component';
import { RetailAccountNicknameFormComponent } from './retail-account-nickname-form/retail-account-nickname-form.component';
import { RetailChequeStatusInquiryDisplayGridComponent } from './retail-cheque-status-inquiry-display-grid/retail-cheque-status-inquiry-display-grid.component';
import { ChequeStatusInquiryService } from './chequeStatusInquiry-service/chequeStatusInquiry.service';
import { RetailchequestatusinquiryformService } from './retailchequestatusinquiryform-service/retailchequestatusinquiryform.service';
import { RetailOpenNewCasaFormComponent } from './retail-open-new-casa-form/retail-open-new-casa-form.component';
import { OpennewcasaService } from './opennewcasa-service/opennewcasa.service';
import { ChequeDateControlComponent } from './cheque-date-control/cheque-date-control.component';
import { RetailPdcChequeFormComponent } from './retail-pdc-cheque-form/retail-pdc-cheque-form.component';
import { RetailpdcchequeformService } from './retailpdcchequeform-service/retailpdcchequeform.service';
import { PdcInquiryTypeControlComponent } from './pdc-inquiry-type-control/pdc-inquiry-type-control.component';
import { RetailPdcChequeDisplayGridComponent } from './retail-pdc-cheque-display-grid/retail-pdc-cheque-display-grid.component';
import { PdcchequereqService } from './pdcchequereq-service/pdcchequereq.service';
import { ExchangeRateValidator } from '../foundation/payment-amount-control/exchange-rate-validator.service';
import { PaymentAmountControlHelper } from '../foundation/payment-amount-control/payment-amount-control.helper';
import { ClearNicknameControlComponent } from './clear-nickname-control/clear-nickname-control.component';
import { accountNicknameValidator } from '../foundation/nick-name-control/accountNickname-validator.service';
import { CustomerValidatorService } from '../foundation/validator-service/delivery-option-validator.service';
import { AccountsInsightsComponent } from './accounts-insights/accounts-insights.component';
import { retailcasatrandtlsDownloadfilterformComponent } from './retailcasatrandtlsDownloadfilterform/retail-casa-tran-dtls-download-filter-form.component';
import { CasaHomeComponent } from './casa-home/casa-home.component';
import { AccountsMoneyFlowComponent } from './accounts-money-flow/accounts-money-flow.component';
import { FoundationModule } from '../foundation/foundation.module';
import { RetailAdhocAccStmtReqFormComponent } from './retail-adhoc-accStmtReq-form/retail-adhoc-accStmtReq-form.component';
import { AccountStmtReqService } from './accountStmtReq-service/accountStmtReq.service';
import { OtherRequestModule } from '../other-request/other-request.module';

import { AccountsExtensionComponents, AccountsExtensionServices, AccountsImportExtension } from './accounts-module-extension';
import { TranRangeTypeListControlComponent } from './tran-range-type-list-control/tran-range-type-list-control.component';
import { TranAccTypeListControlComponent } from './tran-acc-type-list-control/tran-acc-type-list-control.component';
import { FilterSearchControlComponent } from './filter-search-control/filter-search-control.component';
import { FilterSearchService } from './filterSearch-service/filterSearch.service';
import { TranRangeTypeService } from './tranRangeType-service/tranRangeType.service';
import { TranTypeService } from './tranType-service/tranType.service';
import { ViewChequeImageComponent } from './view-cheque-image/view-cheque-image.component';
import { TransactionAmountControlComponent } from './transaction-amount-control/transaction-amount-control.component';
import { RetailStopChequeRequestFormComponent } from './retail-stop-cheque-request-form/retail-stop-cheque-request-form.component';
import { StopchequerequestService } from './stopchequerequest-service/stopchequerequest.service';
import { StopchequeService } from './stopcheque-service/stopcheque.service';
import { stopChequeTypeControlComponent } from './stop-cheque-type-control/stop-cheque-type-control.component';
import { stopChequeTypeControlService } from './stop-cheque-type-control/stop-cheque-type-control.service';
import { PayeeControlComponent } from './payee-control/payee-control.component';
import { RetailChqdDepositFormComponent } from './retail-chqd-deposit-form/retail-chqd-deposit-form.component';
import { ImageUploadComponent } from './Image-upload-control/Image-upload-control.component';
import { ChequedepositService } from './chequedeposit-service/chequedeposit.service';
import { UtilityModule } from '../utility/utility.module';
import { RetailAddTaskFromComponent } from './retail-add-task-form/reatail-add-task-form.component';
import { TasklogService } from './tasklog-service/tasklog.service';
import { AccountRestrictionControlComponent } from './account-restriction-control/account-restriction-control.component';
import { ClosureRemarksControlComponent } from './closure-remarks-control/closure-remarks-control.component';
import { TaskNameControlComponent } from './task-name-control/task-name-control.component';
import { DebitAccNoComponent } from './debit-acc-number/debit-acc-number.component';
import { DebitAccNoService } from './debitAccNo-service/debitAccNo.service';
import { GoalNameFormControlComponent } from './goal-name-form-control/goal-name-form-control.component';

@NgModule({
  declarations: [
    RetailChequeBookRequestComponent,
    ChequeBooksListControlComponent,
    ChequeBookLeavesListControlComponent,
    ConfirmationReceiptFormComponent,
    RetailOpenNewCasaFormComponent,
    AccountTypeListControlComponent,
    CasaProductListControlComponent,
    ClearNicknameControlComponent,
    PayableAtControlComponent,
    RetailDDRequestFormComponent,
    DDBeneficiaryIDControlComponent,
    DDBeneficiaryNameControlComponent,
    CasaSummaryCardComponent,
    ContextualActionsComponent,
    CasaContextMenuComponent,
    RetailAccountDetailsFormComponent,
    RetailEstmtRequestFormComponent,
    StatementModeControlComponent,
    CasaSummaryCardCarouselComponent,
    ViewCasaTransactionFormComponent,
    RetailCasaTransactionDtlsRoGridComponent,
    CasaTransactionInfoComponent,
    retailcasatrandtlsfilterformComponent,
    RetailCasaTransactionStmtROGridComponent,
    ChequeStatusListControlComponent,
    ChequeNumberControlComponent,
    InquiryTypeComponent,
    RetailChequeStatusInquiryFormComponent,
    RetailChequeStatusInquiryDisplayGridComponent,
    ChequeDateControlComponent,
    RetailPdcChequeFormComponent,
    PdcInquiryTypeControlComponent,
    RetailPdcChequeDisplayGridComponent,
    RetailAccountNicknameFormComponent,
    AccountsInsightsComponent,
    retailcasatrandtlsDownloadfilterformComponent,
    CasaHomeComponent,
    AccountsMoneyFlowComponent,
    RetailAdhocAccStmtReqFormComponent,
    TranRangeTypeListControlComponent,
    TranAccTypeListControlComponent,
    FilterSearchControlComponent,
    ViewChequeImageComponent,
    TransactionAmountControlComponent,
    RetailStopChequeRequestFormComponent,
    stopChequeTypeControlComponent,
    PayeeControlComponent,
    RetailChqdDepositFormComponent,
    ImageUploadComponent,
    RetailAddTaskFromComponent,
    AccountRestrictionControlComponent,
    ClosureRemarksControlComponent,
    TaskNameControlComponent,
    DebitAccNoComponent,
    GoalNameFormControlComponent,
    ...AccountsExtensionComponents
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    TranslateModule,
    FoundationModule,
    MaterialModule,
    ThirdPartyModule,
    OtherRequestModule,
    UtilityModule,
    ...AccountsImportExtension
  ],
  providers: [
    AccountnicknameService,
    DdrequestService,
    CobaddressinfoService,
    OpennewcasaService,
    ChequebookrequestService,
    EstmtrequestService,
    RetailcasatrandtlsfilterformService,
    CasatransactiondtlsService,
    ChequeStatusInquiryService,
    RetailchequestatusinquiryformService,
    RetailpdcchequeformService,
    PdcchequereqService,
    ExchangeRateValidator,
    PaymentAmountControlHelper,
    accountNicknameValidator,
    CustomerValidatorService,
    AccountStmtReqService,
    FilterSearchService,
    TranTypeService,
    TranRangeTypeService,
    StopchequerequestService,
    StopchequeService,
    stopChequeTypeControlService,
    ChequedepositService,
    TasklogService,
    DebitAccNoService,
    ...AccountsExtensionServices
  ],
  exports: [
    RetailChequeBookRequestComponent,
    ChequeBooksListControlComponent,
    ChequeBookLeavesListControlComponent,
    ConfirmationReceiptFormComponent,
    ClearNicknameControlComponent,
    PayableAtControlComponent,
    DDBeneficiaryNameControlComponent,
    RetailDDRequestFormComponent,
    DDBeneficiaryIDControlComponent,
    CasaSummaryCardComponent,
    ContextualActionsComponent,
    CasaContextMenuComponent,
    RetailEstmtRequestFormComponent,
    StatementModeControlComponent,
    CasaSummaryCardCarouselComponent,
    retailcasatrandtlsfilterformComponent,
    RetailCasaTransactionStmtROGridComponent,
    ChequeStatusListControlComponent,
    ChequeNumberControlComponent,
    InquiryTypeComponent,
    RetailChequeStatusInquiryFormComponent,
    RetailChequeStatusInquiryDisplayGridComponent,
    ChequeDateControlComponent,
    RetailPdcChequeFormComponent,
    PdcInquiryTypeControlComponent,
    RetailPdcChequeDisplayGridComponent,
    RetailAccountNicknameFormComponent,
    RetailOpenNewCasaFormComponent,
    AccountsInsightsComponent,
    retailcasatrandtlsDownloadfilterformComponent,
    RetailCasaTransactionDtlsRoGridComponent,
    CasaHomeComponent,
    AccountsMoneyFlowComponent,
    RetailAdhocAccStmtReqFormComponent,
    TranRangeTypeListControlComponent,
    TranAccTypeListControlComponent,
    FilterSearchControlComponent,
    ViewCasaTransactionFormComponent,
    ViewChequeImageComponent,
    TransactionAmountControlComponent,
    RetailStopChequeRequestFormComponent,
    stopChequeTypeControlComponent,
    PayeeControlComponent,
    RetailChqdDepositFormComponent,
    ImageUploadComponent,
    RetailAddTaskFromComponent,
    AccountRestrictionControlComponent,
    ClosureRemarksControlComponent,
    TaskNameControlComponent,
    DebitAccNoComponent,
    GoalNameFormControlComponent,
    ...AccountsExtensionComponents
  ]
})
export class AccountsModule { }
