import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BicSearchFormHelper, BicSearchFormState } from './bic-search-form.helper';
import { BaseFpxFormComponent } from '@fpx/core';

@Component({
  selector: 'app-bic-search-form',
  templateUrl: './bic-search-form.component.html',
  styleUrls: ['./bic-search-form.component.scss'],
  providers: [BicSearchFormHelper]
})
export class BicSearchFormComponent extends BaseFpxFormComponent<BicSearchFormHelper, BicSearchFormState> {

  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    _bicSearchFormHelper: BicSearchFormHelper
  ) {
    super(_formBuilder, _route, _controlContainer, _bicSearchFormHelper);
  }

  protected override doPreInit(): void {
    this.addFormControl('country', '',  [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('bankName', '',  [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('searchBicCode', '', [], [], 'change');
    this.addElement('bicBranchRoGrid');
  }

}
