import { Component, OnInit, Optional } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { FormControlsFormHelper, FormControlsFormState } from './form-controls-form.helper';
import { ControlContainer, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-controls-form',
  templateUrl: './form-controls-form.component.html',
  styleUrls: ['./form-controls-form.component.scss'],
  providers: [FormControlsFormHelper]
})
export class FormControlsFormComponent extends BaseFpxFormComponent<FormControlsFormHelper, FormControlsFormState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    private _formControlsHelper: FormControlsFormHelper
  ) {
    super(formBuilder, router,controlContainer, _formControlsHelper);
  }

  override doPreInit(){
    this.addFormControl('textBox1', '', [Validators.required]);
    this.addFormControl('textBox2', '', [Validators.required]);
    this.addFormControl('textBox3', '', [Validators.required]);
    this.addFormControl('date1', '', [Validators.required]);
    this.addFormControl('date2', '', [Validators.required]);
    this.addFormControl('date3', '', [Validators.required]);
    this.addFormControl('dropdown1', '', [Validators.required]);
    this.addFormControl('dropdown2', '', [Validators.required]);
    this.addFormControl('searchableDropdown1', '', [Validators.required]);
    this.addFormControl('radio1', '', [Validators.required]);
    this.addFormControl('checkbox1', '');
    this.addFormControl('checkbox2', '');
    this.addFormControl('toggleSwitch', '');
  }

}
