import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ETransfersRoutingModule } from './etransfers-routing.module';
import { InteracProfileCreateStartFormComponent } from './interac-profile-create-start-form/interac-profile-create-start-form.component';
import { FoundationModule } from '../foundation/foundation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@dep/core';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { InteracFavTransactionComponent } from './interac-fav-transaction/interac-fav-transaction.component';
import { EtransfersHomeComponent } from './etransfers-home/etransfers-home.component';
import { EtransfersContextActionsComponent } from './etransfers-context-actions/etransfers-context-actions.component';
import { RetailEtransferComponent } from './retail-etransfer-form/retail-etransfer-form.component';
import { EtransferService } from './etransfer-service/etransfer.service';
import { SecurityAnswerComponent } from './security-answer/security-answer.component';
import { SecurityQuestionComponent } from './security-question/security-question.component';
import { eTransferContactListComponent } from './eTransfer-contact-list/eTransfer-contact-list.component';
import { eTransferContactCategoryComponent } from './eTransfer-contactCategory/eTransfer-contactCategory.component';
import { NotificationPreferenceComponent } from './notification-preference/notification-preference.component';
import { eTransferCreateContactComponent } from './eTransfer-create-contact/eTransfer-create-contact.component';
import { RetailEtransferRequestMoneyFormComponent } from './retail-etransfer-request-money-form/retail-etransfer-request-money-form.component';
import { RetailEtransferautodepositlogFormComponent } from './retail-etransferautodepositlog-form/retail-etransferautodepositlog-form.component';
import { TransfersModule } from '../transfers/transfers.module';
import { ETransferConfirmationReceiptFormComponent } from './etransfer-confirmation-receipt-form/etransfer-confirmation-receipt-form.component';
import { EtransfercontactService } from './etransfercontact-service/etransfercontact.service';
import { EtransferContactListTemplateControlComponent } from './etransfer-contact-list-template-control/etransfer-contact-list-template-control.component';
import { SecurityAnswerMaskedControlComponent } from './security-answer-masked-control/security-answer-masked-control.component';
import { RetailEtransfercontactlogFormComponent } from './retail-etransfercontactlog-form/retail-etransfercontactlog-form.component';
import { etransfercontactlogtemplateComponent } from './retail-etransfercontactlog-template/retail-etransfercontactlog-template.component';
import { EtransfercontactlogService } from './etransfercontactlog-service/etransfercontactlog.service';
import { EtransferautodepositlogService } from './etransferautodepositlog-service/etransferautodepositlog.service';
import { RetailEtransferCustomerFormComponent } from './retail-etransfer-customer-form/retail-etransfer-customer-form.component';
import { EtransfercustomerlogService } from './etransfercustomerlog-service/etransfercustomerlog.service';
import { EtransfercontactSearchListControlComponent } from './etransfercontact-search-list-control/etransfercontact-search-list-control.component';
import { EtransfercontactSearchListControlHelper } from './etransfercontact-search-list-control/etransfercontact-search-list-control.helper';
import { EtransferContactFetchValidatorService } from './etransfercontact-search-list-control/etransfer-contact-validator.service';
import { RetailEtransferAutodepositViewComponent } from './retail-etransfer-autodeposit-view/retail-etransfer-autodeposit-view.component';
import { ETransferHistoryRoGridComponent } from './etransfer-history-ro-grid/etransfer-history-ro-grid.component';
import { ETransferHistoryFormComponent } from './etransfer-history-form/etransfer-history-form.component';
import { RetailManageEtransferContactlogFormComponent } from './retail-manage-etransfercontactlog-form/retail-manage-etransfercontactlog-form.component';
import { RetailEtransferFulfillRequestMoneyFormComponent } from './retail-etransfer-fulfill-request-money-form/retail-etransfer-fulfill-request-money-form.component';
import { RetailEtransferHistoryFilterComponent } from './retailEtransferHistoryFilter/retail-etransfer-history-filter.component';
import { RetailetransferhistoryfilterService } from './retailetransferhistoryfilter-service/retailetransferhistoryfilter.service';
import { RetailEtransferReclaimMoneyFormComponent } from './retail-etransfer-reclaim-money-form/retail-etransfer-reclaim-money-form.component';
import { RetailEtransferReceiveMoneyFormComponent } from './retail-etransfer-receive-money-form/retail-etransfer-receive-money-form.component';
import { RetailInteracFavPaymentsRoGridComponent } from './retail-interac-fav-payments-ro-grid/retail-interac-fav-payments-ro-grid.component';
import { FavpaymentsService } from './favpayments-service/favpayments.service';
import { EtransfersFavouritePaymentsValidator } from './validators/etransfersFavouritePayments-validator.service';
import { RetailManageFavouriteETransferFormComponent } from './retail-manage-favourite-etransfer-form/retail-manage-favourite-etransfer-form.component';
import { RetailViewAllFavouriteEtransferPaymentsRoGridComponent } from './retail-view-all-favourtie-etransfer-payments-ro-grid/retail-view-all-favourtie-etransfer-payments-ro-grid.component';
import { RetailEtransferAutoDepositRoGridComponent } from './retail-etransfe-auto-deposit-ro-grid/retail-etransfe-auto-deposit-ro-grid.component';
import { EtransferautodepositService } from './etransferautodeposit-service/etransferautodeposit.service';
import { ETransfersModuleExtensionComponents, ETransfersModuleImportExtension, ETransfersModuleServices } from './etransfers-module-extension';
import { NgxMaskModule } from 'ngx-mask';

