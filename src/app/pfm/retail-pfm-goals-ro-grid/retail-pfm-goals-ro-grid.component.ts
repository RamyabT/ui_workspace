import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailPfmGoalsRoGridHelper } from './retail-pfm-goals-ro-grid.helper';
import { PfmgoalsService } from '../pfmgoals-service/pfmgoals.service';
import { Pfmgoals } from '../pfmgoals-service/pfmgoals.model';

@Component({
 selector: 'app-retail-pfm-goals-ro-grid',
  templateUrl: './retail-pfm-goals-ro-grid.component.html',
  styleUrls: ['./retail-pfm-goals-ro-grid.component.scss'],
   providers : [ RetailPfmGoalsRoGridHelper]
 })
export class RetailPfmGoalsRoGridComponent extends BaseFpxROGridComponent< Pfmgoals, RetailPfmGoalsRoGridHelper> {
 constructor(
    protected retailPfmGoalsRoGridHelper: RetailPfmGoalsRoGridHelper,
    protected pfmgoalsService: PfmgoalsService
  ) {
    super(retailPfmGoalsRoGridHelper);
  }
                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailPfmGoalsRoGrid.goalName.label','RetailPfmGoalsRoGrid.goalAmount.label','RetailPfmGoalsRoGrid.frequency.label','RetailPfmGoalsRoGrid.goalDuration.label','RetailPfmGoalsRoGrid.accruedAmount.label']);
    this.setGridIdentifiers(['SELECT','goalName','goalAmount','frequency','goalDuration','accruedAmount']);
    this.setGridColumnTypes(['Checkbox','String','String','String','String','String']);
    this.addGridDataService(this.pfmgoalsService);
    this.setGridTitle('RetailPfmGoalsRoGrid.title');
  }
}
