import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { financeSummaryBoardComponent } from './finance-summary-board/finance-summary-board.component';
import { widgetRoutingModule } from './widget-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@dep/core';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';


const widget_COMPONENTS = [
    financeSummaryBoardComponent
]


@NgModule({
    declarations: [
        ...widget_COMPONENTS
    ],


    imports: [
        widgetRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        TranslateModule,
        FpxCoreModule,
        CommonModule
    ],


    providers: [

    ],



    exports: [
        ...widget_COMPONENTS
    ]

})
export class widgetModule { }