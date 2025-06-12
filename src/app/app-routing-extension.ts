import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RetailManageEtransferReceiveMoneyFormComponent } from './etransfers/retail-manage-etransfer-receive-money-form/retail-manage-etransfer-receive-money-form.component';

export const AppRoutingChildrenExtension = [
    {
        path: 'edocument-space',
        loadChildren: () => import ('src/app/edocument-space/edocument-space.module').then((m) => m.eDocumentSpaceModule),
        data: { space:'edocument-space', headerRequired: true, footerMenuRequired: true }
    }
]
export const AppRoutingExtension = [
      {
        path: 'elaunch',
        component: RetailManageEtransferReceiveMoneyFormComponent
      }
]

export const AppRoutingImportExtension = [
    ReactiveFormsModule
]

export const AppModuleImportExtension = [
    // OktaAuthModule.forRoot({oktaAuth})
]

export const AppModuleDeclarationExtension = [
    
]

export const appRouteForRootOptions: any = [{
        onSameUrlNavigation: 'reload',
        useHash: true,
        paramsInheritanceStrategy: 'always'
}]
