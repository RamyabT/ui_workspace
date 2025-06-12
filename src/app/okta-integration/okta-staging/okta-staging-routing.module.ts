import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OktaStagingComponent } from './okta-staging.component';

const routes: Routes = [
  {
    path: '',
    component: OktaStagingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OktaStagingRoutingModule { }
