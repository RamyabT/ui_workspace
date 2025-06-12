
import { InjectionToken } from '@angular/core';
import { BaseFpxChartComponent, BaseFpxChartHelper } from './base-fpx-charts.component';

export const CHARTS = new InjectionToken<BaseFpxChartComponent<BaseFpxChartHelper>>('Charts');
