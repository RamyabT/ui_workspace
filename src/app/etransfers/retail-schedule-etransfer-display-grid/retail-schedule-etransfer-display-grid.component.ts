import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailScheduleEtransferDisplayGridHelper } from './retail-schedule-etransfer-display-grid.helper';
import { ScheduleetransferService } from '../scheduleetransfer-service/scheduleetransfer.service';
import { Scheduleetransfer } from '../scheduleetransfer-service/scheduleetransfer.model';

@Component({
 selector: 'app-retail-schedule-etransfer-display-grid',
  templateUrl: './retail-schedule-etransfer-display-grid.component.html',
  styleUrls: ['./retail-schedule-etransfer-display-grid.component.scss'],
   providers : [ RetailScheduleEtransferDisplayGridHelper]
 })
export class RetailScheduleEtransferDisplayGridComponent extends BaseFpxROGridComponent< Scheduleetransfer, RetailScheduleEtransferDisplayGridHelper> {
  
  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;
  private observer: any;

 constructor(
    protected retailScheduleEtransferDisplayGridHelper: RetailScheduleEtransferDisplayGridHelper,
    protected scheduleetransferService: ScheduleetransferService
  ) {
    super(retailScheduleEtransferDisplayGridHelper);
  }
  
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT',]);
    this.setGridIdentifiers(['SELECT',]);
    this.setGridColumnTypes(['Checkbox',]);
    this.addGridDataService(this.scheduleetransferService);
    this.setGridTitle('RetailScheduleEtransferDisplayGrid.title');
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
