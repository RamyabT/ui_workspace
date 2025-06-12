import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadGatewayComponent } from './bad-gateway/bad-gateway.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ServiceUnavailableComponent } from './service-unavailable/service-unavailable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { HttpStatusRoutingModule } from './http-status-routing.module';
import { NoNetworkComponent } from './no-network/no-network.component';
import { UnauthorizedComponent } from './unauthoried/unauthorized.component';
import { TranslateModule } from '@ngx-translate/core';
import { SslCertificateErrorComponent } from './ssl-certificate-error/ssl-certificate-error.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { NoAccessComponent } from './no-access/no-access.component';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    NoNetworkComponent,
    ServiceUnavailableComponent,
    UnauthorizedComponent,
    BadGatewayComponent,
    SslCertificateErrorComponent,
    UnderConstructionComponent,
    NoAccessComponent
  ],
  imports: [
    CommonModule,
    HttpStatusRoutingModule,
    FormsModule,
    FpxCoreModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    PageNotFoundComponent,
    UnauthorizedComponent,
    ServiceUnavailableComponent,
    BadGatewayComponent,
    NoNetworkComponent,
    SslCertificateErrorComponent
   
  ]

})
export class HttpStatusModule { }
