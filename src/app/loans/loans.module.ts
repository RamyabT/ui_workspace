import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../dep/core/material.module';
import { AccountsModule } from '../accounts/accounts.module';
import { ThirdPartyModule } from '../dep/core/third-party.module';
import { FoundationModule } from '../foundation/foundation.module';
import { LoanAccountNumberControlComponent } from './loan-account-number-control/loan-account-number-control.component';
import { loanAccountNumberListControlComponent } from './loan-account-number-list-control/loan-account-number-list-control.component';
import { LoanContextMenuComponent } from './loan-context-menu/loan-context-menu.component';
import { LoanContextualActionsComponent } from './loan-contextual-actions/loan-contextual-actions.component';
import { LoanSummaryCardCarouselComponent } from './loan-summary-card-carousel/loan-summary-card-carousel.component';
import { LoanSummaryCardComponent } from './loan-summary-card/loan-summary-card.component';
import { LoanTypeControlComponent } from './loan-type-control/loan-type-control.component';
import { LoanclosureService } from './loanclosure-service/loanclosure.service';
import { LoanrepaymentscheduleService } from './loanrepaymentschedule-service/loanrepaymentschedule.service';
import { LoansRoutingModule } from './loans-routing.module';
import { RetailLoanDetailsFormComponent } from './retail-loan-details-form/retail-loan-details-form.component';
import { RetailLoanDisbursalScheduleROGridComponent } from './retail-loan-disbursal-schedule-ro-grid/retail-loan-disbursal-schedule-ro-grid.component';
import { RetailLoanRepaymentScheduleROGridComponent } from './retail-loan-repayment-schedule-ro-grid/retail-loan-repayment-schedule-ro-grid.component';
import { RetailLoanClosureFormComponent } from './retail-loan-closure-form/retail-loan-closure-form.component';
import { RetailLoanDetailsScheduleFormComponent } from './retail-loan-details-schedule-form/retail-loan-details-schedule-form.component';
import { RetailLoanDisbursalDetailsFormComponent } from './retail-loan-disbursal-details-form/retail-loan-disbursal-details-form.component';
import { LoansService } from './loans-service/loans.service';
import { RetailLoanModificationComponent } from './retail-loan-modification/retail-loan-modification.component';
import { LoanModificationTypeControlComponent } from './loan-modification-type-list-control/loan-modification-type-list-control.component';
import { LoanmodificationreqService } from './loanmodificationreq-service/loanmodificationreq.service';
import { LoandisbursalscheduleService } from './loandisbursalschedule-service/loandisbursalschedule.service';
import { DisbursementOverviewChartComponent } from './disbursement-overview-chart/disbursement-overview-chart.component';
import { RetailViewLoanDisbursalDetailsFormComponent } from './retail-view-loan-disbursal-details-form/retail-view-loan-disbursal-details-form.component';
import { RetailViewLoanRepaymentDetailsFormComponent } from './retail-view-loan-repayment-details-form/retail-view-loan-repayment-details-form.component';
import { LoanNoOfInstallmentsComponent } from './loan-no-of-installments-control/loan-no-of-installments-control.component';
import { RepaymentOverviewChartComponent } from './repayment-overview-chart/repayment-overview-chart.component';
import { LoanReasonControlComponent } from './loan-reason-control/loan-reason-control.component';
import { LoansConfirmationReceiptFormComponent } from './loans-confirmation-receipt-form/loans-confirmation-receipt-form.component';
import { LoanInstallmentsListControlComponent } from './loan-installments-list-control/loan-installments-list-control.component';
import { LoansMoneyFlowComponent } from './loans-money-flow/loans-money-flow.component';
import { LoanHomeComponent } from './loan-home/loan-home.component';
import { PurposeOfDefermentListControlComponent } from './purpose-of-deferment-list-control/purpose-of-deferment-list-control.component';
import { PurposeofdefermentService } from './purposeofdeferment-service/purposeofdeferment.service';
import { DepositsModule } from '../deposits/deposits.module';
import { LoanClosureSimulationComponent } from './loan-closure-simulation/loan-closure-simulation.component';
import { LoanclosuresimulationService } from './loanclosuresimulation-service/loanclosuresimulation.service';
import { AnnuvalTurnOverComponent } from './annuval-turn-over-control/annuval-turn-over-control.component';
import { CompanyRegistrationNumberComponent } from './company-registration-number/company-registration-number.component';
import { CompanyTaxNumberComponent } from './company-tax-number/company-tax-number.component';
import { EmployeeCountComponent } from './employees-count-control/employees-count-control.component';
import { IndustryCodeListControlComponent } from './industry-code-list-control/industryCode.component';
import { LoanPaymentFrequencyComponent } from './loan-payment-frequency/loan-payment-frequency.component';
import { LoanPurposeListControlComponent } from './loan-purpose-list-control/loan-purpose-list-control.component';
import { RegistrationAddressControlComponent } from './registration-address-control/registration-address-control.component';
import { SecurityOfferedComponent } from './security-offered-control/security-offered-control.component';
import { VechileConditionControlComponent } from './vechile-condition-control/vechile-condition-control.component';
import { LoanTypeListComponent } from './loan-type-list/loan-type-list.component';
import { LoansExtensionComponents, LoansExtensionService } from './loans-extension';
import { NpssModule } from '../npss/npss.module';
import { DebitcardModule } from '../debit-card/debitcard.module';
import { TransfersModule } from '../transfers/transfers.module';
import { LoanSubProductsListControlComponent } from './loan-products-list-control/loan-products-list-control.component';
import { ViewLoanTransactionFormComponent } from './view-loan-transaction-form/view-loan-transaction-form.component';
import { RetailLoanTransactionDtlsRoGridComponent } from './retail-loan-transaction-dtls-ro-grid/retail-loan-transaction-dtls-ro-grid.component';
import { LoantransactiondtlsService } from './loantransactiondtls-service/loantransactiondtls.service';
import { RetailLoanRepaymentComponent } from './retail-loan-repayment-form/retail-loan-repayment-form.component';
import { LoanrepaymentService } from './loanrepayment-service/loanrepayment.service';
import { LoanpreclosurerequestService } from './loanpreclosurerequest-service/loanpreclosurerequest.service';
import { RetailLoanPreClosureRequestComponent } from './retail-loan-pre-closure-request-form/retail-loan-pre-closure-request-form.component';
import { EmiPaymentOptionsControlComponent } from './emi-payment-options-control/emi-payment-options-control.component';
import { EmiPaymentOptionsControlService } from './emi-payment-options-control/emi-payment-options-control.service';
import { additionalEmploymentInfoComponent } from './additional-employmentInfo/additional-employmentInfo.component';
import { applyHomeLoanComponent } from './applyHomeLoan/apply-home-loan.component';
import { coApplicantsDetailsComponent } from './coApplicantsDetails/co-applicants-details.component';
import { expensesDetailsComponent } from './expensesDetails/expensesDetails.component';
import { IdNumerControlComponent } from './id-number-control/id-number-control.component';
import { RelationshipListControlComponent } from './relationship-list-control/relationship-list-control.component';
import { supportingDocsComponent } from './supportingDocs/supporting-docs.component';
import { OnboardingModule } from '../onboarding/onboarding.module';
import { ApplyloanService } from './applyloan-service/applyloan.service';
import { ExpensesDetailsService } from './expensesDetails-service/expensesDetails.service';
import { BasicDetailsFormComponent } from './basic-details-form/basic-details-form.component';
import { CoApplicantControlComponent } from './co-applicant-control/co-applicant-control.component';
import { PropLocControlComponent } from './prop-loc-control/prop-loc-control.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { EditLoanInfoFormFormComponent } from './edit-loan-info-form/edit-loan-info-form.component';
import { LoanDocumentUploadComponent } from './loan-document-upload/loan-document-upload.component';
import { basicDetailsService } from './basicDetails-service/basicDetails.service';
import { EmpStatusControlComponent } from './emp-status-control/emp-status-control.component';
import { NameControlComponent } from './name-control/name-control.component';
import { ExistingLoanDetailsComponent } from './existing-loan-details/existing-loan-details.component';
import { HomeLoanAccountListTemplateControlComponent } from './home-loan-account-list-template-control/home-loan-account-list-template-control.component';
import { applyloaninitiationComponent } from './apply-loan-initation/apply-loan-initation.component';
import { ApplyloaninitiationService } from './apply-loan-initiation-service/apply-loan-initiation.service';
import { LoanInitiationTypeControlComponent } from './loan-initiation-type-control/loan-initiation-type-control.component';
import { VehicleTypeControlComponent } from './vehicle-type-control/vehicle-type-control.component';
import { VehicleStatusControlComponent } from './vehicle-status-control/vehicle-status-control.component';
import { applyVehicleLoanComponent } from './applyVehicleLoan/apply-vehicle-loan.component';
import { applyPersonalLoanComponent } from './applyPersonalLoan/apply-personal-loan.component';
import { hpiControlComponent } from './hpi-control/hpi-control.component';
import { applyHomeLoanExistingComponent } from './applyHomeLoanExisting/apply-home-loan-existing.component';
@NgModule({
  declarations: [
    RetailLoanClosureFormComponent,
    loanAccountNumberListControlComponent,
    RetailLoanDetailsFormComponent,
    LoanAccountNumberControlComponent,
    LoanTypeControlComponent,
    RetailLoanRepaymentScheduleROGridComponent,
    LoanSummaryCardCarouselComponent,
    LoanSummaryCardComponent,
    LoanContextMenuComponent,
    LoanContextualActionsComponent,
    RetailLoanDetailsScheduleFormComponent,
    RetailLoanDisbursalDetailsFormComponent,
    RetailLoanDisbursalScheduleROGridComponent,
    RetailLoanModificationComponent,
    LoanModificationTypeControlComponent,
    RepaymentOverviewChartComponent,
    DisbursementOverviewChartComponent,
    RetailViewLoanDisbursalDetailsFormComponent,
    RetailViewLoanRepaymentDetailsFormComponent,
    LoanNoOfInstallmentsComponent,
    LoanReasonControlComponent,
    LoansConfirmationReceiptFormComponent,
    LoanInstallmentsListControlComponent,
    LoansMoneyFlowComponent,
    LoanHomeComponent,
    PurposeOfDefermentListControlComponent,
    LoanClosureSimulationComponent,
    AnnuvalTurnOverComponent,
    LoanSubProductsListControlComponent,
    CompanyRegistrationNumberComponent,
    CompanyTaxNumberComponent,
    EmployeeCountComponent,
    IndustryCodeListControlComponent,
    LoanPaymentFrequencyComponent,
    LoanPurposeListControlComponent,
    RegistrationAddressControlComponent,
    SecurityOfferedComponent,
    VechileConditionControlComponent,
    LoanTypeListComponent,
    ViewLoanTransactionFormComponent,
    RetailLoanTransactionDtlsRoGridComponent,
    RetailLoanRepaymentComponent,
    RetailLoanPreClosureRequestComponent,
    ...LoansExtensionComponents,
    EmiPaymentOptionsControlComponent,
    coApplicantsDetailsComponent,
    expensesDetailsComponent,
    supportingDocsComponent,
    additionalEmploymentInfoComponent,
    applyHomeLoanComponent,
    RelationshipListControlComponent,
    IdNumerControlComponent,
    BasicDetailsFormComponent,
    CoApplicantControlComponent,
    PropLocControlComponent,
    LoanDetailsComponent,
    LoanDetailsComponent,
    EditLoanInfoFormFormComponent,
    LoanDocumentUploadComponent,
    EmpStatusControlComponent,
    NameControlComponent,
    ExistingLoanDetailsComponent,
    HomeLoanAccountListTemplateControlComponent,
    applyloaninitiationComponent,
    LoanInitiationTypeControlComponent,
    VehicleTypeControlComponent,
    VehicleStatusControlComponent,
    applyVehicleLoanComponent,
    applyPersonalLoanComponent,
    hpiControlComponent,
    applyHomeLoanExistingComponent


  ],
  imports: [
    CommonModule,
    LoansRoutingModule,
    FoundationModule,
    ReactiveFormsModule,
    FormsModule,
    FpxCoreModule,
    MaterialModule,
    TranslateModule,
    ThirdPartyModule,
    DepositsModule,
    NpssModule,
    DebitcardModule,
    TransfersModule,
    OnboardingModule
  ],
  providers: [
    LoanclosureService,
    LoansService,
    LoanrepaymentscheduleService,
    LoanmodificationreqService,
    LoandisbursalscheduleService,
    PurposeofdefermentService,
    LoanclosuresimulationService,
    LoantransactiondtlsService,
    LoanrepaymentService,
    LoanpreclosurerequestService,
    EmiPaymentOptionsControlService,
    ExpensesDetailsService,
    ApplyloanService,
    basicDetailsService,
    ApplyloaninitiationService,
    ...LoansExtensionService
  ],
  exports: [
    LoanSummaryCardCarouselComponent,
    LoanSummaryCardComponent,
    loanAccountNumberListControlComponent,
    RetailLoanClosureFormComponent,
    RetailLoanDetailsFormComponent,
    LoanAccountNumberControlComponent,
    LoanTypeControlComponent,
    RetailLoanRepaymentScheduleROGridComponent,
    LoanContextMenuComponent,
    LoanContextualActionsComponent,
    RetailLoanDetailsScheduleFormComponent,
    RetailLoanDisbursalDetailsFormComponent,
    RetailLoanDisbursalScheduleROGridComponent,
    RetailLoanModificationComponent,
    LoanModificationTypeControlComponent,
    RetailViewLoanDisbursalDetailsFormComponent,
    RetailViewLoanRepaymentDetailsFormComponent,
    LoanNoOfInstallmentsComponent,
    LoanReasonControlComponent,
    LoansConfirmationReceiptFormComponent,
    LoanInstallmentsListControlComponent,
    LoansMoneyFlowComponent,
    LoanHomeComponent,
    PurposeOfDefermentListControlComponent,
    LoanClosureSimulationComponent,
    AnnuvalTurnOverComponent,
    LoanSubProductsListControlComponent,
    CompanyRegistrationNumberComponent,
    CompanyTaxNumberComponent,
    EmployeeCountComponent,
    IndustryCodeListControlComponent,
    LoanPaymentFrequencyComponent,
    LoanPurposeListControlComponent,
    RegistrationAddressControlComponent,
    SecurityOfferedComponent,
    VechileConditionControlComponent,
    LoanTypeListComponent,
    ViewLoanTransactionFormComponent,
    RetailLoanTransactionDtlsRoGridComponent,
    RetailLoanRepaymentComponent,
    RetailLoanPreClosureRequestComponent,
    EmiPaymentOptionsControlComponent,
    coApplicantsDetailsComponent,
    expensesDetailsComponent,
    supportingDocsComponent,
    additionalEmploymentInfoComponent,
    applyHomeLoanComponent,
    RelationshipListControlComponent,
    IdNumerControlComponent,
    BasicDetailsFormComponent,
    CoApplicantControlComponent,
    PropLocControlComponent,
    LoanDetailsComponent,
    EditLoanInfoFormFormComponent,
    LoanDocumentUploadComponent,
    EmpStatusControlComponent,
    NameControlComponent,
    ExistingLoanDetailsComponent,
    HomeLoanAccountListTemplateControlComponent,
    applyloaninitiationComponent,
    LoanInitiationTypeControlComponent,
    VehicleTypeControlComponent,
    VehicleStatusControlComponent,
    applyVehicleLoanComponent,
    applyPersonalLoanComponent,
    hpiControlComponent,
    applyHomeLoanExistingComponent,
    ...LoansExtensionComponents
  ]
})
export class LoansModule { }
