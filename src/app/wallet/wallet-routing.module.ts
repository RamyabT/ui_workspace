import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletHomeComponent } from './wallet-home/wallet-home.component';
import { WalletDetailFormComponent } from './wallet-detail-form/wallet-detail-form.component';
import { RetailWalletAddMoneyFormComponent } from './retail-wallet-add-money-form/retail-wallet-add-money-form.component';
import { WalletConfirmationReceiptFormComponent } from './wallet-confirmation-receipt-form/wallet-confirmation-receipt-form.component';
import { WalletScanAndPayComponent } from './wallet-scan-and-pay/wallet-scan-and-pay.component';
import { RetailShowWalletQrComponent } from './show-wallet-qr/show-wallet-qr.component';
import { RetailWalletTransferFormComponent } from './retail-wallet-tansfer-form/retail-wallet-transfer-form.component';
import { RetailWalletWithDrawMoneyFormComponent } from './retail-wallet-withdraw-money/retail-wallet-withdraw-money.component';
import { RetailWalletRegistrationFormComponent } from './retail-wallet-registration-form/retail-wallet-registration-form.component';
import { RetailWalletTransactionLimitFormComponent } from './retail-wallet-tranlimit-form/retail-wallet-tranlimit-form.component';
import { FulfillRequestApprovalComponent } from './fulfill-request-approval-form/fulfill-request-approval-form.component';
import { RetailWalletReqMoneyFormComponent } from './retail-wallet-req-money/retail-wallet-req-money.component';
import { WalletRegFormComponent } from './wallet-reg-form/wallet-reg-form.component';
const routes: Routes = [
{
      path : '',
       component : WalletHomeComponent,
   },
   {
  path: "wallet-detail-form",
  component: WalletDetailFormComponent,
data: { title: "WalletAccountDetailsForm.title" }
},
  {
    path:'wallet-qr',
    component:RetailShowWalletQrComponent
  },
  {
    path:'scan-wallet-qr',
    component:WalletScanAndPayComponent
  },
  {
    path:'retail-wallet-transfer',
    component:RetailWalletTransferFormComponent,
    data: { title: "RetailWalletTransferForm.title" },
  },

  {
    path: 'retail-wallet-add-money-form',
    component: RetailWalletAddMoneyFormComponent,
    data: { title: "RETAILWALLETADDMONEY.title" },
 },
 {
  path: 'retail-wallet-withdraw-money-form',
  component: RetailWalletWithDrawMoneyFormComponent,
  data:{ title: "RetailWalletWithDrawMoneyForm.title"}
},
 {
   path: "wallet-confirmation-receipt",
   component: WalletConfirmationReceiptFormComponent,
 data: { title: "confirmationReceiptForm.title" },
 },
 {
  path:'wallet-registration-form',
  component:RetailWalletRegistrationFormComponent,
  data:{title:"RetailWalletRegistrationForm.title"}
},
{
  path:'wallet-transaction-limits-form',
  component:RetailWalletTransactionLimitFormComponent,
  data:{title:"RetailWalletTransactionLimitForm.title"}
},
{
  path:"fulfill-request-approval",
  component:FulfillRequestApprovalComponent
 },
 {
  path: 'retail-wallet-req-money',
  component: RetailWalletReqMoneyFormComponent,
  data: {title:"RetailWalletReqMoneyForm.title",module: 'WalletModule'}
},
{
  path:'wallet-reg-form',
  component:WalletRegFormComponent,
  data:{title:"RetailWalletTransactionLimitForm.title"}
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }
