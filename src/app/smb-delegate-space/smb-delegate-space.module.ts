import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmbDelegateSpaceRoutingModule } from './smb-delegate-space-routing.module';
import { DelegateSpaceContainerComponent } from './delegate-space-container/delegate-space-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@dep/core';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { FoundationModule } from '../foundation/foundation.module';
import { SmbModule } from '../smb/smb.module';


@NgModule({
  declarations: [
    DelegateSpaceContainerComponent
  ],
  imports: [
    CommonModule,
    SmbDelegateSpaceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    MaterialModule,
    TranslateModule,
    FoundationModule,
    SmbModule
  ]
})
export class SmbDelegateSpaceModule { }
