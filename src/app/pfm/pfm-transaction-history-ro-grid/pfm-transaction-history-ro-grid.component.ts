import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {PfmTransactionHistoryRoGridHelper } from './pfm-transaction-history-ro-grid.helper';
import { PfmtransactionService } from '../pfmtransaction-service/pfmtransaction.service';
import { Pfmtransaction } from '../pfmtransaction-service/pfmtransaction.model';

@Component({
 selector: 'app-pfm-transaction-history-ro-grid',
  templateUrl: './pfm-transaction-history-ro-grid.component.html',
  styleUrls: ['./pfm-transaction-history-ro-grid.component.scss'],
   providers : [ PfmTransactionHistoryRoGridHelper]
 })
export class PfmTransactionHistoryRoGridComponent extends BaseFpxROGridComponent< Pfmtransaction, PfmTransactionHistoryRoGridHelper> {
 constructor(
    protected pfmTransactionHistoryRoGridHelper: PfmTransactionHistoryRoGridHelper,
    protected pfmtransactionService: PfmtransactionService
  ) {
    super(pfmTransactionHistoryRoGridHelper);
  }
                                                                                                                                                                                                                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','PfmTransactionHistoryRoGrid.inventoryNumber.label','PfmTransactionHistoryRoGrid.customerCode.label','PfmTransactionHistoryRoGrid.categoryCode.label','PfmTransactionHistoryRoGrid.paymentDate.label','PfmTransactionHistoryRoGrid.transactionAmount.label','PfmTransactionHistoryRoGrid.transactionCurrency.label','PfmTransactionHistoryRoGrid.transactionDescription.label','PfmTransactionHistoryRoGrid.externalReferenceNumber.label','PfmTransactionHistoryRoGrid.merchantCode.label','PfmTransactionHistoryRoGrid.accountNumber.label','PfmTransactionHistoryRoGrid.transactioncategory.label','PfmTransactionHistoryRoGrid.authOn.label','PfmTransactionHistoryRoGrid.pfmSubCategory.label','PfmTransactionHistoryRoGrid.modifiedOn.label','PfmTransactionHistoryRoGrid.createdBy.label','PfmTransactionHistoryRoGrid.createdOn.label','PfmTransactionHistoryRoGrid.currency.label']);
    this.setGridIdentifiers(['SELECT','inventoryNumber','customerCode','categoryCode','paymentDate','transactionAmount','transactionCurrency','transactionDescription','externalReferenceNumber','merchantCode','accountNumber','transactioncategory','authOn','pfmSubCategory','modifiedOn','createdBy','createdOn','currency']);
    this.setGridColumnTypes(['Checkbox','String','String','String','String','String','String','String','String','String','String','String','String','String','String','String','String','String']);
    this.addGridDataService(this.pfmtransactionService);
    this.setGridTitle('PfmTransactionHistoryRoGrid.title');
  }
}
