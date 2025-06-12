import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetailPrepaidBlockFormComponent } from './retail-prepaid-card-block-form/retail-prepaid-card-block-form.component';
import { retailpcunblockComponent } from './retail-pc-unblock-form/retail-pc-unblock-form.component';
import { RetailPrepaidChanfePinComponent } from './retail-prepaid-change-pin/retail-prepaid-change-pin.component';
import { retailActivePrepaidCardComponent } from './retail-pp-activate-card-form/retail-pp-activate-card-form.component';
import { raisedisputePrepaidCardComponent } from './retail-ppcard-dispute-form/retail-ppcard-dispute-form.component';
import { RetailPrepaidCardsSummaryRoGridComponent } from './retail-prepaid-cards-summary-ro-grid/retail-prepaid-cards-summary-ro-grid.component';
import { RetailPCDetailsFormComponent } from './retail-pc-details-form/retail-pc-details-form.component';
import { RetailFlashPrepaidCardRequestFormComponent } from './retail-pp-flash-form/retail-pp-flash-form.component';
import { RetailPCTransactiondtlsFormComponent } from './retail-pc-transactiondtls-form/retail-pc-transactiondtls-form.component';
import { RetailPcTransactionExFilterComponent } from './retailPCTransactionExFilter/retail-pc-transaction-ex-filter.component';
import { RetailPcTransactionDtlsRoGridComponent } from './retail-pc-transaction-dtls-ro-grid/retail-pc-transaction-dtls-ro-grid.component';
import { PrepaidcardConfirmationReceiptFormComponent } from './prepaidcard-confirmation-receipt-form/prepaidcard-confirmation-receipt-form.component';
import { RetailPrepaidWalletTransferFormComponent } from './retail-prepaid-wallet-transfer-form/retail-prepaid-wallet-transfer-form.component';
import { RetailPrepaidTopUpFormComponent } from './retail-prepaid-topup-form/retail-prepaid-topup-form.component';
import { RetailPCChangeLimitFormComponent } from './retail-pc-change-limit-form/retail-pc-change-limit-form.component';
import { PCVerifyPinValidationFormComponent } from './pc-verify-pin-validation-form/pc-verify-pin-validation-form.component';
import { RetailPCFlashDetailsFormComponent } from './retail-pc-flash-details-form/retail-pc-flash-details-form.component';
import { PrepaidcardHomeComponent } from './prepaidcard-home/prepaidcard-home.component';
import { FailureResultFormComponent } from '../foundation/failure-result-form/failure-result-form.component';
const routes: Routes = [
  {
    path: '',
    component: PrepaidcardHomeComponent,
    data: { title: "RetailPCDetailsForm.title" }
  },
{
  path : 'retail-prepaid-card-block-form',
    component : RetailPrepaidBlockFormComponent,
    data: { title: "RetailPrepaidBlockForm.title" }
},
{
  path : 'retail-prepaid-change-pin',
   component : RetailPrepaidChanfePinComponent,
   data: { title: "RetailPrepaidChanfePin.title" }
},
{
  path : 'retail-pc-unblock-form',
    component : retailpcunblockComponent,
    data: { title: "retailpcunblock.title" }
},
{
  path : 'retail-pc-activate-form',
    component : retailActivePrepaidCardComponent,
    data: { title: "retailActivePrepaidCard.title" }
},
{
  path : 'retail-pc-raise-dispute-form',
    component : raisedisputePrepaidCardComponent,
    data: { title: "raisedisputePrepaidCard.label" }
},
{
  path : 'retail-pc-summary-form',
    component : RetailPrepaidCardsSummaryRoGridComponent
},
{
  path : 'retail-pc-details-form',
    component : RetailPCDetailsFormComponent,
    data: { title: "RetailPCDetailsForm.title" }
},
// {
//   path : 'retail-pc-flash-details-form',
//     component : RetailFlashPrepaidCardRequestFormComponent
// },
{
  path : 'retail-pc-transaction-details-filter-form',
    component : RetailPcTransactionExFilterComponent
},
{
  path : 'retail-pc-transaction-details-form',
    component : RetailPCTransactiondtlsFormComponent,
    data:{ title: "RetailPCTransactiondtlsForm.title"}
},
{
  path : 'retail-pc-transaction-summary-form',
    component : RetailPCTransactiondtlsFormComponent,
    data:{ title: "RetailPCTransactiondtlsForm.title"}
},
{
  path:'prepaidcard-confirmation-receipt',
  component:PrepaidcardConfirmationReceiptFormComponent,
  data:{ title: "prepaidConfirmationReceiptForm.title"}
},
{
  path: 'retail-prepaid-wallet-transfer-form',
  component: RetailPrepaidWalletTransferFormComponent,
  data: { title: "RetailPrepaidWalletTransferForm.title" }
},
{
  path: 'retail-prepaid-topup-form',
  component: RetailPrepaidTopUpFormComponent,
  data: { title: "RetailPrepaidTopUpForm.title" }
   },
   {
      path: 'retail-pc-change-limit-form',
      component: RetailPCChangeLimitFormComponent,
      data: { title: "RetailPCChangeLimitForm.title" }
   },
   {
    path: 'pc-verify-pin-validation-form',
    component: PCVerifyPinValidationFormComponent,
    data: { title: "CCVerifyPinValidationForm.title" },
 },
 {
  path: 'retail-pc-flash-details-form',
  component: RetailPCFlashDetailsFormComponent,
  data: { title: "RetailPCDetailsForm.title" }
},
{
  path: 'prepaidcard-home',
  component: PrepaidcardHomeComponent,
  data: { title: "RetailPCDetailsForm.title" }
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
export class PrepaidcardRoutingModule { }
