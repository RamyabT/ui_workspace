import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PfmRoutingModule } from './pfm-routing.module';
import { CashFlowComponent } from './cash-flow/cash-flow.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, ThirdPartyModule } from '@dep/core';
import { TranslateModule } from '@ngx-translate/core';
import { FpxCoreModule } from '@fpx/core';
import { PfmMonthsListControlComponent } from './pfm-months-list-control/pfm-months-list-control.component';
import { BudgetProductCardComponent } from './budget-product-card/budget-product-card.component';
import { FoundationModule } from '../foundation/foundation.module';
import { PfmSummaryService } from './pfm-summary-service/pfm-summary.service';
import { CaseCategoryControlComponent } from './casecategory-control/casecategory-control.component';
import { CategoryControlComponent } from './Category/transactioncategory.component';
import { ExternalRefNumberControlComponent } from './external-ref-number-control/external-ref-number-control.component';
import { merchantComponent } from './merchant/merchant.component';
import { PaymentDateControlComponent } from './payment-date-control/payment-date-control.component';
import { PfmTransactionsFormComponent } from './pfm-transactions-form/pfm-transactions-form.component';
import { PfmtransactionService } from './pfmtransaction-service/pfmtransaction.service';
import { PfmcategoryListControlComponent } from './pfm-category-list-control/pfm-category-list-control.component';
import { PfmTransactionModifyFormComponent } from './pfm-transaction-modify-form/pfm-transaction-modify-form.component';
import { PfmBudgetModifyFormComponent } from './pfm-budget-modify-form/pfm-budget-modify-form.component';
import { PfmbudgetService } from './pfmbudget-service/pfmbudget.service';
import { BudgetFrequencyControlComponent } from './budget-frequency-control/budget-frequency-control.component';
import { PfmGoalsRequestFormComponent } from './pfm-goals-req-form/pfm-goals-req-form.component';
import { PfmgoalsreqService } from './pfmgoalsreq-service/pfmgoalsreq.service';
import { GoalDurationFormControlComponent } from './goal-duration-form-control/goal-duration-form-control.component';
import { RetailPfmBudgetReqFormComponent } from './retail-pfm-budgetreq-form/retail-pfm-budgetreq-form.component';
import { PfmbudgetreqService } from './pfmbudgetreq-service/pfmbudgetreq.service';
import { PfmSubCategoryListControlComponent } from './pfm-sub-category-list-control/pfm-sub-category-list-control.component';
import { RetailPfmModifyGoalReqFormComponent } from './retail-pfm-modify-goalreq-form/retail-pfm-modify-goalreq-form.component';
import { UpcomingPaymentsDashboardRoGridComponent } from './upcoming-payments-dashboard-ro-grid/upcoming-payments-dashboard-ro-grid.component';
import { widgetModule } from '../widget/widget.module';
import { financeSummaryBoardCarouselComponent } from './finance-summary-board-carousel/finance-summary-board-carousel.component';
import { ExpenseCategoriesDonutChartComponent } from './expense-categories-donut-chart/expense-categories-donut-chart.component';
import { RetailExpenseComparisonRoGridComponent } from './retail-expense-comparison-ro-grid/retail-expense-comparison-ro-grid.component';
import { ExpenseComparisonComponent } from './expense-comparison/expense-comparison.component';
import { ExpenseCategoriesWidgetComponent } from './expense-categories-widget/expense-categories-widget.component';
import { ExpenseCategoriesCarouselComponent } from './expense-categories-carousel/expense-categories-carousel.component';
import { AssetsBreakdownWidgetComponent } from './assets-breakdown-widget/assets-breakdown-widget.component';
import { AssetsBreakdownChartComponent } from './assets-breakdown-chart/assets-breakdown-chart.component';
import { RetailPfmGoalsRoGridComponent } from './retail-pfm-goals-ro-grid/retail-pfm-goals-ro-grid.component';
import { RetailTrackGoalsFormComponent } from './pfm-track-goals-form/pfm-track-goals-form.component';
import { PfmgoalsService } from './pfmgoals-service/pfmgoals.service';
import { RetailPfmTrackBudgetRoGridComponent } from './retail-track-budget-ro-grid/retail-track-budget-ro-grid.component';
import { RetailTrackBudgetFormComponent } from './retail-track-budget-form/retail-track-budget-form.component';
import { DepChartsModule } from '@fpx/charts';
import { UpcomingPaymentsWidgetComponent } from './upcoming-payments-widget/upcoming-payments-widget.component';
import { PfmCategoryListControlComponent } from './pfm-category-list-control/pfm-category.component';
import { retailTrackBudgetService } from './retail-track-budget-service/retail-track-budget.service';
import { ConfirmationReceiptFormComponent } from './confirmation-receipt-form/confirmation-receipt-form.component';
import { PfmTransactionHistoryRoGridComponent } from './pfm-transaction-history-ro-grid/pfm-transaction-history-ro-grid.component';
import { PfmTransactionHistoryFormComponent } from './pfm-transaction-history-form/pfm-transaction-history-form.component';
import { PfmTransactionSummaryCardComponent } from './pfm-transaction-summary-card/pfm-transaction-summary-card.component';
import { CashFlowChartComponent } from './cash-flow-chart/cash-flow-chart.component';
import { PfmHomeComponent } from './pfm-home/pfm-home.component';

