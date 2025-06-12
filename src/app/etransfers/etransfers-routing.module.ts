import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InteracProfileCreateStartFormComponent } from './interac-profile-create-start-form/interac-profile-create-start-form.component';
import { EtransfersHomeComponent } from './etransfers-home/etransfers-home.component';
import { RetailEtransferComponent } from './retail-etransfer-form/retail-etransfer-form.component';
import { RetailEtransferRequestMoneyFormComponent } from './retail-etransfer-request-money-form/retail-etransfer-request-money-form.component';
import { RetailEtransferautodepositlogFormComponent } from './retail-etransferautodepositlog-form/retail-etransferautodepositlog-form.component';
import { ETransferConfirmationReceiptFormComponent } from './etransfer-confirmation-receipt-form/etransfer-confirmation-receipt-form.component';
import { RetailEtransfercontactlogFormComponent } from './retail-etransfercontactlog-form/retail-etransfercontactlog-form.component';
import { etransfercontactlogtemplateComponent } from './retail-etransfercontactlog-template/retail-etransfercontactlog-template.component';
import { RetailEtransferCustomerFormComponent } from './retail-etransfer-customer-form/retail-etransfer-customer-form.component';
import { ETransferHistoryRoGridComponent } from './etransfer-history-ro-grid/etransfer-history-ro-grid.component';
import { RetailEtransferAutodepositViewComponent } from './retail-etransfer-autodeposit-view/retail-etransfer-autodeposit-view.component';
import { RetailManageEtransferContactlogFormComponent } from './retail-manage-etransfercontactlog-form/retail-manage-etransfercontactlog-form.component';
import { RetailEtransferFulfillRequestMoneyFormComponent } from './retail-etransfer-fulfill-request-money-form/retail-etransfer-fulfill-request-money-form.component';
import { RetailEtransferReclaimMoneyFormComponent } from './retail-etransfer-reclaim-money-form/retail-etransfer-reclaim-money-form.component';
import { RetailManageFavouriteETransferFormComponent } from './retail-manage-favourite-etransfer-form/retail-manage-favourite-etransfer-form.component';
import { RetailEtransferReceiveMoneyFormComponent } from './retail-etransfer-receive-money-form/retail-etransfer-receive-money-form.component';
import { ETransfersRoutingExtension } from './etransfers-module-extension';

const routes: Routes = [
  {
    path: '',
    component: EtransfersHomeComponent
 },
  {
    path: 'create-profile',
    component: InteracProfileCreateStartFormComponent
  },
  {
    path: 'etransfers-home',
    component: EtransfersHomeComponent
  },
  {
    path: 'retail-etransfer-form',
    component: RetailEtransferComponent,
    data: { title: "RetailEtransfer.title", space: "etransfers-space" }
  },
  {
    path: 'retail-etransfercontactlog-form',
    component: RetailEtransfercontactlogFormComponent,
    data: { title: "RetailEtransfercontactlogForm.title", space: "etransfers-space", backServiceCode: "RETAILMANAGEETRANSFERCONTACT" }
  },
  {
    path: 'retail-etransfercontactlog-form-grid',
    component: RetailEtransfercontactlogFormComponent,
    data: { title: "RetailManageEtransferContactlogForm.title", space: "etransfers-space" }
  },
  {
    path: 'retail-manage-etransfercontactlog-form',
    component: RetailManageEtransferContactlogFormComponent,
    data: { title: "RetailManageEtransferContactlogForm.title", space: "etransfers-space" }
  },
  {
    path: 'retail-etransfercontactlog-template',
    component: etransfercontactlogtemplateComponent,
    data: { title: "RetailManageEtransferContactlogForm.title", space: "etransfers-space" }
  },
  {
    path: 'retail-etransfer-request-money-form',
    component: RetailEtransferRequestMoneyFormComponent,
    data: { title: "RetailEtransferRequestMoneyForm.title", space: "etransfers-space" }
  },
  {
    path: 'retail-etransferautodepositlog-form',
    component: RetailEtransferautodepositlogFormComponent,
    data: { title: "RetailEtransferautodepositlogForm.title", space: "etransfers-space", backServiceCode: "GETETRFAUTODEPOSIT" }
  },
  {
    path: 'etransfer-manage-autodeposit',
    component: RetailEtransferAutodepositViewComponent,
    data: { title: "RetailEtransferautodepositView.title", space: "etransfers-space" }
  },
  {
    path: "etransfer-confirmation-receipt",
    component: ETransferConfirmationReceiptFormComponent,
  data: { title: "econfirmationReceiptForm.title" },
 },
 {
  path : 'retail-etransfer-customer-form',
   component : RetailEtransferCustomerFormComponent,
   data:{title:"RetailEtransferCustomerForm.title", space: "etransfers-space"}
 },
 {
  path : 'retail-etransfer-customer-form-edit',
   component : RetailEtransferCustomerFormComponent,
   data:{title:"RetailEtransferCustomerFormEdit.title", space: "etransfers-space"}
 },
 {
      path: 'etransfer-history-ro-grid',
      component: ETransferHistoryRoGridComponent
 },
 {
  path : 'retail-etransfer-fulfill-request-money',
   component : RetailEtransferFulfillRequestMoneyFormComponent,
   data:{title:"RetailEtransferFulfillRequestMoneyForm.title", space: "etransfers-space"}
},
{
  path : 'retail-etransfer-reclaim-money-form',
   component : RetailEtransferReclaimMoneyFormComponent,
   data:{title:"RetailEtransferReclaimMoneyForm.title", space: "etransfers-space"}
 },
 {
  path : 'view-all-etransfer-favrourite',
   component :RetailManageFavouriteETransferFormComponent ,
   data:{title:"RetailManageFavouriteETransferForm.title", space: "etransfers-space"}
 },
 {
  path : 'retail-etransfer-receive-money-form',
   component : RetailEtransferReceiveMoneyFormComponent,
   data:{title:"RetailEtransferReceiveMoneyForm.title", space: "etransfers-space"}
 },
 ...ETransfersRoutingExtension
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ETransfersRoutingModule { }
