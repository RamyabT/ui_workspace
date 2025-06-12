import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PfmTransactionsFormComponent } from './pfm-transactions-form/pfm-transactions-form.component';
import { PfmTransactionModifyFormComponent } from './pfm-transaction-modify-form/pfm-transaction-modify-form.component';
import { PfmBudgetModifyFormComponent } from './pfm-budget-modify-form/pfm-budget-modify-form.component';
import { PfmGoalsRequestFormComponent } from './pfm-goals-req-form/pfm-goals-req-form.component';
import { RetailPfmBudgetReqFormComponent } from './retail-pfm-budgetreq-form/retail-pfm-budgetreq-form.component';
import { RetailPfmModifyGoalReqFormComponent } from './retail-pfm-modify-goalreq-form/retail-pfm-modify-goalreq-form.component';
import { RetailTrackGoalsFormComponent } from './pfm-track-goals-form/pfm-track-goals-form.component';
import { RetailTrackBudgetFormComponent } from './retail-track-budget-form/retail-track-budget-form.component';
import { ConfirmationReceiptFormComponent } from './confirmation-receipt-form/confirmation-receipt-form.component';
import { PfmTransactionHistoryFormComponent } from './pfm-transaction-history-form/pfm-transaction-history-form.component';
import { PfmHomeComponent } from './pfm-home/pfm-home.component';

const routes: Routes = [
   {
      path : '',
       component : PfmHomeComponent,
   },
  {
    path : 'pfm-transactions-form',
     component : PfmTransactionsFormComponent,
     data:{title:"PfmTransactionsForm.title",module:'pfm'}
 },
 {
  path : 'pfm-transaction-modify-form',
   component : PfmTransactionModifyFormComponent,
   data:{title:"PfmTransactionModifyForm.title",module:'pfm'}
},
{
  path : 'pfm-budget-modify-form',
   component : RetailPfmBudgetReqFormComponent,
   data:{title:"PfmBudgetModifyForm.title",module:'pfm'}
},
 {
    path : 'retail-pfm-goals-request-form',
     component : PfmGoalsRequestFormComponent,
     data: { title: "PfmGoalsRequestForm.title" }
  },
  {
    path : 'retail-pfm-budget-request-form',
     component : RetailPfmBudgetReqFormComponent,
     data: { title: "RetailPfmBudgetReqForm.title" }
  },
  {
    path : 'retail-pfm-goals-modify-request-form',
     component : PfmGoalsRequestFormComponent,
     data: { title: "RetailPfmModifyGoalReqForm.title" }
  },
    {
    path : 'retail-track-goals-form',
     component : RetailTrackGoalsFormComponent,
     data:{title:"RetailTrackGoalsForm.title",module:'pfm'}
  },
  {
    path : 'retail-track-budget-form',
     component : RetailTrackBudgetFormComponent,
     data:{title:"RetailTrackBudgetForm.title",module:'pfm'}
 },
  {
    path:'confirmation-receipt',
    component:ConfirmationReceiptFormComponent,
    data:{
      title:'confirmationReceiptForm.title'
    }
  },
  {
    path:'pfm-transaction-history',
    component:PfmTransactionHistoryFormComponent,
    data:{
      title:'PfmTransactionHistoryForm.title'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PfmRoutingModule { }
