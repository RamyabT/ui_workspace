import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetailViewServiceRequestFormComponent } from './retail-view-service-request-form/retail-view-service-request-form.component';
import { RetailCreateServiceRequestFormComponent } from './retail-create-service-request-form/retail-create-service-request-form.component';
import { RetailServiceRequestTrackerFormComponent } from './retail-service-request-tracker-form/retail-service-request-tracker-form.component';
import { ConfirmationReceiptFormComponent } from './confirmation-receipt-form/confirmation-receipt-form.component';
import { OtherRequestFormComponent } from './other-request-form/other-request-form.component';
import { ServicerequestHomeComponent } from './service-request-home/service-request-home.component';


const routes: Routes = [
  {
    path:'',
    component:ServicerequestHomeComponent,
    data:{
      title:'Service Request'
    }
  },
  {
    path:'view-service-requests',
    component:RetailViewServiceRequestFormComponent,
    data:{
      title:'Service Request'
    }
  },
  {
    path:'create-service-request',
    component:RetailCreateServiceRequestFormComponent,
    data:{
      title:'SER_REQ_TIT.createReq'
    }
  },
  {
    path:'service-request-tracker',
    component:RetailServiceRequestTrackerFormComponent,
    data:{
      title:'SER_REQ_TIT.reqTracker'
    }
  },
  {
    path:'confirmation-receipt',
    component:ConfirmationReceiptFormComponent,
    data:{
      title:'confirmationReceiptForm.title'
    }
  },
  {
    path: 'other-request',
    component: OtherRequestFormComponent,
    data: {
      title: 'otherRequestForm.title'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRequestRoutingModule { }
