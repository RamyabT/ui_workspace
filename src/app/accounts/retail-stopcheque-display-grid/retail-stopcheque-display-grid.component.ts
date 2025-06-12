import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailStopchequeDisplayGridHelper } from './retail-stopcheque-display-grid.helper';
import { StopchequeService } from '../stopcheque-service/stopcheque.service';
import { Stopcheque } from '../stopcheque-service/stopcheque.model';

@Component({
 selector: 'app-retail-stopcheque-display-grid',
  templateUrl: './retail-stopcheque-display-grid.component.html',
  styleUrls: ['./retail-stopcheque-display-grid.component.scss'],
   providers : [ RetailStopchequeDisplayGridHelper]
 })
export class RetailStopchequeDisplayGridComponent extends BaseFpxROGridComponent< Stopcheque, RetailStopchequeDisplayGridHelper> {
  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;

  private observer: any;
 constructor(
    protected retailStopchequeDisplayGridHelper: RetailStopchequeDisplayGridHelper,
    protected stopchequeService: StopchequeService
  ) {
    super(retailStopchequeDisplayGridHelper);
  }
                                                                                             
  protected override doPreInit(): void {
    this.setGridHeaders(['RetailStopchequeDisplayGrid.chequeNumber.label','RetailStopchequeDisplayGrid.payeeName.label','RetailStopchequeDisplayGrid.reason.label','RetailStopchequeDisplayGrid.stopDate.label','RetailStopchequeDisplayGrid.chequeAmount.label','RetailStopchequeDisplayGrid.revoke.label']);
    this.setGridIdentifiers(['chequeNumber','payeeName','reason','stopDate','chequeAmount','ACTIONS']);
    this.setGridColumnTypes(['Numeric','String','String','String','String']);
    this.addGridDataService(this.stopchequeService);
    this.setGridTitle('RetailStopchequeDisplayGrid.title');
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
