import { Component, OnInit, Optional } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { CashFlowHelper, CashFlowState } from './cash-flow.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.scss'],
  providers: [CashFlowHelper]
})
export class CashFlowComponent extends BaseFpxFormComponent<CashFlowHelper, CashFlowState> {

  constructor(
    _formBuilder: FormBuilder, 
    _route: Router, 
    @Optional() _controlContainer: ControlContainer,
    _cashflowHelper: CashFlowHelper,
  ) { 
    super(_formBuilder, _route, _controlContainer, _cashflowHelper);
  }

  protected override doPreInit(): void {
    this.addFormControl('cashflowMonth', '', [], [], 'change');
  }

}
