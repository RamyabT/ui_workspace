import { Component, Input, OnDestroy, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { PrepaidcardNavigationFormHelper, PrepaidcardNavigationFormState } from './prepaidcard-navigation-form.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'prepaidcard-navigation-form',
  templateUrl: './prepaidcard-navigation-form.component.html',
  styleUrls: ['./prepaidcard-navigation-form.component.scss'],
  providers: [PrepaidcardNavigationFormHelper]
})
export class PrepaidcardNavigationFormComponent extends BaseFpxFormComponent<PrepaidcardNavigationFormHelper, PrepaidcardNavigationFormState>{
  
  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    prepaidcardNavigationFormHelper: PrepaidcardNavigationFormHelper,
  ) {
    super(_formBuilder, _route, _controlContainer, prepaidcardNavigationFormHelper);
  }

  protected override doPreInit(){
    this.addFormControl('cardRefNumber', '', [], [], 'change', 0, false);
  }

}
