import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { CriteriaQuery } from '@fpx/core'; 
import { combineLatest, map, of } from 'rxjs';
import { BaseFpxChartHelper } from '@fpx/charts';
import { PfmSummaryService } from '../pfm-summary-service/pfm-summary.service';


@Injectable()
export class AssetsBreakdownChartHelper extends BaseFpxChartHelper {
    idValue: string ='id';
    textValue: string ='text';
    totalAssets: any;
    totalLiabilities: any;

    constructor(
        private _pfmSummaryService:PfmSummaryService
    ) {
        super()
        this.chartConfig();
    }

    chartConfig() {
        this.setSvgWidth(200);
        this.setSvgHeight(170);
        this.setMarginLeft(50);
        this.setMarginRight(0);
        this.setMarginTop(20);
        this.setMarginBottom(40);
        this.setChartColor(['#016B83', '#12486B', '#E02020']);
        this.setBarWidth(36.5);
        this.setBarRadius(5);
        this.setFontSize(10);
        this.setFontColor('#485465');
        this.setPadding(0.7);
        this.setGridThickness(1);
        this.setTextAnchor('start')
    }

    override doPostInit(): void {
        this.setTitle("Assets Breakdown");
        this.idValue='id';
        this.textValue='text';
        let assetSummary$ = this._pfmSummaryService.fetchAssetsSummary();
            let liabilitySummary$ = this._pfmSummaryService.fetchLiabilitySummary();
            combineLatest([assetSummary$, liabilitySummary$]).subscribe({
              next: ([assetSummary, liabilitySummary]) => {
                assetSummary.forEach((element:any) => {
                    this.totalAssets=element.savings+Number(element.currents);
                });
                liabilitySummary.forEach((element:any) => {
                    this.totalLiabilities=Number(element.loans);
                });
                this.loadChart(
                    of([
                        { id: 'Liquid Assets', text: this.totalAssets.toString() },
                        { id: 'Non Liquid Assets', text: '52000' },
                        { id: 'Liabilities', text: this.totalLiabilities.toString() },
                    ])
                );
              }
            });
    }

}
