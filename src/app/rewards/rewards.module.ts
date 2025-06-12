import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardsRoutingModule } from './rewards-routing.module';
import { RewardsTransactionSummaryComponent } from './rewards-transaction-summary/rewards-transaction-summary.component';
import { RewardsTransactionRoGridComponent } from './rewards-transaction-ro-grid/rewards-transaction-ro-grid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@dep/core';
import { TranslateModule } from '@ngx-translate/core';
import { FpxCoreModule } from '@fpx/core';


 const REWARDS_COMPONENTS = [
    RewardsTransactionSummaryComponent,
    RewardsTransactionRoGridComponent
  ]

@NgModule({
 
   declarations: [
    ...REWARDS_COMPONENTS
  ],
 
  imports: [
    CommonModule,
    RewardsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    FpxCoreModule,
  ],
  exports:[
    ...REWARDS_COMPONENTS
  ]
})
export class RewardsModule { }
