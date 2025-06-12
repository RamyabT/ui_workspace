import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailPrepaidCardsSummaryRoGridHelper } from './retail-prepaid-cards-summary-ro-grid.helper';
//import { PpCardService } from '../ppCard-servicel/ppCard.service';
import { PpCard } from '../ppCard-service/ppCard.model';
import { PpCardService } from '../ppCard-service/ppCard.service';

@Component({
 selector: 'app-retail-prepaid-cards-summary-ro-grid',
  templateUrl: './retail-prepaid-cards-summary-ro-grid.component.html',
  styleUrls: ['./retail-prepaid-cards-summary-ro-grid.component.scss'],
   providers : [ RetailPrepaidCardsSummaryRoGridHelper]
 })
export class RetailPrepaidCardsSummaryRoGridComponent extends BaseFpxROGridComponent< PpCard, RetailPrepaidCardsSummaryRoGridHelper> {
 constructor(
    protected retailPrepaidCardsSummaryRoGridHelper: RetailPrepaidCardsSummaryRoGridHelper,
    protected ppCardService: PpCardService
  ) {
    super(retailPrepaidCardsSummaryRoGridHelper);
  }
                                                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailPrepaidCardsSummaryRoGrid.cardReference.label','RetailPrepaidCardsSummaryRoGrid.cardNumber.label','RetailPrepaidCardsSummaryRoGrid.cardType.label','RetailPrepaidCardsSummaryRoGrid.status.label','RetailPrepaidCardsSummaryRoGrid.productDesc.label','RetailPrepaidCardsSummaryRoGrid.branchDesc.label','RetailPrepaidCardsSummaryRoGrid.validThru.label']);
    this.setGridIdentifiers(['SELECT','cardReference','cardNumber','cardType','status','productDesc','branchDesc','validThru']);
    this.setGridColumnTypes(['Checkbox','String','String','String','String','String','String','String']);
    this.addGridDataService(this.ppCardService);
    this.setGridTitle('RetailPrepaidCardsSummaryRoGrid.title');
  }
}
