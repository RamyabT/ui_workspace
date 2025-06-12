import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PreloginContainerComponent } from "./prelogin-container/prelogin-container.component";

const routes: Routes = [
  {
    path: "",
    component: PreloginContainerComponent,
    children: [
      {
        path: "entry-shell",
        loadChildren: () =>
          import("@fpx/layout").then((m) => m.EntryShellModule),
      },
      {
        path: 'display-shell',
        loadChildren: () => import('@fpx/layout').then((m) => m.DisplayShellModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreloginSpaceRoutingModule {}
