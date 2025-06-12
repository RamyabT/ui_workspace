import { Component, Input, OnInit, Optional } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { DepositNavigationFormHelper, DepositNavigationFormState } from './deposit-navigation-form.helper';
import { FormBuilder, ControlContainer } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'deposit-navigation-form',
  templateUrl: './deposit-navigation-form.component.html',
  styleUrls: ['./deposit-navigation-form.component.scss'],
  providers: [DepositNavigationFormHelper]
})
export class DepositNavigationFormComponent extends BaseFpxFormComponent<DepositNavigationFormHelper, DepositNavigationFormState> {
  @Input('highlightMenu') highlightMenu: string='';

  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    depositNavigationFormHelper: DepositNavigationFormHelper,
  ) {
    super(_formBuilder, _route, _controlContainer, depositNavigationFormHelper);
  }

  override doPreInit(){
    // this.addFormControl('accountNumber', '', [], [], 'change', 0, false);
  }

}
