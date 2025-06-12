import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutComponent } from '../app-layout/home-layout/home-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { OverviewHeaderComponent } from './overview-header/overview-header.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { TranslateModule } from '@ngx-translate/core';
import { UpcomingPaymentsWidgetComponent } from './upcoming-payments-widget/upcoming-payments-widget.component';
import { PortfolioSummaryComponent } from './portfolio-summary/portfolio-summary.component';
import { MaterialModule } from '../dep/core/material.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ThirdPartyModule } from '../dep/core/third-party.module';
import { SpendingSummaryComponent } from '../widget/spending-summary/spending-summary.component';
import { FoundationModule } from '../foundation/foundation.module';
import { CustomizeQuickActionComponent } from './customize-quick-action/customize-quick-action.component';
import { QuickActionComponent } from './quick-action/quick-action.component';
import { TransfersModule } from '../transfers/transfers.module';
import { HomeExtensionComponents } from './home-module-extension';
import { PortfolioHeaderComponent } from './portfolio-header/portfolio-header.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    HomeLayoutComponent,
    OverviewHeaderComponent,
    BalanceSheetComponent,
    UpcomingPaymentsWidgetComponent,
    PortfolioSummaryComponent,
    SpendingSummaryComponent,
    CustomizeQuickActionComponent,
    QuickActionComponent,
    PortfolioHeaderComponent,
    ...HomeExtensionComponents
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    TranslateModule,
    MaterialModule,
    FoundationModule,
    ThirdPartyModule,
    TransfersModule,
    MatTooltipModule
  ],

  exports: [
    OverviewHeaderComponent,
    BalanceSheetComponent,
    CustomizeQuickActionComponent,
    PortfolioHeaderComponent,
    ...HomeExtensionComponents
  ]
})
export class HomeModule { }
