import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule, ThirdPartyModule } from '@dep/core';
import { MembershipRoutingModule } from './membership-routing.module';
import { FoundationModule } from '../foundation/foundation.module';
import { MembershipHomeComponent } from './membership-home/membership-home.component';
import { TemplatesModule } from '../templates/templates.module';
import { MembershipContextMenuComponent } from './membership-context-menu/membership-context-menu.component';
import { MembershipService } from './membership-service/membership.service';
import { RetailMembershipTransactionDtlsROGridComponent } from './retail-membership-transaction-dtls-ro-grid/retail-membership-transaction-dtls-ro-grid.component';
import { RetailmembershiptrandtlsfilterformService } from './retailmembershiptrandtlsfilterform-service/retailmembershiptrandtlsfilterform.service';
import { ViewMembershipTransactionFormComponent } from './view-membership-transaction-form/view-membership-transaction-form.component';
import { MembershiptransactiondtlsService } from './membershiptransactiondtls-service/membershiptransactiondtls.service';
import { RetailMembershipAccountDetailsFormComponent } from './retail-membership-account-details-form/retail-membership-account-details-form.component';
import { retailmembershiptrandtlsdownloadfilterformComponent } from './retailMembershipTranDtlsDownloadFilterFormComponent/retail-membership-tran-dtls-download-filter-form.component';
import { RetailmembershiptrandtlsdownloadfilterformService } from './retailmembershiptrandtlsdownloadfilterform-service/retailmembershiptrandtlsdownloadfilterform.service';
import { retailmembershiptrandtlsfilterformComponent } from './retailMembershipTranDtlsFilterForm/retail-membership-tran-dtls-filter-form.component';

@NgModule({
  declarations: [
    MembershipHomeComponent,
    MembershipContextMenuComponent,
    RetailMembershipTransactionDtlsROGridComponent,
    retailmembershiptrandtlsfilterformComponent,
    ViewMembershipTransactionFormComponent,
    RetailMembershipAccountDetailsFormComponent,
    retailmembershiptrandtlsdownloadfilterformComponent
      ],
  imports: [
    CommonModule,
    MembershipRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    TranslateModule,
    FoundationModule,
    MaterialModule,
    ThirdPartyModule,
    TemplatesModule

  ],
  providers: [
    MembershipService,
    RetailmembershiptrandtlsfilterformService,
    MembershiptransactiondtlsService,
    RetailmembershiptrandtlsdownloadfilterformService

  ],
  exports: [
    MembershipHomeComponent,
    MembershipContextMenuComponent,
    RetailMembershipTransactionDtlsROGridComponent,
    retailmembershiptrandtlsfilterformComponent,
    ViewMembershipTransactionFormComponent,
    retailmembershiptrandtlsdownloadfilterformComponent

  ]
})
export class MembershipModule { }
