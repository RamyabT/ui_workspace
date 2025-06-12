import { ConfirmationReceiptFormComponent } from './confirmation-receipt-form/confirmation-receipt-form.component';
import { RetailOpenNewCasaFormComponent } from './retail-open-new-casa-form/retail-open-new-casa-form.component';
import { RetailDDRequestFormComponent } from './retail-dd-request-form/retail-dd-request-form.component';
import { retailcasatrandtlsfilterformComponent } from './retailcasatrandtlsfilterform/retail-casa-tran-dtls-filter-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetailCasaTransactionStmtROGridComponent } from './retail-casatransaction-stmt-ro-grid/retail-casatransaction-stmt-ro-grid.component';
import { RetailAccountDetailsFormComponent } from './retail-account-details-form/retail-account-details-form.component';
import { RetailChequeBookRequestComponent } from './retail-cheque-book-request/retail-cheque-book-request.component';
import { RetailEstmtRequestFormComponent } from './retail-estmt-request-form/retail-estmt-request-form.component';
import { ViewCasaTransactionFormComponent } from './view-casa-transaction-form/view-casa-transaction-form.component';
import { RetailChequeStatusInquiryFormComponent } from './retail-cheque-status-inquiry-form/retail-cheque-status-inquiry-form.component';
import { RetailChequeStatusInquiryDisplayGridComponent } from './retail-cheque-status-inquiry-display-grid/retail-cheque-status-inquiry-display-grid.component';
import { RetailPdcChequeFormComponent } from './retail-pdc-cheque-form/retail-pdc-cheque-form.component';
import { RetailPdcChequeDisplayGridComponent } from './retail-pdc-cheque-display-grid/retail-pdc-cheque-display-grid.component';
import { RetailAccountNicknameFormComponent } from './retail-account-nickname-form/retail-account-nickname-form.component';
import { CasaHomeComponent } from './casa-home/casa-home.component';
import { RetailAdhocAccStmtReqFormComponent } from './retail-adhoc-accStmtReq-form/retail-adhoc-accStmtReq-form.component';
import { FailureResultFormComponent } from '../foundation/failure-result-form/failure-result-form.component';
import { AccountsRoutingExtension } from './accounts-routing-extension';
import { RetailStopChequeRequestFormComponent } from './retail-stop-cheque-request-form/retail-stop-cheque-request-form.component';
import { RetailChqdDepositFormComponent } from './retail-chqd-deposit-form/retail-chqd-deposit-form.component';
import { RetailAddTaskFromComponent } from './retail-add-task-form/reatail-add-task-form.component';

const routes: Routes = [
   {
      path: '',
      component: CasaHomeComponent
   },
   {
      path: 'retail-cheque-book-request',
      component: RetailChequeBookRequestComponent,
      data: { title: "RetailChequeBookRequest.title" }
   },
   {
      path: 'confirmation-receipt',
      component: ConfirmationReceiptFormComponent,
      data: { title: "confirmationReceiptForm.title" }
   },
   {
      path: 'retail-account-nickname-form',
      component: RetailAccountNicknameFormComponent,
      data: { title: "RetailAccountNicknameForm.title" }
   },
   {
      path: 'retail-dd-request-form',
      component: RetailDDRequestFormComponent,
      data: { title: "RetailDDRequestForm.title" }
   },
   {
      path: 'retail-open-new-casa-form',
      component: RetailOpenNewCasaFormComponent,
      data: { title: "RetailOpenNewCasaForm.title", serviceCode: "RETAILOPENNEWCASA" }
   },
   {
      path: 'retailcasatrandtlsfilterform',
      component: retailcasatrandtlsfilterformComponent
   },
   {
      path: 'retail-casatransaction-stmt-ro-grid',
      component: RetailCasaTransactionStmtROGridComponent
   },
   {
      path: 'retail-account-details-form',
      component: RetailAccountDetailsFormComponent,
      data: { title: "RetailAccountDetailsForm.title" }
   },
   {
      path: 'retail-estmt-request-form',
      component: RetailEstmtRequestFormComponent,
      data: { title: "RetailEstmtRequestForm.title" }
   },
   {
      path: 'view-transactions',
      component: ViewCasaTransactionFormComponent,
      data: { title: "viewCasaTransactionForm.title" }
   },
   {
      path: 'retail-cheque-status-inquiry-form',
      component: RetailChequeStatusInquiryFormComponent,
      data: { title: "RetailChequeStatusInquiryForm.title" }
   },
   {
      path: 'retail-cheque-status-inquiry-display-grid',
      component: RetailChequeStatusInquiryDisplayGridComponent,
      data: { title: "RetailChequeStatusInquiryDisplayGrid.title" }
   },
   {
      path: 'retail-pdc-cheque-form',
      component: RetailPdcChequeFormComponent,
      data: { title: "RetailPdcChequeForm.title" }
   },
   {
      path: 'retail-pdc-cheque-display-grid',
      component: RetailPdcChequeDisplayGridComponent,
      data: { title: "RetailPdcChequeDisplayGrid.title" }
   },
   {
      path: 'view-pdc-cheques-form',
      component: RetailPdcChequeFormComponent,
      data: { title: "RetailPdcChequeForm.title" }
   },
   {
      path : 'retail-adhoc-accStmtReq-form',
      component : RetailAdhocAccStmtReqFormComponent,
      data:{
        title:'RetailAdhocAccStmtReqForm.title'
      }
   },
   {
      path: 'retail-stop-cheque-request-form',
      component: RetailStopChequeRequestFormComponent,
      data: { title: "RetailStopChequeRequestForm.title" }
   },
   {
      path: 'retail-chqd-deposit-form',
      component: RetailChqdDepositFormComponent,
      data: { title: "RetailChqdDepositForm.title" }
   },
   {
      path: 'retail-add-task-form',
      component: RetailAddTaskFromComponent,
      data: { title: "RetailAddTaskFrom.title" }
   },
   {
      path: 'failure-result',
      component: FailureResultFormComponent,
      data: { title: 'FailureResultForm.title' }
   },
   ...AccountsRoutingExtension

];

@NgModule({
   imports: [
      RouterModule.forChild(routes)
   ],
   exports: [
      RouterModule
   ]
})
export class AccountsRoutingModule { }
