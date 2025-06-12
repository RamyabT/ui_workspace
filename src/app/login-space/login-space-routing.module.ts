import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: '',
        redirectTo: 'entry-shell/login/login-form',
        pathMatch: 'prefix'
      },
      {
        path: "entry-shell",
        loadChildren: () =>
          import("@fpx/layout").then((m) => m.EntryShellModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginSpaceRoutingModule { }
