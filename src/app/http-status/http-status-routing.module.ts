import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ServiceUnavailableComponent } from './service-unavailable/service-unavailable.component';
import { NoNetworkComponent } from './no-network/no-network.component';
import { UnauthorizedComponent } from './unauthoried/unauthorized.component';
import { BadGatewayComponent } from './bad-gateway/bad-gateway.component';
import { SslCertificateErrorComponent } from './ssl-certificate-error/ssl-certificate-error.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';


const routes: Routes = [
  {
    path : 'bad-gateway',
    component : BadGatewayComponent,
    data: { title: "BadGatewayForm.title" }

  },
  {
    path : 'page-not-found',
    component : PageNotFoundComponent,
    data: { title: "PageNotFoundForm.title" }

  },
  {
    path : 'service-unavailable',
    component : ServiceUnavailableComponent,
    data: { title: "ServiceUnavailableForm.title" }

  },
  {
    path : 'unauthorized',
    component : UnauthorizedComponent,
    data: { title: "unauthorizedForm.title" }

  },
  {
    path : "no-network",
    component : NoNetworkComponent
  },
  {
    path : "ssl-certificate-error",
    component : SslCertificateErrorComponent,
    data : { title: "SSLCertificateError.title"}
  },
  {
    path : 'no-access',
    component : NoAccessComponent,
    data: { title: "NoAccessForm.title" }

  },
  {
    path : 'under-construction',
    component :UnderConstructionComponent,
    data: {title:"UnderConstructionForm.title"}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HttpStatusRoutingModule { }




 
  
