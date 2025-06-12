import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { COBProductSelectionFormComponent } from './cob-product-selection-form/cob-product-selection-form.component';
import { ApplicantsFormComponent } from './cob-applicants-form/cob-applicants-form.component';
import { VerifyOtpFormComponent } from './verify-otp-form/verify-otp-form.component';
import { COBKeyFactsStatementsFormComponent } from './cob-key-facts-statements/cob-key-facts-statements-form.component';
import { CobPhotoIdMatchFormComponent } from './cob-photo-id-match-form/cob-photo-id-match-form.component';
import { COBApplicantAddressInfoComponent } from './cob-applicant-address-info/cob-applicant-address-info.component';
import { CobApplicantSignatureFormComponent } from './cob-applicant-signature-form/cob-applicant-signature-form.component';
import { COBEmploymentInfoFormComponent } from './cob-employment-info-form/cob-employment-info-form.component';
import { COBFatcaInfoFormComponent } from './cob-fatca-Info-form/cob-fatca-Info-form.component';
import { CobApplicantProfileFormComponent } from './cob-applicantprofile-form/cob-applicantprofile-form.component';
import { COBScanYourIdComponent } from './cob-scan-your-id/cob-scan-your-id.component';
import { CobLivenessCheckFormComponent } from './cob-liveness-check-form/cob-liveness-check-form.component';
import { PreloginResultFormComponent } from './prelogin-result-form/prelogin-result-form.component';
import { CobResumebackFormComponent } from './cob-resumeback-form/cob-resumeback-form.component';
import { EmiratesIdScanFormComponent } from './emirates-id-scan-form/emirates-id-scan-form.component';
import { PassportScanFormComponent } from './passport-scan-form/passport-scan-form.component';
import { FatcaConfirmationComponent } from './fatca-confirmation-form/fatca-confirmation-form.component';
import { FatcaRejectedComponent } from './fatca-rejected-form/fatca-rejected-form.component';
import { PreferedMailingAddressComponent } from './pref-mailing-address-form/pref-mailing-address-form.component';
import { RegisterDeviceFormComponent } from './register-device-form/register-device-form.component';
import { CobNfcFormComponent } from './cob-nfc-form/cob-nfc-form.component';
import { OnboardingCloseFormComponent } from './onboarding-close-form/onboarding-close-form.component';
import { AdditionalInformationComponent } from './additional_information-form/Additional_information-form.component';
import { CobApplicantInfoFormComponent } from './cob-applicant-info-form/cob-applicant-info-form.component';
import { applyVirtualCardComponent } from './applyVirtualCard/cob-applyvirtualcard-form.component';

import { cobAdditionalInformationComponent } from './cobAdditionalInformation/cob-additional-information.component';
import { employmentInfoComponent } from './employmentInfo-form/cobemploymentInfo.component';
import { loadmoneyComponent } from './loadmoney/loadmoney.component';
import { documentChecklistComponent } from './cobDocumentChecklist/cob-document-checklist-form.component';

