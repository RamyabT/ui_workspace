import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AppConfigService } from '@dep/services';
// import { BaseFpxChartHelper } from '@fpx/charts';
// import { ApiRequestsService } from '../apiRequests-service/apiRequests.service';
import { CriteriaQuery, FpxCurrenyFormatterPipe } from '@fpx/core';
import { map, of } from 'rxjs';
import { BaseFpxChartHelper } from '../base-fpx-charts/base-fpx-charts.component';

@Injectable()
export class depositBreakupChartHelper extends BaseFpxChartHelper {
    depositBreakupData:any;

    constructor(private datePipe: DatePipe,
        private _appConfig: AppConfigService,
        private _currencyFormatterPipe : FpxCurrenyFormatterPipe
        ) {
        super()
        this.chartConfig();
    }

    chartConfig() {
        this.setSvgWidth(400);
        this.setSvgHeight(300);
        this.setMarginLeft(0);
        this.setMarginRight(0);
        this.setMarginTop(0);
        this.setMarginBottom(0);
        this.setChartColor(['#FF8926','#FFD7B6']);
        this.setCircularChartBackgroundColor('#FFD7B6');
        // this.setChartColor(['#FF8926','#53A8E2', '#25CFE9', '#76DDFB', '#2C82BE',]);
        this.setBarRadius(8);
        this.setPadAngle(3);
        this.setFontSize(10);
        this.setFontColor('#485465');
    }
    override doPostInit(): void {
        this.setTitle("Gauge Chart");  
        this.depositBreakupData=this._appConfig.getData('depositBreakUpData');

        let totalInterestAmount=this.depositBreakupData?.endInvestment;
        let depositAmount=this.depositBreakupData?.depositAmount;
        let chartprogress:any;
        chartprogress=((depositAmount/totalInterestAmount)*100);
        let additionalData = this._appConfig.baseCurrency+" " + this._currencyFormatterPipe.transform(totalInterestAmount,this._appConfig.baseCurrency);
        chartprogress=Math.ceil(chartprogress);
        chartprogress=chartprogress.toString();
        let data:any=[];
        data=[{
            id: 'Total Maturity Amount',
            text: chartprogress,
            additionalData: additionalData
        }];
        this.loadChart(of(data));
    }
}
