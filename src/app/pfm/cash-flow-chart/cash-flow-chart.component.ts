import { Component, Input, OnInit } from '@angular/core';
import { BaseFpxChartComponent } from '@fpx/charts';
import { CashFlowChartHelper } from './cash-flow-chart.helper';

@Component({
  selector: 'app-cash-flow-chart',
  templateUrl: './cash-flow-chart.component.html',
  styleUrls: ['./cash-flow-chart.component.scss'],
  providers: [CashFlowChartHelper]
})
export class CashFlowChartComponent extends BaseFpxChartComponent<CashFlowChartHelper> {
  @Input() set chartData(_data:any[]){
    this.cashflowChartHelper.cashflows = _data;
    this.cashflowChartHelper.updateChartData();
 }
  constructor(public cashflowChartHelper: CashFlowChartHelper) {
    super();
    this.setHelper(this.cashflowChartHelper);
  }

  protected override doPostInit(): void {
    
  }

}
