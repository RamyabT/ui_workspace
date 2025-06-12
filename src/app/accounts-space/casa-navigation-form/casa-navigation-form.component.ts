import { Component, Input, OnDestroy, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { CasaNavigationFormHelper, CasaNavigationFormState } from './casa-navigation-form.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'casa-navigation-form',
  templateUrl: './casa-navigation-form.component.html',
  styleUrls: ['./casa-navigation-form.component.scss'],
  providers: [CasaNavigationFormHelper]
})
export class CasaNavigationFormComponent extends BaseFpxFormComponent<CasaNavigationFormHelper, CasaNavigationFormState>{
  @Input('highlightMenu') highlightMenu: string='';
  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    casaNavigationFormHelper: CasaNavigationFormHelper,
  ) {
    super(_formBuilder, _route, _controlContainer, casaNavigationFormHelper);
  }

  protected override doPreInit(){
    this.addFormControl('accountNumber', '', [], [], 'change', 0, false);
  }

}
