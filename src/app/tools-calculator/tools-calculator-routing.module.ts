import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetailDepositCalculatorFormComponent } from './retail-deposit-calculator-form/retail-deposit-calculator-form.component';
import { RetailLoanCalcFormComponent } from './retail-loancalc-form/retail-loancalc-form.component';
import { loansBreakupChartComponent } from './loans-breakup-chart/loans-breakup-chart.component';
import { RetailloansBreakupFormComponent } from './loans-breakup/loans-breakup.component';
import { RetailDepositBreakupFormComponent } from './deposit-breakup/deposit-breakup.component';
import { loanrepaymentscheduleComponent } from './retail-loanrepayment-schedule-form/retail-loanrepayment-schedule-form.component';
import { ConfirmationReceiptFormComponent } from './confirmation-receipt-form/confirmation-receipt-form.component';
import { ToolsHomeComponent } from './tools-home/tools-home.component';

const routes: Routes = [
  {
    path:'',
    component:ToolsHomeComponent
  },
  {
    path: 'retail-deposit-calculator',
    component: RetailDepositCalculatorFormComponent,
    data: {
      title: 'RetailDepositCalculatorForm.title'
    }
  },
  {
    path: 'retail-loan-calculator',
    component: RetailLoanCalcFormComponent,
    data: { title: 'RetailLoanCalcForm.title' }
 },
 {
  path: 'app-loans-breakup',
  component: RetailloansBreakupFormComponent,
  data: { title: 'RetailLoanCalcChartForm.title' }
},
{
  path: 'retail-deposit-breakup',
  component: RetailDepositBreakupFormComponent,
  data: { title: 'RetailDepositBreakup.title' }
},
{
  path : 'retail-loan-repaymentschedule-calc-ro',
   component : loanrepaymentscheduleComponent,
   data:{title:"RetailLoanRepaymentscheduleCalcRo.title"}
},
{
  path: 'confirmation-receipt',
  component: ConfirmationReceiptFormComponent,
  data: { title: "confirmationReceiptForm.title" }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsCalculatorRoutingModule { }
