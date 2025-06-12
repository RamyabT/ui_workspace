import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { RetailLoanDisbursalScheduleROGridComponent } from "./retail-loan-disbursal-schedule-ro-grid/retail-loan-disbursal-schedule-ro-grid.component";
import { RetailLoanClosureFormComponent } from "./retail-loan-closure-form/retail-loan-closure-form.component";
import { RetailLoanDetailsFormComponent } from "./retail-loan-details-form/retail-loan-details-form.component";
import { RetailLoanRepaymentScheduleROGridComponent } from "./retail-loan-repayment-schedule-ro-grid/retail-loan-repayment-schedule-ro-grid.component";
import { RetailLoanDetailsScheduleFormComponent } from "./retail-loan-details-schedule-form/retail-loan-details-schedule-form.component";
import { RetailLoanDisbursalDetailsFormComponent } from "./retail-loan-disbursal-details-form/retail-loan-disbursal-details-form.component";
import { RetailLoanModificationComponent } from "./retail-loan-modification/retail-loan-modification.component";
import { RetailViewLoanDisbursalDetailsFormComponent } from "./retail-view-loan-disbursal-details-form/retail-view-loan-disbursal-details-form.component";
import { RetailViewLoanRepaymentDetailsFormComponent } from "./retail-view-loan-repayment-details-form/retail-view-loan-repayment-details-form.component";
import { LoansConfirmationReceiptFormComponent } from "./loans-confirmation-receipt-form/loans-confirmation-receipt-form.component";
import { LoanHomeComponent } from "./loan-home/loan-home.component";
import { FailureResultFormComponent } from "../foundation/failure-result-form/failure-result-form.component";
import { LoanClosureSimulationComponent } from "./loan-closure-simulation/loan-closure-simulation.component";
import { LoanRoutingExtension } from "./loans-extension";
import { RetailLoanRepaymentComponent } from "./retail-loan-repayment-form/retail-loan-repayment-form.component";
import { RetailLoanPreClosureRequestComponent } from "./retail-loan-pre-closure-request-form/retail-loan-pre-closure-request-form.component";
import { applyHomeLoanComponent } from "./applyHomeLoan/apply-home-loan.component";
import { applyloaninitiationComponent } from "./apply-loan-initation/apply-loan-initation.component";
import { applyVehicleLoanComponent } from "./applyVehicleLoan/apply-vehicle-loan.component";
import { applyPersonalLoanComponent } from "./applyPersonalLoan/apply-personal-loan.component";


const routes: Routes = [
   {
      path: '',
      component: LoanHomeComponent,
   },
   {
      path: 'retail-loan-closure-form',
      component: RetailLoanClosureFormComponent,
      data: {title:"RetailLoanClosureForm.title",module: 'loans'}
   },
   {
      path: 'retail-loan-details-form',
      component: RetailLoanDetailsFormComponent,
      data: {title:"RetailLoanDetailsForm.title",module: 'loans'}
   },
   {
      path: 'retail-loan-repayment-schedule-ro-grid',
      component: RetailLoanRepaymentScheduleROGridComponent,
      data: {title:"RetailLoanRepaymentScheduleROGrid.title",module: 'loans'}
   },
   {
      path: 'retail-loan-details-schedule-form',
      component: RetailLoanDetailsScheduleFormComponent,
      data: {title:"RetailLoanDetailsScheduleForm.title",module: 'loans'}
   },
   {
      path: 'retail-loan-disbursal-details-form',
      component: RetailLoanDisbursalDetailsFormComponent,
      data: {title:"RetailLoanDisbursalDetailsForm.title",module: 'loans'}
   },
   {
      path: 'retail-loan-disbursal-schedule-ro-grid',
      component: RetailLoanDisbursalScheduleROGridComponent,
      data: {title:"RetailLoanDisbursalScheduleROGrid.title",module: 'loans'}
   },
   {
      path:'retail-loan-modification',
      component:RetailLoanModificationComponent,
      data: {title:"RetailLoanModification.title",module: 'loans'}
   },
    {
      path: 'retail-view-loan-disbursal-schedule-form',
      component: RetailViewLoanDisbursalDetailsFormComponent,
      data: {title:"RetailViewLoanDisbursalDetailsForm.title",module: 'loans'}
   },
   {
      path: 'retail-view-loan-repayment-schedule-form',
      component: RetailViewLoanRepaymentDetailsFormComponent,
      data: {title:"RetailViewLoanRepaymentDetailsForm.title",module: 'loans'}
   },
   {
      path: 'loans-confirmation-receipt-form',
      component: LoansConfirmationReceiptFormComponent,
      data: { title: "loansConfirmationReceiptForm.title" ,module: 'loans'}
   },
   {
      path: 'failure-result',
      component: FailureResultFormComponent,
      data: { title: 'FailureResultForm.title',module: 'loans' }
   },
   {
      path: 'loan-closure-simulation',
      component: LoanClosureSimulationComponent,
      data: { title: "LoanClosureSimulation.title" ,module: 'loans'}
   },
   {
      path:'retail-loan-repayment-form',
      component:RetailLoanRepaymentComponent,
      data: {title:"RetailLoanRepayment.title",module: 'loans'}
   },
   {
      path:'retail-loan-pre-closure-request-form',
      component:RetailLoanPreClosureRequestComponent,
      data: {title:"RetailLoanPreClosureRequest.title",module: 'loans'}
   },
   {
      path: 'retail-apply-home-loan-form',
      component: applyHomeLoanComponent,
      data: {title:"applyHomeLoan.title"}
   },
   {
      path: 'retail-apply-loan-initiation',
      component: applyloaninitiationComponent,
      data: {title:"applyLoanInitiation.title"}
   },
   {
      path: 'retail-apply-vehicle-loan',
      component: applyVehicleLoanComponent,
      data: {title:"applyVehicleLoan.title"}
   },
   {
      path: 'retail-apply-personal-loan',
      component: applyPersonalLoanComponent,
      data: {title:"applyPersonalLoan.title"}
   },
   ...LoanRoutingExtension
];

@NgModule({
  imports : [
   RouterModule.forChild(routes)
],
  exports : [
   RouterModule
]
})
export class LoansRoutingModule { }
