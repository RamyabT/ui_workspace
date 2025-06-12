import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NpssGetStartFormComponent } from './npss-get-start-form/npss-get-start-form.component';
import { RetailCustomerEnrollmentComponent } from './retailNPSSEnroll/retail-npss-customer-enroll.component';
import { ConfirmationReceiptFormComponent } from './confirmation-receipt-form/confirmation-receipt-form.component';
import { RetailNPSSProxyComponent } from './retail-npss-proxy/retail-npss-proxy.component';
import { RetailCustomerActivationComponent } from './retail-customer-activation/retail-customer-activation.component';
import { RetailCustomerUnregistrationComponent } from './retail-customer-unregistration/retail-customer-unregistration.component';
import { RetailInvalidNpssComponent } from './retail-invalidate-npss/retail-invalidate-npss.component';
import { NPSSSendMoneyComponent } from './retail-send-amount-confirmation/retail-send-amount-confirmation.component';
import { RetailNPSSSendMoneyComponent } from './retail-npss-send-money/retail-npss-send-money.component';
import { RetailNpssRequestMoneyComponent } from './retail-npss-request-money/retail-npss-request-money.component';
import { RetailRequestMoneyConfirmationComponent } from './retailRequestMoneyConfirmation/retail-request-money-confirmation.component';
import { NPSSContactViewingComponent } from './retail-npss-send-contacts-page/npss-send-money-contact.component';
import { NPSSRequestContactViewingComponent } from './npss-request-money-contact/npss-request-money-contact.component';
import { SplitBillsFormComponent } from './split-bills-form/split-bills-form.component';
import { RetailSplitBillsQrcodeComponent } from './retail-split-bills-qrcode/retail-split-bills-qrcode.component';
import { RetailScanQrComponent } from './retail-scan-qr/retail-scan-qr.component';
import { RetailScanAndPayComponent } from './retail-scan-and-pay/retail-scan-and-pay.component';
import { RetailApproveRequestComponent } from './retail-approve-request/retail-approve-request.component';
import { RetailAddMembersContactComponent } from './retail-add-members-contact/retail-add-members-contact.component';
import { RetailBillSplitTypeComponent } from './retail-bill-split-type/retail-bill-split-type.component';
import { NpssHomeeComponent } from './npss-home/npss-home.component';
import { FailureResultFormComponent } from '../foundation/failure-result-form/failure-result-form.component';
import { NPSSFailureFormComponent } from '../login/npss-failure-confirmation-form/npss-failure-confirmation-form';

const routes: Routes = [
  {
    path: '',
    component: NpssHomeeComponent,
    data: { title: "RetailCustomerEnrollment.manageAccountsTitle" }
  },
  {
    path: 'npss-get-start',
    component: NpssGetStartFormComponent,
    data: { title: "NpssGetStartForm.title" }
  },
  {
    path: 'npss-customer-enrollment',
    component: RetailCustomerEnrollmentComponent,
    data: { title: "RetailCustomerEnrollment.title" }
  },
  {
    path: 'npss-manage-accounts',
    component: RetailCustomerEnrollmentComponent,
    data: { title: "RetailCustomerEnrollment.manageAccountsTitle" }
  },
  {
    path: 'confirmation-receipt',
    component: ConfirmationReceiptFormComponent,
    data: { title: "NpssConfirmationReceiptForm.title" }
  },
  {
    path: 'retail-npss-proxy',
    component: RetailNPSSProxyComponent,
    data: { title: "RetailNPSSProxyForm.title" }
  },
  {
    path: 'retail-customer-activation',
    component: RetailCustomerActivationComponent,
    data: { title: "RetailCustomerActivationForm.title" }
  },
  {
    path: 'retail-customer-unregistration',
    component: RetailCustomerUnregistrationComponent,
    data: { title: "RetailCustomerUnregistration.title" }
  },
  {
    path: 'retail-invalidate-npss',
    component: RetailInvalidNpssComponent,
    data: { title: "RetailInvalidNpss.title" }
  },
  {
    path: 'retail-send-amount-confirmation',
    component: NPSSSendMoneyComponent,
    data: { title: "NPSSSendMoney.title" }
  },
  {
    path: 'retail-npss-send-money',
    component: RetailNPSSSendMoneyComponent,
    data: { title: "RetailNPSSSendMoney.title" }
  },
  {
    path: 'retail-npss-request-money',
    component: RetailNpssRequestMoneyComponent,
    data: { title: "RetailNpssRequestMoney.title" }

  },
  {
    path: 'retail-request-money-confirmation',
    component: RetailRequestMoneyConfirmationComponent,
    data: { title: "RetailRequestMoneyConfirmation.title" }

  },
  {
    path: 'npss-send-money-contact',
    component: NPSSContactViewingComponent,
    data: { title: "NPSSContactViewing.title" }

  },
  {
    path: 'npss-request-money-contact',
    component: NPSSRequestContactViewingComponent,
    data: { title: "NPSSRequestContactViewing.title" }

  },
  {
    path: 'split-bills-form',
    component: SplitBillsFormComponent,
    data: { title: "NPSSSplitBills.title" }

  },
  {
    path: 'split-bills-qrcode',
    component: RetailSplitBillsQrcodeComponent,
    data: { title: "SplitBillsByQrcode.title" }

  },
  {
    path: 'scan-qr',
    component: RetailScanQrComponent,
    data: { title: "ScanQrcode.title" }
  },
  {
    path: 'scan-and-pay',
    component: RetailScanAndPayComponent,
    data: { title: "ScanAndPay.title" }
  },
  {
    path: 'retail-approve-request',
    component: RetailApproveRequestComponent,
    data: { title: "Approverequest.title" }
  },
  {
    path:'retail-add-members-contact',
    component:RetailAddMembersContactComponent,
    data:{title:"AddMemberContact.title"}
  },{
    path:'retail-bill-split-type',
    component: RetailBillSplitTypeComponent,
    data:{title:"BillSplitType.title"}
  },
  {
    path: 'failure-result',
    component: NPSSFailureFormComponent,
    data: { title: 'FailureResultForm.title' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NpssRoutingModule { }
