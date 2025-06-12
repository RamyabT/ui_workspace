import { ThirdPartyModule } from "@dep/core";
import { TemplatesModule } from "../templates/templates.module";
import { BillsModuleHeaderComponent } from "./bills-module-header/bills-module-header.component";
import { AccountsModule } from "../accounts/accounts.module";

export const BillsSpaceExtensionComponents = [
   BillsModuleHeaderComponent
 ]

 export const BillsSpaceImportsExtension = [
  ThirdPartyModule,
  TemplatesModule,
  AccountsModule
]
 
