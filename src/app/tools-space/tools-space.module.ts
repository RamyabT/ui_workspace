import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsSpaceRoutingModule } from './tools-space-routing.module';
import { ToolsContainerComponent } from './tools-container/tools-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@dep/core';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { FoundationModule } from '../foundation/foundation.module';
import { ToolsContextualMenuComponent } from './tools-contextual-menu/tools-contextual-menu.component';


@NgModule({
  declarations: [
    ToolsContainerComponent,
    ToolsContextualMenuComponent
  ],
  imports: [
    CommonModule,
    ToolsSpaceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    TranslateModule,
    FoundationModule,
    MaterialModule,
  ]
})
export class ToolsSpaceModule { }
