import { SelectBeneTypeFormComponent } from './select-bene-type-form/select-bene-type-form.component';
import { RetailManageBeneFormComponent } from './retail-manage-bene-form/retail-manage-bene-form.component';
import { RetailBeneInternalFormComponent } from './retail-bene-internal-form/retail-bene-internal-form.component';
import { RetailBeneDomReqComponent } from './retail-bene-dom-req/retail-bene-dom-req.component';
import { RetailInternationalTransferFormComponent } from './retail-international-transfer-form/retail-international-transfer-form.component';
import { RetailWithinBankTransferFormComponent } from './retail-within-bank-transfer-form/retail-within-bank-transfer-form.component';
import { RetailAedTransferFormComponent } from './retail-aed-transfer-form/retail-aed-transfer-form.component';
import { RetailBeneCCReqFormComponent } from './retail-bene-cc-req-form/retail-bene-cc-req-form.component';
import { RetailSchedulePaymentsRoGridComponent } from './retail-schedule-payments-ro-grid/retail-schedule-payments-ro-grid.component';
import { RetailTransferHistoryRoGridComponent } from './retail-transfer-history-ro-grid/retail-transfer-history-ro-grid.component';
import { RetailScheduleTransferHandlerComponent } from './retail-schedule-handler-form/retail-schedule-handler-form.component';
import { RetailDomesticTransferFormComponent } from './retail-domestic-transfer/retail-domestic-transfer.component';
import { RetailCCTransferFormComponent } from './retail-cc-transfer-form/retail-cc-transfer-form.component';
import { RetailBeneInternationalReqFormComponent } from './retail-bene-International-req-form/retail-bene-International-req-form.component';
import { RetailBeneaedreqFormComponent } from './retail-beneaedreq-form/retail-beneaedreq-form.component';
import { TransferConfirmationReceiptFormComponent } from './transfer-confirmation-receipt-form/transfer-confirmation-receipt-form.component';
import { BeneConfirmationReceiptFormComponent } from './bene-confirmation-receipt-form/bene-confirmation-receipt-form.component';
import { RetailOwnAccountTransferFormComponent } from './retail-own-account-transfer-form/retail-own-account-transfer-form.component';
import { ConfirmationReceiptFormComponent } from '../accounts/confirmation-receipt-form/confirmation-receipt-form.component';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { completedpymntsComponent } from './retail-completed-payments-ro-grid/retail-completed-payments-ro-grid.component';
import { RetailManageFavouriteTransferFormComponent } from './retail-manage-favourite-transfer-form/retail-manage-favourite-transfer-form.component';
import { RetailInstaPayFormComponent } from './retail-insta-pay-form/retail-insta-pay-transfer-form.component';
import { RetailFilterTransactionComponent } from './retail-filter-transaction-form/retail-filter-transaction-form.component';
import { retailDownloadTransactionFormComponent } from './retail-download-transaction-form/retail-download-transaction-form.component';
import { TransfersHomeComponent } from './transfers-home/transfers-home.component';
import { RetailTransferGridComponent } from './retail-transfer-type-ro-grid/retail-transfer-type-ro-grid.component';
import { InitATransferFormComponent } from './init-a-transfer-form/init-a-transfer-form.component';
import { FailureResultFormComponent } from '../foundation/failure-result-form/failure-result-form.component';
import { TransfersRoutingExtension } from './transfers-module-extension';

const routes: Routes = [
   ...TransfersRoutingExtension,
   {
      path: '',
      component: TransfersHomeComponent
   },
   {
      path: 'select-bene-type',
      component: SelectBeneTypeFormComponent,
      data: { title: "SelectBeneType.title" },
   },
   {
      path: "manage-bene",
      component: RetailManageBeneFormComponent,
      data: { title: "RetailManageBeneForm.title" },
   },
   {
      path: "confirmation-receipt",
      component: ConfirmationReceiptFormComponent,
    data: { title: "confirmationReceiptForm.title" },
   },
   {
      path: "retail-bene-internal-form",
      component: RetailBeneInternalFormComponent,
    data: { title: "RetailBeneInternalForm.title" },
   },
   {
      path: "retail-bene-dom-req",
      component: RetailBeneDomReqComponent,
    data: { title: "RetailBeneDomReq.title" },
   },
   {
      path: "retail-schedule-payments-ro-grid",
      component: RetailSchedulePaymentsRoGridComponent,
   },
   {
      path: "retail-transfer-history-ro-grid",
      component: RetailTransferHistoryRoGridComponent,
   },
   {
      path: "retail-within-bank-transfer-form",
      component: RetailWithinBankTransferFormComponent,
      data: { title: "RetailWithinBankTransferForm.title" },
   },
   {
      path: "retail-schedule-handler-form",
      component: RetailScheduleTransferHandlerComponent,
   },
   {
      path: "retail-aed-transfer-form",
      component: RetailAedTransferFormComponent,
    data: { title: "RetailAedTransferForm.title" },
   },
   {
      path: "retail-international-transfer-form",
      component: RetailInternationalTransferFormComponent,
    data: { title: "RetailInternationalTransferForm.title" },
   },
   {
      path: "transfer-confirmation-receipt",
      component: TransferConfirmationReceiptFormComponent,
    data: { title: "confirmationReceiptForm.title" },
   },
   {
      path: "bene-confirmation-receipt",
      component: BeneConfirmationReceiptFormComponent,
    data: { title: "confirmationReceiptForm.title" },
   },
   {
      path: 'retail-bene-cc-req-form',
      component: RetailBeneCCReqFormComponent,
      data: { title: "RetailBeneCCReqForm.title" }
   },
   {
      path: 'retail-domestic-transfer',
      component: RetailDomesticTransferFormComponent,
      data: { title: "RetailDomesticTransferForm.title" }
   },
   {
      path: 'retail-cc-transfer-form',
      component: RetailCCTransferFormComponent,
      data: { title: "RetailCCTransferForm.title" }
   },
   {
      path: 'retail-own-account-transfer-form',
      component: RetailOwnAccountTransferFormComponent,
      data: { title: "RetailOwnAccountTransferForm.title" }
   },
   {
      path: 'retail-bene-International-req-form',
      component: RetailBeneInternationalReqFormComponent,
      data: { title: "RetailBeneInternationalReqForm.title" }
   },
   {
      path: 'retail-beneaedreq-form',
      component: RetailBeneaedreqFormComponent
   },
   {
      path: 'retail-completed-payments-ro-grid',
      component: completedpymntsComponent
   },
   {
      path: "view-all-favrourite",
      component: RetailManageFavouriteTransferFormComponent,
      data: { title: "RetailViewAllFavTransferForm.title" },
   },
   {
      path: 'retail-insta-pay-transfer-form',
      component: RetailInstaPayFormComponent,
      data: { title: "RetailInstaPayForm.title" }
   },
     {
      path: 'retail-filter-transaction-form',
      component: RetailFilterTransactionComponent
   },
   {
      path: 'view-all-favrourite',
      component: RetailManageFavouriteTransferFormComponent
   },
   {
      path: 'retail-download-transaction-form',
      component: retailDownloadTransactionFormComponent
   },
   {
      path : 'initiate-a-transfers',
      component : InitATransferFormComponent,
      data: { title: "RetailTransferGrid.title" }
  },
  {
   path: 'failure-result',
   component: FailureResultFormComponent,
   data: { title: 'FailureResultForm.title' }
 }
];

@NgModule({
  imports : [
   RouterModule.forChild(routes)
],
  exports : [
   RouterModule
],
})
export class TransfersRoutingModule {}
