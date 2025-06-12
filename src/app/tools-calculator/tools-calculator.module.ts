import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsCalculatorRoutingModule } from './tools-calculator-routing.module';
import { RetailDepositCalculatorFormComponent } from './retail-deposit-calculator-form/retail-deposit-calculator-form.component';
import { FoundationModule } from '../foundation/foundation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@dep/core';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { DepositsModule } from '../deposits/deposits.module';
import { LoansModule } from '../loans/loans.module';
import { RetailDepositCalculatorFormHelper } from './retail-deposit-calculator-form/retail-deposit-calculator-form.helper';
import { DepositCalculatorService } from './depositCalculator-service/depositCalculator.service';
import { RetailLoanCalcFormComponent } from './retail-loancalc-form/retail-loancalc-form.component';
import { LoancalcService } from './loancalc-service/loancalc.service';
import { ExistingFacilityListControlComponent } from './existing-facility-list-control/existing-facility-list-control.component';
import { ExistingfacilityService } from './existingfacility-service/existingfacility.service';
import { RetailLoanCalcFormHelper } from './retail-loancalc-form/retail-loancalc-form.helper';
import { LoanProductsListControlComponent } from './loan-products-list-control/loan-products-list-control.component';
import { LoanproductsService } from './loanproducts-service/loanproducts.service';
import { RetailLoanRepaymentScheduleROGridComponent } from '../loans/retail-loan-repayment-schedule-ro-grid/retail-loan-repayment-schedule-ro-grid.component';
import { tenureSliderControlComponent } from './tenure-slider-control/tenure-slider-control.component';
import { LoanAmountSliderControlComponent } from './loan-amount-slider-control/loan-amount-slider-control.component';
import { loansBreakupChartComponent } from './loans-breakup-chart/loans-breakup-chart.component';
import { RetailloansBreakupFormComponent } from './loans-breakup/loans-breakup.component';
import { RetailLoansBreakupFormHelper } from './loans-breakup/loans-breakup.helper';
import { loansBreakupChartHelper } from './loans-breakup-chart/loans-breakup-chart.helper';
import { depositInterestPayFrequencyComponent } from './deposit-interest-pay-frequency/deposit-interest-pay-frequency.component';
import { DepositInterestPayFrequencyService } from './depositInterestPayFrequency-service/depositInterestPayFrequency.service';
import { RetailDepositBreakupFormComponent } from './deposit-breakup/deposit-breakup.component';
import { depositBreakupChartComponent } from './deposit-breakup-chart/deposit-breakup-chart.component';
import { depositBreakupChartHelper } from './deposit-breakup-chart/deposit-breakup-chart.helper';
import { RetailDepositBreakupFormHelper } from './deposit-breakup/deposit-breakup.helper';
import { FpxCircularProgressComponent } from './fpx-circular-progress/fpx-circular-progress.component';
import { loanrepaymentscheduleHelper } from './retail-loanrepayment-schedule-form/retail-loanrepayment-schedule-form.helper';
import { loanrepaymentscheduleComponent } from './retail-loanrepayment-schedule-form/retail-loanrepayment-schedule-form.component';
import { LoanrepaymentscheduleService } from './loanrepaymentschedule-service/loanrepaymentschedule.service';
import { RetailLoanRepaymentscheduleCalcRoHelper } from './retailLoanRepaymentCalcRo/retail-loan-repaymentschedule-calc-ro.helper';
import { RetailLoanRepaymentscheduleCalcRoComponent } from './retailLoanRepaymentCalcRo/retail-loan-repaymentschedule-calc-ro.component';
import { ConfirmationReceiptFormComponent } from './confirmation-receipt-form/confirmation-receipt-form.component';
import { ToolsHomeComponent } from './tools-home/tools-home.component';


@NgModule({
  declarations: [
    RetailDepositCalculatorFormComponent,
    RetailLoanCalcFormComponent,
    ExistingFacilityListControlComponent,
    LoanProductsListControlComponent,
    tenureSliderControlComponent,
    LoanAmountSliderControlComponent,
    loansBreakupChartComponent,
    RetailloansBreakupFormComponent,
    depositInterestPayFrequencyComponent,
    RetailDepositBreakupFormComponent,
    depositBreakupChartComponent,
    FpxCircularProgressComponent,
    loanrepaymentscheduleComponent,
    RetailLoanRepaymentscheduleCalcRoComponent,
    ConfirmationReceiptFormComponent,
    ToolsHomeComponent
  ],
  imports: [
    CommonModule,
    ToolsCalculatorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    TranslateModule,
    FoundationModule,
    MaterialModule,
    DepositsModule,
    LoansModule
  ],
  providers:[
    RetailDepositCalculatorFormHelper,
    depositBreakupChartHelper,
    RetailDepositBreakupFormHelper,
    RetailLoanCalcFormHelper,
    DepositCalculatorService,
    LoancalcService,
    ExistingfacilityService,
    LoanproductsService,
    RetailLoansBreakupFormHelper,
    loansBreakupChartHelper,
    DepositInterestPayFrequencyService,
    loanrepaymentscheduleHelper,
    LoanrepaymentscheduleService,
    RetailLoanRepaymentscheduleCalcRoHelper
  ],
  exports:[
    depositInterestPayFrequencyComponent,
    ConfirmationReceiptFormComponent
  ]
})
export class ToolsCalculatorModule { }
