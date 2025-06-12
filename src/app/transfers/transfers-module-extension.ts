import { ThirdPartyModule } from "@dep/core"
import { AccountsModule } from "../accounts/accounts.module"
import { ScheduleFormComponent } from "./schedule-form/schedule-form.component"
import { RetailOwnAccountTransferFormComponent } from "./retail-own-account-transfer-form/retail-own-account-transfer-form.component"
import { ManageBeneTransferListComponent } from "./manage-bene-transfer-list/manage-bene-transfer-list.component"
import { TransferTypeListComponent } from "./transfer-type-list/transfer-type-list.component"

export const TransfersExtensionComponents = [
  ManageBeneTransferListComponent,
  TransferTypeListComponent
]

export const TransfersRoutingExtension = [
  {
    path: 'view-scheduled-transfers',
    component: ScheduleFormComponent,
    data: { title: "RetailSchedulePaymentsRoGrid.title" }
  },
  {
    path: 'retail-own-account-transfer-form',
    component: RetailOwnAccountTransferFormComponent,
    data: { title: "RetailOwnAccountTransferForm.title" }
  },

]

 export const TransfersExtensionServices = [


 ]
 export const TransfersImportExtension = [
   ThirdPartyModule,
   AccountsModule,
 ]
 