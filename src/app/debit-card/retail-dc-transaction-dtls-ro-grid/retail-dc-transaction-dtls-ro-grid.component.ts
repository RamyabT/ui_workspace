import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailDcTransactionDtlsRoGridHelper } from './retail-dc-transaction-dtls-ro-grid.helper';
import { DctransactiondtlsService } from '../dctransactiondtls-service/dctransactiondtls.service';
import { Dctransactiondtls } from '../dctransactiondtls-service/dctransactiondtls.model';

@Component({
 selector: 'app-retail-dc-transaction-dtls-ro-grid',
  templateUrl: './retail-dc-transaction-dtls-ro-grid.component.html',
  styleUrls: ['./retail-dc-transaction-dtls-ro-grid.component.scss'],
   providers : [ RetailDcTransactionDtlsRoGridHelper]
 })
export class RetailDcTransactionDtlsRoGridComponent extends BaseFpxROGridComponent< Dctransactiondtls, RetailDcTransactionDtlsRoGridHelper> {

  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;

  private observer: any;
 constructor(
    protected retailDcTransactionDtlsRoGridHelper: RetailDcTransactionDtlsRoGridHelper,
    protected dctransactiondtlsService: DctransactiondtlsService
  ) {
    super(retailDcTransactionDtlsRoGridHelper);
  }
                                                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailDcTransactionDtlsRoGrid.valueDate.label','RetailDcTransactionDtlsRoGrid.transactionDate.label','RetailDcTransactionDtlsRoGrid.transactionDescription.label','RetailDcTransactionDtlsRoGrid.transactionReference.label','RetailDcTransactionDtlsRoGrid.transType.label','RetailDcTransactionDtlsRoGrid.transactionAmount.label','RetailDcTransactionDtlsRoGrid.balance.label']);
    this.setGridIdentifiers(['SELECT','valueDate','transactionDate','transactionDescription','transactionReference','transType','transactionAmount','balance']);
    this.setGridColumnTypes(['Checkbox','String','String','String','String','String','String','String']);
    this.addGridDataService(this.dctransactiondtlsService);
    this.setGridTitle('RetailDcTransactionDtlsRoGrid.title');
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
