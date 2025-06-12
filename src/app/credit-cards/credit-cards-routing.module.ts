import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RetailCCActivationFormComponent } from "./retail-cc-activation-form/retail-cc-activation-form.component";
import { retailcreditcardblockComponent } from "./retail-credit-card-block-form/retail-credit-card-block-form.component";
import { RetailCCReplacementFormComponent } from "./retail-cc-replacment-form/retail-cc-replacment-form.component";
import { retailccunblockedComponent } from "./retail-cc-unblocked-form/retail-cc-unblocked-form.component";
import { retailccCancelformComponent } from "./retail-cc-cancel-form/retail-cc-cancel-form.component";
import { RetailCCPinrequestFormComponent } from "./retail-cc-pin-request/retail-cc-pin-request.component";
import { cctransactionsummaryComponent } from "./retail-cc-transaction-summary/retail-cc-transaction-summary.component";
import { RetailCCTransactionSummaryROGridComponent } from "./retail-cc-transaction-summary-ro-grid/retail-cc-transaction-summary-ro-grid.component";
import { RetailLimitRequestControlComponent } from "./retail-cc-limit-request-form/retail-cc-limit-request-form.component";
import { RetailCcstatementFormComponent } from "./retail-ccstatement-form/retail-ccstatement-form.component";
import { RetailCcstatementdetailRoGridComponent } from "./retail-ccstatementdetail-ro-grid/retail-ccstatementdetail-ro-grid.component";
import { RetailCreditCardsSummaryRoGridComponent } from "./retail-credit-cards-summary-ro-grid/retail-credit-cards-summary-ro-grid.component";
import { RetailCreditcardDetailsFormComponent } from "./retail-creditcard-details-form/retail-creditcard-details-form.component";
import { RetailCcLimitChangeFormComponent } from "./retail-cc-limit-change-form/retail-cc-limit-change-form.component";
import { RetailCCFlashRequestFormComponent } from "./retail-cc-flash-request-form/retail-cc-flash-request-form.component";
import { CreditcardConfirmationReceiptFormComponent } from "./creditcard-confirmation-receipt-form/creditcard-confirmation-receipt-form.component";
import { RetailCCBillPaymentFormComponent } from "./retail-cc-bill-payment-form/retail-cc-bill-payment-form.component";
import { ccraisedisputeComponent } from "./retail-cc-raise-dispute-form/retail-cc-raise-dispute-form.component";
import { RetailCreditcardFlashDetailsFormComponent } from "./retail-creditcard-flash-details-form/retail-creditcard-flash-details-form.component";
import { CCVerifyPinValidationFormComponent } from "./cc-verify-pin-validation-form/cc-verify-pin-validation-form.component";
import { RetailApplyCreditCardComponent } from "./retail-apply-credit-card/retail-apply-credit-card.component";
import { CreditcardHomeComponent } from "./creditcard-home/creditcard-home.component";
import { FailureResultFormComponent } from "../foundation/failure-result-form/failure-result-form.component";
import { ccrewardsComponent } from './retail-cc-rewards/retail-cc-rewards.component';
import { ccRewardBenefitsComponent } from "./retail-cc-rewardsandbenefits/retail-cc-rewardsandbenefits.component";
import { ccBenefitsInfoComponent } from './retail-cc-benefits-ro-grid/retail-cc-benefits-ro-grid.component';
import { ccRewardsInfoComponent } from './retail-cc-rewards-ro-grid/retail-cc-rewards-ro-grid.component';

