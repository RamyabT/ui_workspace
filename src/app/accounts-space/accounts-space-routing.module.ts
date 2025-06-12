import { NgModule, inject } from '@angular/core';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { AccountsContainerComponent } from './accounts-container/accounts-container.component';
import { DeviceDetectorService } from '../dep/core/class/device-detector.service';
import { AccountsSpaceRoutingChildrenExtension } from './accounts-space-routing-extension';

export const defaultRoutes: Routes = [
  {
    path: '',
    component: AccountsContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'accounts',
        pathMatch: 'prefix'
      },
      {
        path: 'entry-shell',
        loadChildren: () => import('@fpx/layout').then((m) => m.EntryShellModule)
      },
      {
        path: 'display-shell',
        loadChildren: () => import('@fpx/layout').then((m) => m.DisplayShellModule)
      },
      {
        path: 'accounts',
        loadChildren: () => import('../accounts/accounts.module').then((m) => m.AccountsModule),
        data: {
          module: "accounts",
        }
      },
      {
        path: 'deposits',
        loadChildren: () => import('../deposits/deposits.module').then((m) => m.DepositsModule),
        data: {
          module: "deposits",
        }
      },
      {
        path: 'loans',
        loadChildren: () => import('../loans/loans.module').then((m) => m.LoansModule),
        data: {
          module: "loans",
        },
      },
      ...AccountsSpaceRoutingChildrenExtension
    ]
  }
];

export const mobileRoutes: Routes = [
  {
    path: '',
    component: AccountsContainerComponent,
  },
  {
    path: 'entry-shell',
    loadChildren: () => import('@fpx/layout').then((m) => m.EntryShellModule)
  },
  {
    path: 'display-shell',
    loadChildren: () => import('@fpx/layout').then((m) => m.DisplayShellModule)
  }
];

function routesFactory(device: DeviceDetectorService) {
  let routes: Routes;
  if(device.isMobile()){
    routes = mobileRoutes;
  } else {
    routes = defaultRoutes;
  }
  return routes;
}

@NgModule({
  imports: [RouterModule.forChild([])],
  providers: [{
    provide: ROUTES,
    useFactory: routesFactory,
    multi: true,
    deps: [DeviceDetectorService]
  }],
  exports: [RouterModule]
})

export class AccountsSpaceRoutingModule {}
