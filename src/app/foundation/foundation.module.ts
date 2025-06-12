import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchesListControlComponent } from './branches-list-control/branches-list-control.component';
import { FpxCoreModule } from '@fpx/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MaterialModule,ThirdPartyModule } from '@dep/core';
import { RequestDateControlComponent } from './request-date-control/request-date-control.component';
import { VerifyOtpFormComponent } from './verify-otp-form/verify-otp-form.component';
import { AccDeliveryOptionsControlComponent } from './acc-delivery-options-control/acc-delivery-options-control.component';
import { AccountNumberListControlComponent } from './account-number-list-control/account-number-list-control.component';
import { ChargesControlComponent } from './charges-control/charges-control.component';
import { CurrencyListControlComponent } from './currency-list-control/currency-list-control.component';
import { EmailControlComponent } from './email-control/email-control.component';
import { EnabledFlagControlComponent } from './enabled-flag-control/enabled-flag-control.component';
import { MobileNumberControlComponent } from './mobile-number-control/mobile-number-control.component';
import { NameControlComponent } from './name-control/name-control.component';
import { FoundationRoutingModule } from './foundation-routing.module';
import { RetailAddressDetailsFormComponent } from './retail-address-details-form/retail-address-details-form.component';
import { CobaddressinfoService } from './cobaddressinfo-service/cobaddressinfo.service';
import { TermsConditionsControlComponent } from './terms-control/terms-control.component';
import { TranslateModule } from '@ngx-translate/core';
import { AddressControlComponent } from './address-control/address-control.component';
import { BuildingIdControlComponent } from './building-id-control/building-id-control.component';
import { BuildingNameControlComponent } from './building-name-control/building-name-control.component';
import { RemarksControlComponent } from './remarks-control/remarks-control.component';
import { SafeHtmlPipe } from '../common/pipe/safe-html/safe-html.pipe';
import { ApplicantPasswordControlComponent } from './Applicant-Password-control/Applicant-Password-control.component';
import { AmountControlComponent } from './amount-control/amount-control.component';
import { ApplicantEmailComponentComponent } from './applicant-email-component/applicant-email-component.component';
import { ApplicantMobileControlComponent } from './applicant-mobile-control/applicant-mobile-control.component';
import { ApplicantNameComponent } from './applicant-name-control/applicant-name-control.component';
import { ApplicantOtpControlComponent } from './applicant-otp-control/applicant-otp-control.component';
import { ApplicantOtpControlService } from './applicant-otp-control/applicant-otp-control.service';
import { CityControlComponent } from './city-control/city-control.component';
import { CustomerService } from './validator-service/customer.service';
import { ProductSelectionControlComponent } from './product-selection-control/product-selection-control.component';
import { ProductSelectionControlHelper } from './product-selection-control/product-selection-control.helper';
import { SignatureImageUploadControlComponent } from './signature-image-upload-control/signature-image-upload-control.component';
import { TermsConditionControlComponent } from './terms-condition-control/terms-condition-control.component';
import { FileBrowseButtonComponent } from './file-browse-button/file-browse-button.component';
import { FpxPhotoCaptureComponent } from './fpx-photo-capture/fpx-photo-capture.component';
import { CameraService } from '../dep/smart-device/camera/camera.service';
import { BannerAdsComponent } from './banner-ads/banner-ads.component';
import { InterestPaymentFrequencyListControlComponent } from './interest-payment-frequency-list-control/interest-payment-frequency-list-control.component';
import { ZipCodeListControlComponent } from './zipcode-list-control/zipcode-list-control.component';
import { CountryListControlComponent } from './country-list-control/country-list-control.component';
import { StateControlComponent } from './state-list-control/state-list-control.component';
import { ProductSelectionControlService } from './productselection-service/product-selection.service';
import { AccountNumberControlComponent } from './account-number-control/account-number-control.component';
import { CurrencyControlComponent } from './currency-control/currency-control.component';
import { TransactionReferenceControlComponent } from './transaction-ref-control/transaction-ref-control.component';
import { DateRangeTypeControlComponent } from './date-range-type-control/date-range-type-control.component';
import { RangeTypeService } from './rangeType-service/rangeType.service';
import { RegisteredUserNameControlComponent } from './registered-username-control/registered-username-control.component';
import { IssueDateControlComponent } from './issue-date-control/issue-date-control.component';
import { PaymentAmountControlComponent } from './payment-amount-control/payment-amount-control.component';
import { NickNameControlComponent } from './nick-name-control/nick-name-control.component';
import { MonthListControlComponent } from './month-list-control/month-list-control.component';
import { AddressAreaLineControlComponent } from './address-area-line-control/address-area-line-control.component';
import { AuthPersonIdControlComponent } from './auth-person-id-control/auth-person-id-control.component';
import { AuthPersonNameControlComponent } from './auth-person-name-control/auth-person-name-control.component';
import { PaymentAmountControlHelper } from './payment-amount-control/payment-amount-control.helper';
import { CustomerValidatorService } from './validator-service/delivery-option-validator.service';
import { accountNicknameValidator } from './nick-name-control/accountNickname-validator.service';
import { ExchangeRateValidator } from './payment-amount-control/exchange-rate-validator.service';
import { MonthControlComponent } from './month-control/month-control.component';
import { DepositMaturityValidator } from './interest-payment-frequency-list-control/deposit-maturity-validator.service';
import { UserProfileComponent } from '../layout/user-profile/user-profile.component';
import { RangeTypeControlComponent } from './range-type-control/range-type-control.component';
import { DebitCreditFlagControlComponent } from './debit-credit-flag-cotrol/debit-credit-flag-cotrol.component';
import { BankCodeControlComponent } from './bank-code-control/bank-code-control.component';
import { BanksService } from './banks-service/banks.service';
import { BranchesControlComponent } from './branches-control/branches-control.component';
import { AccountListTemplateControlComponent } from './account-list-template-control/account-list-template-control.component';
import { StatusControlComponent } from './status-control/status-control.component';
import { ValidTillControlComponent } from './valid-till-control/valid-till-control.component';
import { CardTypeControlComponent } from './card-type-control/card-type-control.component';
import { PrincipalPaidAccountControlComponent } from './principal-paid-account--control/principal-paid-account--control.component';
import { CardRefControlComponent } from './card-ref-control/card-ref-control.component';
import { ReasonListControlComponent } from './reason-list-control/reason-list-control.component';
import { DcCancelReasonListControlComponent } from './dc-cancel-reason-list-control/dc-cancel-reason-list-control.component';
import { CardNumberControlComponent } from './card-number-control/card-number-control.component';
import { DCReasonListControlComponent } from './dc-reason-list-control/dc-reason-list-control.component';
import { BalanceControlComponent } from './balance-control/balance-control.component';
import { PaymentOptionControlComponent } from './payment-option-control/payment-option-control.component';
import { AccNumberControlComponent } from './acc-number-control/acc-number-control.component';
import { CardNumberUnMaskedControlComponent } from './card-number-un-masked-control/card-number-un-masked-control.component';
import { CreditCardTypeListControlComponent } from './creditcard-type-list-control/creditcard-type-list-control.component';
import { PrimaryCardAccNoControlComponent } from './primary-card-acc-no-control/primary-card-acc-no-control.component';
import { AccountNameControlComponent } from './account-name-control/account-name-control.component';
import { DescriptionControlComponent } from './description-control/description-control.component';
import { TransactionTypeControlComponent } from './transaction-type-control/transaction-type-control.component';
import { CCExpiryYearListControlComponent } from './cc-expiry-year-list-control/cc-expiry-year-list-control.component';
import { ExpiryMonthListControlComponent } from './expiry-month-list-control/expiry-month-list-control.component';
import { AccountTypeComponent } from './account-type-control/account-type-control.component';
import { DownloadFileFormatControlComponent } from './download-file-format-control/download-file-format-control.component';
import { DateOfBirthControlComponent } from './date-of-birth-control/date-of-birth-control.component';
import { SelfservicestfaService } from '../prelogin/selfservicestfa-service/selfservicestfa.service';
import { PreloginverifytfaService } from '../prelogin/preloginverifytfa-service/preloginverifytfa.service';
import { TenorControlComponent } from './tenor-control/tenor-control.component';
import { FileUploadControlComponentComponent } from './file-upload-control-component/file-upload-control-component.component';
import { FrequencyControlComponent } from './frequency-control/frequency-control.component';
import { RateControlComponent } from './rate-control/rate-control.component';
import { CobApplicantProfileFormComponent } from '../onboarding/cob-applicantprofile-form/cob-applicantprofile-form.component';
import { ProductCategoryControlComponent } from './product-category-control/product-category-control.component';
import { ObapplicantprofileService } from '../onboarding/obapplicantprofile-service/obapplicantprofile.service';
import { CasaAccountDtlListControlComponent } from './casa-account-dtl-list-control/casa-account-dtl-list-control.component';
import { LoanListTemplateControlComponent } from './loan-list-template-control/loan-list-template-control.component';
import { cityControlDropdownComponent } from './city-control-dropdown/city-control-dropdown.component';
import { EmpTypesOfEntityComponent } from './emp-types-of-entity-control/emp-types-of-entity-control.component';
import { EmpBusinessTypesControlComponent } from './emp-business-types-control/emp-business-types-control.component';
import { CaptchaControlComponent } from './captcha-control/captcha-control.component';
import { ReadTermsAndConditionsComponent } from './read-terms-and-conditions/read-terms-and-conditions.component';
import { ReadtermsandconditionsService } from './readtermsandconditions-service/readtermsandconditions.service';
import { KfsCheckBoxContolComponent } from './kfs-checkbox-control/kfs-checkbox-control.component';
import { EmpOccupationTypeComponent } from './emp-occupation-type-control/emp-occupation-type-control.component';
import { OccupationTypeService } from './occupationType-service/occupationType.service';
import { ReasonForNoTinComponent } from './reason-for-no-tin-control/reason-for-no-tin-control.component';
import { ReasonForNoTinService } from './reasonForNoTin-service/reasonForNoTin.service';
import { NationalityHolderControlComponent } from './nationality-holder-control/nationality-holder-control.component';
import { CountryOfResidenceComponent } from './country-of-residence/country-of-residence.component';
import { SalaryMonthlyIncomeComponent } from './salary-monthly-income/salary-monthly-income.component';
import { MainSourceOfIncomeComponent } from './main-source-of-income/main-source-of-income.component';
import { PrefAnnualIncomeComponent } from './pref-annual-income/pref-annual-income.component';
import { PreferredBranchComponent } from './preferred-branch-control/preferred-branch-control.component';
import { PreferredMailingAddressComponent } from './preferred-mailing-address/preferred-mailing-address.component';
import { PreferredPurposeOfAccountComponent } from './preferred-purpose-of-account/preferred-purpose-of-account.component';
import { SelfDeclarationFlagService } from './self-declaration-flag-control/self-declaration-flag-control.service';
import { SelfDeclarationFlagComponent } from './self-declaration-flag-control/self-declaration-flag-control.component';
import { CasaEnabledFlagComponent } from './casa-enabled-flag/casa-enabled-flag.component';
import { YearsInEmploymentComponent } from './years-in-employment/years-in-employment.component';
import { PreferredMaritalStatusComponent } from './preferred-marital-status-control/preferred-marital-status-control.component';
import { PreferredMaritalStatusService } from './preferredMaritalStatus-service/preferredMaritalStatus.service';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { InventoryNumberControlComponent } from './inventory-number-control/inventory-number-control.component';
import { PaymentDateControlComponent } from './payment-date-control/payment-date-control.component';
import { DisplayAmountControlComponent } from './display-amount-control/display-amount-control.component';
import { TranRefControlComponent } from './tranRef-control/tranRef-control.component';
import { EnableBiometricFormComponent } from './enable-biometric-form/enable-biometric-form.component';
import { DebitcardDtlListControlComponent } from './debitcard-dtl-list-control/debitcard-dtl-list-control.component';
import { LoanAccountListTemplateControlComponent } from './loan-account-list-template-control/loan-account-list-template-control.component';
import { NfcConfirmationFormComponent } from './nfc_confirmation/nfc-confirmation-form.component';
import { CurrencyBalanceListControlComponent } from './currency-balance-list-control/currency-balance-list-control.component';
import { PepDeclarationFlagComponent } from './pep-declaration-flag/pep-declaration-flag.component';
import { LogoutFeedBackFormComponent } from './logout-feedback-form/logout-feedback-form.component';
import { CreditcardDtlListControlComponent } from './creditcard-dtl-list-control/creditcard-dtl-list-control.component';
import { PrepaidcardDtlListControlComponent } from './prepaidcard-dtl-list-control/prepaidcard-dtl-list-control.component';
import { UserfeedbacklogService } from './userfeedbacklog-service/userfeedbacklog.service';
import { PrefAnnualIncomeComponentComponent } from './pref-Annual-income-component/pref-Annual-income-component.component';
import { SalaryOrMonthlyIncomeComponentComponent } from './salary-or-monthly-income-component/salary-or-monthly-income-component.component';
import { ApplicantMobileNumberComponent } from './applicant-mobile-number-control/applicant-mobile-number-control.component';
import { PercentageOfOwnershipComponent } from './percentage-of-ownership-control/percentage-of-ownership-control.component';
import { YearsOfBusinessComponent } from './years-of-business-control/years-of-business-control.component';
import { PreviouslyEmployedComponent } from './previously-employed-control/previously-employed-control.component';
import { EmpRelationshipComponent } from './emp-relationship-control/emp-relationship-control.component';
import { EmpDependentNameComponent } from './emp-dependent-name-control/emp-dependent-name-control.component';
import { EmpDependentEmiratesidComponent } from './emp-dependent-emiratesid-control/emp-dependent-emiratesid-control.component';
import { RetailSplitTypeControlComponent } from './retail-split-type-control/retail-split-type-control.component';
import { OtpCancelFormComponent } from './otp-cancel-form/otp-cancel-form.component';
import { LoanAccountDtlListControlComponent } from './loan-account-dtl-list-control/loan-account-dtl-list-control.component';
import { ApplyCardReasonListComponent } from './apply-card-reason-list/apply-card-reason-list.component';
import { ChargesValidator } from './charges-control/charges-validator.service';
import { ChargesBornecontrolComponent } from './charges-borne-control/charges-borne-control.component';
import { ChargesborneService } from './chargesborne-service/chargesborne.service';
import { accountNumberInfoControlComponent } from './account-number-info-control/account-number-info-control.component';
import { bankNameComponent } from './bank-name-control/bank-name-control.component';
import { CountryInformationComponent } from './country-info-control/country-info-control.component';
import { CountryinfoService } from './countryinfo-service/countryinfo.service';
import { MonthResidenceComponent } from './month-residence-controls/month-residence-controls.component';
import { YearResidenceComponent } from './year-residence-controls/year-residence-controls.component';
import { BaseCurrencyCasaListControlComponent } from './base-currency-casa-list-control/base-currency-casa-list-control.component';
import { BasecurrencycasaService } from './basecurrencycasa-service/basecurrencycasa.service';
import { RaisedisputereasonListControlComponent } from './raisedisputereason-list-control/raisedisputereason-list-control.component';
import { RaisedisputereasonService } from './raisedisputereason-service/raisedisputereason.service';
import { FailureResultFormComponent } from './failure-result-form/failure-result-form.component';
import { IfscCodeControlComponent } from './ifsc-code-control/ifsc-code-control.component';
import { CurrencyAmountControlComponent } from './amount-currency-control/amount-currency-control.component';
import { PercentageControlComponent } from './percentage-control/percentage-control.component';
import { MaturityAgeComponent } from './maturity-age/maturity-age.component';
import { FileNameControlComponent } from './filename-control/filename-control.component';
import { FoundationExtensionComponents,FoundationExtensionService,FoundationModuleExtension } from './foundation-extension';
import { DocumentTypeListControlComponent } from './document-type-list-control/document-type-list-control.component';
import { BeneficiaryFullNameComponent } from './bene-full-name-control/bene-full-name-control.component';
import { DownloadFileFormatListControlComponent } from './download-file-format-list-control/download-file-format-list-control.component';
import { DownloadfileformatlistService } from './downloadfileformatlist-service/downloadfileformatlist.service';
import { CurrencyCodePipe } from '../common/pipe/currency-code/currency-code.pipe';
import { ApplicantDobControlComponent } from './applicant-dob-control/applicant-dob-control.component';
import { ISOCodeControlComponent } from './ISOCode-control/ISOCode-control.component';
import { SuffixControlComponent } from './suffix-control/suffix-control.component';
import { ORGChannelListControlHelper } from './org-channel-list-control/org-channel-list-control.helper';
import { ORGChannelListControlComponent } from './org-channel-list-control/org-channel-list-control.component';
import { TitleControlComponent } from './title-control/title-control.component';
import { OrgchannelService } from './orgchannel-service/orgchannel.service';
import { ResidentstatusService } from './residentstatus-service/residentstatus.service';
import { HomeOwnershipListControlComponent } from './homeownership-list-control/homeownership-list-control.component';
import { RegionListControlComponent } from './region-list-control/region-list-control.component';
import { BarangayListControlComponent } from './barangay-list-control/barangay-list-control.component';
import { LandlineNumberControlComponent } from './landline-number-control/landline-number-control.component';
import { DistrictListControlComponent } from './district-list-control/district-list-control.component';
import { AddressTypeControlComponent } from './address-type/addressType.component';
import { UserDefinedControlComponent } from './user-defined-control/user-defined-control.component';
import { residentStatusControlComponent } from './resident-status-control/resident-status-control.component';
import { NationalityControlComponent } from './nationality-control/nationality-control.component';
import { ApplicantGenderDropdownControlComponent } from './applicant-gender-dropdown-control/foundation/applicant-gender-dropdown-control/applicant-gender-dropdown-control.component';
import { ExtensionNumberControlComponent } from './extension-number-control/extension-number-control.component';
import { ISOCodeListControlComponent } from './isocode-list-control/isocode-list-control.component';
import { ISOCodeListService } from './iSOCodeList-service/ISOCodeList.service';
import { ResidentStatusDropdownControlComponent } from './resident-status-dropdown-control/resident-status-dropdown-control.component';
import { DualNationalityHolderControlComponent } from './dual-nationality-holder-control/dual-nationality-holder-control.component';
import { SourceOfFundsListControlComponent } from './sourceof-funds-list-control/sourceof-funds-list-control.component';
import { SourceoffundsService } from './sourceoffunds-service/sourceoffunds.service';
import { IndustryCodeControlComponent } from './industrycode-control/industrycode-control.component';
import { TinControlComponent } from './tin-control/tin-control.component';
import { DepartmentControlComponent } from './department-control/department-control.component';
import { RetailUserRestrictionsFormComponent } from './retail-user-restrictions-form/retail-user-restrictions-form.component';
import { UserrestrictionsService } from './userrestrictions-service/userrestrictions.service';
import { UserRestictionConfirmationComponent } from './user-restiction-confirmation/user-restiction-confirmation.component';
import { DepositAccountDtlListControlComponent } from '../accounts-space/deposit-account-dtl-list-control/deposit-account-dtl-list-control.component';
import { TFAChannelsControlComponent } from './tfa-channels-control/tfa-channels-control.component';
import { TFADeliveryModeFormComponent } from './tfa-delivery-mode-form/tfa-delivery-mode-form.component';
import { titledropdowncontrolComponent } from './title-dropdown-control/title-dropdown-control.component';
import { titledropdowncontrolService } from './title-dropdown-control/title-dropdown-control.service';
import { ApplicantFullNameComponent } from './applicant-full-name-control/applicant-full-name-control.component';
import { taxIdNumberControlComponent } from './tax-id-number-control/tax-id-number-control.component';
import { ChequeamountControlComponent } from './chequeamount-control/chequeamount-control.component';
import { StopchequereasonListControlComponent } from './stopchequereason-list-control/stopchequereason-list-control.component';
import { CharityListControlComponent } from './charity-list-control/charity-list-control.component';
import { WorkflowHistoryComponent } from './workflow-history/workflow-history.component';
import { workflowHistoryService } from './workflow-history-service/workflow-history.service';
import { relationshipListControlComponent } from './relationshipListControl/relationship-list-control.component';
import { RelationshiplistService } from './relationshiplist-service/relationshiplist.service';
import { StreetControlComponent } from './street-control/street-control.component';
import { CommonService } from './validator-service/common-service';
import { TenureControlComponent } from './tenure-control/tenure-control.component';
import { AddCountryOfTaxInputGridComponent } from './addCountry-of-tax-inputgrid/addCountry-of-tax-inputgrid.component';
import { TaxPayerIdControlComponent } from './tax-payer-id-control/tax-payer-id-control.component';
import { RelationshipControlComponent } from './relationship-control/relationship-control.component';
import { ReferralCodeControlComponent } from './referral-code-control/referral-code-control.component';
import { GenderControlComponent } from './gender-control/gender-control.component';
import { ImageUploadComponent } from './Image-upload-control/Image-upload-control.component';
import { DebitAccNumberControlComponent } from './debit-acc-number-control/debit-acc-number-control.component';
import { LoanNoOfInstallmentsComponent } from './loan-no-of-installments-control/loan-no-of-installments-control.component';
import { PaymentFrequencyListControlComponent } from './payment-frequency-list-control/payment-frequency-list-control.component';
import { RelationshipListControlComponent } from './relationship-list-control/relationship-list-control.component';
import { IdNumberControlComponent } from './id-number-control/id-number-control.component';
import { BusinessNumberControlComponent } from './business-number-control/business-number-control.component';
import { socialInsuranceNumberControlComponent } from './socialInsuranceNumberControl/app-sin-control.component';
import { nickNameControlchComponent } from './nick-name-control-ch/nick-name-control-ch.component';
import { EligibleAccountListControlComponent } from './eligible-account-list-control/eligible-account-list-control.component';
import { TenantSwitcherPopupComponent } from './tenant-switcher-popup/tenant-switcher-popup.component';


