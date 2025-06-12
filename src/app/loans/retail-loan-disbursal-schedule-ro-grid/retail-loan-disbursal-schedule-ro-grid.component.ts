import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailLoanDisbursalScheduleROGridHelper } from './retail-loan-disbursal-schedule-ro-grid.helper';
import { LoandisbursalscheduleService } from '../loandisbursalschedule-service/loandisbursalschedule.service';
import { Loandisbursalschedule } from '../loandisbursalschedule-service/loandisbursalschedule.model';

@Component({
 selector: 'app-retail-loan-disbursal-schedule-ro-grid',
  templateUrl: './retail-loan-disbursal-schedule-ro-grid.component.html',
  styleUrls: ['./retail-loan-disbursal-schedule-ro-grid.component.scss'],
   providers : [ RetailLoanDisbursalScheduleROGridHelper]
 })
export class RetailLoanDisbursalScheduleROGridComponent extends BaseFpxROGridComponent< Loandisbursalschedule, RetailLoanDisbursalScheduleROGridHelper> {
 constructor(
    protected retailLoanDisbursalScheduleROGridHelper: RetailLoanDisbursalScheduleROGridHelper,
    protected loandisbursalscheduleService: LoandisbursalscheduleService
  ) {
    super(retailLoanDisbursalScheduleROGridHelper);
  }
                                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailLoanDisbursalScheduleROGrid.disbursalId.label','RetailLoanDisbursalScheduleROGrid.disbursalTo.label','RetailLoanDisbursalScheduleROGrid.disbursalAmount.label','RetailLoanDisbursalScheduleROGrid.accountNumber.label','RetailLoanDisbursalScheduleROGrid.disbursalType.label','RetailLoanDisbursalScheduleROGrid.paymentMode.label']);
    this.setGridIdentifiers(['SELECT','disbursalId','disbursalTo','disbursalAmount','accountNumber','disbursalType','paymentMode']);
    this.setGridColumnTypes(['Checkbox','String','String','String','String','String','String']);
    this.addGridDataService(this.loandisbursalscheduleService);
    this.setGridTitle('RetailLoanDisbursalScheduleROGrid.title');
  }
}
