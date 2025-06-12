import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FbRoutingModule } from './fb-routing.module';
import { MemberCardComponent } from './member-card/member-card.component';
import { MemberCardCarouselComponent } from './member-card-carousel/member-card-carousel.component';
import { PendingChoresComponent } from './pending-chores/pending-chores.component';
import { MembersSpendingOverviewComponent } from './members-spending-overview/members-spending-overview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, ThirdPartyModule } from '@dep/core';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { FoundationModule } from '../foundation/foundation.module';
import { MemberGoalsComponent } from './member-goals/member-goals.component';
import { DepChartsModule } from '../dep/charts/dep-charts.module';
import { PfmModule } from '../pfm/pfm.module';
import { MemberExpenseDonutChartComponent } from './member-expense-donut-chart/member-expense-donut-chart.component';
import { FbQuickActionsComponent } from './fb-quick-actions/fb-quick-actions.component';
import { MemberSpendingChartComponent } from './member-spending-chart/member-spending-chart.component';
import { MemberNextAllowanceComponent } from './member-next-allowance/member-next-allowance.component';
import { MemberNextAllowanceRoGridComponent } from './member-next-allowance-ro-grid/member-next-allowance-ro-grid.component';
import { TooltipComponent } from './tooltip/tooltip.component';
 import { TooltipDirective } from './tooltip.directive';
import { FbChildrenHomeComponent } from './fb-children-home/fb-children-home.component';
import { PendingChoresCarouselComponent } from './pending-chores-carousel/pending-chores-carousel.component';
import { addChildAccountComponent } from './addChildAccount/add-child-account.component';
import { childsOfficialIdComponent } from './childsOfficialId/childs-official-id.component';
import { configAccountDetailsComponent } from './configAccountDetails/config-account-details.component';
import { ChildlogService } from './childlog-service/childlog.service';
import { ChildreqaccountdtlService } from './childreqaccountdtl-service/childreqaccountdtl.service';
import { ChildreqdocdtlService } from './childreqdocdtl-service/childreqdocdtl.service';
import { MemberExpenseCategorizationtionComponent } from './member-expense-categorizationtion/member-expense-categorizationtion.component';
import { MemberPendingChoresComponent } from './member-pending-chores/member-pending-chores.component';
  import { ChilderGoalSummaryCarouselComponent } from './childer-goal-summary-carousel/childer-goal-summary-carousel.component';
import { childreqnotificationComponent } from './childreqnotification/child-req-notification.component';
import { notificationprefComponent } from './notificationpref/notification-pref.component';
import { childreqnotificationHelper } from './childreqnotification/child-req-notification.helper';
import { NotificationprefService } from './notificationpref-service/notificationpref.service';
import { notificationprefHelper } from './notificationpref/notification-pref.helper';
import { FbHomeComponent } from './fb-home/fb-home.component';
import { MemberExpenseCategorizationtionCarouselComponent } from './member-expense-categorizationtion-carousel/member-expense-categorizationtion-carousel.component';
import { MemberExpenseComparisonComponent } from './member-expense-comparison/member-expense-comparison.component';
import { DebitAccNoComponent } from './debit-acc-number/debit-acc-number.component';
import { RetailAddGoalComponent } from './retail-add-goal/retail-add-goal.component';
import { GoalNameFormControlComponent } from './goal-name-form-control/goal-name-form-control.component';
import { GoallogService } from './goallog-service/goallog.service';
import { DebitAccNoService } from '../accounts/debitAccNo-service/debitAccNo.service';
import { childDetailsComponent } from './childDetails/child-details.component';
import { childDetailsHelper } from './childDetails/child-details.helper';
import { PaymentsettingService } from './paymentsetting-service/paymentsetting.service';
import { paymentsettingComponent } from './paymentsetting/payment-setting.component';
import { paymentsettingHelper } from './paymentsetting/payment-setting.helper';
import { RetailFamilyPaymentFormComponent } from './retail-family-payment-form/retail-family-payment-form.component';
import { FamilypaymentService } from './familypayment-service/familypayment.service';
import { SchfamilypaymentreqService } from './schfamilypaymentreq-service/schfamilypaymentreq.service';
import { PaymentpurposeService } from './paymentpurpose-service/paymentpurpose.service';
import { PaymentPurposeListControlComponent } from './payment-purpose-list-control/payment-purpose-list-control.component';
import { TransfersModule } from '../transfers/transfers.module';
import { SchfamilypaymentService } from './schfamilypayment-service/schfamilypayment.service';
import { RetailFbScheduleTransferHandlerComponent } from './retail-fb-schedule-handler-form/retail-fb-schedule-handler-form.component';
import { TasklogService } from './tasklog-service/tasklog.service';
import { RetailAddTaskFromComponent } from './retail-add-task-form/reatail-add-task-form.component';
import { AccountRestrictionControlComponent } from './account-restriction-control/account-restriction-control.component';
import { ClosureRemarksControlComponent } from './closure-remarks-control/closure-remarks-control.component';
import { TaskNameControlComponent } from './task-name-control/task-name-control.component';
import { FbConfirmationReceiptFormComponent } from './fb-confirmation-receipt-form/fb-confirmation-receipt-form.component';
import { noOfInstallmentsComponent } from './noOfInstallments/no-of-installments.component';
import { virtualCardOptionsControlComponent } from './virtual-card-options-control/virtual-card-options-control.component';
import { virtualCardOptionsControlHelper } from './virtual-card-options-control/virtual-card-options-control.helper';
import { MemberViewGoalsComponent } from './member-view-goals/member-view-goals.component';
 import { TempScheduleRepService } from './tempScheduleRep-service/tempScheduleRep.service';
