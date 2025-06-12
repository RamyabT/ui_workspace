import { Component, OnInit } from '@angular/core';
// import {depositBreakupChartService} from './loans-breakup-chart.service';
import { loansBreakupChartHelper} from './loans-breakup-chart.helper';
import { BaseFpxChartComponent } from '../base-fpx-charts/base-fpx-charts.component';
@Component({
  selector: 'app-loans-breakup-chart',
  templateUrl: './loans-breakup-chart.component.html',
  styleUrls: ['./loans-breakup-chart.component.scss'],
  providers: [loansBreakupChartHelper]
})
export class loansBreakupChartComponent extends BaseFpxChartComponent<loansBreakupChartHelper> {

  chart: any = null;

  constructor(public help: loansBreakupChartHelper) {
    super()
    this.setHelper(this.help);
   }

   override doPreInit(): void {
    // this.chart =this.service.findAllStatic();

    // this.setChartData(this.chart);
    this.setChartData([]);

  }


}
