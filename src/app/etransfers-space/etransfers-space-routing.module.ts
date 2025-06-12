import { NgModule } from '@angular/core';
import { RouterModule, ROUTES, Routes } from '@angular/router';
import { ETransfersContainerComponent } from './e-transfers-container/e-transfers-container.component';
import { DeviceDetectorService } from '@dep/core';
import { ETransfersSpaceRoutingExtension } from './etransfers-space-module-extension';

export const defaultRoutes: Routes = [
  {
    path: '',
    component: ETransfersContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'etransfers',
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
        path: 'etransfers',
        loadChildren: () => import('../etransfers/etransfers.module').then((m) => m.ETransfersModule),
        data: {
          module: "etransfers",
        }
      },
      ...ETransfersSpaceRoutingExtension
    ]
  }
];

const mobileRoutes: Routes = [
  {
    path: '',
    component: ETransfersContainerComponent
  },
  {
    path: 'entry-shell',
    loadChildren: () => import('@fpx/layout').then((m) => m.EntryShellModule)
  },
  {
    path: 'display-shell',
    loadChildren: () => import('@fpx/layout').then((m) => m.DisplayShellModule)
  },
  ...ETransfersSpaceRoutingExtension
];

function routesFactory(device: DeviceDetectorService) {
  let routes: Routes;
  if (device.isMobile()) {
    routes = mobileRoutes;
  } else {
    routes = defaultRoutes;
  }
  return routes;
}

@NgModule({
  imports: [RouterModule.forChild([])],
  exports: [RouterModule],
  providers: [{
    provide: ROUTES,
    useFactory: routesFactory,
    multi: true,
    deps: [DeviceDetectorService]
  }]
})

export class ETransfersSpaceRoutingModule { }
