import { Component, OnInit } from '@angular/core';
import { AssetsBreakdownChartHelper } from './assets-breakdown-chart.helper';
import { BaseFpxChartComponent } from '@fpx/charts';

@Component({
  selector: 'app-assets-breakdown-chart',
  templateUrl: './assets-breakdown-chart.component.html',
  styleUrls: ['./assets-breakdown-chart.component.scss'],
  providers: [AssetsBreakdownChartHelper]
})
export class AssetsBreakdownChartComponent extends BaseFpxChartComponent<AssetsBreakdownChartHelper> {

  chart: any = null;

  constructor( 
    public helper: AssetsBreakdownChartHelper
  ) {
    super();
    this.setHelper(this.helper);
  }

  override doPreInit(): void {
    this.setChartData([]);
  }

}