const eTransfersComponents = [
  InteracProfileCreateStartFormComponent,
  InteracFavTransactionComponent,
  EtransfersHomeComponent,
  EtransfersContextActionsComponent,

  RetailEtransferComponent,
  SecurityAnswerComponent,
  SecurityQuestionComponent,
  eTransferContactListComponent,
  eTransferContactCategoryComponent,
  NotificationPreferenceComponent,
  eTransferCreateContactComponent,
  RetailEtransfercontactlogFormComponent,
  RetailEtransferRequestMoneyFormComponent,
  etransfercontactlogtemplateComponent,
  RetailEtransferautodepositlogFormComponent,
  ETransferConfirmationReceiptFormComponent,
  EtransferContactListTemplateControlComponent,
  SecurityAnswerMaskedControlComponent,
  RetailEtransferCustomerFormComponent,
  EtransfercontactSearchListControlComponent,
  RetailEtransferAutodepositViewComponent,
  ETransferHistoryRoGridComponent,
  ETransferHistoryFormComponent,
  RetailManageEtransferContactlogFormComponent,
RetailEtransferHistoryFilterComponent,
  RetailEtransferFulfillRequestMoneyFormComponent,
  RetailEtransferReclaimMoneyFormComponent,
  RetailInteracFavPaymentsRoGridComponent,
  RetailManageFavouriteETransferFormComponent,
  RetailViewAllFavouriteEtransferPaymentsRoGridComponent,
  RetailEtransferReceiveMoneyFormComponent,
  RetailEtransferAutoDepositRoGridComponent,
  ...ETransfersModuleExtensionComponents
]

@NgModule({
  declarations: [
    ...eTransfersComponents
  ],
  imports: [
    CommonModule,
    ETransfersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    MaterialModule,
    TranslateModule,
    FoundationModule,
    TransfersModule,
    NgxMaskModule,
    ...ETransfersModuleImportExtension
  ],
  providers : [
    EtransferService,
    EtransfercontactService,
    EtransfercontactlogService,
    EtransferautodepositlogService,
    EtransfercustomerlogService,
    EtransferContactFetchValidatorService ,
    RetailetransferhistoryfilterService,
    FavpaymentsService,
    EtransfersFavouritePaymentsValidator,
    EtransferautodepositService,
    ...ETransfersModuleServices
  ],
  exports: [
    ...eTransfersComponents
  ]
})
export class ETransfersModule { }
