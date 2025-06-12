import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeLayoutComponent } from '../app-layout/welcome-layout/welcome-layout.component';
import { WelcomeContainerComponent } from './welcome-container/welcome-container.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeContainerComponent
  },
  {
    path: 'onboarding',
    component: WelcomeContainerComponent
  },
  {
    path: 'entry-shell',
    loadChildren: () => import('@fpx/layout').then((m) => m.EntryShellModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
