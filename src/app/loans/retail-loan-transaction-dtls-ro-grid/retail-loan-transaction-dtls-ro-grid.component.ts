import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailLoanTransactionDtlsRoGridHelper } from './retail-loan-transaction-dtls-ro-grid.helper';
import { Loantransactiondtls } from '../loantransactiondtls-service/loantransactiondtls.model';
import { LoantransactiondtlsService } from '../loantransactiondtls-service/loantransactiondtls.service';

@Component({
 selector: 'app-retail-loan-transaction-dtls-ro-grid',
  templateUrl: './retail-loan-transaction-dtls-ro-grid.component.html',
  styleUrls: ['./retail-loan-transaction-dtls-ro-grid.component.scss'],
   providers : [ RetailLoanTransactionDtlsRoGridHelper]
 })
export class RetailLoanTransactionDtlsRoGridComponent extends BaseFpxROGridComponent< Loantransactiondtls, RetailLoanTransactionDtlsRoGridHelper> {
  @ViewChild('loadMore', { static: false, read: ElementRef }) loadMore!: ElementRef;

  private observer: any;
  
 constructor(
    protected retailLoanTransactionDtlsRoGridHelper: RetailLoanTransactionDtlsRoGridHelper,
    protected loantransactiondtlsService: LoantransactiondtlsService
  ) {
    super(retailLoanTransactionDtlsRoGridHelper);
  }
                                                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailLoanTransactionDtlsRoGrid.valuedate.label','RetailLoanTransactionDtlsRoGrid.transactionDate.label','RetailLoanTransactionDtlsRoGrid.transactionDescription.label','RetailLoanTransactionDtlsRoGrid.transactionReference.label','RetailLoanTransactionDtlsRoGrid.transactionType.label','RetailLoanTransactionDtlsRoGrid.transactionAmount.label','RetailLoanTransactionDtlsRoGrid.balance.label']);
    this.setGridIdentifiers(['SELECT','valuedate','transactionDate','transactionDescription','transactionReference','transactionType','transactionAmount','balance']);
    this.setGridColumnTypes(['Checkbox','String','String','String','String','String','String','String']);
    this.addGridDataService(this.loantransactiondtlsService);
    this.setGridTitle('RetailLoanTransactionDtlsRoGrid.title');
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
