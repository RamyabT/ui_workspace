import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MobileNumberSearchFormHelper, MobileNumberSearchFormState } from './mobile-number-search-form.helper';
import { BaseFpxFormComponent } from '@fpx/core';

@Component({
  selector: 'app-mobile-number-search-form',
  templateUrl: './mobile-number-search-form.component.html',
  styleUrls: ['./mobile-number-search-form.component.scss'],
  providers: [MobileNumberSearchFormHelper]
})
export class MobileNumberSearchFormComponent extends BaseFpxFormComponent<MobileNumberSearchFormHelper, MobileNumberSearchFormState> {

  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    _bicSearchFormHelper: MobileNumberSearchFormHelper
  ) {
    super(_formBuilder, _route, _controlContainer, _bicSearchFormHelper);
  }

  protected override doPreInit(): void {
    this.addFormControl('searchMobileNumber', '', [], [], 'change');
    this.addElement('contactList');
  }

}
