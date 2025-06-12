import { Component, OnInit, Optional } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { SplitBillsFormHelper, SplitBillsFormState } from './split-bills-form.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-split-bills-form',
  templateUrl: './split-bills-form.component.html',
  styleUrls: ['./split-bills-form.component.scss'],
  providers: [SplitBillsFormHelper]
})
export class SplitBillsFormComponent extends BaseFpxFormComponent<SplitBillsFormHelper, SplitBillsFormState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _splitBillsService: SplitBillsFormHelper,
  ) { 
    super(formBuilder, router,controlContainer, _splitBillsService);
  }

}
