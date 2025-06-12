import { NgModule } from "@angular/core";
import { FpxDonutChartComponent } from "./fpx-donut-chart/fpx-donut-chart.component";
import { FpxColumnChartComponent } from "./fpx-column-chart/fpx-column-chart.component";
import { FpxMultiLineChartComponent } from "./fpx-multi-line-chart/fpx-multi-line-chart.component";

@NgModule({
    declarations: [
     FpxDonutChartComponent,
     FpxColumnChartComponent,
     FpxMultiLineChartComponent
    ],
    imports: [
    ],
    providers: [
    ],
    exports: [
        FpxDonutChartComponent,
        FpxColumnChartComponent,
        FpxMultiLineChartComponent
    ]
})

export class DepChartsModule { }