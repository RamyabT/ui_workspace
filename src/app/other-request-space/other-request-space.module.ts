import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherRequestSpaceRoutingModule } from './other-request-space-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../dep/core/material.module';
import { FoundationModule } from '../foundation/foundation.module';
import { OtherRequestContextualMenuComponent } from './other-request-contextual-menu/other-request-contextual-menu.component';
import { OtherRequestContainerComponent } from './other-request-container/other-request-container.component';
import { OtherRequestModule } from '../other-request/other-request.module';


@NgModule({
  declarations: [
    OtherRequestContainerComponent,
    OtherRequestContextualMenuComponent
  ],
  imports: [
    CommonModule,
    OtherRequestSpaceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    TranslateModule,
    FoundationModule,
    MaterialModule,
    OtherRequestModule
  ]
})
export class OtherRequestSpaceModule { }
