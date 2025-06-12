
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentsHomeComponent } from './payments-home/payments-home.component';
import { RetailBillerListRoGridComponent } from './retail-biller-list-ro-grid/retail-biller-list-ro-grid.component';
import { RetailSavedBillerRoGridComponent } from './retail-saved-biller-ro-grid/retail-saved-biller-ro-grid.component';
import { RetailSavedBillerRoGridFormComponent } from './retail-saved-biller-ro-grid-form/retail-saved-biller-ro-grid-form.component';
import { RetailAddBillerFormComponent } from './retail-add-biller-form/retail-add-biller-form.component';
import { RetailSingleBillPaymentFormComponent } from './retail-single-bill-payment-form/retail-single-bill-payment-form.component';
import { PaymentsConfirmationReceiptFormComponent } from './payments-confirmation-receipt-form/payments-confirmation-receipt-form.component';
import { RetailBillerListRoGriFormComponent } from './retail-biller-list-ro-grid-form/retail-biller-list-ro-grid-form.component';
import { RetailBillerCategoryRoGriFormComponent } from './retail-biller-category-ro-grid-form/retail-biller-category-ro-grid-form.component';
import { FailureResultFormComponent } from '../foundation/failure-result-form/failure-result-form.component';
import { RetailViewScheduledBillsDisplayGridComponent } from './retail-view-scheduled-bills-display-grid/retail-view-scheduled-bills-display-grid.component';
import { paymentsRoutingExtension } from './payments-module-extension';
import { RetailViewScheduleBillsFormComponent } from './retail-view-schedule-bills-form/retail-view-schedule-bills-form.component';
import { RetailMultiBillRequestFormComponent } from './retail-multi-bill-request-form/retail-multi-bill-request-form.component';


const routes: Routes = [
   {
      path: '',
      component: PaymentsHomeComponent
   },
   {
      path: 'retail-biller-list-ro-grid',
      component: RetailBillerListRoGriFormComponent,
      data: { title: "PAYMENTSCONTAINER.Billerlist" }
   },
   {
      path: 'retail-saved-biller-list-ro-grid',
      component: RetailSavedBillerRoGridFormComponent,
      data: { title: "PAYMENTSCONTAINER.editBillerBtn" }
   },
   {
      path: 'retail-multi-bills-list-input-grid',
      component: RetailMultiBillRequestFormComponent,
      data: { title: "PAYMENTSCONTAINER.editBillerBtn" }
   },
   // {
   //    path: 'retail-view-biller-form',
   //    component: RetailAddBillerFormComponent,
   //    data: { title: "PAYMENTSCONTAINER.viewBiller" }
   // },
   {
      path: 'view-single-bill-form',
      component: RetailSingleBillPaymentFormComponent,
      data: { title: "PAYMENTSCONTAINER.viewBill" }
   },
   {
      path: 'retail-delete-add-biller-form',
      component: RetailAddBillerFormComponent,
      data: { title: "PAYMENTSCONTAINER.dltBillerBtn" }
   },
   {
      path: 'retail-edit-add-biller-form',
      component: RetailAddBillerFormComponent,
      data: { title: "PAYMENTSCONTAINER.editBillerBtn" }
   },
   {
      path: 'retail-add-biller-form',
      component: RetailAddBillerFormComponent,
      data: { title: "PAYMENTSCONTAINER.addBillerBtn" }
   },
   {
      path: 'retail-single-bill-payment-form',
      component: RetailSingleBillPaymentFormComponent,
      data: { title: "PAYMENTSCONTAINER.payBill" }
   },
   {
      path: 'retail-multi-bill-payment-form',
      component: RetailMultiBillRequestFormComponent,
      data: { title: "PAYMENTSCONTAINER.payMultiBill" }
   },
   {
      path: 'payments-confirmation-receipt',
      component: PaymentsConfirmationReceiptFormComponent,
      data: { title: "Confirmation Receipt" }
   },
   {
      path: 'app-retail-biller-category-ro-grid-form',
      component: RetailBillerCategoryRoGriFormComponent,
      data: { title: "PAYMENTSCONTAINER.billerCategories" }
   },
   {
      path: 'failure-result',
      component: FailureResultFormComponent,
      data: { title: 'FailureResultForm.title' }
   },
   {
      path: 'view-scheduled-bills-display-grid',
      component: RetailViewScheduledBillsDisplayGridComponent,
      data: { title: "RetailViewScheduledBillsDisplayGrid.title" }
   },
   ...paymentsRoutingExtension

];

@NgModule({
   imports: [
      RouterModule.forChild(routes)
   ],
   exports: [
      RouterModule
   ],
})
export class PaymentsRoutingModule { }
