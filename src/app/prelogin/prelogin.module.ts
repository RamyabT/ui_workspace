import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PreloginRoutingModule } from './prelogin-routing.module';
import { FpxCoreModule } from '@fpx/core';
import { MaterialModule } from '../dep/core/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KillprevioussessionService } from './killprevioussession-service/killprevioussession.service';
import { RetailKillPreviousSessionComponent } from './retail-kill-previous-session/retail-kill-previous-session.component';
import { FoundationModule } from '../foundation/foundation.module';
import { RetailChangePasswordSuccessFormComponent } from './retail-change-password-success-form/retail-change-password-success-form.component';
import { SelfservicestfaService } from './selfservicestfa-service/selfservicestfa.service';
import { IdentificationNumberControlComponent } from './identification-number-control/identification-number-control.component';
import { DepositsModule } from '../deposits/deposits.module';
import { AgmDirectionModule } from 'agm-direction';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapComponent } from './google-map/google-map.component';
import { GoogleMapService } from './google-map/services/google-map.service';
import { RetailSecurityTipsFormComponent } from './retail-security-tips-form/retail-security-tips-form.component';
import { SecuritypublishService } from './securitypublish-service/securitypublish.service';
import { RetailFaqsFormComponent } from './retail-faqs-form/retail-faqs-form.component';
import { FaqpublishService } from './faqpublish-service/faqpublish.service';
import { RetailViewOffersFormComponent } from './retail-view-offers-form/retail-view-offers-form.component';
import { OfferspublishService } from './offerspublish-service/offerspublish.service';
import { ThirdPartyModule } from '../dep/core/third-party.module';
import { GooglemapBranchComponent } from './googlemap-branch/googlemap-branch.component';
import { GooglemapBranchService } from './googlemap-branch/services/googlemap-branch.service';
import { VideopublishService } from './videopublish-service/videopublish.service';
import { RetailPromotionsFormComponent } from './retail-promotions-form/retail-promotions-form.component';
import { RetailContactBankFormComponent } from './retail-contact-bank-form/retail-contact-bank-form.component';
import { BankcontactsService } from './bankcontacts-service/bankcontacts.service';
import { TermspublishService } from './termspublish-service/termspublish.service';
import { RetailTermsAndConditionsFormComponent } from './retail-terms-and-conditions-form/retail-terms-and-conditions-form.component';
import { PreloginextensionModule } from './prelogin-extension.module';
import { OverridempinService } from './overridempin-service/overridempin.service';
import { RetailOverrideMpinComponent } from './retail-override-mpin/retail-override-mpin.component';
import { RetailMigratedUserComponent } from './retail-migrated-user/retail-migrated-user.component';
import { LoginModule } from '../login/login.module';


@NgModule({
  declarations: [ 
    RetailKillPreviousSessionComponent,
    RetailChangePasswordSuccessFormComponent,
    IdentificationNumberControlComponent,
    GoogleMapComponent,
    RetailSecurityTipsFormComponent,
    RetailFaqsFormComponent,
    RetailViewOffersFormComponent,
    GooglemapBranchComponent,
    RetailPromotionsFormComponent,
    RetailContactBankFormComponent,
    RetailTermsAndConditionsFormComponent,
    RetailOverrideMpinComponent,
    RetailMigratedUserComponent
  ],
  imports: [
    CommonModule,
    PreloginRoutingModule,
    FpxCoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    FoundationModule,
    PreloginextensionModule,
    AgmDirectionModule,
    AgmCoreModule,
    DepositsModule,
    ThirdPartyModule,
    LoginModule
  ],
  providers:[
    KillprevioussessionService,
    SelfservicestfaService,
    GoogleMapService,
    SecuritypublishService,
    FaqpublishService,
    GooglemapBranchService,
    OfferspublishService,
    VideopublishService,
    BankcontactsService,
    TermspublishService,
    OverridempinService
    // MpinRegistrationService
  ],
  exports:[
    RetailChangePasswordSuccessFormComponent,
    IdentificationNumberControlComponent,
    GoogleMapComponent,
    GooglemapBranchComponent,
    RetailOverrideMpinComponent,
    RetailMigratedUserComponent

]
})
export class PreloginModule { }
