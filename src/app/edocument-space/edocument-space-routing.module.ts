import { NgModule, inject } from '@angular/core';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { eDocumentContainerComponent } from './edocument-container/edocument-container.component';
import { DeviceDetectorService } from '../dep/core/class/device-detector.service';

export const defaultRoutes: Routes = [
  {
    path: '',
    component: eDocumentContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'edocuments',
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
        path: 'edocuments',
        loadChildren: () => import('../edocument/edocument.module').then((m) => m.eDocumentModule),
        data: {
          module: "edocuments",
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
        }
      }
    ]
  }
];

export const mobileRoutes: Routes = [
  {
    path: '',
    component: eDocumentContainerComponent,
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
  // if(device.isMobile()){
  //   routes = mobileRoutes;
  // } else {
    routes = defaultRoutes;
  // }
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

export class eDocumentSpaceRoutingModule {}
