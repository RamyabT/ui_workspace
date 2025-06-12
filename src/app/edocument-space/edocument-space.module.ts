import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { eDocumentSpaceRoutingModule } from './edocument-space-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FpxCoreModule } from '@fpx/core';
import { MaterialModule } from '../dep/core/material.module';
import { FoundationModule } from '../foundation/foundation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { eDocumentSpaceExtensionComponents, eDocumentSpaceImportsExtension } from './edocument-space-module-extension';
import { eDocumentContainerComponent } from './edocument-container/edocument-container.component';
import { eDocumentNavigationFormComponent } from './edocument-navigation-form/edocument-navigation-form.component';
import { eDocumentModule } from '../edocument/edocument.module';

@NgModule({
  declarations: [
    eDocumentContainerComponent,
    eDocumentNavigationFormComponent,
    ...eDocumentSpaceExtensionComponents
  ],
  imports: [
    CommonModule,
    eDocumentSpaceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    FpxCoreModule,
    MaterialModule,
    FoundationModule,
    eDocumentModule,
    ...eDocumentSpaceImportsExtension
  ]
})
export class eDocumentSpaceModule { }
