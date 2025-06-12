import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailFXRatesRoGridHelper } from './retail-fx-rates-ro-grid.helper';
import { FxratesService } from '../fxrates-service/fxrates.service';
import { Fxrates } from '../fxrates-service/fxrates.model';

@Component({
 selector: 'app-retail-fx-rates-ro-grid',
  templateUrl: './retail-fx-rates-ro-grid.component.html',
  styleUrls: ['./retail-fx-rates-ro-grid.component.scss'],
   providers : [ RetailFXRatesRoGridHelper]
 })
export class RetailFXRatesRoGridComponent extends BaseFpxROGridComponent< Fxrates, RetailFXRatesRoGridHelper> {
 constructor(
    protected retailFXRatesRoGridHelper: RetailFXRatesRoGridHelper,
    protected fxratesService: FxratesService
  ) {
    super(retailFXRatesRoGridHelper);
  }
  
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT',]);
    this.setGridIdentifiers(['SELECT',]);
    this.setGridColumnTypes(['Checkbox',]);
    this.addGridDataService(this.fxratesService);
    this.setGridTitle('RetailFXRatesRoGrid.title');
  }
}