const PFM_COMPONENTS = [
  PfmHomeComponent,
  CashFlowComponent,
  BudgetProductCardComponent,
  PfmTransactionsFormComponent,
  CaseCategoryControlComponent,
  CategoryControlComponent,
  ExternalRefNumberControlComponent,
  merchantComponent,
  PaymentDateControlComponent,
  PfmcategoryListControlComponent,
  PfmTransactionModifyFormComponent,
  PfmBudgetModifyFormComponent,
  BudgetFrequencyControlComponent,
  ExpenseCategoriesCarouselComponent,
  ExpenseCategoriesWidgetComponent,
  ExpenseCategoriesDonutChartComponent,
  ExpenseComparisonComponent,
  RetailExpenseComparisonRoGridComponent,
  AssetsBreakdownWidgetComponent,
  AssetsBreakdownChartComponent,
  RetailPfmGoalsRoGridComponent,
  RetailTrackGoalsFormComponent,
  RetailPfmTrackBudgetRoGridComponent,
  RetailTrackBudgetFormComponent,
  UpcomingPaymentsWidgetComponent,
  financeSummaryBoardCarouselComponent,
  PfmMonthsListControlComponent,
  ConfirmationReceiptFormComponent,
  PfmTransactionHistoryRoGridComponent,
  PfmTransactionHistoryFormComponent,
  PfmTransactionSummaryCardComponent,
  CashFlowChartComponent,
  PfmGoalsRequestFormComponent,
  GoalDurationFormControlComponent,
  RetailPfmBudgetReqFormComponent,
  PfmCategoryListControlComponent,
  PfmSubCategoryListControlComponent,
  RetailPfmModifyGoalReqFormComponent,
  BudgetFrequencyControlComponent,
  UpcomingPaymentsDashboardRoGridComponent
]

@NgModule({
  declarations: [
    ...PFM_COMPONENTS
  ],
  providers: [
    PfmSummaryService,
    PfmgoalsreqService,
    PfmbudgetreqService,
    PfmtransactionService,
    PfmgoalsService,
    PfmbudgetService,
    retailTrackBudgetService
  ],
  imports: [
    CommonModule,
    PfmRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    FpxCoreModule,
    ThirdPartyModule,
    FoundationModule,
    widgetModule,
    DepChartsModule
  ],
  exports: [
    ...PFM_COMPONENTS
  ]
})
export class PfmModule { }
