import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkflowHomeComponent } from './workflow-home/workflow-home.component';
import { WfConfirmationReceiptFormComponent } from './wf-confirmation-receipt-form/wf-confirmation-receipt-form.component';

const routes: Routes = [
  {
    path: '',
    component: WorkflowHomeComponent,
    children: [
      {
        path: "foundation",
        loadChildren: () => import("../foundation/foundation.module").then((m) => m.FoundationModule),
        data: { headerRequired: false, footerMenuRequired: false },
      },
      {
        path: "transfers",
        loadChildren: () =>
          import("../transfers/transfers.module").then((m) => m.TransfersModule),
        data: {
          module: "transfers",
          headerRequired: false,
          footerMenuRequired: false,
        },
      },
      {
        path: "fb",
        loadChildren: () =>
          import("../fb/fb.module").then((m) => m.FbModule),
        data: {
          module: "fb",
          headerRequired: false,
          footerMenuRequired: false,
        },
      },
      {
        path: "insurance",
        loadChildren: () =>
          import("../insurance/insurance.module").then((m) => m.InsuranceModule),
        data: {
          module: "insurance",
          headerRequired: false,
          footerMenuRequired: false,
        },
      },
    ]
  },
  {
    path: "wf-confirmation-receipt-form",
    component: WfConfirmationReceiptFormComponent,
    data: { title: "confirmationReceiptForm.title" },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowRoutingModule { }
