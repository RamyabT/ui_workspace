import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FpxCoreModule } from "@fpx/core";
import { TranslateModule } from "@ngx-translate/core";
import { DepCoreModule } from "../dep/core/dep-core.module";
import { MaterialModule } from "../dep/core/material.module";
import { FoundationModule } from "../foundation/foundation.module";
import { OtherRequestRoutingModule } from "./other-request-routing.module";
import { NoLiabilityletterService } from "../service-request/noLiabilityletter-service/noLiabilityletter.service";
import { TaxstatementreqService } from "./taxstatementreq-service/taxstatementreq.service";
import { AdHocReasonControlComponent } from "./adhoc-reason-control/adhoc-reason-control.component";
import { BalanceConfirmationDetailsComponent } from "./balance-confirmation-details-control/balance-confirmation-details-control.component";
import { BalanceConfirmationReqComponent } from "./balance-confirmation-req-form/balance-confirmation-req-form.component";
import { BalanceConfirmationReqService } from "./balanceConfirmationReq-service/BalanceConfirmationReq.service";
import { IBANLetterComponent } from "./iban-letter-control/iban-letter-control.component";
import { IbanLetterReqService } from "./ibanLetterReq-service/ibanLetterReq.service";
import { LiabilityReasonControlComponent } from "./liability-reason-control/liability-reason-control.component";
import { LiabilityLetterService } from "./liabilityLetter-service/liabilityLetter.service";
import { RetailIBANLetterReqFormComponent } from "./retail-iban-letter-req-form/retail-iban-letter-req-form.component";
import { RetailLiabilityLetterFormComponent } from "./retail-liability-letter-form/retail-liability-letter.component";
import { RetailNoLiabilityLetterComponent } from "./retail-no-liability-letter-form/retail-no-liability-letter-form.component";
import { retailTaxRegistrationNumberComponent } from "./retail-tax-registration-number/retail-tax-registration-number.component";
import { RetailTaxStatementReqComponent } from "./retail-tax-statement-req/retail-tax-statement-req.component";
import { TaxStatementDocUploadComponent } from "./tax-statement-doc-upload-control/tax-statement-doc-upload-control.component";
import { TaxstatementdocuploadService } from "./taxstatementdocupload-service/taxstatementdocupload.service";
import { OtherReasonControlComponent } from "./otherReason-control/otherReason-control.component";
import { AcknowledgementControlComponent } from "./acknowledgement-control/acknowledgement-control.component";
import { ServiceReqDeliveryOptionControlComponent } from "./service-req-delivery-option-control/service-req-delivery-option-control.component";
import { StmtDeliveryOptionControlComponent } from "./stmt-deliveryOption-control/stmt-deliveryOption-control.component";
import { RequestForControlComponent } from "./requestFor-control/requestFor-control.component";
import { retailForYearComponent } from "../service-request/retail-for-year/retail-for-year.component";
import { letterForComponent } from "../service-request/letter-for-control/letter-for-control.component";
import { ConfirmationReceiptFormComponent } from "./confirmation-receipt-form/confirmation-receipt-form.component";
import { MonthComponent } from "./for-month-control/for-month-control.component";
import { RetailBusinessDDReqFormComponent } from "./retail-business-ddreq-form/retail-business-ddreq-form.component";
import { RetailBusinessDDReqInfoFormComponent } from "./retail-business-ddreq-info-form/retail-business-ddreq-info-form.component";
import { RetailIndIndividualsDDReqFormComponent } from "./retail-Individual-ddreq-form/retail-Individual-ddreq-form.component";
import { RetailIndividualDDReqInfoFormComponent } from "./retail-individual-ddreq-info-form/retail-individual-ddreq-info-form.component";
import { BusinessddreqService } from "./businessddreq-service/businessddreq.service";
import { notifygoingoverseasComponent } from './retail-notify-going-overseas/retail-notify-going-overseas.component';
import { NotifygoingoverseasService } from './notifygoingoverseas-service/notifygoingoverseas.service';
import { FbModule } from "../fb/fb.module";
import { AccountsModule } from "../accounts/accounts.module";
import { RemarksControlComponent } from "./remarks-control/remarks-control.component";
// import { RemarksControlComponent } from "../foundation/remarks-control/remarks-control.component";

@NgModule({
  declarations: [
    AdHocReasonControlComponent,
    RetailIBANLetterReqFormComponent,
    RetailLiabilityLetterFormComponent,
    LiabilityReasonControlComponent,
    RetailNoLiabilityLetterComponent,
    retailTaxRegistrationNumberComponent,
    RetailTaxStatementReqComponent,
    TaxStatementDocUploadComponent,
    IBANLetterComponent,
    BalanceConfirmationReqComponent,
    BalanceConfirmationDetailsComponent,
    OtherReasonControlComponent,
    AcknowledgementControlComponent,
    ServiceReqDeliveryOptionControlComponent,
    StmtDeliveryOptionControlComponent,
    RequestForControlComponent,
    retailForYearComponent,
    letterForComponent,
    ConfirmationReceiptFormComponent,
     RetailBusinessDDReqInfoFormComponent,
    RetailBusinessDDReqFormComponent,
    RetailIndIndividualsDDReqFormComponent,
    RetailIndividualDDReqInfoFormComponent,
    MonthComponent,
    notifygoingoverseasComponent,
    RemarksControlComponent

  ],
  imports: [
    CommonModule,
    OtherRequestRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    TranslateModule,
    FoundationModule,
    MaterialModule,
    DepCoreModule
    // AccountsModule
   // FbModule
  ],
  providers: [
    IbanLetterReqService,
     LiabilityLetterService,
    NoLiabilityletterService,
    BalanceConfirmationReqService,
    TaxstatementreqService,
    BusinessddreqService,
    TaxstatementdocuploadService,
    NotifygoingoverseasService,
    

  ],
  exports: [
    AdHocReasonControlComponent,
    RetailIBANLetterReqFormComponent,
    RetailLiabilityLetterFormComponent,
    LiabilityReasonControlComponent,
    RetailNoLiabilityLetterComponent,
    retailTaxRegistrationNumberComponent,
    RetailTaxStatementReqComponent,
    TaxStatementDocUploadComponent,
    IBANLetterComponent,
    BalanceConfirmationReqComponent,
    BalanceConfirmationDetailsComponent,
    OtherReasonControlComponent,
    AcknowledgementControlComponent,
    ServiceReqDeliveryOptionControlComponent,
    StmtDeliveryOptionControlComponent,
    RequestForControlComponent,
    retailForYearComponent,
    letterForComponent,
    ConfirmationReceiptFormComponent,
     RetailBusinessDDReqInfoFormComponent,
    RetailBusinessDDReqFormComponent,
    RetailIndIndividualsDDReqFormComponent,
    RetailIndividualDDReqInfoFormComponent,
    MonthComponent,
    notifygoingoverseasComponent,
    RemarksControlComponent
  ]
})
export class OtherRequestModule { }
