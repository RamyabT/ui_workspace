
import { Component, Input, OnInit } from '@angular/core';
import { BaseFpxChartComponent } from '../../dep/charts/base-fpx-charts/base-fpx-charts.component';
import { MemberSpendingChartHelper } from './member-spending-chart.helper';

 
@Component({
  selector: 'app-member-spending-chart',
  templateUrl: './member-spending-chart.component.html',
  styleUrls: ['./member-spending-chart.component.scss'],
  providers: [MemberSpendingChartHelper]
})
export class MemberSpendingChartComponent extends BaseFpxChartComponent<MemberSpendingChartHelper> {
  chart: any = null;

  constructor(public memberspendingChartHelper: MemberSpendingChartHelper) {
    super();
    this.setHelper(this.memberspendingChartHelper);
  }

  protected override doPreInit(): void {
    this.setChartData([]);
  }

}

