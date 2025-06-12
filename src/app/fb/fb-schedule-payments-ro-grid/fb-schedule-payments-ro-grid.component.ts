import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
 import { TempScheduleRepService } from '../tempScheduleRep-service/tempScheduleRep.service';
import { TempScheduleRep } from '../tempScheduleRep-service/tempScheduleRep.model';
import { FbSchedulePaymentsRoGridHelper } from './fb-schedule-payments-ro-grid.helper';


@Component({
  selector: 'app-fb-schedule-payments-ro-grid',
  templateUrl: './fb-schedule-payments-ro-grid.component.html',
  styleUrls: ['./fb-schedule-payments-ro-grid.component.scss'],
  providers: [FbSchedulePaymentsRoGridHelper]
})
export class FbSchedulePaymentsRoGridComponent extends BaseFpxROGridComponent<TempScheduleRep, FbSchedulePaymentsRoGridHelper> {
  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;

  private observer: any;

  constructor(
    protected retailSchedulePaymentsRoGridHelper: FbSchedulePaymentsRoGridHelper,
    protected schedulerepService: TempScheduleRepService
  ) {
    super(retailSchedulePaymentsRoGridHelper);
  }

  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT', 'RetailSchedulePaymentsRoGrid.serviceCode.label', 'RetailSchedulePaymentsRoGrid.scheduleType.label', 'RetailSchedulePaymentsRoGrid.paymentAmount.label', 'RetailSchedulePaymentsRoGrid.sourceAccount.label', 'RetailSchedulePaymentsRoGrid.creditAccountNumber.label', 'RetailSchedulePaymentsRoGrid.beneficiaryName.label', 'RetailSchedulePaymentsRoGrid.nextPaymentDate.label', 'RetailSchedulePaymentsRoGrid.paymentFrequency.label', 'RetailSchedulePaymentsRoGrid.numberOfPayments.label', 'RetailSchedulePaymentsRoGrid.paymentStatus.label', 'RetailSchedulePaymentsRoGrid.paymentDate.label', 'RetailSchedulePaymentsRoGrid.paymentId.label']);
    this.setGridIdentifiers([]);
    this.setGridColumnTypes([]);
    this.addGridDataService(this.schedulerepService);
    this.setGridTitle('RetailSchedulePaymentsRoGrid.title');
  }

  protected override doPostInit(): void {
    this.observer = new IntersectionObserver(entries => {
      var entry = entries[0];
      if (entry.isIntersecting && !this.fpxRoGrid?.loading) {
        this._helper.loadMore();
      }
    }, {
      rootMargin: '0px',
      threshold: 0.9
    });

    this.observer.observe(this.loadMore.nativeElement);
  }

}
