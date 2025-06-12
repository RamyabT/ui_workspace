import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailBillHistoryRoGridHelper } from './retail-bill-history-ro-grid.helper';
import { BillsummaryService } from '../billsummary-service/billsummary.service';
import { Billsummary } from '../billsummary-service/billsummary.model';

@Component({
 selector: 'app-retail-bill-history-ro-grid',
  templateUrl: './retail-bill-history-ro-grid.component.html',
  styleUrls: ['./retail-bill-history-ro-grid.component.scss'],
   providers : [ RetailBillHistoryRoGridHelper]
 })
export class RetailBillHistoryRoGridComponent extends BaseFpxROGridComponent< Billsummary, RetailBillHistoryRoGridHelper> {
  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;

  private observer: any;
 constructor(
    protected retailBillHistoryRoGridHelper: RetailBillHistoryRoGridHelper,
    protected billsummaryService: BillsummaryService
  ) {
    super(retailBillHistoryRoGridHelper);
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

  
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT',]);
    this.setGridIdentifiers(['SELECT',]);
    this.setGridColumnTypes(['Checkbox',]);
    this.addGridDataService(this.billsummaryService);
    this.setGridTitle('RetailBillHistoryRoGrid.title');
  }
}
