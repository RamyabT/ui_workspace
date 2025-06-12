import { Component, Input, OnDestroy, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { DebitcardNavigationFormHelper, DebitcardNavigationFormState } from './debitcard-navigation-form.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'debitcard-navigation-form',
  templateUrl: './debitcard-navigation-form.component.html',
  styleUrls: ['./debitcard-navigation-form.component.scss'],
  providers: [DebitcardNavigationFormHelper]
})
export class DebitcardNavigationFormComponent extends BaseFpxFormComponent<DebitcardNavigationFormHelper, DebitcardNavigationFormState>{
  
  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    debitcardNavigationFormHelper: DebitcardNavigationFormHelper,
  ) {
    super(_formBuilder, _route, _controlContainer, debitcardNavigationFormHelper);
  }

  protected override doPreInit(){
    this.addFormControl('cardRefNumber', '', [], [], 'change', 0, false);
  }

}
