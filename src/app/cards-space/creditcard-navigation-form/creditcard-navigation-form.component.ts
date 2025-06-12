import { Component, Input, Output, Optional, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CreditcardNavigationFormHelper, CreditcardNavigationFormState } from './creditcard-navigation-form.helper';

@Component({
  selector: 'creditcard-navigation-form',
  templateUrl: './creditcard-navigation-form.component.html',
  styleUrls: ['./creditcard-navigation-form.component.scss'],
  providers: [CreditcardNavigationFormHelper]
})
export class CreditcardNavigationFormComponent extends BaseFpxFormComponent<CreditcardNavigationFormHelper, CreditcardNavigationFormState> {
  @Output() creditCardData = new EventEmitter<CreditcardNavigationFormState>;

  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    debitcardNavigationFormHelper: CreditcardNavigationFormHelper,
  ) {
    super(_formBuilder, _route, _controlContainer, debitcardNavigationFormHelper);

    debitcardNavigationFormHelper.onCardSelectedEventEmitter(this.creditCardData);
  }

  protected override doPreInit(){
    this.addFormControl('cardRefNumber', '', [], [], 'change', 0, false);
  }

}
