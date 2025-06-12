import { AccountsModule } from "../accounts/accounts.module"
import { CasaAccountsEtransferListComponent } from "./casa-accounts-etransfer-list/casa-accounts-etransfer-list.component"
import { PreferredLanguageListControlComponent } from "./preferred-language-list-control/preferred-language-list-control.component"
import { PreferredlanguageService } from "./preferredlanguage-service/preferredlanguage.service"
import { RetailManageEtransferRequestMoneyFormComponent } from "./retail-manage-etransfer-request-money-form/retail-manage-etransfer-request-money-form.component"
import { RetailManageEtransferSendMoneyFormComponent } from "./retail-manage-etransfer-send-money-form/retail-manage-etransfer-send-money-form.component"
import { RetailEtransferDeclineMoneyFormComponent } from "./retail-etransfer-decline-money-form/retail-etransfer-decline-money-form.component"
import { ThirdPartyModule } from "@dep/core"
import { RetailManageEtransferReceiveMoneyFormComponent } from "./retail-manage-etransfer-receive-money-form/retail-manage-etransfer-receive-money-form.component"
import { ETransferHistoryFormComponent } from "./etransfer-history-form/etransfer-history-form.component"
import { EtransfersHomeComponent } from "./etransfers-home/etransfers-home.component"
import { RetailEtransferDeclineFulfillRequestMoneyFormComponent } from "./retail-etransfer-decline-fulfill-request-money-form/retail-etransfer-decline-fulfill-request-money-form.component"
import { ScheduleetransferService } from "./scheduleetransfer-service/scheduleetransfer.service"
import { RetailEtransferManageScheduledFormComponent } from "./retail-etransfer-manage-scheduled-form/retail-etransfer-manage-scheduled-form.component"
import { RetailScheduleEtransferDisplayGridComponent } from "./retail-schedule-etransfer-display-grid/retail-schedule-etransfer-display-grid.component"
import { CustomDatePipe } from "../common/pipe/custom-date/custom-date.pipe"
export const ETransfersModuleExtensionComponents = [
  PreferredLanguageListControlComponent,
  CasaAccountsEtransferListComponent,
  RetailManageEtransferSendMoneyFormComponent,
  RetailManageEtransferRequestMoneyFormComponent,
  RetailEtransferDeclineMoneyFormComponent,
  RetailManageEtransferReceiveMoneyFormComponent,
  RetailEtransferDeclineFulfillRequestMoneyFormComponent,
  RetailEtransferManageScheduledFormComponent,
  RetailScheduleEtransferDisplayGridComponent
]


 export const ETransfersModuleServices = [
   PreferredlanguageService,
   ScheduleetransferService,
   CustomDatePipe

]
export const ETransfersModuleImportExtension = [
  AccountsModule,
  ThirdPartyModule

]
export const ETransfersRoutingExtension = [
  {
    path: 'retail-manage-etransfer-send-money-form',
    component: RetailManageEtransferSendMoneyFormComponent,
    data: { title: "RetailManageEtransferSendMoneyForm.title" }
  },
   {
    path: 'retail-manage-etransfer-request-money-form',
    component: RetailManageEtransferRequestMoneyFormComponent,
    data: { title: "RetailManageEtransferRequestMoneyForm.title" }
  },
  {
    path: 'retail-etransfer-decline-money-form',
    component: RetailEtransferDeclineMoneyFormComponent,
    data: { title: "RetailEtransferReceiveMoneyForm.title" }
  },
  {
    path: 'retail-manage-etransfer-receive-money-form',
    component: RetailManageEtransferReceiveMoneyFormComponent,
    data: { title: "RetailManageEtransferReceiveMoneyForm.title" }
  },
  {
    path: 'retail-etransfer-decline-fulfill-request-money-form',
    component: RetailEtransferDeclineFulfillRequestMoneyFormComponent,
    data: { title: "RetailEtransferDeclineFulfillRequestMoneyForm.title" }
  },
  {
    path: 'retail-etransfer-manage-scheduled-form',
    component: RetailEtransferManageScheduledFormComponent,
    data: { title: "RetailScheduleEtransferDisplayGrid.title" }
  }
]
