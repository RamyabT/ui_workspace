import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from '../app-layout/home-layout/home-layout.component';
import { CustomizeQuickActionComponent } from './customize-quick-action/customize-quick-action.component';

const homeRouts: Routes = [

]

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent
  },
  {
    path: "customize-quick-links",
    component: CustomizeQuickActionComponent,
    data: { title: "CUSTOMIZE_QUICK_LINKS.title" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
