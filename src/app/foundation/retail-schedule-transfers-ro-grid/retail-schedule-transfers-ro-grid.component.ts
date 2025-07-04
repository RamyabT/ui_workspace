import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import { RetailScheduleTransfersRoGridHelper } from './retail-schedule-transfers-ro-grid.helper';
import { TempScheduleRep } from 'src/app/transfers/tempScheduleRep-service/tempScheduleRep.model';
import { TempScheduleRepService } from 'src/app/transfers/tempScheduleRep-service/tempScheduleRep.service';

@Component({
  selector: 'app-retail-schedule-transfers-ro-grid',
  templateUrl: './retail-schedule-transfers-ro-grid.component.html',
  styleUrls: ['./retail-schedule-transfers-ro-grid.component.scss'],
  providers: [RetailScheduleTransfersRoGridHelper]
})
export class RetailScheduleTransfersRoGridComponent extends BaseFpxROGridComponent<TempScheduleRep, RetailScheduleTransfersRoGridHelper> {
  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;

  private observer: any;

  constructor(
    protected retailScheduleTransfersRoGridHelper: RetailScheduleTransfersRoGridHelper,
    protected schedulerepService: TempScheduleRepService
  ) {
    super(retailScheduleTransfersRoGridHelper);
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
