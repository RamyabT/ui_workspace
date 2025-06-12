import { NgModule } from '@angular/core';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { DeviceDetectorService } from '../dep/core/class/device-detector.service';
import { CardsContainerComponent } from './cards-container/cards-container.component';

export const defaultRoutes: Routes = [
  {
    path: '',
    component: CardsContainerComponent,
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
        path: 'debit-card',
        loadChildren: () => import('../debit-card/debitcard.module').then((m) => m.DebitcardModule),
        data: {
          module: "debitcard",
        }
      },
      {
        path: 'accounts',
        loadChildren: () => import('../accounts/accounts.module').then((m) => m.AccountsModule),
        data: {
          module: "accounts",
        }
      },
      {
        path: 'credit-card',
        loadChildren: () => import('../credit-cards/credit-cards.module').then((m) => m.CreditCardsModule),
        data: {
          module: "creditcard",
        }
      },
      {
        path: 'prepaid-card',
        loadChildren: () => import('../prepaidcard/prepaidcard.module').then((m) => m.PrepaidcardModule),
        data: {
          module: "prepaidcard",
        }
      },
    ]
  }
];

export const mobileRoutes: Routes = [
  {
    path: '',
    component: CardsContainerComponent,
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
export class CardsSpaceRoutingModule { }
