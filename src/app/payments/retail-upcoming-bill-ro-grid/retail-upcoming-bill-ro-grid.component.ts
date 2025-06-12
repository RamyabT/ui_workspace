import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailUpcomingBillRoGridHelper } from './retail-upcoming-bill-ro-grid.helper';
import { UpcomingbillService } from '../upcomingbill-service/upcomingbill.service';
import { Upcomingbill } from '../upcomingbill-service/upcomingbill.model';

@Component({
 selector: 'app-retail-upcoming-bill-ro-grid',
  templateUrl: './retail-upcoming-bill-ro-grid.component.html',
  styleUrls: ['./retail-upcoming-bill-ro-grid.component.scss'],
   providers : [ RetailUpcomingBillRoGridHelper]
 })
export class RetailUpcomingBillRoGridComponent extends BaseFpxROGridComponent< Upcomingbill, RetailUpcomingBillRoGridHelper> {
  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;

  private observer: any;
 constructor(
    protected retailUpcomingBillRoGridHelper: RetailUpcomingBillRoGridHelper,
    protected upcomingbillService: UpcomingbillService
  ) {
    super(retailUpcomingBillRoGridHelper);
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
    this.addGridDataService(this.upcomingbillService);
    this.setGridTitle('RetailUpcomingBillRoGrid.title');
  }
}
