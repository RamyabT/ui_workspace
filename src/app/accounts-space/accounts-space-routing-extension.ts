import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const AccountsSpaceRoutingChildrenExtension = [
    {
        path: 'membership',
        loadChildren: () => import('../membership/membership.module').then((m) => m.MembershipModule),
        data: {
            module: "membership",
        },
    },
]
export const AccountsSpaceRoutingExtension = [
    
]

export const AccountsSpaceRoutingImportExtension = [
    ReactiveFormsModule
]

export const AccountsSpaceModuleImportExtension = [
    
]

export const AccountsSpaceModuleDeclarationExtension = [
    
]

export const accountsSpaceRouteForRootOptions: any = [{
    onSameUrlNavigation: 'reload',
    useHash: true,
    paramsInheritanceStrategy: 'always'
}]
