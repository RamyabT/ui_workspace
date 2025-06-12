import { Component, Input, OnInit } from '@angular/core';
 import { BaseFpxChartComponent } from '../../dep/charts/base-fpx-charts/base-fpx-charts.component';
import { MemberExpenseDonutChartHelper } from './member-expense-donut-chart.component.helper';

@Component({
  selector: 'app-member-expense-donut-chart',
  templateUrl: './member-expense-donut-chart.component.html',
  styleUrls: ['./member-expense-donut-chart.component.scss'],
  providers: [MemberExpenseDonutChartHelper]

})

export class MemberExpenseDonutChartComponent extends BaseFpxChartComponent<MemberExpenseDonutChartHelper> {

  chart: any = null;
  @Input() set chartData(_data:any[]){
    this.chartHelper.expenses = _data;
 }
  constructor( public chartHelper: MemberExpenseDonutChartHelper) {
    super()
    this.setHelper(this.chartHelper);
   }

   override doPreInit(): void {
    this.setChartData([]);
  }

  protected override doPostInit(): void {
    // this.chartHelper.expenses = this.chartData;
  }

}








