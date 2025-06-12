import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailCcstatementdetailRoGridHelper } from './retail-ccstatementdetail-ro-grid.helper';
import { CcstatementdetailService } from '../ccstatementdetail-service/ccstatementdetail.service';
import { Ccstatementdetail } from '../ccstatementdetail-service/ccstatementdetail.model';

@Component({
 selector: 'app-retail-ccstatementdetail-ro-grid',
  templateUrl: './retail-ccstatementdetail-ro-grid.component.html',
  styleUrls: ['./retail-ccstatementdetail-ro-grid.component.scss'],
   providers : [ RetailCcstatementdetailRoGridHelper]
 })
export class RetailCcstatementdetailRoGridComponent extends BaseFpxROGridComponent< Ccstatementdetail, RetailCcstatementdetailRoGridHelper> {
 constructor(
    protected retailCcstatementdetailRoGridHelper: RetailCcstatementdetailRoGridHelper,
    protected ccstatementdetailService: CcstatementdetailService
  ) {
    super(retailCcstatementdetailRoGridHelper);
  }
                                                                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailCcstatementdetailRoGrid.transactionReference.label','RetailCcstatementdetailRoGrid.transactionDate.label','RetailCcstatementdetailRoGrid.valueDate.label','RetailCcstatementdetailRoGrid.transactionAmount.label','RetailCcstatementdetailRoGrid.merchantId.label','RetailCcstatementdetailRoGrid.transactionCat.label','RetailCcstatementdetailRoGrid.transactionCurrency.label','RetailCcstatementdetailRoGrid.transactionDescription.label']);
    this.setGridIdentifiers(['SELECT','transactionReference','transactionDate','valueDate','transactionAmount','merchantId','transactionCat','transactionCurrency','transactionDescription']);
    this.setGridColumnTypes(['Checkbox','String','String','String','String','String','String','String','String']);
    this.addGridDataService(this.ccstatementdetailService);
    this.setGridTitle('RetailCcstatementdetailRoGrid.title');
  }
}
