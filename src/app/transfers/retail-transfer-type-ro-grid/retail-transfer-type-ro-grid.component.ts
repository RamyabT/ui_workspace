import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailTransferGridHelper } from './retail-transfer-type-ro-grid.helper';
import { PaymentsystemService } from '../paymentsystem-service/paymentsystem.service';
import { Paymentsystem } from '../paymentsystem-service/paymentsystem.model';

@Component({
 selector: 'app-retail-transfer-type-ro-grid',
  templateUrl: './retail-transfer-type-ro-grid.component.html',
  styleUrls: ['./retail-transfer-type-ro-grid.component.scss'],
   providers : [ RetailTransferGridHelper, PaymentsystemService]
 })
export class RetailTransferGridComponent extends BaseFpxROGridComponent< Paymentsystem, RetailTransferGridHelper> {
 constructor(
    protected retailTransferGridHelper: RetailTransferGridHelper,
    protected paymentsystemService: PaymentsystemService
  ) {
    super(retailTransferGridHelper);
  }
  
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT',]);
    this.setGridIdentifiers(['SELECT',]);
    this.setGridColumnTypes(['Checkbox',]);
    // this.addGridDataService(this.paymentsystemService);
    this.setGridTitle('RetailTransferGrid.title');
  }
}
