import { NgModule } from '@angular/core';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { ToolsContainerComponent } from './tools-container/tools-container.component';

const defaultRoutes: Routes = [
  {
    path: '',
    component: ToolsContainerComponent,
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
        path: 'tools-calculator',
        loadChildren: () => import('../tools-calculator/tools-calculator.module').then((m) => m.ToolsCalculatorModule),
        data: {
          module: "tools-calculator",
        }
      }
    ]
  }
];

const mobileRoutes: Routes = [
  {
    path: '',
    component: ToolsContainerComponent,
    data: {
      title: 'RETAILLOANSCALCULATORFORM.title'
    }
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
export class ToolsSpaceRoutingModule { }
