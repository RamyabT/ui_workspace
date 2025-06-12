import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NpssRoutingModule } from './npss-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../dep/core/material.module';
import { NpssRecentTransactionsWidgetComponent } from './npss-recent-transactions-widget/npss-recent-transactions-widget.component';
import { NpssGetStartFormComponent } from './npss-get-start-form/npss-get-start-form.component';
import { FoundationModule } from '../foundation/foundation.module';
import { RetailCustomerEnrollmentComponent } from './retailNPSSEnroll/retail-npss-customer-enroll.component';
import { RetailSavingsAccountRoGridComponent } from './retail-savings-account-ro-grid/retail-savings-account-ro-grid.component';
import { ConfirmationReceiptFormComponent } from './confirmation-receipt-form/confirmation-receipt-form.component';
import { NpssQuickActionsComponent } from './npss-quick-actions/npss-quick-actions.component';
import { RetailNPSSProxyComponent } from './retail-npss-proxy/retail-npss-proxy.component';
import { RetailCustomerActivationComponent } from './retail-customer-activation/retail-customer-activation.component';
import { CustomerActivationService } from './customerActivation-service/customerActivation.service';
import { RetailCustomerUnregistrationComponent } from './retail-customer-unregistration/retail-customer-unregistration.component';
import { CustomerunregistrationService } from './customerunregistration-service/customerunregistration.service';
import { NpssproxyService } from './npssproxy-service/npssproxy.service';
import { InvalidatenpssService } from './invalidatenpss-service/invalidatenpss.service';
import { RetailInvalidNpssComponent } from './retail-invalidate-npss/retail-invalidate-npss.component';
import { TransferService } from '../foundation/validator-service/transfers-service';
import { RetailNPSSSendMoneyComponent } from './retail-npss-send-money/retail-npss-send-money.component';
import { NPSSSendMoneyComponent } from './retail-send-amount-confirmation/retail-send-amount-confirmation.component';
import { NpsssendmoneyService } from './npsssendmoney-service/npsssendmoney.service';
import { RetailRequestMoneyConfirmationComponent } from './retailRequestMoneyConfirmation/retail-request-money-confirmation.component';
import { RetailNpssRequestMoneyComponent } from './retail-npss-request-money/retail-npss-request-money.component';
import { NpssrequestmoneyService } from './npssrequestmoney-service/npssrequestmoney.service';
import { NPSSFulfillmentQueueComponent } from './npss-fulfillment-queue/npss-fulfillment-queue.component';
import { FulfillmentQueueService } from './fulfillmentQueue-service/fulfillmentQueue.service';
import { ThirdPartyModule } from '../dep/core/third-party.module';
import { NPSSContactViewingComponent } from './retail-npss-send-contacts-page/npss-send-money-contact.component';
import { NpsscontactviewingService } from './npsscontactviewing-service/npsscontactviewing.service';
import { NPSSContactViewingROGRIDComponent } from './contactViewingROGrid/contact-list-ro-grid.component';
import { NPSSRequestContactViewingComponent } from './npss-request-money-contact/npss-request-money-contact.component';
import { NPSSRequestContactViewingROGRIDComponent } from './RequestContactROGrid/request-contact-list-ro-grid.component';
import { NpssRemarksControlComponent } from './npss-remarks-control/npss-remarks-control.component';
import { SplitBillsFormComponent } from './split-bills-form/split-bills-form.component';
import { RetailSplitBillsQrcodeComponent } from './retail-split-bills-qrcode/retail-split-bills-qrcode.component';
import { NoOfPersonControlComponent } from './no-of-person-control/no-of-person-control.component';
import { NoOfPersonService } from './noOfPerson-service/noOfPerson.service';
import { QrcodeGenerateComponent } from './qrcode-generate/qrcode-generate.component';
import { RetailScanQrComponent } from './retail-scan-qr/retail-scan-qr.component';
import { RetailScanAndPayComponent } from './retail-scan-and-pay/retail-scan-and-pay.component';
import { RetailApproveRequestComponent } from './retail-approve-request/retail-approve-request.component';
import { RetailAddMembersContactComponent } from './retail-add-members-contact/retail-add-members-contact.component';
import { SelectedContactROGRIDComponent } from './SelectedContactROGrid/selected-contact-ro-grid.component';
import { RetailBillSplitTypeComponent } from './retail-bill-split-type/retail-bill-split-type.component';
import { RetailBillSplitTypeROGRIDComponent } from './retail-bill-split-type-ro-grid/retail-bill-split-type-ro-grid.component';
import { RetailSelectContactROGRIDComponent } from './retail-select-contact-ro-grid/retail-select-contact-ro-grid.component';
import { SplitbillrtpreqService } from './splitbillrtpreq-service/splitbillrtpreq.service';
import { NpssHomeeComponent } from './npss-home/npss-home.component';

