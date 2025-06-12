import { NgModule } from '@angular/core';
import { RouterModule, ROUTES, Routes } from '@angular/router';
import { InsuranceContainerComponent } from './insurance-container/insurance-container.component';
import { DeviceDetectorService } from '@dep/core';

const defaultRoutes: Routes = [
  {
    path: '',
    component: InsuranceContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'insurance',
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
        loadChildren: () => import('@fpx/layout').then((m) => m.DecisionShellModule),
        data:{shellType:"DECISION"}
      },
      {
        path: 'insurance',
        loadChildren: () => import('../insurance/insurance.module').then((m) => m.InsuranceModule),
        data: {
          module: "insurance",
        }
      },
    ]
  },
];

const mobileRoutes: Routes = [
  {
    path: '',
    component: InsuranceContainerComponent,
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
export class InsuranceSpaceRoutingModule {}
