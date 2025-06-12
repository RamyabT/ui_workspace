import { NgModule } from '@angular/core';
import { RouterModule, ROUTES, Routes } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { DelegateSpaceContainerComponent } from './delegate-space-container/delegate-space-container.component';

export const defaultRoutes: Routes = [
  {
    path: '',
    component: DelegateSpaceContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'smb',
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
        path: 'smb',
        loadChildren: () => import('../smb/smb.module').then((m) => m.SmbModule),
        data: {
          module: "smb",
        }
      }
    ]
  }
]

const mobileRoutes: Routes = [
  {
    path: '',
    component: DelegateSpaceContainerComponent
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
export class SmbDelegateSpaceRoutingModule { }