@NgModule({
  declarations: [
    NpssRecentTransactionsWidgetComponent,
    NpssGetStartFormComponent,
    RetailCustomerEnrollmentComponent,
    RetailSavingsAccountRoGridComponent,
    ConfirmationReceiptFormComponent,
    NpssQuickActionsComponent,
    RetailNPSSProxyComponent,
    RetailCustomerActivationComponent,
    RetailCustomerUnregistrationComponent,
    RetailInvalidNpssComponent,
    RetailNPSSSendMoneyComponent,
    NPSSSendMoneyComponent,
    RetailRequestMoneyConfirmationComponent,
    RetailNpssRequestMoneyComponent,
    NPSSFulfillmentQueueComponent,
    NPSSContactViewingComponent,
    NPSSContactViewingROGRIDComponent,
    NPSSRequestContactViewingComponent,
    NPSSRequestContactViewingROGRIDComponent,
    NpssRemarksControlComponent,
    SplitBillsFormComponent,
    RetailSplitBillsQrcodeComponent,
    NoOfPersonControlComponent,
    QrcodeGenerateComponent,
    RetailScanQrComponent,
    RetailScanAndPayComponent,
    RetailApproveRequestComponent,
    RetailAddMembersContactComponent,
    SelectedContactROGRIDComponent,
    RetailBillSplitTypeROGRIDComponent,
    RetailBillSplitTypeComponent,
    RetailSelectContactROGRIDComponent,
    NpssHomeeComponent
  ],
  imports: [
    CommonModule,
    NpssRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    TranslateModule,
    FoundationModule,
    MaterialModule,
    ThirdPartyModule
  ],
  providers:[
    CustomerActivationService,
    CustomerunregistrationService,
    NpssproxyService,
    InvalidatenpssService,
    TransferService,
    NpsssendmoneyService,
    NpssrequestmoneyService,
    FulfillmentQueueService,
    NpsscontactviewingService,
    NoOfPersonService,
    SplitbillrtpreqService
  ],
  exports: [
    NpssRecentTransactionsWidgetComponent,
    NpssQuickActionsComponent,
    RetailNPSSProxyComponent,
    RetailCustomerActivationComponent,
    RetailCustomerUnregistrationComponent,
    RetailInvalidNpssComponent,
    RetailNPSSSendMoneyComponent,
    NPSSSendMoneyComponent,
    RetailRequestMoneyConfirmationComponent,
    RetailNpssRequestMoneyComponent,
    NPSSFulfillmentQueueComponent,
    NPSSContactViewingComponent,
    NPSSContactViewingROGRIDComponent,
    NPSSRequestContactViewingComponent,
    NPSSRequestContactViewingROGRIDComponent,
    NpssRemarksControlComponent,
    NoOfPersonControlComponent,
    QrcodeGenerateComponent,
    RetailScanQrComponent,
    RetailScanAndPayComponent,
    RetailApproveRequestComponent,
    RetailAddMembersContactComponent,
    SelectedContactROGRIDComponent,
    RetailBillSplitTypeComponent,
    RetailBillSplitTypeROGRIDComponent,
    RetailSelectContactROGRIDComponent,
    NpssHomeeComponent
  ]
})
export class NpssModule { }
