import { NgModule } from '@angular/core';

import { RetailServiceRequestTrackerFormComponent } from './retail-service-request-tracker-form/retail-service-request-tracker-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ServiceRequestAttachmentFormComponent } from './service-request-attachment/service-request-attachment.component';
import { MaterialModule } from '@dep/core';
import { MessageControlComponent } from './message-control/message-control.component';
import { ServicerequestattachmentService } from './servicerequestattachment-service/servicerequestattachment.service';
import { ServicerequestadhocService } from './servicerequestadhoc-service/servicerequestadhoc.service';
import { workflowHistoryService } from './workflow-history-service/workflow-history.service';
import { ServicerequestlogService } from './servicerequestlog-service/servicerequestlog.service';
import { FormonthService } from './formonth-service/formonth.service';
import { LovService } from './lov-service/lov.service';




@NgModule({
    declarations: [
        RetailServiceRequestTrackerFormComponent,
        ServiceRequestAttachmentFormComponent,
        MessageControlComponent
    ],
    providers: [
        workflowHistoryService,
        ServicerequestadhocService,
        ServicerequestattachmentService,
        ServicerequestlogService,
        FormonthService,
        LovService,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        FpxCoreModule,
        CommonModule,
    ],
    exports: [
        RetailServiceRequestTrackerFormComponent,
        ServiceRequestAttachmentFormComponent,
        MessageControlComponent
    ]
})
export class SharedServiceRequestModule { }
