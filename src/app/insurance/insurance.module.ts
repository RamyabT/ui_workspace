import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule, ThirdPartyModule } from '@dep/core';
import { CobaddressinfoService } from '../foundation/cobaddressinfo-service/cobaddressinfo.service';
import { InsuranceRoutingModule } from './insurance-routing.module';

import { FoundationModule } from '../foundation/foundation.module';
import { OtherRequestModule } from '../other-request/other-request.module';

import { UtilityModule } from '../utility/utility.module';
import { InsuranceContainerComponent } from '../insurance-space/insurance-container/insurance-container.component';
import { InsuranceSummaryCardCarouselComponent } from './insurance-summary-card-carousel/insurance-summary-card-carousel.component';
import { InsuranceAdsComponent } from './insurance-ads-card/insurance-ads.component';
import { InsuranceSummaryCardComponent } from './insurance-summary-card/insurance-summary-card.component';
import { InsuranceQuickActionsComponent } from './insurance-quick-actions/insurance-quick-actions.component';
import { RetailInsuranceDetailsFormComponent } from './retail-insurance-details-form/retail-insurance-details-form.component';
import { InsuranceContextMenuComponent } from './insurance-context-menu/insurance-context-menu.component';
import { RetailPayInsuranceComponent } from './retail-pay-insurance/retail-pay-insurance.component';
import { PayinsuranceService } from './payinsurance-service/payinsurance.service';
import { RetailPaymentMethodRadioComponent } from './retail-payment-method-radio/retail-payment-method-radio.component';
import { RetailAutopayControlComponent } from './retail-autopay-control/retail-autopay-control.component';
import { WalletModule } from '../wallet/wallet.module';
import { RetailPaymentMethodRadioService } from './retail-payment-method-radio/retail-payment-method-radio.service';
import { SchautopayreqService } from './schautopayreq-service/schautopayreq.service';
import { InsuranceConfirmationReceiptFormComponent } from './insurance-confirmation-receipt-form/insurance-confirmation-receipt-form.component';
const INSURANCE_COMPONENTS = [
  InsuranceContainerComponent,
  InsuranceSummaryCardCarouselComponent,
  InsuranceAdsComponent,
  InsuranceSummaryCardComponent,
  InsuranceQuickActionsComponent,
  RetailInsuranceDetailsFormComponent,
  InsuranceContextMenuComponent,
  RetailPayInsuranceComponent,
  RetailPaymentMethodRadioComponent,
  RetailAutopayControlComponent,
  RetailPaymentMethodRadioComponent,
  InsuranceConfirmationReceiptFormComponent
]

@NgModule({
  declarations: [
    ...INSURANCE_COMPONENTS
   ],
  imports: [
    CommonModule,
    InsuranceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    TranslateModule,
    FoundationModule,
    MaterialModule,
    ThirdPartyModule,
    OtherRequestModule,
    UtilityModule,
    WalletModule
      ],
  providers: [
    PayinsuranceService,
    RetailPaymentMethodRadioService,
    SchautopayreqService
  ],
  exports: [
    ...INSURANCE_COMPONENTS
  ]
})
export class InsuranceModule { }
