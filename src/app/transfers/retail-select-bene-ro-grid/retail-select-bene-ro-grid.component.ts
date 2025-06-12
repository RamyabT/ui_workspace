import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import { RetailSelectBeneRoGridHelper } from './retail-select-bene-ro-grid.helper';
import { BeneSelectService } from '../beneSelect-service/beneSelect.service';
import { BeneSelect } from '../beneSelect-service/beneSelect.model';


@Component({
 selector: 'app-retail-select-bene-ro-grid',
  templateUrl: './retail-select-bene-ro-grid.component.html',
  styleUrls: ['./retail-select-bene-ro-grid.component.scss'],
   providers : [ RetailSelectBeneRoGridHelper]
 })
export class RetailSelectBeneRoGridComponent extends BaseFpxROGridComponent< BeneSelect, RetailSelectBeneRoGridHelper> {
 constructor(
    protected retailSelectBeneRoGridHelper: RetailSelectBeneRoGridHelper,
    protected beneSelectService: BeneSelectService
  ) {
    super(retailSelectBeneRoGridHelper);
  }
                                                                                                                                                                                             
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailSchedulePaymentsRoGrid.serviceCode.label','RetailSchedulePaymentsRoGrid.scheduleType.label','RetailSchedulePaymentsRoGrid.paymentAmount.label','RetailSchedulePaymentsRoGrid.sourceAccount.label','RetailSchedulePaymentsRoGrid.creditAccountNumber.label','RetailSchedulePaymentsRoGrid.beneficiaryName.label','RetailSchedulePaymentsRoGrid.nextPaymentDate.label','RetailSchedulePaymentsRoGrid.paymentFrequency.label','RetailSchedulePaymentsRoGrid.numberOfPayments.label','RetailSchedulePaymentsRoGrid.paymentStatus.label','RetailSchedulePaymentsRoGrid.paymentDate.label','RetailSchedulePaymentsRoGrid.paymentId.label']);
    this.setGridIdentifiers(['SELECT','serviceCode','scheduleType','paymentAmount','sourceAccount','creditAccountNumber','beneficiaryName','nextPaymentDate','paymentFrequency','numberOfPayments','paymentStatus','paymentDate','paymentId']);
    this.setGridColumnTypes(['Checkbox','String','String','String','String','String','String','String','String','Numeric','String','String','String']);
    // this.addGridDataService(this.beneSelectService);
    // this.setGridTitle('RetailSchedulePaymentsRoGrid.title');
  }
}
