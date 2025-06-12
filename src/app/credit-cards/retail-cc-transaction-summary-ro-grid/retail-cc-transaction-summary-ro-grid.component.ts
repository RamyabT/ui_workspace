import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailCCTransactionSummaryROGridHelper } from './retail-cc-transaction-summary-ro-grid.helper';
//import { CctransactionsummaryService } from '../cctransactionsummary-service/cctransactionsummary.service';
import { Cctransactionsummary } from '../cctransactionsummary-service/cctransactionsummary.model';
import { CctransactionsummaryService } from '../cctransactionsummary-service/cctransactionsummary.service';

@Component({
 selector: 'app-retail-cc-transaction-summary-ro-grid',
  templateUrl: './retail-cc-transaction-summary-ro-grid.component.html',
  styleUrls: ['./retail-cc-transaction-summary-ro-grid.component.scss'],
   providers : [ RetailCCTransactionSummaryROGridHelper]
 })
export class RetailCCTransactionSummaryROGridComponent extends BaseFpxROGridComponent< Cctransactionsummary, RetailCCTransactionSummaryROGridHelper> {
  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;

  private observer: any;
 constructor(
    protected retailCCTransactionSummaryROGridHelper: RetailCCTransactionSummaryROGridHelper,
    protected cctransactionsummaryService: CctransactionsummaryService
  ) {
    super(retailCCTransactionSummaryROGridHelper);
  }
                                                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailCCTransactionSummaryROGrid.valueDate.label','RetailCCTransactionSummaryROGrid.transactionDate.label','RetailCCTransactionSummaryROGrid.transactionDescription.label','RetailCCTransactionSummaryROGrid.transactionReference.label','RetailCCTransactionSummaryROGrid.transType.label','RetailCCTransactionSummaryROGrid.transactionAmount.label','RetailCCTransactionSummaryROGrid.balance.label']);
    this.setGridIdentifiers(['SELECT','valueDate','transactionDate','transactionDescription','transactionReference','transType','transactionAmount','balance']);
    this.setGridColumnTypes(['Checkbox','String','String','String','String','String','String','String']);
    this.addGridDataService(this.cctransactionsummaryService);
    this.setGridTitle('RetailCCTransactionSummaryROGrid.title');
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
