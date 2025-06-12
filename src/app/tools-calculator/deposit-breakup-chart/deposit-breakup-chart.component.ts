import { Component, OnInit } from '@angular/core';
import {depositBreakupChartService} from './deposit-breakup-chart.service';
import {depositBreakupChartHelper} from './deposit-breakup-chart.helper';
import { BaseFpxChartComponent } from '../base-fpx-charts/base-fpx-charts.component';

@Component({
  selector: 'app-deposit-breakup-chart',
  templateUrl: './deposit-breakup-chart.component.html',
  styleUrls: ['./deposit-breakup-chart.component.scss'],
  providers: [depositBreakupChartHelper]
})
export class depositBreakupChartComponent extends BaseFpxChartComponent<depositBreakupChartHelper> {

  chart: any = null;

  constructor(private service: depositBreakupChartService, public help: depositBreakupChartHelper) {
    super()
    this.setHelper(this.help);
   }

   override doPreInit(): void {
    // this.chart =this.service.findAllStatic();

    // this.setChartData(this.chart);
    this.setChartData([]);

  }


}
