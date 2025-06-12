import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FbSpaceRoutingModule } from './fb-space-routing.module';
import { FbSpaceContainerComponent } from './fb-space-container/fb-space-container.component';
import { FbModule } from '../fb/fb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@dep/core';
import { TranslateModule } from '@ngx-translate/core';
import { FpxCoreModule } from '@fpx/core';
import { FoundationModule } from '../foundation/foundation.module';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { PfmModule } from '../pfm/pfm.module';


@NgModule({
  declarations: [
    FbSpaceContainerComponent,
    BalanceSheetComponent
  ],
  imports: [
    CommonModule,
    FbSpaceRoutingModule,
    FbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    FpxCoreModule,
    FoundationModule,
    PfmModule
    
  ]
})
export class FbSpaceModule { }
