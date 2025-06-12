import { NgModule } from '@angular/core';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { OtherRequestContainerComponent } from './other-request-container/other-request-container.component';

export const defaultRoutes: Routes = [
  {
    path: '',
    component: OtherRequestContainerComponent,
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
        path: 'other-request',
        loadChildren: () => import('../other-request/other-request.module').then((m) => m.OtherRequestModule),
        data: {
          module: "other-request",
        }
      }
    ]
  }
];

export const mobileRoutes: Routes = [
  {
    path: '',
    component: OtherRequestContainerComponent,
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

export class OtherRequestSpaceRoutingModule { }