const routes: Routes = [
  {
    path: "",
    component: CreditcardHomeComponent,
    data: { title: "CCVerifyPinValidationForm.title" },
  },
  {
    path: "retail-cc-bill-payment",
    component: RetailCCBillPaymentFormComponent,
    data: { title: "RetailCCBillPaymentForm.title" },
  },
  {
    path: "retail-cc-activation-form",
    component: RetailCCActivationFormComponent,
    data: { title: "RetailCCActivationForm.title" },
  },
  {
    path: "retail-cc-change-pin-form",
    component: RetailCCPinrequestFormComponent,
    data: { title: "RetailCCPinrequestForm.title" },
  },
  {
    path: "retail-cc-transcation-summary-form",
    component: cctransactionsummaryComponent,
    data: { title: "cctransactionsummary.title" },
  },
  {
    path: "retail-cc-transaction-ro-grid-form",
    component: RetailCCTransactionSummaryROGridComponent,
    data: { title: "RetailCCTransactionSummaryROGrid.title" },
  },
  {
    path: "retail-cc-limit-form",
    component: RetailLimitRequestControlComponent,
    data: { title: "RetailLimitRequestControl.title" },
  },
  {
    path: "retail-credit-cards-summary-ro-grid",
    component: RetailCreditCardsSummaryRoGridComponent,
  },
  {
    path: "retail-cc-details-form",
    component: RetailCreditcardDetailsFormComponent,
    data: { title: "RetailCreditcardDetailsForm.title" },
  },
  {
    path : 'retail-cc-rewards',
    component : ccrewardsComponent,
    data : { title : "ccrewards.title" }
  },
  {
    path : 'retail-cc-rewardsandbenefits',
    component : ccRewardBenefitsComponent,
    data : { title:"ccRewardBenefits.title" }
  },
  {
    path : 'retail-cc-benefits-ro-grid',
    component : ccBenefitsInfoComponent,
    data : { title : "ccBenefitsInfo.title" }
  },
  {
    path : 'retail-cc-rewards-ro-grid',
    component : ccRewardsInfoComponent,
    data : { title : "ccRewardsInfo.title" }
  },
  {
    path: "retail-ccstatement-form",
    component: RetailCcstatementFormComponent,
  },
  {
    path: "retail-ccstatementdetail-ro-grid",
    component: RetailCcstatementdetailRoGridComponent,
  },
  {
    path: "retail-cc-limit-change-form",
    component: RetailCcLimitChangeFormComponent,
    data: { title: "RetailCcLimitChangeForm.title" },
  },
  {
    path: "retail-cc-flash-request-form",
    component: RetailCCFlashRequestFormComponent,
  },
  {
    path: "creditcard-confirmation-receipt",
    component: CreditcardConfirmationReceiptFormComponent,
    data: { title: "creditcardConfirmationReceiptForm.title" },
  },
  {
    path: "retail-cc-raise-dispute-form",
    component: ccraisedisputeComponent,
    data: { title: "ccraisedispute.label" },
  },
  {
    path: "retail-cc-block-form",
    component: retailcreditcardblockComponent,
    data: { title: "retailcreditcardblock.title" },
  },
  {
    path: "retail-cc-replace-form",
    component: RetailCCReplacementFormComponent,
    data: { title: "RetailCCReplacementForm.title" },
  },
  {
    path: "retail-cc-unblocked-form",
    component: retailccunblockedComponent,
    data: { title: "retailccunblocked.title" },
  },
  {
    path: "retail-cc-cancel-form",
    component: retailccCancelformComponent,
    data: { title: "retailccCancelform.title" },
  },
  {
    path: "retail-creditcard-flash-details-form",
    component: RetailCreditcardFlashDetailsFormComponent,
    data: { title: "RetailCreditcardDetailsForm.title" },
  },
  {
    path: "cc-verify-pin-validation-form",
    component: CCVerifyPinValidationFormComponent,
    data: { title: "CCVerifyPinValidationForm.title" },
  },
  {
    path:"retail-apply-credit-card",
    component:RetailApplyCreditCardComponent,
    data: { title: "RetailApplyCreditCard.title" },
  },
  {
    path: "creditcard-home",
    component: CreditcardHomeComponent,
    data: { title: "CCVerifyPinValidationForm.title" },
  },
  {
    path: 'failure-result',
    component: FailureResultFormComponent,
    data: { title: 'FailureResultForm.title' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditCardsRoutingModule {}
