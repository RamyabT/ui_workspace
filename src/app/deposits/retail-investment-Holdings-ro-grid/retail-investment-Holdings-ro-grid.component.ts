import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {InvestmentHoldingsRoGridHelper } from './retail-investment-Holdings-ro-grid.helper';
import { InvestmentHoldingsService } from '../investmentHoldings-service/investmentHoldings.service';
import { InvestmentHoldings } from '../investmentHoldings-service/investmentHoldings.model';

@Component({
 selector: 'app-retail-investment-Holdings-ro-grid',
  templateUrl: './retail-investment-Holdings-ro-grid.component.html',
  styleUrls: ['./retail-investment-Holdings-ro-grid.component.scss'],
   providers : [ InvestmentHoldingsRoGridHelper]
 })
export class InvestmentHoldingsRoGridComponent extends BaseFpxROGridComponent< InvestmentHoldings, InvestmentHoldingsRoGridHelper> {
 constructor(
    protected investmentHoldingsRoGridHelper: InvestmentHoldingsRoGridHelper,
    protected investmentHoldingsService: InvestmentHoldingsService
  ) {
    super(investmentHoldingsRoGridHelper);
  }
                                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['InvestmentHoldingsRoGrid.securityName.label','InvestmentHoldingsRoGrid.symbol.label','InvestmentHoldingsRoGrid.quantity.label','InvestmentHoldingsRoGrid.accountNumber.label','InvestmentHoldingsRoGrid.price.label','InvestmentHoldingsRoGrid.marketPrice.label']);
    this.setGridIdentifiers(['securityName','symbol','quantity','accountNumber','price','marketPrice']);
    this.setGridColumnTypes(['String','String','String','String','String','String']);
    this.addGridDataService(this.investmentHoldingsService);
    this.setGridTitle('InvestmentHoldingsRoGrid.title');
  }
}
