import { PayeeControlComponent } from "./payee-control/payee-control.component"
import { RetailStopChequeRequestFormComponent } from "./retail-stop-cheque-request-form/retail-stop-cheque-request-form.component"
import { RetailStopchequeDisplayGridComponent } from "./retail-stopcheque-display-grid/retail-stopcheque-display-grid.component"
import { stopChequeTypeControlComponent } from "./stop-cheque-type-control/stop-cheque-type-control.component"
import { StopchequeService } from "./stopcheque-service/stopcheque.service"
import { StopchequerequestService } from "./stopchequerequest-service/stopchequerequest.service"
import { RetailRevokeStopChequeComponent } from "./retail-revoke-stop-cheque/retail-revoke-stop-cheque.component"
import { StopchequerevrequestService } from "./stopchequerevrequest-service/stopchequerevrequest.service"
import { RetailStopChequeDisplayFormComponent } from "./retail-stopcheque-display-form/retail-stopcheque-display-form.component"
import { CasaProductListControlHelper } from "./casa-product-list-control/casa-product-list-control.helper"
import { ChangeproductreqService } from "./changeproductreq-service/changeproductreq.service"
import { RetailChangeProductReqFormComponent } from "./retail-change-product-req-form/retail-change-product-req-form.component"
import { ChequeStartNumberControlComponent } from "./cheque-start-number-control/cheque-start-number-control.component"
import { ChequeBooksControlComponent } from "./cheque-books-control/cheque-books-control.component"
import { AccountSharingInformationComponent } from "./account-sharing-information/account-sharing-information.component"
import { CASAAccountsListComponent } from "./casa-accounts-list/casa-accounts-list.component"
import { AccountsAsideBarComponent } from "../layout/components/accounts-aside-bar/accounts-aside-bar.component"
import { MaterialModule, ThirdPartyModule } from "@dep/core"
import { RegisterCardStatementComponent } from "./retail-register-card-statement-form/retail-register-card-statement-form.component"
import { RegistercardstatementService } from "./registercardstatement-service/registercardstatement.service"
import { CASAAccountsTransferListComponent } from "./casa-accounts-transfer-list/casa-accounts-transfer-list.component"
import { RetailViewCasaTranDtlsFormComponent } from "./retail-view-casa-tran-dtls-form/retail-view-casa-tran-dtls-form.component"
import { RetailSampleChequeComponent } from "./retail-sample-cheque/retail-sample-cheque.component"
import { ObapplicantsignatureService } from "../onboarding/obapplicantsignature-service/obapplicantsignature.service"
import { MatTooltipModule } from "@angular/material/tooltip"
import { EnterReasonControlComponent } from "./enter-reason-control/enter-reason-control.component"
import { ChequeAccountNumberControlComponent } from "./cheque-account-number-control/cheque-account-number-control.component"
import { ChequeDepositHelpComponent } from "./cheque-deposit-help/cheque-deposit-help.component"

import { DepositsModule } from "../deposits/deposits.module"
export const AccountsExtensionComponents = [
   RetailStopChequeRequestFormComponent,
   PayeeControlComponent,
   stopChequeTypeControlComponent,
   RetailStopchequeDisplayGridComponent,
   RetailRevokeStopChequeComponent,
   RetailStopChequeDisplayFormComponent,
   RetailChangeProductReqFormComponent,
   ChequeStartNumberControlComponent,
   ChequeBooksControlComponent,
   AccountSharingInformationComponent,
   CASAAccountsListComponent,
   AccountsAsideBarComponent,
   RegisterCardStatementComponent,
   CASAAccountsTransferListComponent,
   RetailViewCasaTranDtlsFormComponent,
   RetailSampleChequeComponent,
   EnterReasonControlComponent,
   ChequeAccountNumberControlComponent,
   ChequeDepositHelpComponent
]


 export const AccountsExtensionServices = [
    StopchequerequestService,
    StopchequeService,
    StopchequerevrequestService,
    ChangeproductreqService,
    CasaProductListControlHelper,
    RegistercardstatementService,
    ObapplicantsignatureService

 ]
 export const AccountsImportExtension = [
   ThirdPartyModule,
   MaterialModule,
   MatTooltipModule,
   DepositsModule
   
 ]
 