import { obvirtualcardselectionComponent } from './obVirtualcardSelection/ob-virtualcardselection-form.component';
import { StagingConfirmationReceiptFormComponent } from '../staging/staging-confirmation-receipt-form/staging-confirmation-receipt-form.component';
import { CobTaxDetailsFormComponent } from './cob-tax-details-form/cob-tax-details-form.component';
import { COBStagingFormComponent } from './cob-staging-form/cob-staging-form.component';
import { additionalDocumentComponent } from './additional-document/additionalDocument.component';
import { RetailServiceRequestTrackerFormComponent } from '../service-request/retail-service-request-tracker-form/retail-service-request-tracker-form.component';
const routes: Routes = [
  // {
  //   path: '',
  //   component: COBProductSelectionFormComponent,
  //   data: { title: "COBProductSelectionForm.title", module: "onboarding" }
  // },
  {
    path: 'product-selection',
    component: COBProductSelectionFormComponent,
    data: { title: "COBProductSelectionForm.title", module: "onboarding" }
  },
  {
    path: 'kfs',
    component: COBKeyFactsStatementsFormComponent,
    data: { title: "COBKeyFactsStatementsForm.title", module: "onboarding" }
  },
  {
    path: 'cob-applicant-form',
    component: CobApplicantInfoFormComponent,
    data: { title: "ApplicantsForm.title", module: "onboarding" }
  },
  {
    path: 'verify-tfa',
    component: VerifyOtpFormComponent,
    data: { title: "verifyTfa.title", module: "onboarding" }
  },
  {
    path: 'document-checklist',
    component: documentChecklistComponent,
    data: { title: "documentChecklist.title", module: "onboarding" }
  },
  {
    path: 'scan-your-id',
    component: COBScanYourIdComponent,
    data: { title: "scanYourId.title", module: "onboarding" }
  },
  {
    path: 'cob-applicant-address-info',
    component: COBApplicantAddressInfoComponent,
    data: { title: "COBApplicantAddressInfo.title", module: "onboarding", serviceCode: 'RETAILADDRESSINFO' }
  },
  {
    path: 'cob-employment-info-form',
    component: COBEmploymentInfoFormComponent,
    data: { title: "COBEmploymentInfoForm.title", module: "onboarding", serviceCode: 'RETAILEMPLOYMENTINFO' }
  },
  // {
  //   path: 'employmentinfo-form',
  //   component: COBEmploymentInfoFormComponent,
  //   data: { title: "COBEmploymentInfoForm.title", module: "onboarding" , serviceCode: 'RETAILEMPLOYMENTINFO'}
  // },
  {
    path: 'cob-fatca-Info-form',
    component: COBFatcaInfoFormComponent,
    data: { title: "COBFatcaInfoForm.title", module: "onboarding" }
  },
  {
    path: 'cob-liveness-check',
    component: CobLivenessCheckFormComponent,
    data: { title: "COBLivenessCheck.title", module: "onboarding" }
  },
  {
    path: 'cob-applicant-signature-form',
    component: CobApplicantSignatureFormComponent,
    data: { title: "CobApplicantSignatureForm.title", module: "onboarding" }
  },
  {
    path: 'cob-applicantprofile-form',
    component: CobApplicantProfileFormComponent,
    data: { title: "CobApplicantProfileForm.title", module: "onboarding" }
  },
  {
    path: 'result-page',
    component: PreloginResultFormComponent,
    data: { title: "preloginResultForm.title", module: "onboarding" }
  },
  {
    path: 'resume-back',
    component: CobResumebackFormComponent,
    data: { title: "CobResumebackForm.title", module: "onboarding" }
  },
  {
    path: 'verify-mobile',
    component: VerifyOtpFormComponent,
    data: { title: "verifyTfa.title", module: "onboarding" }
  },
  {
    path: 'fatca-rejected-form',
    component: FatcaRejectedComponent,
    data: { title: "fatcarejected.title", module: "onboarding" }
  },
  {
    path: 'fatca-confirmation-form',
    component: FatcaConfirmationComponent,
    data: { title: "fatcaconfirmation.title", module: "onboarding" }
  },
  // {
  //   path: 'pref-mailing-address-form',
  //   component: PreferedMailingAddressComponent,
  //   data: { title: "PreferedMailingAddress.title", module: "onboarding" }
  // },
  {
    path: 'register-device',
    component: RegisterDeviceFormComponent,
    data: { title: "registerDeviceForm.title", module: "onboarding" }
  },
  {
    path: 'cob-nfc-form',
    component: CobNfcFormComponent,
    data: { title: "CobNfcForm.title", module: "onboarding" }
  },
  {
    path: 'close-form',
    component: OnboardingCloseFormComponent,
    data: { title: "OnboardingCloseForm.title", module: "onboarding" }
  },

  {
    path: 'cob-virtualcard-selection',
    component: obvirtualcardselectionComponent,
    data: { title: "obvirtualcardselection.title", module: "onboarding" }
  },
  {
    path: 'Additional_information-form',
    component: AdditionalInformationComponent,
    data: { title: "AdditionalInformation.title", module: ' OnboardingModule' }
  },
  {
    path: 'cob-Additional-info-form',
    component: cobAdditionalInformationComponent,
    data: { title: "cobAdditionalInformation.title", module: ' OnboardingModule' }
  },
  {
    path: 'additional-document',
    component: additionalDocumentComponent,
    data: { title: "AdditionalPassportCapture.title", module: ' OnboardingModule' }
  },
  {
    path: 'cob-tax-details-form',
    component: CobTaxDetailsFormComponent,
    data: { title: "COBTaxDetailsForm.title", module: ' onboarding' }
  },
  {
    path: 'cob-virtual-card-form',
    component: applyVirtualCardComponent,
    data: { title: "applyVirtualCard.title", module: ' OnboardingModule' }
  },
  {
    path: 'cob-load-money',
    component: loadmoneyComponent,
    data: { title: "loadmoney.title", module: ' OnboardingModule' }
  },
  {
    path: 'cob-failure-result',
    component: StagingConfirmationReceiptFormComponent,
    data: { title: 'onboardingError.title', module: "onboarding" }
  },
  {
    path: 'photo-id-match',
    component: CobPhotoIdMatchFormComponent,
    data: { title: "cobPhotoIdMatch.title", module: "onboarding", serviceCode: 'RETAILNATIONALIDSCAN' }
  },
  {
    path: 'passport-scan',
    component: CobPhotoIdMatchFormComponent,
    data: { title: "cobPassportScan.title", module: "onboarding", serviceCode: 'RETAILPASSPORTSCAN' }
  },
  {
    path: 'additional-passport-scan',
    component: CobPhotoIdMatchFormComponent,
    data: { title: "cobAdditionalPassportScan.title", module: "onboarding", serviceCode: 'RETAILADDITIONALPASSPORTSCAN' }
  },
  {
    path: 'emirates-id-match',
    component: CobPhotoIdMatchFormComponent,
    data: { title: "emiratesId.title", module: "onboarding", serviceCode: 'RETAILEMIRATESIDSCAN' }
  },
  {
    path: 'driver-license',
    component: CobPhotoIdMatchFormComponent,
    data: { title: "driverLicense.title", module: "onboarding", serviceCode: 'RETAILDRIVERLICENSESCAN' }
  },
  {
    path: 'national-id-match',
    component: CobPhotoIdMatchFormComponent,
    data: { title: "nationalId.title", module: "onboarding", serviceCode: 'RETAILNATIONALIDSCAN' }
  },
  {
    path: 'cob-staging-form',
    component: COBStagingFormComponent,
    data: { title: "COBStagingForm.title", module: ' OnboardingModule' }
  },
  {
    path: 'service-request-tracker',
    component: RetailServiceRequestTrackerFormComponent,
    data: { title: "COBServiceRequestTrackerForm.title", module: ' OnboardingModule' }
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule { }
