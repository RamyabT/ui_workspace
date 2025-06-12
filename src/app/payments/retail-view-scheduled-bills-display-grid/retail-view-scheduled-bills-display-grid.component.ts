import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailViewScheduledBillsDisplayGridHelper } from './retail-view-scheduled-bills-display-grid.helper';
import { ViewscheduledbillsService } from '../viewscheduledbills-service/viewscheduledbills.service';
import { Viewscheduledbills } from '../viewscheduledbills-service/viewscheduledbills.model';

@Component({
 selector: 'app-retail-view-scheduled-bills-display-grid',
  templateUrl: './retail-view-scheduled-bills-display-grid.component.html',
  styleUrls: ['./retail-view-scheduled-bills-display-grid.component.scss'],
   providers : [ RetailViewScheduledBillsDisplayGridHelper]
 })
export class RetailViewScheduledBillsDisplayGridComponent extends BaseFpxROGridComponent< Viewscheduledbills, RetailViewScheduledBillsDisplayGridHelper> {
  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;

  private observer: any;
 constructor(
    protected retailViewScheduledBillsDisplayGridHelper: RetailViewScheduledBillsDisplayGridHelper,
    protected viewscheduledbillsService: ViewscheduledbillsService
  ) {
    super(retailViewScheduledBillsDisplayGridHelper);
  }
                                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['RetailViewScheduledBillsDisplayGrid.paymentDate.label','RetailViewScheduledBillsDisplayGrid.beneficiaryName.label','RetailViewScheduledBillsDisplayGrid.sourceAccount.label','RetailViewScheduledBillsDisplayGrid.paymentAmount.label','RetailViewScheduledBillsDisplayGrid.scheduleType.label','RetailViewScheduledBillsDisplayGrid.operationMode.label']);
    this.setGridIdentifiers(['paymentDate','beneficiaryName','sourceAccount','paymentAmount','scheduleType','operationMode']);
    this.setGridColumnTypes(['String','String','String','String','String','String']);
    this.addGridDataService(this.viewscheduledbillsService);
    this.setGridTitle('RetailViewScheduledBillsDisplayGrid.title');
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
