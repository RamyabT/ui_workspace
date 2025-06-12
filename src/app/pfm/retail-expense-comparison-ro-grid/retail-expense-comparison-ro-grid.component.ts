import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {RetailExpenseComparisonRoGridHelper } from './retail-expense-comparison-ro-grid.helper';
// import { ServicerequestlogService } from '../servicerequestlog-service/servicerequestlog.service';
// import { Servicerequestlog } from '../servicerequestlog-service/servicerequestlog.model';

@Component({
 selector: 'app-retail-expense-comparison-ro-grid',
  templateUrl: './retail-expense-comparison-ro-grid.component.html',
  styleUrls: ['./retail-expense-comparison-ro-grid.component.scss'],
   providers : [ RetailExpenseComparisonRoGridHelper]
 })
export class RetailExpenseComparisonRoGridComponent extends BaseFpxROGridComponent< any, RetailExpenseComparisonRoGridHelper> {

  private observer: any;
  
 constructor(
    protected retailExpenseComparisonRoGridHelper: RetailExpenseComparisonRoGridHelper,
    // protected servicerequestlogService: ServicerequestlogService
  ) {
    super(retailExpenseComparisonRoGridHelper);
  }
  
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT',]);
    this.setGridIdentifiers(['SELECT',]);
    this.setGridColumnTypes(['Checkbox',]);
    // this.addGridDataService(this.servicerequestlogService);
    this.setGridTitle('RetailExpenseComparisonRoGrid.title');
  }

  protected override doPostInit(): void {
  }
}
