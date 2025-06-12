import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailLoanRepaymentscheduleCalcRoHelper } from './retail-loan-repaymentschedule-calc-ro.helper';
import { LoanrepaymentscheduleService } from '../loanrepaymentschedule-service/loanrepaymentschedule.service';
import { Loanrepaymentschedule } from '../loanrepaymentschedule-service/loanrepaymentschedule.model';

@Component({
 selector: 'app-retail-loan-repaymentschedule-calc-ro',
  templateUrl: './retail-loan-repaymentschedule-calc-ro.component.html',
  styleUrls: ['./retail-loan-repaymentschedule-calc-ro.component.scss'],
   providers : [ RetailLoanRepaymentscheduleCalcRoHelper]
 })
export class RetailLoanRepaymentscheduleCalcRoComponent extends BaseFpxROGridComponent< Loanrepaymentschedule, RetailLoanRepaymentscheduleCalcRoHelper> {
 constructor(
    protected retailLoanRepaymentscheduleCalcRoHelper: RetailLoanRepaymentscheduleCalcRoHelper,
    protected loanrepaymentscheduleService: LoanrepaymentscheduleService
  ) {
    super(retailLoanRepaymentscheduleCalcRoHelper);
  }
                                                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailLoanRepaymentscheduleCalcRo.repaymentDate.label','RetailLoanRepaymentscheduleCalcRo.interestRate.label','RetailLoanRepaymentscheduleCalcRo.serialNo.label','RetailLoanRepaymentscheduleCalcRo.principalOutstandingAmount.label','RetailLoanRepaymentscheduleCalcRo.installmentAmount.label','RetailLoanRepaymentscheduleCalcRo.loanAmount.label','RetailLoanRepaymentscheduleCalcRo.interestAmount.label']);
    this.setGridIdentifiers(['SELECT','repaymentDate','interestRate','serialNo','principalOutstandingAmount','installmentAmount','loanAmount','interestAmount']);
    this.setGridColumnTypes(['Checkbox','String','String','String','String','String','String','String']);
    // this.addGridDataService(this.loanrepaymentscheduleService);
    this.setGridTitle('RetailLoanRepaymentscheduleCalcRo.title');
  }
}
