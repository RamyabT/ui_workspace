
import { InjectionToken } from '@angular/core';
import { BaseFpxChartComponent, BaseFpxChartHelper } from './base-fpx-charts.component';
// import { BaseFpxChartComponent, BaseFpxChartHelper } from '../base';

export const CHARTS = new InjectionToken<BaseFpxChartComponent<BaseFpxChartHelper>>('Charts');
