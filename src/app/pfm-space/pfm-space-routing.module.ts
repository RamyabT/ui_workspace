import { NgModule } from '@angular/core';
import { RouterModule, ROUTES, Routes } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { PfmSpaceContainerComponent } from './pfm-space-container/pfm-space-container.component';

export const defaultRoutes: Routes = [
  {
    path: '',
    component: PfmSpaceContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'pfm',
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
        path: 'pfm',
        loadChildren: () => import('../pfm/pfm.module').then((m) => m.PfmModule),
        data: {
          module: "pfm",
        }
      },
    ]
  }
];
const mobileRoutes: Routes = [
  {
    path: '',
    component: PfmSpaceContainerComponent,
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
export class PfmSpaceRoutingModule { }
