import { Component, Input, OnInit } from '@angular/core';
import { ExpenseCategoriesDonutChartHelper } from './expense-categories-donut-chart.helper';
import { BaseFpxChartComponent } from '@fpx/charts';

@Component({
  selector: 'app-expense-categories-donut-chart',
  templateUrl: './expense-categories-donut-chart.component.html',
  styleUrls: ['./expense-categories-donut-chart.component.scss'],
  providers: [ExpenseCategoriesDonutChartHelper]
})
export class ExpenseCategoriesDonutChartComponent extends BaseFpxChartComponent<ExpenseCategoriesDonutChartHelper> {

  chart: any = null;
  @Input() set chartData(_data:any[]){
    this.chartHelper.expenses = _data;
 }
  constructor( public chartHelper: ExpenseCategoriesDonutChartHelper) {
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
