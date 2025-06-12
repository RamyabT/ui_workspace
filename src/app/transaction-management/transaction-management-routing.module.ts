import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetailTransactionManagementForm } from './retail-transaction-management-form/retail-transaction-management-form.component';
import { TransactionManagementHomeComponent } from './transaction-management-home/transaction-management-home.component';

const routes: Routes = [
  {
    path: 'transaction-management-home',
    component: TransactionManagementHomeComponent
  },
  {
    path : 'retail-transaction-management-form',
    component : RetailTransactionManagementForm,
    data:{title:"RetailTransactionManagementForm.title"}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionManagementRoutingModule { }
