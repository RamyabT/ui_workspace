import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreloginSpaceRoutingModule } from './prelogin-space-routing.module';
import { PreloginContainerComponent } from './prelogin-container/prelogin-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { PreloginHeaderComponent } from './prelogin-header/prelogin-header.component';


@NgModule({
  declarations: [
    PreloginHeaderComponent,
    PreloginContainerComponent,
  ],
  imports: [
    CommonModule,
    PreloginSpaceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    TranslateModule
  ]
})
export class PreloginSpaceModule { }
