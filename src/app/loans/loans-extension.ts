import { ApplyLoanComponent } from "./apply-loan/apply-loan.component"
import { LoanAccountSharingInformationComponent } from "./loan-account-sharing-information/loan-account-sharing-information.component"
import { LOANAccountsListComponent } from "./loan-accounts-list/loan-accounts-list.component"
import { LoaninterestcertificateService } from "./loaninterestcertificate-service/loaninterestcertificate.service"
import { RetailLoanDetailsFormComponent } from "./retail-loan-details-form/retail-loan-details-form.component"
import { RetailLoanInterestCertificateFormComponent } from "./retail-loan-interest-certificate-form/retail-loan-interest-certificate-form.component"
import { RetailloantrandtlsdownloadfilterformService } from "./retailloantrandtlsdownloadfilterform-service/retailloantrandtlsdownloadfilterform.service"
import { RetailLoanTranDtlsDownloadFilterFormComponent } from "./retailloantrandtlsDownloadfilterform/retail-loan-tran-dtls-download-filter-form.component"
import { RetailloantrandtlsfilterformService } from "./retailloantrandtlsfilterform-service/retailloantrandtlsfilterform.service"
import { RetailLoanTranDtlsFilterFormComponent } from "./retailloantrandtlsfilterform/retail-loan-tran-dtls-filter-form.component"

export const LoansExtensionComponents = [
   RetailLoanTranDtlsFilterFormComponent,
   RetailLoanTranDtlsDownloadFilterFormComponent,
   LOANAccountsListComponent,
   LoanAccountSharingInformationComponent,
   RetailLoanInterestCertificateFormComponent,
   ApplyLoanComponent
]

export const LoansExtensionService = [
   RetailloantrandtlsfilterformService,
   RetailloantrandtlsdownloadfilterformService,
   LOANAccountsListComponent,
   LoanAccountSharingInformationComponent,
   LoaninterestcertificateService
]

export const LoanRoutingExtension = [
   {
      path: 'retail-current-interest-info-form',
      component: RetailLoanDetailsFormComponent,
      data: {title:"RetailLoanDetailsForm.currenntInterestInfo", serviceCode: 'RETAILLOANCURRENTINTERESTINFO'}
   },
   {
      path: 'retail-loan-payment-info-form',
      component: RetailLoanDetailsFormComponent,
      data: {title:"RetailLoanDetailsForm.loanPaymentInfo", serviceCode: 'RETAILLOANPAYMENTINFO'}
   },
   {
      path: 'retail-loan-interest-certificate-form',
      component: RetailLoanInterestCertificateFormComponent,
      data: {title:"RetailLoanInterestCertificateForm.title", serviceCode: 'RETAILLOANINTCERTIFICATE'}
   },
]
