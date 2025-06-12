import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaturityInstructionsListControlComponent } from './maturity-instructions-list-control/maturity-instructions-list-control.component';
import { DepositsRoutingModule } from './deposits-routing.module';
import { RetailChangeMaturityInstructionsFormComponent } from './retail-change-maturity-instructions-form/retail-change-maturity-instructions-form.component';
import { MaturityinstructionService } from './maturityinstruction-service/maturityinstruction.service';
import { DepositAccountListControlComponent } from './deposit-acc-number-list-control/deposit-acc-number-list-control.component';
import { TransferService } from '../foundation/validator-service/transfers-service';
import { DepositService } from '../foundation/validator-service/deposits-service';
import { DepositsProductsComponent } from './deposits-products/deposits-products.component';
import { DepositProductsService } from './depositProducts-service/depositProducts.service';
import { DepositrequestService } from './depositrequest-service/depositrequest.service';
import { RetailDepositRequestFormComponent } from './retail-deposit-request-form/retail-deposit-request-form.component';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../dep/core/material.module';
import { RetailDepositDetailsFormComponent } from './retail-deposit-details-form/retail-deposit-details-form.component';
import { DepositsProductsCardCarouselComponent } from './deposits-products-card-carousel/deposits-products-card-carousel.component';
import { DepositsContextualMenuComponent } from './deposits-contextual-menu/deposits-contextual-menu.component';
import { DepositsProductCardComponent } from './deposits-product-card/deposits-product-card.component';
import { DepositsSummaryCardCarouselComponent } from './deposits-summary-card-carousel/deposits-summary-card-carousel.component';
import { RetailDepositsSummaryRoGridComponent } from './retail-deposits-summary-ro-grid/retail-deposits-summary-ro-grid.component';
import { DepositsSummaryCardComponent } from './deposits-summary-card/deposits-summary-card.component';
import { DepositsService } from './deposits-service/deposits.service';
import { ThirdPartyModule } from '../dep/core/third-party.module';
import { DepositsHomeComponent } from './deposits-home/deposits-home.component';
import { FoundationModule } from '../foundation/foundation.module';
import { DepositContextMenuComponent } from './deposit-context-menu/deposit-context-menu.component';
import { DepositsAccountsListComponent } from './deposits-accounts-list/deposits-accounts-list.component';
import { DepositsExtensionServices, DepositsImportExtension } from './deposits-extension';
import { DepositsLinkAccountsListComponent } from './deposits-link-accounts-list/deposits-link-accounts-list.component';
import { DepositsMobQuickActionsComponent } from './deposits-mob-quick-actions/deposits-mob-quick-actions.component';

@NgModule({
  declarations: [
    MaturityInstructionsListControlComponent,
    RetailChangeMaturityInstructionsFormComponent,
    DepositAccountListControlComponent,
    DepositsProductsComponent,
    RetailDepositRequestFormComponent,
    RetailDepositDetailsFormComponent,
    DepositsProductsCardCarouselComponent,
    DepositsContextualMenuComponent,
    DepositsProductCardComponent,
    DepositsSummaryCardCarouselComponent,
    RetailDepositsSummaryRoGridComponent,
    DepositsSummaryCardComponent,
    DepositsHomeComponent,
    DepositContextMenuComponent,
    DepositsAccountsListComponent,
    DepositsLinkAccountsListComponent,
    ...DepositsImportExtension,
    DepositsMobQuickActionsComponent
  ],
  providers: [
    MaturityinstructionService,
    DepositProductsService,
    DepositrequestService,
    DepositService,
    TransferService,
    DepositsService,
    ...DepositsExtensionServices
  ],
  imports: [
    CommonModule,
    DepositsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FoundationModule,
    FpxCoreModule,
    TranslateModule,
    MaterialModule,
    ThirdPartyModule
  ],
  exports: [
    DepositAccountListControlComponent,
    MaturityInstructionsListControlComponent,
    RetailChangeMaturityInstructionsFormComponent,
    DepositAccountListControlComponent,
    DepositsProductsComponent,
    RetailDepositRequestFormComponent,
    DepositsSummaryCardCarouselComponent,
    RetailDepositsSummaryRoGridComponent,
    DepositsSummaryCardComponent,
    DepositsProductsCardCarouselComponent,
    DepositsContextualMenuComponent,
    DepositsProductCardComponent,
    DepositContextMenuComponent,
    DepositsAccountsListComponent,
    RetailDepositDetailsFormComponent,
    DepositsLinkAccountsListComponent,
    ...DepositsImportExtension
  ]
})
export class DepositsModule { }
