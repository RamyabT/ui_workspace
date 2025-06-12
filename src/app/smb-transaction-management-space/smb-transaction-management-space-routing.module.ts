import { NgModule } from '@angular/core';
import { RouterModule, ROUTES, Routes } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { TransactionManagementSpaceContainerComponent } from './transaction-management-space-container/transaction-management-space-container.component';

export const defaultRoutes: Routes = [
  {
    path: '',
    component: TransactionManagementSpaceContainerComponent,
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
  },
  {
    path: 'workflow',
    loadChildren: () => import('../workflow/workflow.module').then((m) => m.WorkflowModule),
    data: {
      module: "workflow",
    }
  }
]

const mobileRoutes: Routes = [
  {
    path: '',
    component: TransactionManagementSpaceContainerComponent
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
export class SmbTransactionManagementSpaceRoutingModule { }
