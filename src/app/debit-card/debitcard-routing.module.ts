import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { debitcardComponent } from './retail-debitcard-summary-ro-grid/retail-debitcard-summary-ro-grid.component';
import { retaildebitcardformComponent } from './retail-debitcard-details-form/retail-debitcard-details-form.component';
import { RetailDebitCardLimitRequestComponent } from './retail-debit-card-limit-request/retail-debit-card-limit-request.component';
import { retaildccancelComponent } from './retail-dc-cancel-form/retail-dc-cancel.component';
//import { retaildcblockComponent } from './retail-dc-block-form/retail-dc-block-form.component';
import { raisedisputedebitcardComponent } from './retail-raise-dispute-debitcard-form/retail-raise-dispute-debitcard-form.component';
import { retaildcreplacementComponent } from './retail-dc-replacement-form/retail-dc-replacement-form.component';
import { dcpinrequestComponent } from './retail-dc-change-pin-request/retail-dc-change-pin-request.component';
import { retaildcunblockComponent } from './retail-dc-unblock-form/retail-dc-unblock-form.component';
import { RetailDebitCardBlockFormComponent } from './retail-debit-card-block-form/retail-debit-card-form.component';
import { ConfirmationReceiptFormComponent } from './confirmation-receipt-form/confirmation-receipt-form.component';
//import { RetailDebitCardFlashFormComponent } from './retail-dc-flash-form/retail-dc-flash-form.component';
import { RetailDcActivateCardFormComponent } from './retail-dc-activate-card-form/retail-dc-activate-card-form.component';
import { RetailDcTransactionDtlsRoGridComponent } from './retail-dc-transaction-dtls-ro-grid/retail-dc-transaction-dtls-ro-grid.component';
import { RetailDcTransactionDtlsFormComponent } from './retail-dc-transaction-dtls-form/retail-dc-transaction-dtls-form.component';
import { RetailFlashDebitCardRequestFormComponent } from './retail-flash-debit-card-request-form/retail-flash-debit-card-request-form.component';
import { RetailApplyDebitCardComponent } from './retail-apply-debit-card/retail-apply-debit-card.component';
import { DebitcardConfirmationReceiptFormComponent } from './debitcard-confirmation-receipt-form/debitcard-confirmation-receipt-form.component';
import { RetailDcTransactionSummaryFormComponent } from './retail-dc-transaction-summary-form/retail-dc-transaction-summary-form.component';
import { RetailDebitcardFlashDetailsFormComponent } from './retail-debitcard-flash-details-form/retail-debitcard-flash-details-form.component';
import { DCVerifyPinValidationFormComponent } from './dc-verify-pin-validation-form/dc-verify-pin-validation-form.component';
import { RetailDebitCardSetPinFormComponent } from './retail-debit-card-set-pin-form/retail-debit-card-set-pin-form.component';
import { DebitcardHomeComponent } from './debitcard-home/debitcard-home.component';
import { FailureResultFormComponent } from '../foundation/failure-result-form/failure-result-form.component';

const routes: Routes = [
  {
    path : '',
      component : DebitcardHomeComponent,
  },
{
  path : 'debitcard-home',
    component : DebitcardHomeComponent,
},
{
 	path : 'retail-debitcard-summary-ro-grid',
    component : debitcardComponent,
    data: { title: "debitcard.title" }
},
{
  path : 'retail-debitcard-details-form',
   component : retaildebitcardformComponent,
   data: { title: "retaildebitcardform.title" }
},
{
  path : 'retail-debitcard-flash-details-form',
   component : RetailDebitcardFlashDetailsFormComponent,
   data: { title: "retaildebitcardform.title" }
},
{
  path : 'retail-debitcard-limit-request',
   component : RetailDebitCardLimitRequestComponent,
   data: { title: "RetailDebitCardLimitRequest.title" }
},
{
  path : 'retail-dc-cancel-form',
   component : retaildccancelComponent,
   data: { title: "retaildccancel.title" }

},
{
  path : 'retail-dc-block-form',
   component : RetailDebitCardBlockFormComponent,
   data: { title: "RetailDebitCardBlockForm.title" }
},
{
  path : 'retail-dc-raise-dipute-form',
   component : raisedisputedebitcardComponent,
   data: { title: "raisedisputedebitcard.label" }
},
{
  path : 'retail-dc-replacement-form',
   component : retaildcreplacementComponent,
   data: { title: "retaildcreplacement.title" }
},
{
  path : 'retail-dc-change-pin-request',
   component : dcpinrequestComponent,
   data: { title: "dcpinrequest.title" }
},
{
  path : 'retail-dc-unblock-form',
   component : retaildcunblockComponent,
   data: { title: "retaildcunblock.title" }
},
{
  path: 'debit-card-confirmation-receipt',
  component: DebitcardConfirmationReceiptFormComponent,
  data: { title: "confirmationReceiptForm.title" }
},
{
  path : 'retail-activate-dc-form',
   component : RetailDcActivateCardFormComponent,
   data: { title: "RetailDcActivateCardForm.title" }
},
{
  path : 'retail-apply-debit-card',
   component : RetailApplyDebitCardComponent,
   data: { title: "RetailApplyDebitCard.title" }
},
{
  path : 'retail-dc-transaction-summary',
   component : RetailDcTransactionSummaryFormComponent,
   data: { title: "RetailDcTransactionSummary.title" }
},
{
  path : 'retail-dc-transaction-summary-grid',
   component : RetailDcTransactionDtlsFormComponent,
   data: { title: "RetailDcTransactionDtlsForm.title" }
},
{
  path : 'retail-flash-debit-card-request-form',
   component : RetailFlashDebitCardRequestFormComponent,
   data: { title: "RetailFlashDebitCardRequestForm.title" }
},
{
  path : 'retail-dc-transaction-dtls-ro-grid',
   component : RetailDcTransactionDtlsRoGridComponent,
   data: { title: "RetailDcTransactionDtlsForm.title" }
},
{
  path : 'dc-verify-pin-validation-form',
   component : DCVerifyPinValidationFormComponent,
   data: { title: "DCVerifyPinValidationForm.title" }
},
{
  path : 'retail-debit-card-set-pin-form',
   component : RetailDebitCardSetPinFormComponent,
   data: { title: "RetailDebitCardSetPinForm.title" }
},
{
  path: 'failure-result',
  component: FailureResultFormComponent,
  data: { title: 'FailureResultForm.title' }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DebitcardRoutingModule { }
