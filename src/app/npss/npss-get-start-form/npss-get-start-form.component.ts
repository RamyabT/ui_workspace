import { Component, OnInit, Optional } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { NpssGetStartFormHelper, NpssGetStartFormState } from './npss-get-start-form.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-npss-get-start-form',
  templateUrl: './npss-get-start-form.component.html',
  styleUrls: ['./npss-get-start-form.component.scss'],
  providers: [NpssGetStartFormHelper]
})
export class NpssGetStartFormComponent extends BaseFpxFormComponent<NpssGetStartFormHelper, NpssGetStartFormState>  {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public npssGetStartFormHelper: NpssGetStartFormHelper

  ) {
    super(formBuilder, router, controlContainer, npssGetStartFormHelper);
  }

  override doPreInit(){

  }

}
