import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { SelectTransferTypeFormComponentHelper, SelectTransferTypeFormComponentState } from './select-transfer-type-form.helper';

@Component({
  selector: 'app-select-transfer-type-form',
  templateUrl: './select-transfer-type-form.component.html',
  styleUrls: ['./select-transfer-type-form.component.scss'],
  providers: [
    SelectTransferTypeFormComponentHelper,
  ]
})
export class SelectTransferTypeFormComponent extends BaseFpxFormComponent<SelectTransferTypeFormComponentHelper,SelectTransferTypeFormComponentState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _selectTransferTypeFormComponentHelper: SelectTransferTypeFormComponentHelper
  ) { 
    super(formBuilder, router,controlContainer, _selectTransferTypeFormComponentHelper);
  }

  override doPreInit(){
    this.addElement('selectBeneTypeGrid');
  }

}
