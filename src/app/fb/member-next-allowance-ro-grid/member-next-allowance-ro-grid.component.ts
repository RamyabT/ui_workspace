
import { Component, OnInit } from '@angular/core';
 import { BaseFpxROGridComponent } from '@fpx/core';
 import { UpcomingbillService } from 'src/app/payments/upcomingbill-service/upcomingbill.service';
import { MemberNextAllowanceRoGridHelper } from './member-next-allowance-ro-grid.helper';
import { UpcomingPaymentsService } from 'src/app/pfm/upcomingpayments-service/upcoming-payments.service';
import { TempScheduleRepService } from '../tempScheduleRep-service/tempScheduleRep.service';

@Component({
  selector: 'app-member-next-allowance-ro-grid',
  templateUrl: './member-next-allowance-ro-grid.component.html',
  styleUrls: ['./member-next-allowance-ro-grid.component.scss'],
  providers: [MemberNextAllowanceRoGridHelper, UpcomingPaymentsService, UpcomingbillService]
})
export class MemberNextAllowanceRoGridComponent extends BaseFpxROGridComponent<any, MemberNextAllowanceRoGridHelper> {

  constructor(
    private _memberNextAllowanceHelper: MemberNextAllowanceRoGridHelper,
    private _upcomingPaymentsService: UpcomingPaymentsService,
    private _upcomingBillServivce: TempScheduleRepService
  ) { 
    super(_memberNextAllowanceHelper);
  }

  protected override doPreInit(): void {
    this.setGridHeaders([]);
    this.setGridIdentifiers([]);
    this.setGridColumnTypes([]);
    this.addGridDataService(this._upcomingBillServivce);
    this.setGridTitle('');
  }

}
