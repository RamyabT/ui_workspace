import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailPfmTrackBudgetRoGridHelper } from './retail-track-budget-ro-grid.helper';
import { PfmbudgetService } from '../pfmbudget-service/pfmbudget.service';
import { Pfmbudget } from '../pfmbudget-service/pfmbudget.model';

@Component({
 selector: 'app-retail-track-budget-ro-grid',
  templateUrl: './retail-track-budget-ro-grid.component.html',
  styleUrls: ['./retail-track-budget-ro-grid.component.scss'],
   providers : [ RetailPfmTrackBudgetRoGridHelper]
 })
export class RetailPfmTrackBudgetRoGridComponent extends BaseFpxROGridComponent< Pfmbudget, RetailPfmTrackBudgetRoGridHelper> {
 constructor(
    protected retailPfmTrackBudgetRoGridHelper: RetailPfmTrackBudgetRoGridHelper,
    protected pfmbudgetService: PfmbudgetService
  ) {
    super(retailPfmTrackBudgetRoGridHelper);
  }
  
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT',]);
    this.setGridIdentifiers(['SELECT',]);
    this.setGridColumnTypes(['Checkbox',]);
    this.addGridDataService(this.pfmbudgetService);
    this.setGridTitle('RetailPfmTrackBudgetRoGrid.title');
  }
}
