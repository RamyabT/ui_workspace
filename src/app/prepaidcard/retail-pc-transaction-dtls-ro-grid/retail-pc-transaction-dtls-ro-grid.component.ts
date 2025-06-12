import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailPcTransactionDtlsRoGridHelper } from './retail-pc-transaction-dtls-ro-grid.helper';
import { PctransactiondtlsService } from '../pctransactiondtls-service/pctransactiondtls.service';
import { Pctransactiondtls } from '../pctransactiondtls-service/pctransactiondtls.model';

@Component({
 selector: 'app-retail-pc-transaction-dtls-ro-grid',
  templateUrl: './retail-pc-transaction-dtls-ro-grid.component.html',
  styleUrls: ['./retail-pc-transaction-dtls-ro-grid.component.scss'],
   providers : [ RetailPcTransactionDtlsRoGridHelper]
 })
export class RetailPcTransactionDtlsRoGridComponent extends BaseFpxROGridComponent< Pctransactiondtls, RetailPcTransactionDtlsRoGridHelper> {
  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;

  private observer: any;
  constructor(
    protected retailPcTransactionDtlsRoGridHelper: RetailPcTransactionDtlsRoGridHelper,
    protected pctransactiondtlsService: PctransactiondtlsService
  ) {
    super(retailPcTransactionDtlsRoGridHelper);
  }
                                                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailPcTransactionDtlsRoGrid.valueDate.label','RetailPcTransactionDtlsRoGrid.transactionDate.label','RetailPcTransactionDtlsRoGrid.transactionDescription.label','RetailPcTransactionDtlsRoGrid.transactionReference.label','RetailPcTransactionDtlsRoGrid.transType.label','RetailPcTransactionDtlsRoGrid.transactionAmount.label','RetailPcTransactionDtlsRoGrid.balance.label']);
    this.setGridIdentifiers(['SELECT','valueDate','transactionDate','transactionDescription','transactionReference','transType','transactionAmount','balance']);
    this.setGridColumnTypes(['Checkbox','String','String','String','String','String','String','String']);
    this.addGridDataService(this.pctransactiondtlsService);
    this.setGridTitle('RetailPcTransactionDtlsRoGrid.title');
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