import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailCasaTransactionStmtROGridHelper } from './retail-casatransaction-stmt-ro-grid.helper';
import { CasatransactiondtlsService } from '../casatransactiondtls-service/casatransactiondtls.service';
import { Casatransactiondtls } from '../casatransactiondtls-service/casatransactiondtls.model';

@Component({
 selector: 'app-retail-casatransaction-stmt-ro-grid',
  templateUrl: './retail-casatransaction-stmt-ro-grid.component.html',
  styleUrls: ['./retail-casatransaction-stmt-ro-grid.component.scss'],
   providers : [ RetailCasaTransactionStmtROGridHelper]
 })
export class RetailCasaTransactionStmtROGridComponent extends BaseFpxROGridComponent< Casatransactiondtls, RetailCasaTransactionStmtROGridHelper> {
 constructor(
    protected retailCasaTransactionStmtROGridHelper: RetailCasaTransactionStmtROGridHelper,
    protected casatransactiondtlsService: CasatransactiondtlsService
  ) {
    super(retailCasaTransactionStmtROGridHelper);
  }
                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailCasaTransactionStmtROGrid.transactionDate.label','RetailCasaTransactionStmtROGrid.transactionDescription.label','RetailCasaTransactionStmtROGrid.transactionAmount.label','RetailCasaTransactionStmtROGrid.transactionCategory.label']);
    this.setGridIdentifiers(['SELECT','transactionDate','transactionDescription','transactionAmount','transactionCategory']);
    this.setGridColumnTypes(['Checkbox','String','String','String','String']);
    this.addGridDataService(this.casatransactiondtlsService);
    this.setGridTitle('RetailCasaTransactionStmtROGrid.title');
  }
}
