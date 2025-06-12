import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ConfirmationReceiptFormComponent } from '../accounts/confirmation-receipt-form/confirmation-receipt-form.component';
import { RetailChangeMaturityInstructionsFormComponent } from './retail-change-maturity-instructions-form/retail-change-maturity-instructions-form.component';
import { RetailDepositDetailsFormComponent } from './retail-deposit-details-form/retail-deposit-details-form.component';
import { RetailDepositRequestFormComponent } from './retail-deposit-request-form/retail-deposit-request-form.component';
import { DepositsHomeComponent } from './deposits-home/deposits-home.component';
import { FailureResultFormComponent } from '../foundation/failure-result-form/failure-result-form.component';
import { DepositsRoutingExtension } from './deposits-extension';
const routes: Routes = [
   {
      path: '',
      component: DepositsHomeComponent
   },
   {
      path: 'retail-deposit-request-form',
      component: RetailDepositRequestFormComponent,
      data: { title: "RetailDepositRequestForm.title", serviceCode: "RETAILOPENNEWDEPOSIT" }
   },
   {
      path: 'confirmation-receipt',
      component: ConfirmationReceiptFormComponent,
      data: { title: "confirmationReceiptForm.title" }
   },
   {
      path: 'retail-change-maturity-instructions-form',
      component: RetailChangeMaturityInstructionsFormComponent,
      data: { title: "RetailChangeMaturityInstructionsForm.title" }
   },
   {
      path: 'retail-deposit-details-form',
      component: RetailDepositDetailsFormComponent,
      data: { title: "RetailDepositDetailsForm.title" }
    },
    {
      path: 'retail-deposit-request-form',
      component: RetailDepositRequestFormComponent,
      data: { title: "RetailDepositRequestForm.title" }

    },
    {
      path: 'failure-result',
      component: FailureResultFormComponent,
      data: { title: 'FailureResultForm.title' }
   },
   ...DepositsRoutingExtension
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepositsRoutingModule { }
