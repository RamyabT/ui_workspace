import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { FpxCoreModule } from '@fpx/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { COBProductSelectionFormHelper } from './cob-product-selection-form/cob-product-selection-form.helper';
import { COBProductSelectionFormComponent } from './cob-product-selection-form/cob-product-selection-form.component';
import { ProductSelectionService } from './product-selection-service/product-selection.service';
import { ApplicantsFormComponent } from './cob-applicants-form/cob-applicants-form.component';
import { ApplicantsFormHelper } from './cob-applicants-form/cob-applicants-form.helper';
import { ApplicantsService } from './applicants-service/applicants.service';
import { VerifyOtpFormComponent } from './verify-otp-form/verify-otp-form.component';
import { VerifyOtpFormHelper } from './verify-otp-form/verify-otp-form.helper';
import { COBKeyFactsStatementsFormComponent } from './cob-key-facts-statements/cob-key-facts-statements-form.component';
import { CobPhotoIdMatchFormComponent } from './cob-photo-id-match-form/cob-photo-id-match-form.component';
import { CobPhotoIdMatchFormHelper } from './cob-photo-id-match-form/cob-photo-id-match-form.helper';
import { PhotoIdMatchService } from './photoidmatch-service/photoidmatch.service';
import { AddressDetailFormComponent } from './address-detail-form/address-detail-form.component';
import { COBApplicantAddressInfoComponent } from './cob-applicant-address-info/cob-applicant-address-info.component';
import { CobApplicantSignatureFormComponent } from './cob-applicant-signature-form/cob-applicant-signature-form.component';
import { COBEmploymentInfoFormComponent } from './cob-employment-info-form/cob-employment-info-form.component';
import { COBFatcaInfoFormComponent } from './cob-fatca-Info-form/cob-fatca-Info-form.component';
import { EmpsoiControlComponent } from './emp-soi-list-control/emp-soi-list-control.component';
import { EmployeeStatusListControlComponent } from './emp-status-list-control/emp-status-list-control.component';
import { EmploymentTypelistControlComponent } from './employment-type-list-control/employment-type-list-control.component';
import { MonthlyIncomeControlComponent } from './monthly-income-control/monthly-income-control.component';
import { othercountrytaxinfoComponent } from './othercountry-taxinfo-inputgrid/othercountry-taxinfo-inputgrid.component';
import { AddressdetailService } from './addressdetail-service/addressdetail.service';
import { ApplicantaddressinfoService } from './applicantaddressinfo-service/applicantaddressinfo.service';
import { COBEmploymentInfoFormHelper } from './cob-employment-info-form/cob-employment-info-form.helper';
import { EmploymentInfoService } from './employmentInfo-service/employmentInfo.service';
import { FatcaInfoService } from './fatcaInfo-service/fatcaInfo.service';
import { ObapplicantsignatureService } from './obapplicantsignature-service/obapplicantsignature.service';
import { CobApplicantProfileFormHelper } from './cob-applicantprofile-form/cob-applicantprofile-form.helper';
import { ObapplicantprofileService } from './obapplicantprofile-service/obapplicantprofile.service';
import { CameraService } from '../dep/smart-device/camera/camera.service';
import { COBScanYourIdComponent } from './cob-scan-your-id/cob-scan-your-id.component';
import { COBScanYourIdHelper } from './cob-scan-your-id/cob-scan-your-id.helper';
import { DocumentChecklistService } from './document-checklist-service/document-checklist-service';
import { MaterialModule } from '@dep/core';
import { CobLivenessCheckFormComponent } from './cob-liveness-check-form/cob-liveness-check-form.component';
import { CobLivenessCheckFormHelper } from './cob-liveness-check-form/cob-liveness-check-form.helper';
import { LivenessCheckServcie } from './liveness-check-service/liveness-check-service';
import { PreloginResultFormComponent } from './prelogin-result-form/prelogin-result-form.component';
import { CompanyNameControlComponent } from './company-name-control/company-name-control.component';
import { CobResumebackFormComponent } from './cob-resumeback-form/cob-resumeback-form.component';
import { ResumeOptionControlComponent } from './resume-option-control/resume-option-control.component';
import { OnboardingReferenceControlComponent } from './onboardingreference-control/onboardingreference-control.component';
import { ResumebackService } from './resumeback-service/resumeback.service';
import { EmiratesIdScanFormComponent } from './emirates-id-scan-form/emirates-id-scan-form.component';
import { PassportScanFormComponent } from './passport-scan-form/passport-scan-form.component';
import { ObVerifyTFAService } from './verifytfa-service/verify-tfa.service';
import { FoundationModule } from '../foundation/foundation.module';
import { FacetechReqServcie } from './facetecreq-service/facetechreq.servcie';
import { FatcaConfirmationComponent } from './fatca-confirmation-form/fatca-confirmation-form.component';
import { FatcaRejectedComponent } from './fatca-rejected-form/fatca-rejected-form.component';
import { FatcaConfirmationService } from './fatcaConfirmation-service/fatcaConfirmation.service';
import { FatcaRejectedService } from './fatcaRejected-service/fatcaRejected.service';
import { PreferedMailingAddressComponent } from './pref-mailing-address-form/pref-mailing-address-form.component';
import { PrefMailingAddressService } from './prefMailingAddress-service/prefMailingAddress.service';
import { RegisterDeviceFormComponent } from './register-device-form/register-device-form.component';
import { CobNfcFormComponent } from './cob-nfc-form/cob-nfc-form.component';
import { NfcService } from './nfc-service/nfc.service';
import { NfcConfirmationFormComponent } from './nfc_confirmation/nfc-confirmation-form.component';
import { OnboardingCloseFormComponent } from './onboarding-close-form/onboarding-close-form.component';
import { AdditionalInformationComponent } from './additional_information-form/Additional_information-form.component';
import { AdditionalInformationService } from './additionalInformation-service/additionalInformation.service';
import { CityDropdownControlComponent } from "./city-dropdown-control/city-dropdown-control.component";
import { CountryDropdownControlComponent } from "./country-dropdown-control/country-dropdown-control.component";
import { NationalityListControlComponent } from './nationality-list-control/nationality-list-control.component';
import { NationalityService } from './nationality-service/nationality.service';
import { COBOtherCountryTaxInfoGridComponent } from './cob-othercountry-taxinfo-inputgrid/cob-othercountry-taxinfo-inputgrid.component';
import { telephonenumberformComponent } from './telephone-number-form/telephone-number-form.component';
import { TelephonenumberService } from './telephonenumber-service/telephonenumber.service';
import { CobApplicantInfoFormComponent } from './cob-applicant-info-form/cob-applicant-info-form.component';

