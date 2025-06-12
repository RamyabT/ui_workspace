import { NgModule } from '@angular/core';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { PaymentsContainerComponent } from './payments-container/payments-container.component';
import { DeviceDetectorService } from '../dep/core/class/device-detector.service';

export const defaultRoutes: Routes = [
  {
    path: '',
    component: PaymentsContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'payments',
        pathMatch: 'prefix'
      },
      {
        path: 'entry-shell',
        loadChildren: () => import('@fpx/layout').then((m) => m.EntryShellModule)
      },
      {
        path: 'display-shell',
        loadChildren: () => import('@fpx/layout').then((m) => m.DisplayShellModule)
      }
    ]
  }
];

const mobileRoutes: Routes = [
  {
    path: '',
    component: PaymentsContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'payments',
        pathMatch: 'prefix'
      },
      {
        path: 'entry-shell',
        loadChildren: () => import('@fpx/layout').then((m) => m.EntryShellModule)
      },
      {
        path: 'display-shell',
        loadChildren: () => import('@fpx/layout').then((m) => m.DisplayShellModule)
      }
    ]
  },
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
  providers: [{
    provide: ROUTES,
    useFactory: routesFactory,
    multi: true,
    deps: [DeviceDetectorService]
  }],
  exports: [RouterModule]
})
export class PaymentsSpaceRoutingModule { }
