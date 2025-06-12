import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailCasaTransactionDtlsRoGridHelper } from './retail-casa-transaction-dtls-ro-grid.helper';
import { CasatransactiondtlsService } from '../casatransactiondtls-service/casatransactiondtls.service';
import { Casatransactiondtls } from '../casatransactiondtls-service/casatransactiondtls.model';

@Component({
 selector: 'app-retail-casa-transaction-dtls-ro-grid',
  templateUrl: './retail-casa-transaction-dtls-ro-grid.component.html',
  styleUrls: ['./retail-casa-transaction-dtls-ro-grid.component.scss'],
   providers : [ RetailCasaTransactionDtlsRoGridHelper]
 })
export class RetailCasaTransactionDtlsRoGridComponent extends BaseFpxROGridComponent< Casatransactiondtls, RetailCasaTransactionDtlsRoGridHelper> {
  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;

  private observer: any;
  
 
  constructor(
    protected retailCasaTransactionDtlsRoGridHelper: RetailCasaTransactionDtlsRoGridHelper,
    protected casatransactiondtlsService: CasatransactiondtlsService
  ) {
    super(retailCasaTransactionDtlsRoGridHelper);
  }
                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders([]);
    this.setGridIdentifiers([]);
    this.setGridColumnTypes([]);
    this.addGridDataService(this.casatransactiondtlsService);
    this.setGridTitle('');
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