import { NatureOfBusListControlComponent } from './nature-of-bus-list-control/nature-of-bus-list-control.component';
import { SubEmploymentTypeListControlComponent } from './sub-emp-type-list-control/sub-emp-type-list-control.component';
import { NatureofbusService } from './natureofbus-service/natureofbus.service';
import { SubemptypeService } from './subemptype-service/subemptype.service';
import { DesignationListControlComponent } from './designation-list-control/designation-list-control.component';
import { DesignationService } from './designation-service/designation.service';
import { PositionControlComponent } from './position-control/position-control.component';
import { EmployerNameListControlComponent } from './employer-name-list-control/employer-name-list-control.component';
import { ProductSelectionTextControlComponent } from './productselection-text-control/productselection-text-control.component';
import { cobAdditionalInformationComponent } from './cobAdditionalInformation/cob-additional-information.component';
import { applyVirtualCardComponent } from './applyVirtualCard/cob-applyvirtualcard-form.component';
import { ApplyvirtualcardService } from './applyvirtualcard-service/applyvirtualcard.service';
import { employmentInfoComponent } from './employmentInfo-form/cobemploymentInfo.component';
import { WebcamModule } from 'ngx-webcam';
import { loadmoneyComponent } from './loadmoney/loadmoney.component';
import { LoadmoneyService } from './loadmoney-service/loadmoney.service';
import { cardNumberComponent } from './cardNumber/cardNumber.component';
import { CvvControlComponent } from '../credit-cards/cvv-control/cvv-control.component';
import { virtualPaymentAddressComponent } from './virtualPaymentAddress/virtualPaymentAddress.component';
import { CreditCardsModule } from '../credit-cards/credit-cards.module';
import { cobCvvControlComponent } from './cob-cvv-control/cob-cvv-control.component';
import { LoadMoneyTypeComponent } from './LoadMoneyType/LoadMoneyType.component';
import { LoadMoneyMethodComponent } from './LoadMoneyMethod/LoadMoneyMethod.component';
import { FpxCoreModule } from '@fpx/core';
import { documentChecklistComponent } from './cobDocumentChecklist/cob-document-checklist-form.component';
import { DocumentchecklistService } from './documentchecklist-service/documentchecklist.service';
import { CobDocumentChecklistRoGridComponent } from './cobDocumentChecklistRoGrid/cob-documentchecklist-ro-grid.component';
import { obvirtualcardTemplateRoGridComponent } from './virtualcardTemplateRoGrid/obvirtualcard-template-ro-grid.component';
import { ObvirtualcardtemplateService } from './obvirtualcardtemplate-service/obvirtualcardtemplate.service';
import { obvirtualcardselectionComponent } from './obVirtualcardSelection/ob-virtualcardselection-form.component';
import { VirtualcardselectionService } from './virtualcardselection-service/virtualcardselection.service';
import { OcrdataextractService } from './ocrdataextract-service/ocrdataextract.service';
import { CobTaxDetailsFormComponent } from './cob-tax-details-form/cob-tax-details-form.component';
import { CobTaxDetailsFormHelper } from './cob-tax-details-form/cob-tax-details-form.helper';
import { CobtaxdetailsService } from './cobtaxdetails-service/cobtaxdetails.service';
import { COBStagingFormComponent } from './cob-staging-form/cob-staging-form.component';
import { ResumesuccessService } from './resumesuccess-service/resumesuccess.service';
import { additionalDocumentComponent } from './additional-document/additionalDocument.component';
import { AdditionalDocumentService } from './additionalDocument-service/additionalDocument.service';
import { SharedServiceRequestModule } from '../service-request/shared-service-request.module';
@NgModule({
  declarations: [
    COBProductSelectionFormComponent,
    COBKeyFactsStatementsFormComponent,
    ApplicantsFormComponent,
    VerifyOtpFormComponent,
    CobPhotoIdMatchFormComponent,
    AddressDetailFormComponent,
    COBApplicantAddressInfoComponent,
    COBEmploymentInfoFormComponent,
    COBFatcaInfoFormComponent,
    CobApplicantSignatureFormComponent,
    EmpsoiControlComponent,
    EmployeeStatusListControlComponent,
    EmploymentTypelistControlComponent,
    MonthlyIncomeControlComponent,
    othercountrytaxinfoComponent,
    COBScanYourIdComponent,
    CobLivenessCheckFormComponent,
    PreloginResultFormComponent,
    CompanyNameControlComponent,
    CobResumebackFormComponent,
    ResumeOptionControlComponent,
    OnboardingReferenceControlComponent,
    EmiratesIdScanFormComponent,
    PassportScanFormComponent,
    FatcaRejectedComponent,
    FatcaConfirmationComponent,
    PreferedMailingAddressComponent,
    RegisterDeviceFormComponent,
    CobNfcFormComponent,
    NfcConfirmationFormComponent,
    OnboardingCloseFormComponent,
    AdditionalInformationComponent,
    CobTaxDetailsFormComponent,
    CityDropdownControlComponent,
    CountryDropdownControlComponent,
    NationalityListControlComponent,
    COBOtherCountryTaxInfoGridComponent,
    telephonenumberformComponent,
    employmentInfoComponent,
    NatureOfBusListControlComponent,
    SubEmploymentTypeListControlComponent,
    DesignationListControlComponent,
    CobApplicantInfoFormComponent,
    ProductSelectionTextControlComponent,
    EmployerNameListControlComponent,
    applyVirtualCardComponent,
    cobAdditionalInformationComponent,
    PositionControlComponent,
    cardNumberComponent,
    virtualPaymentAddressComponent,
    cobCvvControlComponent,
    LoadMoneyTypeComponent,
    LoadMoneyMethodComponent,
    loadmoneyComponent,
    documentChecklistComponent,
    CobDocumentChecklistRoGridComponent,
    obvirtualcardTemplateRoGridComponent,
    obvirtualcardselectionComponent,
    COBStagingFormComponent,
    additionalDocumentComponent
  ],
  imports: [
    CommonModule,
    OnboardingRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FpxCoreModule,
    MaterialModule,
    TranslateModule,
    FoundationModule,
    CommonModule,
    WebcamModule,
    SharedServiceRequestModule
  ],
  providers: [
    TranslateService,
    COBProductSelectionFormHelper, ProductSelectionService,
    ApplicantsFormHelper, ApplicantsService,
    VerifyOtpFormHelper, ObVerifyTFAService,
    CobPhotoIdMatchFormHelper, PhotoIdMatchService,
    ApplicantaddressinfoService, AddressdetailService,
    COBEmploymentInfoFormHelper, EmploymentInfoService,
    FatcaInfoService,
    ObapplicantsignatureService,
    CobApplicantProfileFormHelper, ObapplicantprofileService,
    CameraService,
    COBScanYourIdHelper, DocumentChecklistService,
    CobLivenessCheckFormHelper, LivenessCheckServcie,
    ResumebackService,
    FacetechReqServcie,
    FatcaRejectedService,
    FatcaConfirmationService,
    PrefMailingAddressService,
    NfcService,
    AdditionalInformationService,
    CobtaxdetailsService,
    NationalityService,
    TelephonenumberService,
    NatureofbusService,
    SubemptypeService,
    DesignationService,
    ApplyvirtualcardService,
    CobTaxDetailsFormHelper,
    LoadmoneyService,
    DocumentchecklistService,
    ObvirtualcardtemplateService,
    VirtualcardselectionService,
    OcrdataextractService,
    ResumesuccessService,
    AdditionalDocumentService,
  ],
  exports: [
    COBProductSelectionFormComponent,
    COBKeyFactsStatementsFormComponent,
    ApplicantsFormComponent,
    VerifyOtpFormComponent,
    CobPhotoIdMatchFormComponent,
    AddressDetailFormComponent,
    COBApplicantAddressInfoComponent,
    COBEmploymentInfoFormComponent,
    COBFatcaInfoFormComponent,
    CobApplicantSignatureFormComponent,
    EmpsoiControlComponent,
    EmployeeStatusListControlComponent,
    EmploymentTypelistControlComponent,
    MonthlyIncomeControlComponent,
    othercountrytaxinfoComponent,
    COBScanYourIdComponent,
    CobLivenessCheckFormComponent,
    PreloginResultFormComponent,
    CompanyNameControlComponent,
    CobResumebackFormComponent,
    ResumeOptionControlComponent,
    OnboardingReferenceControlComponent,
    EmiratesIdScanFormComponent,
    PassportScanFormComponent,
    FatcaRejectedComponent,
    FatcaConfirmationComponent,
    PreferedMailingAddressComponent,
    RegisterDeviceFormComponent,
    CobNfcFormComponent,
    OnboardingCloseFormComponent,
    AdditionalInformationComponent,
    CobTaxDetailsFormComponent,
    CityDropdownControlComponent,
    CountryDropdownControlComponent,
    NationalityListControlComponent,
    telephonenumberformComponent,
    employmentInfoComponent,
    NatureOfBusListControlComponent,
    SubEmploymentTypeListControlComponent,
    CobApplicantInfoFormComponent,
    DesignationListControlComponent,
    ProductSelectionTextControlComponent,
    applyVirtualCardComponent,
    cobAdditionalInformationComponent,
    PositionControlComponent,
    cardNumberComponent,
    virtualPaymentAddressComponent,
    cobCvvControlComponent,
    loadmoneyComponent,
    LoadMoneyMethodComponent,
    loadmoneyComponent,
    documentChecklistComponent,
    CobDocumentChecklistRoGridComponent,
    obvirtualcardTemplateRoGridComponent,
    obvirtualcardselectionComponent,
    additionalDocumentComponent

  ],
})
export class OnboardingModule { }
