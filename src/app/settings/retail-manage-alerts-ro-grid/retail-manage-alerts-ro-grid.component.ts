import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailManageAlertsRoGridHelper } from './retail-manage-alerts-ro-grid.helper';
import { UseralertcfgService } from '../useralertcfg-service/useralertcfg.service';
import { Useralertcfg } from '../useralertcfg-service/useralertcfg.model';

@Component({
 selector: 'app-retail-manage-alerts-ro-grid',
  templateUrl: './retail-manage-alerts-ro-grid.component.html',
  styleUrls: ['./retail-manage-alerts-ro-grid.component.scss'],
   providers : [ RetailManageAlertsRoGridHelper]
 })
export class RetailManageAlertsRoGridComponent extends BaseFpxROGridComponent< Useralertcfg, RetailManageAlertsRoGridHelper> {
 constructor(
    protected retailManageAlertsRoGridHelper: RetailManageAlertsRoGridHelper,
    protected useralertcfgService: UseralertcfgService
  ) {
    super(retailManageAlertsRoGridHelper);
  }
  
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT',]);
    this.setGridIdentifiers(['SELECT',]);
    this.setGridColumnTypes(['Checkbox',]);
    this.addGridDataService(this.useralertcfgService);
    this.setGridTitle('RetailManageAlertsRoGrid.title');
  }
}
