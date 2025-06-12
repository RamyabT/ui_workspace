import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ETransfersSpaceRoutingModule } from './etransfers-space-routing.module';
import { ETransfersContainerComponent } from './e-transfers-container/e-transfers-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { MaterialModule } from '@dep/core';
import { TranslateModule } from '@ngx-translate/core';
import { FoundationModule } from '../foundation/foundation.module';
import { ETransfersModule } from '../etransfers/etransfers.module';
import { ETransfersSpaceExtensionComponents, ETransfersSpaceImportsExtension } from './etransfers-space-module-extension';


@NgModule({
  declarations: [
    ETransfersContainerComponent,
    ...ETransfersSpaceExtensionComponents
  ],
  imports: [
    CommonModule,
    ETransfersSpaceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    MaterialModule,
    TranslateModule,
    FoundationModule,
    ETransfersModule,
    ...ETransfersSpaceImportsExtension
  ]
})
export class ETransfersSpaceModule { }
