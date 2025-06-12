import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardsSpaceRoutingModule } from './rewards-space-routing.module';
import { RewardsContainerComponent } from './rewards-container/rewards-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@dep/core';
import { TranslateModule } from '@ngx-translate/core';
import { FpxCoreModule } from '@fpx/core';
import { RewardsModule } from '../rewards/rewards.module';


@NgModule({
  declarations: [
    RewardsContainerComponent
  ],
  imports: [
    CommonModule,
    RewardsSpaceRoutingModule,
    RewardsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    FpxCoreModule,
  ]
})
export class RewardsSpaceModule { }
