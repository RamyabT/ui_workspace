import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmbRoutingModule } from './smb-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { AddDelegatesIntroComponent } from './add-delegates-intro/add-delegates-intro.component';
import { SmbDelegatesHomeComponent } from './smb-delegates-home/smb-delegates-home.component';
import { MaterialModule } from '@dep/core';
import { RetailUserrestrictionreqFormComponent } from './retail-userrestrictionreq-form/retail-userrestrictionreq-form.component';
import { UserrestrictionreqService } from './userrestrictionreq-service/userrestrictionreq.service';
import { FoundationModule } from '../foundation/foundation.module';
import { RetailUserrestrictionreqFormHelper } from './retail-userrestrictionreq-form/retail-userrestrictionreq-form.helper';
import { RetailUsercasarestrictionreqFormComponent } from './retail-usercasarestrictionreq-form/retail-usercasarestrictionreq-form.component';
import { RetailUserdeprestrictionreqFormComponent } from './retail-userdeprestrictionreq-form/retail-userdeprestrictionreq-form.component';
import { RetailUserloanrestrictionreqFormComponent } from './retail-userloanrestrictionreq-form/retail-userloanrestrictionreq-form.component';
import { RetailUserccrestrictionreqFormComponent } from './retail-userccrestrictionreq-form/retail-userccrestrictionreq-form.component';
import { RetailUserdcrestrictionreqFormComponent } from './retail-userdcrestrictionreq-form/retail-userdcrestrictionreq-form.component';
import { RetailUserpcrestrictionreqFormComponent } from './retail-userpcrestrictionreq-form/retail-userpcrestrictionreq-form.component';
import { RetailUsercasarestrictionreqFormHelper, RetailUsercasarestrictionreqFormState } from './retail-usercasarestrictionreq-form/retail-usercasarestrictionreq-form.helper';
import { RetailUserdeprestrictionreqFormHelper } from './retail-userdeprestrictionreq-form/retail-userdeprestrictionreq-form.helper';
import { RetailUserloanrestrictionreqFormHelper } from './retail-userloanrestrictionreq-form/retail-userloanrestrictionreq-form.helper';
import { RetailUserccrestrictionreqFormHelper } from './retail-userccrestrictionreq-form/retail-userccrestrictionreq-form.helper';
import { RetailUserpcrestrictionreqFormHelper } from './retail-userpcrestrictionreq-form/retail-userpcrestrictionreq-form.helper';
import { AccessLevelControlComponent } from './access-level-control/access-level-control.component';
import { CardReferenceControlComponent } from './card-reference-control/card-reference-control.component';
import { AccNumberDelegateControlComponent } from './acc-number-delegate-control/acc-number-delegate-control.component';
import { AccessLevelControlService } from './access-level-control/access-level-control.service';
import { UsercasarestrictionreqService } from './usercasarestrictionreq-service/usercasarestrictionreq.service';
import { UserdeprestrictionreqService } from './userdeprestrictionreq-service/userdeprestrictionreq.service';
import { UserloanrestrictionreqService } from './userloanrestrictionreq-service/userloanrestrictionreq.service';
import { UserccrestrictionreqService } from './userccrestrictionreq-service/userccrestrictionreq.service';
import { RetailUserdcrestrictionreqFormHelper } from './retail-userdcrestrictionreq-form/retail-userdcrestrictionreq-form.helper';
import { UserdcrestrictionreqService } from './userdcrestrictionreq-service/userdcrestrictionreq.service';
import { UserpcrestrictionreqService } from './userpcrestrictionreq-service/userpcrestrictionreq.service';
import { RetailSetpermissionsFormComponent } from './retail-setpermissions-form/retail-setpermissions-form.component';
import { DelegateUsernameControlComponent } from './delegate-username-control/delegate-username-control.component';
import { CustomerValidatorService } from './delegate-username-control/delegate-username-validator.service';
import { AccountRestrictionControlComponent } from './account-restriction-control/account-restriction-control.component';
import { SmbConfirmationReceiptFormComponent } from './smb-confirmation-receipt-form/smb-confirmation-receipt-form.component';
import { RetailDelegateuserGridComponent } from './retail-delegateuser-grid/retail-delegateuser-grid.component';
import { DelegateuserService } from './delegateuser-service/delegateuser.service';
import { RetailDelegateuserGridHelper } from './retail-delegateuser-grid/retail-delegateuser-grid.helper';
import { DelegateinitialControlComponent } from './delegateinitial-control/delegateinitial-control.component';
import { RetailDelegateuserreqFormComponent } from './retail-delegateuserreq-form/retail-delegateuserreq-form.component';
import { DelegateuserreqService } from './delegateuserreq-service/delegateuserreq.service';
import { RetailDelegateuserreqFormHelper } from './retail-delegateuserreq-form/retail-delegateuserreq-form.helper';
import { DelegateNameControlComponent } from './delegate-name-control/delegate-name-control.component';
import { RetailTransactionManagementForm } from '../transaction-management/retail-transaction-management-form/retail-transaction-management-form.component';
import { RetailWorkflowqueueRoGridComponent } from './retail-workflowqueue-ro-grid/retail-workflowqueue-ro-grid.component';
import { WorkflowqService } from './workflowq-service/workflowq.service';
import { AddDelegatesIntroComponentHelper } from './add-delegates-intro/add-delegates-intro.helper';
import { RetailUserccrestrictionreqInputGridComponent } from './retail-usercasarestrictionreq-input-grid/retail-usercasarestrictionreq-input-grid.component';
import { RetailUserccrestrictionreqInputGridHelper } from './retail-usercasarestrictionreq-input-grid/retail-usercasarestrictionreq-input-grid.helper';
import { AccountnicknameService } from '../accounts/accountnickname-service/accountnickname.service';
import { CasaaccountService } from '../foundation/casaaccount-service/casaaccount.service';

const smbComponents = [
  AddDelegatesIntroComponent,
  SmbDelegatesHomeComponent,
  RetailUserrestrictionreqFormComponent,
  RetailUsercasarestrictionreqFormComponent,
  RetailUserdeprestrictionreqFormComponent,
  RetailUserloanrestrictionreqFormComponent,
  RetailUserccrestrictionreqFormComponent,
  RetailUserdcrestrictionreqFormComponent,
  RetailUserpcrestrictionreqFormComponent,
  AccessLevelControlComponent,
  CardReferenceControlComponent,
  AccNumberDelegateControlComponent,
  RetailSetpermissionsFormComponent,
  DelegateUsernameControlComponent,
  AccountRestrictionControlComponent,
  SmbConfirmationReceiptFormComponent,
  RetailDelegateuserGridComponent,
  DelegateinitialControlComponent,
  RetailDelegateuserreqFormComponent,
  DelegateNameControlComponent,
  RetailWorkflowqueueRoGridComponent,
  RetailTransactionManagementForm,
  RetailUserccrestrictionreqInputGridComponent
]

@NgModule({
  declarations: [
    ...smbComponents
  ],
  providers:[
    UserrestrictionreqService,
    UsercasarestrictionreqService,
    UserdeprestrictionreqService,
    UserloanrestrictionreqService,
    UserccrestrictionreqService,
    UserdcrestrictionreqService,
    UserpcrestrictionreqService,
    AccessLevelControlService,
    CustomerValidatorService,
    DelegateuserService,
    DelegateuserreqService,
    WorkflowqService,
    AccountnicknameService,
    CasaaccountService
  ],
  imports: [
    CommonModule,
    SmbRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    TranslateModule,
    MaterialModule,
    FoundationModule
  ],
  exports: [
    ...smbComponents
  ]
})
export class SmbModule { }
