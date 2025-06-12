import { AccessScopePipe } from "../common/pipe/access-scope/access-scope.pipe"
import { AccountNumberTrimPipe } from "../common/pipe/account-number-trim/account-number-trim.pipe"
import { CustomDatePipe } from "../common/pipe/custom-date/custom-date.pipe"
import { CreditCardNumberMaskPipe } from "../credit-cards/credit-card-number-mask-pipe/credit-card-number-mask.pipe"
import { ClientNumberControlComponent } from "../deposits/client-number-control/client-number-control.component"
import { LinkAccountControlComponent } from "../deposits/link-account-control/link-account-control.component"
import { ActionsPanelComponent } from "./actions-panel/actions-panel.component"
import { CardFourDigitsControlComponent } from "./card-four-digits-control/card-four-digits-control.component"
import { ChequeamountControlComponent } from "./chequeamount-control/chequeamount-control.component"
import { ContactMethodControlComponent } from "./contact-method-control/contact-method-control.component"
import { estmtrelationshipComponent } from "./estmtrelationship/estmtrelationship.component"
import { LastNameControlComponent } from "./last-name-control/last-name-control.component"
import { MobilePhoneNumberControlComponent } from "./mobile-phone-number-control/mobile-phone-number-control.component"
import { PaymentMessageControlComponent } from "./payment-message-control/payment-message-control.component"
import { RetailScheduleBillsRoGridComponent } from "./retail-schedule-bills-ro-grid/retail-schedule-bills-ro-grid.component"
import { RetailScheduleBillsFormComponent } from "./retail-schedule-bills/retail-schedule-bills-form.component"
import { RetailScheduleTransferFormComponent } from "./retail-schedule-transfer/retail-schedule-transfer-form.component"
import { RetailScheduleTransfersRoGridComponent } from "./retail-schedule-transfers-ro-grid/retail-schedule-transfers-ro-grid.component"
import { ReturnCallTimingListControlComponent } from "./return-call-timing-list-control/return-call-timing-list-control.component"
import { StopDateControlComponent } from "./stop-date-control/stop-date-control.component"
import { StopchequereasonListControlComponent } from "./stopchequereason-list-control/stopchequereason-list-control.component"
import { StopchequereasonService } from "./stopchequereason-service/stopchequereason.service"
import { YearListComponent } from "./yearlist/yearlist.component"


export const FoundationExtensionComponents = [
    ChequeamountControlComponent,
    StopchequereasonListControlComponent,
    StopDateControlComponent,
    CardFourDigitsControlComponent,
    ActionsPanelComponent,
    RetailScheduleTransferFormComponent,
    RetailScheduleTransfersRoGridComponent,
    RetailScheduleBillsFormComponent,
    RetailScheduleBillsRoGridComponent,
    YearListComponent,
    estmtrelationshipComponent,
    ContactMethodControlComponent,
    ReturnCallTimingListControlComponent,
    AccountNumberTrimPipe,
    CustomDatePipe,
    MobilePhoneNumberControlComponent,
    AccessScopePipe,
    CreditCardNumberMaskPipe,
   ClientNumberControlComponent,
   LinkAccountControlComponent,
   PaymentMessageControlComponent,
   LastNameControlComponent

]

export const FoundationExtensionService = [
    StopchequereasonService
   
]

export const FoundationModuleExtension = []
