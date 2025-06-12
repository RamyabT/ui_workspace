import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import { RetailSchedulePaymentsRoGridHelper } from './retail-schedule-payments-ro-grid.helper';
import { TempScheduleRepService } from '../tempScheduleRep-service/tempScheduleRep.service';
import { TempScheduleRep } from '../tempScheduleRep-service/tempScheduleRep.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-retail-schedule-payments-ro-grid',
  templateUrl: './retail-schedule-payments-ro-grid.component.html',
  styleUrls: ['./retail-schedule-payments-ro-grid.component.scss'],
  providers: [RetailSchedulePaymentsRoGridHelper]
})
export class RetailSchedulePaymentsRoGridComponent extends BaseFpxROGridComponent<TempScheduleRep, RetailSchedulePaymentsRoGridHelper> {
  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;

  private observer: any;

  constructor(
    protected retailSchedulePaymentsRoGridHelper: RetailSchedulePaymentsRoGridHelper,
    private router: Router,
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
    if (this.router.url.includes('view-scheduled-transfers')) {
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

}
