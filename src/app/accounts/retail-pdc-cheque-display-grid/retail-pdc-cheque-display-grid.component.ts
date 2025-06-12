import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailPdcChequeDisplayGridHelper } from './retail-pdc-cheque-display-grid.helper';
import { PdcchequereqService } from '../pdcchequereq-service/pdcchequereq.service';
import { Pdcchequereq } from '../pdcchequereq-service/pdcchequereq.model';

@Component({
 selector: 'app-retail-pdc-cheque-display-grid',
  templateUrl: './retail-pdc-cheque-display-grid.component.html',
  styleUrls: ['./retail-pdc-cheque-display-grid.component.scss'],
   providers : [ RetailPdcChequeDisplayGridHelper]
 })
export class RetailPdcChequeDisplayGridComponent extends BaseFpxROGridComponent< Pdcchequereq, RetailPdcChequeDisplayGridHelper> {
 constructor(
    protected retailPdcChequeDisplayGridHelper: RetailPdcChequeDisplayGridHelper,
    protected pdcchequereqService: PdcchequereqService
  ) {
    super(retailPdcChequeDisplayGridHelper);
  }
                                                                                                             
  protected override doPreInit(): void {
    this.setGridHeaders([]);
    this.setGridIdentifiers([]);
    this.setGridColumnTypes([]);
    this.addGridDataService(this.pdcchequereqService);
    // this.setGridTitle('RetailPdcChequeDisplayGrid.title');
  }
}
