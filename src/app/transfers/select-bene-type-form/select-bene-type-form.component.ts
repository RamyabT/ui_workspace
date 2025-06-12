import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { SelectBeneTypeFormComponentHelper, SelectBeneTypeFormComponentState } from './select-bene-type-form.helper';

@Component({
  selector: 'app-select-bene-type-form',
  templateUrl: './select-bene-type-form.component.html',
  styleUrls: ['./select-bene-type-form.component.scss'],
  providers: [
    SelectBeneTypeFormComponentHelper,
  ]
})
export class SelectBeneTypeFormComponent extends BaseFpxFormComponent<SelectBeneTypeFormComponentHelper,SelectBeneTypeFormComponentState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _selectBeneTypeFormComponentHelper: SelectBeneTypeFormComponentHelper
  ) { 
    super(formBuilder, router,controlContainer, _selectBeneTypeFormComponentHelper);
  }

  override doPreInit(){
    this.addElement('selectBeneTypeGrid');
    this.setServiceCode('SELECTBENETYPE');
  }

}
