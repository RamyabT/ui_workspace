import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormControlsFormComponent } from './form-controls-form/form-controls-form.component';

const routes: Routes = [
  {
    path: '',
    component: FormControlsFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepKitchenRoutingModule { }
