import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsSpaceRoutingModule } from './settings-space-routing.module';
import { SettingsContainerComponent } from './settings-container/settings-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../dep/core/material.module';
import { FoundationModule } from '../foundation/foundation.module';
import { SettingsModule } from '../settings/settings.module';
import { SettingsContextualMenuComponent } from './settings-contextual-menu/settings-contextual-menu.component';


@NgModule({
  declarations: [
    SettingsContainerComponent,
    SettingsContextualMenuComponent
  ],
  imports: [
    CommonModule,
    SettingsSpaceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    TranslateModule,
    FoundationModule,
    MaterialModule,
    SettingsModule
  ]
})
export class SettingsSpaceModule { }
