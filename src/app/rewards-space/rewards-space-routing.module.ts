 
import { NgModule } from '@angular/core';
import { RouterModule, ROUTES, Routes } from '@angular/router';
 import { DeviceDetectorService } from '@dep/core';
import { RewardsContainerComponent } from './rewards-container/rewards-container.component';

export const defaultRoutes: Routes = [
  {
    path: '',
    component: RewardsContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'rewards',
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
        path: 'rewards',
        loadChildren: () => import('../rewards/rewards.module').then((m) => m.RewardsModule),
        data: {
          module: "rewards",
        }
      },
    ]
  }
];
const mobileRoutes: Routes = [
  {
    path: '',
    component: RewardsContainerComponent,
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
export class RewardsSpaceRoutingModule { }