import { MemberChoresSummaryComponent } from './member-chores-summary/member-chores-summary.component';
import { ManageMemberAllowanceComponent } from './manage-member-allowance/manage-member-allowance.component';
 import { FbMemberGoalsRoGridComponent } from './fb-member-goals-ro-grid/fb-member-goals-ro-grid.component';
 
import { FbScheduleFormComponent } from './fb-schedule-form/fb-schedule-form.component';
import { FbSchedulePaymentsRoGridComponent } from './fb-schedule-payments-ro-grid/fb-schedule-payments-ro-grid.component';
import { ChildaccountService } from './childaccount-service/childaccount.service';
import { childreqdocdtlComponent } from './childreqdocdtl/childreqdocdtl.component';
import { childreqdocdtlHelper } from './childreqdocdtl/childreqdocdtl.helper';
import { childaccountFormComponent } from './retail-child-account-control/retail-child-account-control.component';
import { FbSummaryService } from './fb-summary-service/fb-summary.service';
import { FbgoalserviceService } from './fb-goal-service/fbgoalservice.service';
 import { FbMemberChoresRoGridComponent } from './fb-member-chores-ro-grid/fb-member-chores-ro-grid.component';
import { FbchoresdetailsService } from './fb-chores-service/fbchoresdetails.service';
import { GoalsDropDownListControlComponent } from './goals-dropdown-list-control/goals-dropdown-list-control.component';
import { GoalsService } from './goals-service/goals.service';
import { TasksService } from './tasks-service/tasks.service';
import { MemberGoalViewDetailsComponent } from './member-goal-view-details/member-goal-view-details.component';
import { RetailChildAccountListControlComponent } from './retail-child-account-list-control/retail-child-account-list-control.component';
import { MemberViewChoresComponent } from './member-view-chores/member-view-chores.component';
 

const FB_COMPONENTS = [
  MemberCardComponent,
  MemberCardCarouselComponent,
  PendingChoresComponent,
  MembersSpendingOverviewComponent,
  MemberGoalsComponent,
   MemberExpenseDonutChartComponent,
   FbQuickActionsComponent,
   MemberSpendingChartComponent,
   MemberNextAllowanceComponent,
   MemberNextAllowanceRoGridComponent,
   TooltipComponent,
   FbChildrenHomeComponent,
   PendingChoresCarouselComponent,
   childsOfficialIdComponent,
   addChildAccountComponent,
   configAccountDetailsComponent,
   MemberExpenseCategorizationtionComponent,
   MemberPendingChoresComponent,
   ChilderGoalSummaryCarouselComponent,
   childreqnotificationComponent,
   notificationprefComponent,
   MemberExpenseCategorizationtionCarouselComponent,
   MemberExpenseComparisonComponent,
   FbHomeComponent,
   DebitAccNoComponent,
   GoalNameFormControlComponent,
   RetailAddGoalComponent,
   childDetailsComponent,
   paymentsettingComponent,
   RetailFamilyPaymentFormComponent,
   PaymentPurposeListControlComponent,
   RetailFbScheduleTransferHandlerComponent,
   RetailAddTaskFromComponent,
   AccountRestrictionControlComponent,
   ClosureRemarksControlComponent,
   TaskNameControlComponent,
   FbConfirmationReceiptFormComponent,
   noOfInstallmentsComponent,
   virtualCardOptionsControlComponent,
MemberViewGoalsComponent,
   MemberChoresSummaryComponent,
   ManageMemberAllowanceComponent,
   FbMemberGoalsRoGridComponent,
   childaccountFormComponent,
   FbScheduleFormComponent,
   FbSchedulePaymentsRoGridComponent,
    FbMemberChoresRoGridComponent,
   GoalsDropDownListControlComponent,
   MemberGoalViewDetailsComponent,
   childreqdocdtlComponent,
    
   RetailChildAccountListControlComponent,
MemberViewChoresComponent
 ]

@NgModule({
  declarations: [
    ...FB_COMPONENTS,
     ],
  imports: [
    CommonModule,
    FbRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    FpxCoreModule,
    ThirdPartyModule,
    FoundationModule,
    DepChartsModule,
    PfmModule,
    TransfersModule
  ],
  providers:[
    ChildreqdocdtlService,
    ChildlogService,
    ChildreqaccountdtlService,
    childreqnotificationHelper,
    NotificationprefService,
    notificationprefHelper,
    DebitAccNoService,
    GoallogService,
    childDetailsHelper,
    paymentsettingHelper,
    PaymentsettingService,
    FamilypaymentService,
    PaymentpurposeService,
    SchfamilypaymentreqService,
    SchfamilypaymentService,
    TasklogService,
    virtualCardOptionsControlHelper,
    TempScheduleRepService,
    ChildaccountService,
    FbSummaryService,
    FbgoalserviceService ,
    FbchoresdetailsService,
    GoalsService,
    TasksService,
    childreqdocdtlHelper 
   
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ...FB_COMPONENTS
  ]
})
export class FbModule { }
