import { ThirdPartyModule } from "@dep/core";
import { AccountsModuleHeaderComponent } from "./accounts-module-header/accounts-module-header.component";
import { TemplatesModule } from "../templates/templates.module";
import { MembershipNavigationFormComponent } from "./membership-navigation-form/membership-navigation-form.component";
import { MembershipModule } from "../membership/membership.module";
import { MatTooltipModule } from "@angular/material/tooltip";

export const AccountsSpaceExtensionComponents = [
   AccountsModuleHeaderComponent,
   MembershipNavigationFormComponent
 ]

 export const AccountsSpaceImportsExtension = [
  ThirdPartyModule,
  TemplatesModule,
  MembershipModule,
  MatTooltipModule
]
 
