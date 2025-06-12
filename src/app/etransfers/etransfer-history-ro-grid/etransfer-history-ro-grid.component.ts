import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {ETransferHistoryRoGridHelper } from './etransfer-history-ro-grid.helper';
import { EtransferService } from '../etransfer-service/etransfer.service';
import { Etransfer } from '../etransfer-service/etransfer.model';

@Component({
 selector: 'app-etransfer-history-ro-grid',
  templateUrl: './etransfer-history-ro-grid.component.html',
  styleUrls: ['./etransfer-history-ro-grid.component.scss'],
   providers : [ ETransferHistoryRoGridHelper]
 })
export class ETransferHistoryRoGridComponent extends BaseFpxROGridComponent< Etransfer, ETransferHistoryRoGridHelper> {
  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;

  private observer: any;
 constructor(
    protected eTransferHistoryRoGridHelper: ETransferHistoryRoGridHelper,
    protected etransferService: EtransferService
  ) {
    super(eTransferHistoryRoGridHelper);
  }
                                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','ETransferHistoryRoGrid.paymentDate.label','ETransferHistoryRoGrid.contactName.label','ETransferHistoryRoGrid.contactEmailId.label','ETransferHistoryRoGrid.contactPhoneNumber.label','ETransferHistoryRoGrid.creditAmount.label','ETransferHistoryRoGrid.paymentStatus.label']);
    this.setGridIdentifiers(['SELECT','paymentDate','contactName','contactEmailId','contactPhoneNumber','creditAmount','paymentStatus']);
    this.setGridColumnTypes(['Checkbox','String','String','String','String','String','String']);
    this.addGridDataService(this.etransferService);
    this.setGridTitle('ETransferHistoryRoGrid.title');
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
