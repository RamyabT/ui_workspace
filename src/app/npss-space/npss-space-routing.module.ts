import { NgModule } from '@angular/core';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { NpssContainerComponent } from './npss-container/npss-container.component';

const defaultRoutes: Routes = [
  {
    path: '',
    component: NpssContainerComponent,
    children: [
      {
        path: 'entry-shell',
        loadChildren: () => import('@fpx/layout').then((m) => m.EntryShellModule)
      },
      {
        path: 'display-shell',
        loadChildren: () => import('@fpx/layout').then((m) => m.DisplayShellModule)
      },
      {
        path: "npss",
        loadChildren: () => import("../npss/npss.module").then((m) => m.NpssModule),
        data: {
          module: "npss",
          headerRequired: false,
          footerMenuRequired: false
        }
      },
    ]
  }
];

const mobileRoutes: Routes = [
  {
    path: '',
    component: NpssContainerComponent,
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
export class NpssSpaceRoutingModule { }
