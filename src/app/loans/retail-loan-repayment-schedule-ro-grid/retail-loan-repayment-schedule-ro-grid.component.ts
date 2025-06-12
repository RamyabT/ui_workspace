import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailLoanRepaymentScheduleROGridHelper } from '../../loans/retail-loan-repayment-schedule-ro-grid/retail-loan-repayment-schedule-ro-grid.helper';
import { LoanrepaymentscheduleService } from '../../loans/loanrepaymentschedule-service/loanrepaymentschedule.service';
import { Loanrepaymentschedule } from '../../loans/loanrepaymentschedule-service/loanrepaymentschedule.model';

@Component({
 selector: 'app-retail-loan-repayment-schedule-ro-grid',
  templateUrl: './retail-loan-repayment-schedule-ro-grid.component.html',
  styleUrls: ['./retail-loan-repayment-schedule-ro-grid.component.scss'],
   providers : [ RetailLoanRepaymentScheduleROGridHelper]
 })
export class RetailLoanRepaymentScheduleROGridComponent extends BaseFpxROGridComponent< Loanrepaymentschedule, RetailLoanRepaymentScheduleROGridHelper> {
 constructor(
    protected retailLoanRepaymentScheduleROGridHelper: RetailLoanRepaymentScheduleROGridHelper,
    protected loanrepaymentscheduleService: LoanrepaymentscheduleService
  ) {
    super(retailLoanRepaymentScheduleROGridHelper);
  }
                                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailLoanRepaymentScheduleROGrid.serialNo.label','RetailLoanRepaymentScheduleROGrid.repaymentDate.label','RetailLoanRepaymentScheduleROGrid.loanAmount.label','RetailLoanRepaymentScheduleROGrid.interestAmount.label','RetailLoanRepaymentScheduleROGrid.installmentAmount.label','RetailLoanRepaymentScheduleROGrid.principalOutstandingAmount.label']);
    this.setGridIdentifiers(['SELECT','serialNo','repaymentDate','loanAmount','interestAmount','installmentAmount','principalOutstandingAmount']);
    this.setGridColumnTypes(['Checkbox','String','String','String','String','String','String']);
    this.addGridDataService(this.loanrepaymentscheduleService);
    this.setGridTitle('RetailLoanRepaymentScheduleROGrid.title');
  }
}
