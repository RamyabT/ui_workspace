import { ThirdPartyModule } from "@dep/core";
import { TemplatesModule } from "../templates/templates.module";
import { AccountsModule } from "../accounts/accounts.module";
import { eTransfersModuleHeaderComponent } from "./e-transfers-module-header/e-transfers-module-header.component";
import { EtransfersHomeComponent } from "../etransfers/etransfers-home/etransfers-home.component";

export const ETransfersSpaceExtensionComponents = [
   eTransfersModuleHeaderComponent
 ]

 export const ETransfersSpaceImportsExtension = [
  ThirdPartyModule,
  TemplatesModule,
  AccountsModule
]

export const ETransfersSpaceRoutingExtension = [
  {
    path: 'etransfers-home',
    component: EtransfersHomeComponent,
    data: { title: "ETransferHistoryForm.title" }
  }
]
 
