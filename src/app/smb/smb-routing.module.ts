import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDelegatesIntroComponent } from './add-delegates-intro/add-delegates-intro.component';
import { SmbDelegatesHomeComponent } from './smb-delegates-home/smb-delegates-home.component';
import { RetailUserrestrictionreqFormComponent } from './retail-userrestrictionreq-form/retail-userrestrictionreq-form.component';
import { RetailUsercasarestrictionreqFormComponent } from './retail-usercasarestrictionreq-form/retail-usercasarestrictionreq-form.component';
import { RetailUserdeprestrictionreqFormComponent } from './retail-userdeprestrictionreq-form/retail-userdeprestrictionreq-form.component';
import { RetailUserloanrestrictionreqFormComponent } from './retail-userloanrestrictionreq-form/retail-userloanrestrictionreq-form.component';
import { RetailUserccrestrictionreqFormComponent } from './retail-userccrestrictionreq-form/retail-userccrestrictionreq-form.component';
import { RetailUserdcrestrictionreqFormComponent } from './retail-userdcrestrictionreq-form/retail-userdcrestrictionreq-form.component';
import { RetailUserpcrestrictionreqFormComponent } from './retail-userpcrestrictionreq-form/retail-userpcrestrictionreq-form.component';
import { RetailSetpermissionsFormComponent } from './retail-setpermissions-form/retail-setpermissions-form.component';
import { SmbConfirmationReceiptFormComponent } from './smb-confirmation-receipt-form/smb-confirmation-receipt-form.component';
import { RetailDelegateuserGridComponent } from './retail-delegateuser-grid/retail-delegateuser-grid.component';
import { RetailManageDelegateTemplateComponent } from '../dep/core/component/panning-component/retail-manage-delegate-template/retail-manage-delegate-template.component';
import { RetailDelegateuserreqFormComponent } from './retail-delegateuserreq-form/retail-delegateuserreq-form.component';
import { RetailWorkflowqueueRoGridComponent } from './retail-workflowqueue-ro-grid/retail-workflowqueue-ro-grid.component';
import { RetailTransactionManagementForm } from '../transaction-management/retail-transaction-management-form/retail-transaction-management-form.component';

const routes: Routes = [
  {
    path: 'add-delegates-intro',
    component: AddDelegatesIntroComponent
  },
  {
    path: 'smb-delegates-home',
    component: SmbDelegatesHomeComponent
  },
  {
    path : 'retail-userrestrictionreq-form',
    component : RetailUserrestrictionreqFormComponent,
    data:{title:"RetailUserrestrictionreqForm.title"}
  },
  {
    path : 'retail-usercasarestrictionreq-form',
    component : RetailUsercasarestrictionreqFormComponent,
    data:{title:"RetailUsercasarestrictionreqForm.title"}
  },
  {
    path : 'retail-userdeprestrictionreq-form',
    component : RetailUserdeprestrictionreqFormComponent,
    data:{title:"RetailUserdeprestrictionreqForm.title"}
  },
  {
    path : 'retail-userloanrestrictionreq-form',
    component : RetailUserloanrestrictionreqFormComponent,
    data:{title:"RetailUserloanrestrictionreqForm.title"}
  },
  {
    path : 'retail-userccrestrictionreq-form',
    component : RetailUserccrestrictionreqFormComponent,
    data:{title:"RetailUserccrestrictionreqForm.title"}
  },
  {
    path : 'retail-userdcrestrictionreq-form',
    component : RetailUserdcrestrictionreqFormComponent,
    data:{title:"RetailUserdcrestrictionreqForm.title"}
  },
  {
    path : 'retail-userpcrestrictionreq-form',
    component : RetailUserpcrestrictionreqFormComponent,
    data:{title:"RetailUserpcrestrictionreqForm.title"}
  },
  {
    path : 'retail-setpermissions-form',
    component : RetailSetpermissionsFormComponent,
    data:{title:"RetailSetpermissionsForm.title"}
  },
  {
    path : 'smb-confirmation-receipt-form',
    component : SmbConfirmationReceiptFormComponent,
    data:{title:"confirmationReceiptForm.title"}
  },
  {
    path : 'retail-delegateuser-grid',
    component : RetailDelegateuserGridComponent
    // data:{title:"confirmationReceiptForm.title"}
  },
  // {
  //   path : 'retail-manage-delegate-template',
  //   component : RetailManageDelegateTemplateComponent
  //   // data:{title:"confirmationReceiptForm.title"}
  // },
  {
    path : 'retail-delegateuserreq-form',
    component : RetailDelegateuserreqFormComponent,
    data:{title:"RetailDelegateuserreqForm.title"}
  },
  {
    path : 'retail-workflowqueue-ro-grid',
    component : RetailWorkflowqueueRoGridComponent,
   // data:{title:"RetailWorkflowqueueRoGrid.title",module:' CommonModule'}
 },
 {
  path : 'retail-transaction-management-form',
  component : RetailTransactionManagementForm,
  data:{title:"RetailTransactionManagementForm.title"}
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmbRoutingModule { }
