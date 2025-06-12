import { Injector, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { MainFooterComponent } from './layout/components/main-footer/main-footer.component';
import { MainHeaderComponent } from './layout/components/main-header/main-header.component';
import { MenuBarComponent } from './layout/components/menu-bar/menu-bar.component';
import { LayoutComponent } from './layout/layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { FoundationModule } from './foundation/foundation.module';
import { MoreMenuComponent } from './layout/more-menu/more-menu.component';
import { AuthGuardService } from './common-service/auth-guard.service';
import { appRouteForRootOptions, AppRoutingChildrenExtension, AppRoutingExtension } from './app-routing-extension';
import { APPCONSTANTS } from '@dep/constants';
import { AppLauncherComponent } from './app-launcher/app-launcher.component';

import { RetailManageEtransferReceiveMoneyFormComponent } from './etransfers/retail-manage-etransfer-receive-money-form/retail-manage-etransfer-receive-money-form.component';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { DepOktaAuthGuard } from './okta-integration/guard/dep-okta-auth.guard';
import { PageNotFoundComponent } from './http-status/page-not-found/page-not-found.component';
import { NoAccessComponent } from './http-status/no-access/no-access.component';
import { UnderConstructionComponent } from './http-status/under-construction/under-construction.component';
import { UnauthorizedComponent } from './http-status/unauthoried/unauthorized.component';
import { ServiceUnavailableComponent } from './http-status/service-unavailable/service-unavailable.component';
import { BadGatewayComponent } from './http-status/bad-gateway/bad-gateway.component';
import { CustomOktaCallbackComponent } from './okta-integration/okta/custom-okta-callback/custom-okta-callback.component';
import { OktaLandingFormComponent } from './okta-integration/okta-landing-form/okta-landing-form.component';
import { OktaCallbackComponent } from '@okta/okta-angular';
declare let window: any;

const routes: Routes = [
  {
  path : '',
    redirectTo : 'app-launcher',
    pathMatch : 'full'
  },
  // {
  //   path : '',
  //   redirectTo : 'home',
  //   pathMatch : 'full'
  // },
  ...AppRoutingExtension,
  {
    path: '',
    component: LayoutComponent,
    canActivate: [DepOktaAuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('src/app/home/home.module').then((m) => m.HomeModule),
        data: { space:'home', headerRequired: false, footerMenuRequired: true }
      },
      {
        path: 'accounts-space',
        loadChildren: () => import ('src/app/accounts-space/accounts-space.module').then((m) => m.AccountsSpaceModule),
        data: { space:'accounts-space', headerRequired: true, footerMenuRequired: true }
      },
      {
        path: 'transfers-space',
        loadChildren: () => import ('src/app/transfers-space/transfers-space.module').then((m) => m.TransfersSpaceModule),
        data: { space:'transfers-space', headerRequired: true, footerMenuRequired: true }
      },
      {
        path: 'payments-space',
        loadChildren: () => import ('src/app/payments-space/payments-space.module').then((m) => m.PaymentsSpaceModule),
        data: { space:'payments-space', headerRequired: true, footerMenuRequired: true }
      },
      {
        path: 'cards-space',
        loadChildren: () => import ('src/app/cards-space/cards-space.module').then((m) => m.CardsSpaceModule),
        data: { space:'cards-space', headerRequired: true, footerMenuRequired: true }
      },
      {
        path: 'tools-space',
        loadChildren: () => import ('src/app/tools-space/tools-space.module').then((m) => m.ToolsSpaceModule),
        data: { space:'tools-space',headerRequired: true, footerMenuRequired: true}
      },
      {
        path: 'npss-space',
        loadChildren: () => import('src/app/npss-space/npss-space.module').then((m) => m.NpssSpaceModule),
        data: { space:'npss-space', headerRequired: true, footerMenuRequired: true }
      },
      {
        path: 'service-request-space',
        loadChildren: () => import ('src/app/service-request-space/service-request-space.module').then((m) => m.ServiceRequestSpaceModule),
        data: { space:'service-request-space', headerRequired: true, footerMenuRequired: true }
      },
      {
        path: 'settings-space',
        loadChildren: () => import('src/app/settings-space/settings-space.module').then((m) => m.SettingsSpaceModule),
        data: { space:'settings-space', headerRequired: true, footerMenuRequired: true }
      },
      {
        path: 'other-request-space',
        loadChildren: () => import('src/app/other-request-space/other-request-space.module').then((m) => m.OtherRequestSpaceModule),
        data: { space:'other-request-space', headerRequired: true, footerMenuRequired: true }
      },
      {
        path: 'etransfers-space',
        loadChildren: () => import('src/app/etransfers-space/etransfers-space.module').then((m) => m.ETransfersSpaceModule),
        data: { space:'etransfers-space', headerRequired: true, footerMenuRequired: true }
      },
      {
        path: 'smb-delegat-space',
        loadChildren: () => import('src/app/smb-delegate-space/smb-delegate-space.module').then((m) => m.SmbDelegateSpaceModule),
        data: { space:'smbdelegat-space', headerRequired: true, footerMenuRequired: true }
      },
      {
        path: 'under-construction',
        component :UnderConstructionComponent
      },
      ...AppRoutingChildrenExtension
    ]
  },
  {
    path: 'dep-kitchen',
    loadChildren: () => import('../app/dep-kitchen/dep-kitchen.module').then((m) => m.DepKitchenModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('../app/welcome/welcome.module').then((m) => m.WelcomeModule),
    data: { space:'welcome' }
  },
  {
    path: 'login-space',
    loadChildren: () => import('../app/login-space/login-space.module').then((m) => m.LoginSpaceModule)
  },
  {
    path: 'dashboard',
    redirectTo: 'home'
  },
  {
    path: 'prelogin-space',
    loadChildren: () => import('src/app/prelogin-space/prelogin-space.module').then((m) => m.PreloginSpaceModule),
    data: { space:'welcome' }
  },
  {
    path: 'display-shell',
    loadChildren: () => import('@fpx/layout').then((m) => m.DisplayShellModule)
  },
  {
    path: 'staging',
    loadChildren: () => import('src/app/staging/staging.module').then((m) => m.StagingModule),
    data: { space:'home' }
  },
  {
    path: 'login',
    // loadChildren: () => import('src/app/okta-integration/okta-integration.module').then((m) => m.OktaIntegrationModule),
    component: OktaLandingFormComponent,
    // data: { space:'home' }
  },
  {
    path: 'login/callback',
    component: CustomOktaCallbackComponent
  },
  {
    path: 'vansit:/callback',
    component: OktaCallbackComponent
  },
  {
    path: 'app-launcher',
    component: AppLauncherComponent
  },
  {
    path: 'elaunch',
    component: RetailManageEtransferReceiveMoneyFormComponent
  },
  {
    path: 'noaccess',
    component: NoAccessComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', onSameUrlNavigation: 'reload' }),
    RouterModule.forRoot(routes, window['cordova'] ? { onSameUrlNavigation: 'reload', useHash: true, paramsInheritanceStrategy: "always" } : { relativeLinkResolution: 'legacy', onSameUrlNavigation: 'reload' }),
    FpxCoreModule,
    BrowserModule,
    TranslateModule,
    FoundationModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    LayoutComponent,
    MenuBarComponent,
    MainHeaderComponent,
    MainFooterComponent,
    MoreMenuComponent
  ],
  providers: [
    provideOAuthClient()
  ]
})
export class AppRoutingModule { }
