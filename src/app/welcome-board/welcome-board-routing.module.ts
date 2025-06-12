import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeBoardComponent } from './welcome-board.component';

 



const routes: Routes = [
  {
    path: '',
    component: WelcomeBoardComponent
  },
  {
    path: 'onboarding',
    component: WelcomeBoardComponent
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
export class WelcomeBoardRoutingModule { }