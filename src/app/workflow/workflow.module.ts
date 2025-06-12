import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowRoutingModule } from './workflow-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { WorkflowHomeComponent } from './workflow-home/workflow-home.component';
import { MaterialModule } from '@dep/core';
import { FoundationModule } from '../foundation/foundation.module';
import { AccountnicknameService } from '../accounts/accountnickname-service/accountnickname.service';
import { CasaaccountService } from '../foundation/casaaccount-service/casaaccount.service';
import { WfConfirmationReceiptFormComponent } from './wf-confirmation-receipt-form/wf-confirmation-receipt-form.component';

const workflowComponents = [
  WorkflowHomeComponent,
  WfConfirmationReceiptFormComponent
]

@NgModule({
  declarations: [
    ...workflowComponents
  ],
  providers:[
    AccountnicknameService,
    CasaaccountService
  ],
  imports: [
    CommonModule,
    WorkflowRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    TranslateModule,
    MaterialModule,
    FoundationModule
  ],
  exports: [
    ...workflowComponents
  ]
})
export class WorkflowModule { }
