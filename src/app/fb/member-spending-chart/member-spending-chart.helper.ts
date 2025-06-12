import { Injectable, Input } from "@angular/core";
import { of } from "rxjs";
import { BaseFpxChartHelper } from "../../dep/charts/base-fpx-charts/base-fpx-charts.component";
 
@Injectable()
export class MemberSpendingChartHelper extends BaseFpxChartHelper {
    public legends: Array<{ id: string; text: string; color: string }> = [];

     chartColors: any = {
        inflow: "#D85590",
        midflow: "#FF6F61",
        outflow: "#1C6EB8"
    };

    constructor() {
        super();
        this.setConfigureChart();
    }

    setConfigureChart(){
        this.setSvgWidth(340);
        this.setSvgHeight(125);
        this.setMarginLeft(0);
        this.setMarginRight(0);
        this.setMarginTop(0);
        this.setMarginBottom(0);
        this.setChartColor([this.chartColors.inflow, this.chartColors.outflow , this.chartColors.midflow]);
        this.setGridThickness(0.1);
        this.setStrokeWidth(1);
        this.setFontSize(10);
        this.setFontColor('#FFFFFF');
        this.setTextAnchor('middle');
    }

    public override doPostInit(): void {
        this.loadChart(of([
            {
                week: 'Week 1',
                inflow: 1000,
                outflow: 500,
                midflow : 300
            },
            {
                week: 'Week 2',
                inflow: 800,
                outflow: 900,
                midflow :500
            },
            {
                week: 'Week 3',
                inflow: 1300,
                outflow: 400,
                midflow:700
            },
            {
                week: 'Week 4',
                inflow: 500,
                outflow: 800,
                midflow:600
            }
        ]));

        this.legends = [
            {
                "id": "inflow",
                "text": "Cash Inflow",
                "color": this.chartColors.inflow
            },
            {
                "id": "outflow",
                "text": "Cash Outflow",
                "color": this.chartColors.outflow
            },
            {
                "id": "midflow",
                "text": "Cash Midflow",
                "color": this.chartColors.midflow
            }
        ]
    }
    
}