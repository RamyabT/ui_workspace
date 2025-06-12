import { NgModule } from '@angular/core';
import { RouterModule, ROUTES, Routes } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { FbSpaceContainerComponent } from './fb-space-container/fb-space-container.component';

export const defaultRoutes: Routes = [
  {
    path: '',
    component: FbSpaceContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'fb',
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
        path: 'fb',
        loadChildren: () => import('../fb/fb.module').then((m) => m.FbModule),
        data: {
          module: "fb",
        }
      },
    ]
  }
];
const mobileRoutes: Routes = [
  {
    path: '',
    component: FbSpaceContainerComponent,
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
export class FbSpaceRoutingModule { }
