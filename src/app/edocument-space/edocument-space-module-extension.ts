import { ThirdPartyModule } from "@dep/core";
import { TemplatesModule } from "../templates/templates.module";
import { eDocumentModuleHeaderComponent } from "./edocument-module-header/edocument-module-header.component";

export const eDocumentSpaceExtensionComponents = [
  eDocumentModuleHeaderComponent
 ]

 export const eDocumentSpaceImportsExtension = [
  ThirdPartyModule,
  TemplatesModule
]
 
