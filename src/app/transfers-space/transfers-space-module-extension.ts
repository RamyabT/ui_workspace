import { ThirdPartyModule } from "@dep/core";
import { TemplatesModule } from "../templates/templates.module";
import { AccountsModule } from "../accounts/accounts.module";
import { TransfersModuleHeaderComponent } from "./transfers-module-header/transfers-module-header.component";
import { TransfersAsideBarComponent } from "../layout/components/transfers-aside-bar/transfers-aside-bar.component";

export const TransfersSpaceExtensionComponents = [
   TransfersModuleHeaderComponent,
   TransfersAsideBarComponent
 ]

 export const TransfersSpaceImportsExtension = [
  ThirdPartyModule,
  TemplatesModule,
  AccountsModule
]
 
