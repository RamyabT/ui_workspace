import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRequestRoutingModule } from './service-request-routing.module';
import { RetailViewServiceRequestRoGridComponent } from './retail-view-service-request-ro-grid/retail-view-service-request-ro-grid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { AccountsModule } from '../accounts/accounts.module';
import { MaterialModule } from '../dep/core/material.module';
import { FoundationModule } from '../foundation/foundation.module';
import { RetailViewServiceRequestFormComponent } from './retail-view-service-request-form/retail-view-service-request-form.component';
import { RetailCreateServiceRequestFormComponent } from './retail-create-service-request-form/retail-create-service-request-form.component';
import { ServicerequestadhocService } from './servicerequestadhoc-service/servicerequestadhoc.service';
import { LovService } from './lov-service/lov.service';
import { RequestCategoryListComponent } from './request-category-list/request-category-list.component';
import { RequestSubCategoryListComponent } from './request-sub-category-list/request-sub-category-list.component';
import { SubjectControlComponent } from './Subject-Control/Subject-Control.component';
// import { ServicerequestlogService } from './servicerequestlog-service/servicerequestlog.service';
import { RequestTypeListControlComponent } from './request-type-list-control/request-type-list-control.component';
import { RetailServiceRequestDetailsFormComponent } from './retail-service-request-details-form/retail-service-request-details-form.component';
import { ConfirmationReceiptFormComponent } from './confirmation-receipt-form/confirmation-receipt-form.component';
import { workflowHistoryService } from './workflow-history-service/workflow-history.service';
import { AccStmtReasonControlComponent } from './accStmt-reason-control/accStmt-reason-control.component';
import { TransfersModule } from '../transfers/transfers.module';
import { OtherRequestFormComponent } from './other-request-form/other-request-form.component';
import { FormonthService } from './formonth-service/formonth.service';
import { ServicerequestHomeComponent } from './service-request-home/service-request-home.component';
import { ServicerequestattachmentService } from './servicerequestattachment-service/servicerequestattachment.service';
import { ServiceRequestExtensionComponents, ServiceRequestImportsExtension } from './service-request-extension-module';
import { SharedServiceRequestModule } from './shared-service-request.module';



@NgModule({
  declarations: [
    RetailViewServiceRequestRoGridComponent,
    RetailViewServiceRequestFormComponent,
    RetailCreateServiceRequestFormComponent,
    RequestTypeListControlComponent,
    RequestCategoryListComponent,
    RequestSubCategoryListComponent,
    SubjectControlComponent,
    RetailServiceRequestDetailsFormComponent,
    ConfirmationReceiptFormComponent,
    AccStmtReasonControlComponent,
    OtherRequestFormComponent,
    ServicerequestHomeComponent,
    ...ServiceRequestExtensionComponents
  ],
  providers:[
    // BalanceConfirmationDetailsService
  ],
  imports: [
    CommonModule,
    ServiceRequestRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    MaterialModule,
    AccountsModule,
    FoundationModule,
    TransfersModule,
    SharedServiceRequestModule,
    ...ServiceRequestImportsExtension
  ],
  exports: [
    RetailViewServiceRequestFormComponent,
    RetailViewServiceRequestRoGridComponent,
    RetailCreateServiceRequestFormComponent,
    RequestTypeListControlComponent,
    RequestCategoryListComponent,
    RequestSubCategoryListComponent,
    SubjectControlComponent,
    RetailServiceRequestDetailsFormComponent,
    ConfirmationReceiptFormComponent,
    AccStmtReasonControlComponent,
    OtherRequestFormComponent,
    ServicerequestHomeComponent,
    ...ServiceRequestExtensionComponents
  ]
})
export class ServiceRequestModule { }
