import { Injectable, Input } from "@angular/core";
import { of } from "rxjs";
import { BaseFpxChartHelper } from "@fpx/charts";

@Injectable()
export class CashFlowChartHelper extends BaseFpxChartHelper {
    public legends: Array<{ id: string; text: string; color: string }> = [];
    cashflows!:any[];
    private chartColors: any = {
        inflow: "#87E451",
        outflow: "#F06C6C",
        inflowDashed: "#87E451",
        outflowDashed: "#F06C6C",
        prediction:"#FFFFFF"
    };
    isPredictionAvailable: boolean = false;

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
        this.setChartColor([this.chartColors.inflow, this.chartColors.outflow]);
        this.setGridThickness(0.1);
        this.setStrokeWidth(2);
        this.setFontSize(10);
        this.setFontColor('#FFFFFF');
        this.setTextAnchor('middle');
    }

    public override doPostInit(): void {
        this.updateChartData();
    }
    updateChartData(){
        let cashFlowChartData:any=[];
        this.cashflows.forEach((element:any)=>{
            let payload:any={
                isDashed:false,
                week:'',
                inflow:0,
                outflow:0
            };
            payload.week=element.weekName;
            payload.inflow=element.totalCreditAmount;
            payload.outflow=element.totalDebitAmount;
            if(element.predictedCreditAmount > 0 || element.predictedDebitAmount > 0 ){
                payload.isDashed = true;
                this.isPredictionAvailable = true;
                payload.inflow=element.predictedCreditAmount;
                payload.outflow=element.predictedDebitAmount;
            }
            else{
                this.isPredictionAvailable = false;
            }
            cashFlowChartData.push(payload);
        });
        this.loadChart(of(cashFlowChartData));
      
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
            }
        ];
        if(this.isPredictionAvailable){
            this.legends.push({
                "id": "prediction",
                "text": "Prediction",
                "color": this.chartColors.prediction
            })
        }
    }
    
}