import { Component, Input, OnDestroy, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MembershipNavigationFormHelper, MembershipNavigationFormState } from './membership-navigation-form.helper';

@Component({
  selector: 'membership-navigation-form',
  templateUrl: './membership-navigation-form.component.html',
  styleUrls: ['./membership-navigation-form.component.scss'],
  providers: [MembershipNavigationFormHelper]
})
export class MembershipNavigationFormComponent extends BaseFpxFormComponent<MembershipNavigationFormHelper, MembershipNavigationFormState>{
  
  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    loanNavigationFormHelper: MembershipNavigationFormHelper,
  ) {
    super(_formBuilder, _route, _controlContainer, loanNavigationFormHelper);
  }

  protected override doPreInit(){
    this.addFormControl('accountNumber', '', [], [], 'change', 0, false);
  }

}
