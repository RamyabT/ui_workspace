import { NgModule } from '@angular/core';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { DeviceDetectorService } from '../dep/core/class/device-detector.service';
import { ServiceRequestContainerComponent } from './service-request-container/service-request-container.component';

export const defaultRoutes: Routes = [
  {
    path: '',
    component: ServiceRequestContainerComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../service-request/service-request.module').then((m) => m.ServiceRequestModule),
        data: {
          module: "servicerequest",
        }
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
        path: 'servicerequest',
        loadChildren: () => import('../service-request/service-request.module').then((m) => m.ServiceRequestModule),
        data: {
          module: "servicerequest",
        }
      },
      {
        path: 'accounts',
        loadChildren: () => import('../accounts/accounts.module').then((m) => m.AccountsModule),
        data: {
          module: "servicerequest",
        }
      },
      {
        path: 'deposits',
        loadChildren: () => import('../deposits/deposits.module').then((m) => m.DepositsModule),
        data: {
          module: "servicerequest",
        }
      },
      {
        path: 'loans',
        loadChildren: () => import('../loans/loans.module').then((m) => m.LoansModule),
        data: {
          module: "servicerequest",
        }
      },
      {
        path: "credit-cards",
        loadChildren: () => import("../credit-cards/credit-cards.module").then((m) => m.CreditCardsModule),
        data: {
          module: "servicerequest",
        },
      },
      {
        path: "transfers",
        loadChildren: () =>
          import("../transfers/transfers.module").then((m) => m.TransfersModule),
        data: {
          module: "servicerequest",
        },
      },
      {
        path: "payments",
        loadChildren: () =>
          import("../payments/payments.module").then((m) => m.PaymentsModule),
        data: {
          module: "servicerequest",
        },
      },
      {
        path: "debit-card",
        loadChildren: () =>
          import("../debit-card/debitcard.module").then((m) => m.DebitcardModule),
        data: {
          module: "servicerequest",
        },
      },
      {
        path: "prepaidcard",
        loadChildren: () =>
          import("../prepaidcard/prepaidcard.module").then((m) => m.PrepaidcardModule),
        data: {
          module: "servicerequest",
        },
      },
      {
        path: "npss",
        loadChildren: () => import("../npss/npss.module").then((m) => m.NpssModule),
        data: {
          module: "servicerequest",
        }
      },
      {
        path: 'other-request',
        loadChildren: () => import('../other-request/other-request.module').then((m) => m.OtherRequestModule),
        data: {
          module: "servicerequest",
        }
      },
    ]
  }
];

export const mobileRoutes: Routes = [
  {
    path: '',
    component: ServiceRequestContainerComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../service-request/service-request.module').then((m) => m.ServiceRequestModule),
        data: {
          module: "servicerequest",
        }
      },
      {
        path: 'servicerequest',
        loadChildren: () => import('../service-request/service-request.module').then((m) => m.ServiceRequestModule),
        data: {
          module: "servicerequest",
        }
      },
    ]
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
export class ServiceRequestSpaceRoutingModule { }
