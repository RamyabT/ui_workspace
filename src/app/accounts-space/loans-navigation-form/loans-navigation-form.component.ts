import { Component, Input, OnDestroy, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanNavigationFormHelper, LoanNavigationFormState } from './loans-navigation-form.helper';

@Component({
  selector: 'loans-navigation-form',
  templateUrl: './loans-navigation-form.component.html',
  styleUrls: ['./loans-navigation-form.component.scss'],
  providers: [LoanNavigationFormHelper]
})
export class LoansNavigationFormComponent extends BaseFpxFormComponent<LoanNavigationFormHelper, LoanNavigationFormState>{
  
  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    loanNavigationFormHelper: LoanNavigationFormHelper,
  ) {
    super(_formBuilder, _route, _controlContainer, loanNavigationFormHelper);
  }

  protected override doPreInit(){
    this.addFormControl('accountNumber', '', [], [], 'change', 0, false);
  }

}
