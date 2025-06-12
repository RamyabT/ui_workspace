import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule, ThirdPartyModule } from '@dep/core';
import { CommonService } from '../foundation/validator-service/common-service';
import { FoundationModule } from '../foundation/foundation.module';
import { OnboardingModule } from '../onboarding/onboarding.module';
import { eDocumentRoutingModule } from './edocument-routing.module';
import { RetailAccountEStatementReqFormComponent } from './retailAccountEStatementReqForm/retail-account-estatement-req-form.component';
import { AccountStatementService } from './accountStatement-service/accountStatement.service';
import { eDocumentContextMenuComponent } from './edocument-context-menu/edocument-context-menu.component';
import { eDocumentAsideBarComponent } from '../layout/components/edocument-aside-bar/edocument-aside-bar.component';
import { RetailTaxformsDisplayGridComponent } from './retail-taxforms-display-grid/retail-taxforms-display-grid.component';
import { ViewTaxFormsFormComponent } from './view-tax-forms-form/view-tax-forms-form.component';
import { TaxformsService } from './taxforms-service/taxforms.service';
import { AccountsModule } from '../accounts/accounts.module';
import { RetailLoanDisclosureDisplayGridComponent } from './retail-loan-disclosure-display-grid/retail-loan-disclosure-display-grid.component';
import { ViewLoanDisclosureFormComponent } from './view-loan-disclosure-form/view-loan-disclosure-form.component';
import { LoandisclosureService } from './loandisclosure-service/loandisclosure.service';
import { RetailTaxFormFilterFormComponent } from './retail-tax-form-filter-form/retail-tax-form-filter-form.component';
import { RetailtaxformfilterformService } from './retailtaxformfilterform-service/retailtaxformfilterform.service';
import { RetailVisaEStatementReqFormComponent } from './retail-visa-estatement-req-form/retail-visa-estatement-req-form.component';
import { CreditcardStatementService } from './creditcardStatement-service/creditcardStatement.service';
import { CreditCardsModule } from '../credit-cards/credit-cards.module';
import { RetailVisaEStatementComponent } from '../edocument/RetailVisaEStatement/retail-visa-estatement-grid.component';
import { TransfersModule } from '../transfers/transfers.module';


@NgModule({
  declarations: [
    eDocumentContextMenuComponent,
    eDocumentAsideBarComponent,
   RetailTaxformsDisplayGridComponent,
   ViewTaxFormsFormComponent,
   RetailLoanDisclosureDisplayGridComponent,
   ViewLoanDisclosureFormComponent,
   RetailTaxFormFilterFormComponent,
   RetailVisaEStatementReqFormComponent,
   RetailVisaEStatementComponent,
   RetailAccountEStatementReqFormComponent
  ],
  imports: [
    CommonModule,
    eDocumentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    TranslateModule,
    FoundationModule,
    MaterialModule,
    OnboardingModule,
    ThirdPartyModule,
    CreditCardsModule,
    TransfersModule
  ],
  providers: [
    CommonService,
    TaxformsService,
    LoandisclosureService,
    RetailtaxformfilterformService,
    AccountStatementService,
    CreditcardStatementService
  ],
  exports: [
	
    eDocumentContextMenuComponent,
    eDocumentAsideBarComponent,
    RetailTaxformsDisplayGridComponent,
    ViewTaxFormsFormComponent,
    RetailLoanDisclosureDisplayGridComponent,
    ViewLoanDisclosureFormComponent,
    RetailVisaEStatementReqFormComponent,
    RetailVisaEStatementComponent,
    RetailAccountEStatementReqFormComponent
  ]
})
export class eDocumentModule { }
