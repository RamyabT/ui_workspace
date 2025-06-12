import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailTransferHistoryRoGridHelper } from './retail-transfer-history-ro-grid.helper';
import { TransferhistoryService } from '../transferhistory-service/transferhistory.service';
import { Transferhistory } from '../transferhistory-service/transferhistory.model';

@Component({
 selector: 'app-retail-transfer-history-ro-grid',
  templateUrl: './retail-transfer-history-ro-grid.component.html',
  styleUrls: ['./retail-transfer-history-ro-grid.component.scss'],
   providers : [ RetailTransferHistoryRoGridHelper]
 })
export class RetailTransferHistoryRoGridComponent extends BaseFpxROGridComponent< Transferhistory, RetailTransferHistoryRoGridHelper> {
 constructor(
    protected retailTransferHistoryRoGridHelper: RetailTransferHistoryRoGridHelper,
    protected transferhistoryService: TransferhistoryService
  ) {
    super(retailTransferHistoryRoGridHelper);
  }
                                                                                                                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailTransferHistoryRoGrid.uETR.label','RetailTransferHistoryRoGrid.valueDate.label','RetailTransferHistoryRoGrid.initiationDate.label','RetailTransferHistoryRoGrid.paymentType.label','RetailTransferHistoryRoGrid.paymentAmount.label','RetailTransferHistoryRoGrid.debitAccountNumber.label','RetailTransferHistoryRoGrid.beneficiaryAccountNumber.label','RetailTransferHistoryRoGrid.transactionReference.label','RetailTransferHistoryRoGrid.status.label','RetailTransferHistoryRoGrid.paymentId.label','RetailTransferHistoryRoGrid.beneficiaryName.label']);
    this.setGridIdentifiers(['SELECT','uETR','valueDate','initiationDate','paymentType','paymentAmount','debitAccountNumber','beneficiaryAccountNumber','transactionReference','status','paymentId','beneficiaryName']);
    this.setGridColumnTypes(['Checkbox','String','String','String','String','String','String','String','String','String','String','String']);
    this.addGridDataService(this.transferhistoryService);
    this.setGridTitle('RetailTransferHistoryRoGrid.title');
  }
}
