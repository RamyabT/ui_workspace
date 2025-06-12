import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PfmSpaceRoutingModule } from './pfm-space-routing.module';
import { PfmSpaceContainerComponent } from './pfm-space-container/pfm-space-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@dep/core';
import { TranslateModule } from '@ngx-translate/core';
import { FpxCoreModule } from '@fpx/core';
import { PfmNetworthComponent } from './pfm-networth/pfm-networth.component';
import { PfmModule } from '../pfm/pfm.module';
import { FoundationModule } from '../foundation/foundation.module';
import { widgetModule } from '../widget/widget.module';
import { DepChartsModule } from '@fpx/charts';


@NgModule({
  declarations: [
    PfmSpaceContainerComponent,
    PfmNetworthComponent
  ],
  imports: [
    CommonModule,
    PfmSpaceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    FpxCoreModule,
    PfmModule,
    FoundationModule,
    widgetModule
  ]
})
export class PfmSpaceModule { }
