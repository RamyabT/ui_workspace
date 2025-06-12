import { Component, OnInit } from '@angular/core';
import { UpcomingPaymentsDashbordRoGridHelper } from './upcoming-payments-dashboard-ro-grid.helper';
import { BaseFpxROGridComponent } from '@fpx/core';
import { UpcomingPaymentsService } from '../upcomingpayments-service/upcoming-payments.service';
import { UpcomingbillService } from 'src/app/payments/upcomingbill-service/upcomingbill.service';

@Component({
  selector: 'app-upcoming-payments-dashboard-ro-grid',
  templateUrl: './upcoming-payments-dashboard-ro-grid.component.html',
  styleUrls: ['./upcoming-payments-dashboard-ro-grid.component.scss'],
  providers: [UpcomingPaymentsDashbordRoGridHelper, UpcomingPaymentsService, UpcomingbillService]
})
export class UpcomingPaymentsDashboardRoGridComponent extends BaseFpxROGridComponent<any, UpcomingPaymentsDashbordRoGridHelper> {

  constructor(
    private _upcomingPaymentsDashboardHelper: UpcomingPaymentsDashbordRoGridHelper,
    private _upcomingPaymentsService: UpcomingPaymentsService,
    private _upcomingBillServivce: UpcomingbillService
  ) { 
    super(_upcomingPaymentsDashboardHelper);
  }

  protected override doPreInit(): void {
    this.setGridHeaders([]);
    this.setGridIdentifiers([]);
    this.setGridColumnTypes([]);
    this.addGridDataService(this._upcomingBillServivce);
    this.setGridTitle('');
  }

}
