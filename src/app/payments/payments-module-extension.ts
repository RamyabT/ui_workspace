import { ThirdPartyModule } from "@dep/core"
import { BillsAsideBarComponent } from "../layout/components/bills-aside-bar/bills-aside-bar.component"
import { PaymentsContextualActionsComponent } from "./payments-contextual-actions/payments-contextual-actions.component"
import { BillerSearchListControlComponent } from './biller-search-list-control/biller-search-list-control.component';
import { RetailViewScheduledBillsDisplayGridComponent } from "./retail-view-scheduled-bills-display-grid/retail-view-scheduled-bills-display-grid.component";
import { ViewscheduledbillsService } from "./viewscheduledbills-service/viewscheduledbills.service";
import { MultibillrequestService } from "./multibillrequest-service/multibillrequest.service"
import { RetailMultiBillRequestFormComponent } from "./retail-multi-bill-request-form/retail-multi-bill-request-form.component"
import { RetailMultiBillRequestInputGridComponent } from "./retail-multi-bill-request-input-grid/retail-multi-bill-request-input-grid.component"
import { AccountsModule } from "../accounts/accounts.module"
import { RetailMultiBillRequestReviewGridComponent } from "./retail-multi-bill-request-review-grid/retail-multi-bill-request-review-grid.component"
import { RetailMultiBillReviewFormComponent } from "./retail-multi-bill-review-form/retail-multi-bill-review-form.component"
import { TransfersModule } from "../transfers/transfers.module"
import { RetailViewScheduleBillsFormComponent } from "./retail-view-schedule-bills-form/retail-view-schedule-bills-form.component";
import { RetailScheduleBillPaymentsFormComponent } from "./retail-schedule-bill-payments-form/retail-schedule-bill-payments-form.component";
import { SchedulebillpaymentslogService } from "./schedulebillpaymentslog-service/schedulebillpaymentslog.service";
export const BillsExtensionComponents = [
   PaymentsContextualActionsComponent,
   BillerSearchListControlComponent,
   RetailViewScheduledBillsDisplayGridComponent,
   RetailMultiBillRequestFormComponent,
   RetailMultiBillRequestInputGridComponent,
   RetailMultiBillRequestReviewGridComponent,
   RetailMultiBillReviewFormComponent,
   RetailViewScheduleBillsFormComponent,
   RetailScheduleBillPaymentsFormComponent
]

export const paymentsRoutingExtension = [
  {
    path: 'retail-bill-payment',
    component: RetailMultiBillReviewFormComponent,
    data: { title: "RetailMultiBillRequestReviewGrid.title", scrollToBottom: true }
 },
 {
  path: 'view-scheduled-bills-form',
  component: RetailViewScheduleBillsFormComponent,
  data: { title: "RetailViewScheduledBillsDisplayGrid.title" }
},
{
  path: 'retail-schedule-bill-payments-form',
  component: RetailScheduleBillPaymentsFormComponent,
  data: { title: "RetailViewScheduledBillsDisplayGrid.title" }
}
]

 export const BillsExtensionServices = [
  ViewscheduledbillsService,
  MultibillrequestService,
  SchedulebillpaymentslogService

 ]
 export const BillsImportExtension = [
   ThirdPartyModule,
   AccountsModule,
   TransfersModule
 ]
 