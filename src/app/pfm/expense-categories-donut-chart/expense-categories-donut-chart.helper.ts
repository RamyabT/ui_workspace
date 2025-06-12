import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { CriteriaQuery, FpxCurrenyFormatterPipe } from '@fpx/core';
import { map, of } from 'rxjs';

import { AppConfigService } from '@dep/services';
import { PfmSummaryService } from '../pfm-summary-service/pfm-summary.service';
import { BaseFpxChartHelper } from '@fpx/charts';
import { Router } from '@angular/router';

@Injectable()
export class ExpenseCategoriesDonutChartHelper extends BaseFpxChartHelper {
  id:string='description';
  text:string='expenseAmount';
  expenses!:any[];
  expensesCatColorMap:Map<string,string>= new Map();
  constructor(
    private _pfmSummaryService:PfmSummaryService,
    protected _appConfig: AppConfigService,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
    private _router:Router
  ) {
    super()
    this.chartConfig();
  }

  chartConfig() {
    this.setSvgWidth(230);
    this.setSvgHeight(230);
    this.setMarginLeft(0);
    this.setMarginRight(0);
    this.setMarginTop(0);
    this.setMarginBottom(0);
    this.setBarRadius(0);
    this.setPadAngle(0);
    this.setOuterRadius(48);
    this.setFontSize(12);
    this.setFontColor('#FFFFFF');
  }

  override doPreInit(): void {

  }

  override doPostInit(): void {
    this.setTitle("ExpenseCategories Donut Chart");
    let chartColors:any=[];
    this.expenses?.forEach((element:any) => {
      chartColors.push(element.iconTheme);
      this.expensesCatColorMap.set(element.categoryCode,element.iconTheme);
    }); 
    this._appConfig.setData('expenseCatColors',this.expensesCatColorMap);
    
    this.setChartColor(chartColors);
    this.loadChart(of(this.expenses));
  }
  
  arcClickEvent($event:any){
    console.log($event);
    let service = this._appConfig.getServiceDetails('RETAILPFMTRANHISTORY');
    this._appConfig.setData('donutArcSpendsData',$event.arcData);
    if($event.arcData?.categoryCode){
      this._router.navigate(service.servicePath,{
        queryParams: {
          categoryCode:$event.arcData?.categoryCode
        }
      }
      );
    }
  }
}
