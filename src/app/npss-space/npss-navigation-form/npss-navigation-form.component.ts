import { Component, Input, OnDestroy, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { NpssNavigationFormHelper, NpssNavigationFormState } from './npss-navigation-form.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'npss-navigation-form',
  templateUrl: './npss-navigation-form.component.html',
  styleUrls: ['./npss-navigation-form.component.scss'],
  providers: [NpssNavigationFormHelper]
})
export class NpssNavigationFormComponent extends BaseFpxFormComponent<NpssNavigationFormHelper, NpssNavigationFormState>{
  
  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    npssNavigationFormHelper: NpssNavigationFormHelper,
  ) {
    super(_formBuilder, _route, _controlContainer, npssNavigationFormHelper);
  }

  protected override doPreInit(){
    this.addFormControl('accountNumber', '', [], [], 'change', 0, false);
  }

}
