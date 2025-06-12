import { NgModule } from '@angular/core';
import { RouterModule, ROUTES, Routes } from '@angular/router';
import { WalletSpaceComponent } from './wallet-space.component';
import { DeviceDetectorService } from '@dep/core';

export const defaultRoutes: Routes = [
  {
    path: '',
    component: WalletSpaceComponent,
    children: [
      {
        path: '',
        redirectTo: 'wallet',
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
        path: 'decision-shell',
        loadChildren: () => import('@fpx/layout').then((m) => m.DecisionShellModule)
      },
      {
        path: 'wallet',
        loadChildren: () => import('../wallet/wallet.module').then((m) => m.WalletModule),
        data: {
          module: "wallet",
        }
      },
    ]
  }
];
const mobileRoutes: Routes = [
  {
    path: '',
    component: WalletSpaceComponent,
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
    path: 'decision-shell',
    loadChildren: () => import('@fpx/layout').then((m) => m.DecisionShellModule),
    data:{shellType:"DECISION"}
  },
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
export class WalletSpaceRoutingModule { }