@NgModule({
   declarations : [
   AccountNumberListControlComponent,
   BranchesListControlComponent,
   RequestDateControlComponent,
   AccDeliveryOptionsControlComponent,
   VerifyOtpFormComponent,
   ProductSelectionControlComponent,
   SafeHtmlPipe,
   ApplicantEmailComponentComponent,
   ApplicantMobileControlComponent,
   ApplicantNameComponent,
   ApplicantOtpControlComponent,
   AmountControlComponent,
   TermsConditionControlComponent,
   ChargesControlComponent,
   CurrencyListControlComponent,
   EmailControlComponent,
   EnabledFlagControlComponent,
   MobileNumberControlComponent,
   NameControlComponent,
   RemarksControlComponent,
   RetailAddressDetailsFormComponent,
   TermsConditionsControlComponent,
   AddressControlComponent,
   BuildingIdControlComponent,
   BuildingNameControlComponent,
   CountryListControlComponent,
   StateControlComponent,
   ApplicantPasswordControlComponent,
   FileBrowseButtonComponent,
   FpxPhotoCaptureComponent,
   ZipCodeListControlComponent,
   CityControlComponent,
   BannerAdsComponent,
   SignatureImageUploadControlComponent,
   AccountNumberControlComponent,
   CurrencyControlComponent,
   TransactionReferenceControlComponent,
   DateRangeTypeControlComponent,
   IssueDateControlComponent,
   AddressAreaLineControlComponent,
   AuthPersonIdControlComponent,
   AuthPersonNameControlComponent,
   PaymentAmountControlComponent,
   RegisteredUserNameControlComponent,
   NickNameControlComponent,
   MonthControlComponent,
   InterestPaymentFrequencyListControlComponent,
   UserProfileComponent,
   RangeTypeControlComponent,
   DebitCreditFlagControlComponent,
   BankCodeControlComponent,
   BranchesControlComponent,
   AccountListTemplateControlComponent,
   DownloadFileFormatControlComponent,
   MonthListControlComponent,
   PaymentOptionControlComponent,
   BalanceControlComponent,
   StatusControlComponent,
   ValidTillControlComponent,
   CardTypeControlComponent,
   PrincipalPaidAccountControlComponent,
   CardRefControlComponent,
   ReasonListControlComponent,
   DcCancelReasonListControlComponent,
   CardNumberControlComponent,
   DCReasonListControlComponent,
   AccNumberControlComponent,
   CardNumberUnMaskedControlComponent,
   CreditCardTypeListControlComponent,
   PrimaryCardAccNoControlComponent,
   AccountNameControlComponent,
   DescriptionControlComponent,
   TransactionTypeControlComponent,
   ExpiryMonthListControlComponent,
   CCExpiryYearListControlComponent,
   AccountTypeComponent,
   DateOfBirthControlComponent,
   ProductCategoryControlComponent,
   TenorControlComponent,
   LoanListTemplateControlComponent,
   FrequencyControlComponent,
   RateControlComponent,
   FileUploadControlComponentComponent,
   CobApplicantProfileFormComponent,
   CasaAccountDtlListControlComponent,
   cityControlDropdownComponent,
   EmpTypesOfEntityComponent,
   EmpBusinessTypesControlComponent,
   CaptchaControlComponent,
   ReadTermsAndConditionsComponent,
   KfsCheckBoxContolComponent,
   EmpOccupationTypeComponent,
   ReasonForNoTinComponent,
   CountryOfResidenceComponent,
   SalaryMonthlyIncomeComponent,
   MainSourceOfIncomeComponent,
   PrefAnnualIncomeComponent,
   PreferredBranchComponent,
   PreferredMailingAddressComponent,
   PreferredPurposeOfAccountComponent,
   NationalityHolderControlComponent,
   SelfDeclarationFlagComponent,
   CasaEnabledFlagComponent,
   YearsInEmploymentComponent,
   PreferredMaritalStatusComponent,
   DynamicFormComponent,
   InventoryNumberControlComponent,
   PaymentDateControlComponent,
   DisplayAmountControlComponent,
   TranRefControlComponent,
   EnableBiometricFormComponent,
   DebitcardDtlListControlComponent,
   LoanAccountListTemplateControlComponent,
   NfcConfirmationFormComponent,
   CurrencyBalanceListControlComponent,
   PepDeclarationFlagComponent,
   LogoutFeedBackFormComponent,
   CreditcardDtlListControlComponent,
   PrepaidcardDtlListControlComponent,
   PrefAnnualIncomeComponentComponent,
   SalaryOrMonthlyIncomeComponentComponent,
   ApplicantMobileNumberComponent,
   YearsOfBusinessComponent,
   PercentageOfOwnershipComponent,
   PreviouslyEmployedComponent,
   EmpRelationshipComponent,
   EmpDependentNameComponent,
   EmpDependentEmiratesidComponent,
   RetailSplitTypeControlComponent,
   OtpCancelFormComponent,
   LoanAccountDtlListControlComponent,
   ApplyCardReasonListComponent,
   ChargesBornecontrolComponent,
   accountNumberInfoControlComponent,
   bankNameComponent,
   CountryInformationComponent,
   YearResidenceComponent,
   MonthResidenceComponent,
   BaseCurrencyCasaListControlComponent,
   RaisedisputereasonListControlComponent,
   FailureResultFormComponent,
   IfscCodeControlComponent,
   CurrencyAmountControlComponent,
   PercentageControlComponent,
   MaturityAgeComponent,
   FileNameControlComponent,
   DocumentTypeListControlComponent,
   BeneficiaryFullNameComponent,
   DownloadFileFormatListControlComponent,
   CurrencyCodePipe,
   ApplicantDobControlComponent,
   ISOCodeControlComponent,
   SuffixControlComponent,
   ORGChannelListControlComponent,
   TitleControlComponent,
   residentStatusControlComponent,
   NationalityControlComponent,
   ApplicantGenderDropdownControlComponent,
   HomeOwnershipListControlComponent,
   RegionListControlComponent,
   DistrictListControlComponent,
   BarangayListControlComponent,
   UserDefinedControlComponent,
   AddressTypeControlComponent,
   LandlineNumberControlComponent,
   ExtensionNumberControlComponent,
   ISOCodeListControlComponent,
   ResidentStatusDropdownControlComponent,
   DualNationalityHolderControlComponent,
   SourceOfFundsListControlComponent,
   IndustryCodeControlComponent,
   TinControlComponent,
   DepartmentControlComponent,
   RetailUserRestrictionsFormComponent,
   UserRestictionConfirmationComponent,
   DepositAccountDtlListControlComponent,
   TFAChannelsControlComponent,
   TFADeliveryModeFormComponent,
   titledropdowncontrolComponent,
   ApplicantFullNameComponent,
   taxIdNumberControlComponent,
   ChequeamountControlComponent,
   relationshipListControlComponent,
   StreetControlComponent,
   StopchequereasonListControlComponent,
   ...FoundationExtensionComponents,
   CharityListControlComponent,
   WorkflowHistoryComponent,
   TenureControlComponent,
   AddCountryOfTaxInputGridComponent,
   TaxPayerIdControlComponent,
   RelationshipControlComponent,
   ReferralCodeControlComponent,
   GenderControlComponent,
   ImageUploadComponent,
   DebitAccNumberControlComponent,
   LoanNoOfInstallmentsComponent,
   PaymentFrequencyListControlComponent,
   RelationshipListControlComponent,
   IdNumberControlComponent,
   nickNameControlchComponent,
   BusinessNumberControlComponent,
   socialInsuranceNumberControlComponent,
   EligibleAccountListControlComponent,
   TenantSwitcherPopupComponent
],
   imports : [
   CommonModule,
   FormsModule,
   ReactiveFormsModule,
   FpxCoreModule,
   MaterialModule,
   TranslateModule,
   ThirdPartyModule,
   FoundationRoutingModule,
   ...FoundationModuleExtension
],
   providers : [
   CustomerService,
   ApplicantOtpControlService,
   CameraService,
   RangeTypeService,
   ProductSelectionControlHelper,
   ProductSelectionControlService,
   CustomerValidatorService,
   PaymentAmountControlHelper,
   ExchangeRateValidator,
   accountNicknameValidator,
   DepositMaturityValidator,
   BanksService,
   SelfservicestfaService,
   PreloginverifytfaService,
   ObapplicantprofileService,
   ReadtermsandconditionsService,
   OccupationTypeService,
   ReasonForNoTinService,
   SelfDeclarationFlagService,
   PreferredMaritalStatusService,
   UserfeedbacklogService,
   ChargesValidator,
   ChargesborneService,
   CountryinfoService,
   BasecurrencycasaService,
   RaisedisputereasonService,
   DownloadfileformatlistService,
   OrgchannelService,
   ResidentstatusService,
   ISOCodeListService,
   SourceoffundsService,
   UserrestrictionsService,
   RelationshiplistService,
   titledropdowncontrolService,
   workflowHistoryService,
   CommonService,
   ...FoundationExtensionService
],
   exports : [
   AccountNumberListControlComponent,
   FileUploadControlComponentComponent,
   BranchesListControlComponent,
   RequestDateControlComponent,
   AccDeliveryOptionsControlComponent,
   VerifyOtpFormComponent,
   ChargesControlComponent,
   CurrencyListControlComponent,
   EmailControlComponent,
   EnabledFlagControlComponent,
   MobileNumberControlComponent,
   NameControlComponent,
   RemarksControlComponent,
   RetailAddressDetailsFormComponent,
   TermsConditionsControlComponent,
   AddressControlComponent,
   BuildingIdControlComponent,
   BuildingNameControlComponent,
   CountryListControlComponent,
   StateControlComponent,
   ZipCodeListControlComponent,
   CityControlComponent,
   ApplicantNameComponent,
   ApplicantOtpControlComponent,
   BannerAdsComponent,
   ProductSelectionControlComponent,
   ApplicantEmailComponentComponent,
   ApplicantMobileControlComponent,
   ApplicantPasswordControlComponent,
   FpxPhotoCaptureComponent,
   FileBrowseButtonComponent,
   AccountNumberControlComponent,
   CurrencyControlComponent,
   TransactionReferenceControlComponent,
   DateRangeTypeControlComponent,
   InterestPaymentFrequencyListControlComponent,
   IssueDateControlComponent,
   SignatureImageUploadControlComponent,
   TermsConditionControlComponent,
   AddressAreaLineControlComponent,
   AuthPersonIdControlComponent,
   AuthPersonNameControlComponent,
   PaymentAmountControlComponent,
   RegisteredUserNameControlComponent,
   NickNameControlComponent,
   MonthControlComponent,
   UserProfileComponent,
   RangeTypeControlComponent,
   DebitCreditFlagControlComponent,
   BankCodeControlComponent,
   BranchesControlComponent,
   AccountListTemplateControlComponent,
   DownloadFileFormatControlComponent,
   MonthListControlComponent,
   PaymentOptionControlComponent,
   BalanceControlComponent,
   StatusControlComponent,
   ValidTillControlComponent,
   CardTypeControlComponent,
   PrincipalPaidAccountControlComponent,
   CardRefControlComponent,
   ReasonListControlComponent,
   DcCancelReasonListControlComponent,
   CardNumberControlComponent,
   DCReasonListControlComponent,
   AccNumberControlComponent,
   CardNumberUnMaskedControlComponent,
   CreditCardTypeListControlComponent,
   PrimaryCardAccNoControlComponent,
   AccountNameControlComponent,
   DescriptionControlComponent,
   TransactionTypeControlComponent,
   ExpiryMonthListControlComponent,
   CCExpiryYearListControlComponent,
   AccountTypeComponent,
   DateOfBirthControlComponent,
   ProductCategoryControlComponent,
   TenorControlComponent,
   LoanListTemplateControlComponent,
   FrequencyControlComponent,
   RateControlComponent,
   CobApplicantProfileFormComponent,
   CasaAccountDtlListControlComponent,
   AmountControlComponent,
   cityControlDropdownComponent,
   EmpTypesOfEntityComponent,
   EmpBusinessTypesControlComponent,
   CaptchaControlComponent,
   ReadTermsAndConditionsComponent,
   KfsCheckBoxContolComponent,
   EmpOccupationTypeComponent,
   ReasonForNoTinComponent,
   CountryOfResidenceComponent,
   SalaryMonthlyIncomeComponent,
   MainSourceOfIncomeComponent,
   PrefAnnualIncomeComponent,
   PreferredBranchComponent,
   PreferredMailingAddressComponent,
   PreferredPurposeOfAccountComponent,
   NationalityHolderControlComponent,
   SelfDeclarationFlagComponent,
   CasaEnabledFlagComponent,
   YearsInEmploymentComponent,
   PreferredMaritalStatusComponent,
   DynamicFormComponent,
   InventoryNumberControlComponent,
   PaymentDateControlComponent,
   DisplayAmountControlComponent,
   TranRefControlComponent,
   DebitcardDtlListControlComponent,
   LoanAccountListTemplateControlComponent,
   NfcConfirmationFormComponent,
   CurrencyBalanceListControlComponent,
   PepDeclarationFlagComponent,
   LogoutFeedBackFormComponent,
   CreditcardDtlListControlComponent,
   PrepaidcardDtlListControlComponent,
   PrefAnnualIncomeComponentComponent,
   SalaryOrMonthlyIncomeComponentComponent,
   ApplicantMobileNumberComponent,
   YearsOfBusinessComponent,
   PercentageOfOwnershipComponent,
   PreviouslyEmployedComponent,
   EmpRelationshipComponent,
   EmpDependentNameComponent,
   EmpDependentEmiratesidComponent,
   RetailSplitTypeControlComponent,
   LoanAccountDtlListControlComponent,
   ApplyCardReasonListComponent,
   ChargesBornecontrolComponent,
   accountNumberInfoControlComponent,
   bankNameComponent,
   CountryInformationComponent,
   YearResidenceComponent,
   MonthResidenceComponent,
   BaseCurrencyCasaListControlComponent,
   RaisedisputereasonListControlComponent,
   FailureResultFormComponent,
   IfscCodeControlComponent,
   CurrencyAmountControlComponent,
   PercentageControlComponent,
   DocumentTypeListControlComponent,
   FileNameControlComponent,
   MaturityAgeComponent,
   BeneficiaryFullNameComponent,
   DownloadFileFormatListControlComponent,
   CurrencyCodePipe,
   ApplicantDobControlComponent,
   ISOCodeControlComponent,
   SuffixControlComponent,
   ORGChannelListControlComponent,
   TitleControlComponent,
   residentStatusControlComponent,
   NationalityControlComponent,
   ApplicantGenderDropdownControlComponent,
   HomeOwnershipListControlComponent,
   RegionListControlComponent,
   DistrictListControlComponent,
   BarangayListControlComponent,
   UserDefinedControlComponent,
   AddressTypeControlComponent,
   LandlineNumberControlComponent,
   ExtensionNumberControlComponent,
   ISOCodeListControlComponent,
   ResidentStatusDropdownControlComponent,
   DualNationalityHolderControlComponent,
   SourceOfFundsListControlComponent,
   IndustryCodeControlComponent,
   TinControlComponent,
   DepartmentControlComponent,
   RetailUserRestrictionsFormComponent,
   UserRestictionConfirmationComponent,
   DepositAccountDtlListControlComponent,
   TFAChannelsControlComponent,
   TFADeliveryModeFormComponent,
   titledropdowncontrolComponent,
   taxIdNumberControlComponent,
   ApplicantFullNameComponent,
   StreetControlComponent,
   ChequeamountControlComponent,
   relationshipListControlComponent,
   StopchequereasonListControlComponent,
   ...FoundationExtensionComponents,
   CharityListControlComponent,
   WorkflowHistoryComponent,
   TenureControlComponent,
   AddCountryOfTaxInputGridComponent,
   TaxPayerIdControlComponent,
   RelationshipControlComponent,
   ReferralCodeControlComponent,
   GenderControlComponent,
   ImageUploadComponent,
   DebitAccNumberControlComponent,
   LoanNoOfInstallmentsComponent,
   PaymentFrequencyListControlComponent,
   RelationshipListControlComponent,
   IdNumberControlComponent,
   nickNameControlchComponent,
   BusinessNumberControlComponent,
   socialInsuranceNumberControlComponent,
   EligibleAccountListControlComponent,
   TenantSwitcherPopupComponent
]
})
export class FoundationModule { }
