import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {InvestmentTransactionSummaryGridHelper } from './investment-transaction-summary-grid.helper';
import { InvestmenttransactionsummaryService } from '../investmenttransactionsummary-service/investmenttransactionsummary.service';
import { Investmenttransactionsummary } from '../investmenttransactionsummary-service/investmenttransactionsummary.model';

@Component({
 selector: 'app-investment-transaction-summary-grid',
  templateUrl: './investment-transaction-summary-grid.component.html',
  styleUrls: ['./investment-transaction-summary-grid.component.scss'],
   providers : [ InvestmentTransactionSummaryGridHelper]
 })
export class InvestmentTransactionSummaryGridComponent extends BaseFpxROGridComponent< Investmenttransactionsummary, InvestmentTransactionSummaryGridHelper> {
 constructor(
    protected investmentTransactionSummaryGridHelper: InvestmentTransactionSummaryGridHelper,
    protected investmenttransactionsummaryService: InvestmenttransactionsummaryService
  ) {
    super(investmentTransactionSummaryGridHelper);
  }
                                                                                                                                                                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders([]);
    this.setGridIdentifiers([]);
    this.setGridColumnTypes([]);
    this.addGridDataService(this.investmenttransactionsummaryService);
    //this.setGridTitle('InvestmentTransactionSummaryGrid.title');
  }
}
