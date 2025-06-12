import { Component, EventEmitter, Input, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { ExpenseComparisonHelper, ExpenseComparisonState } from './expense-comparison.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-comparison',
  templateUrl: './expense-comparison.component.html',
  styleUrls: ['./expense-comparison.component.scss'],
  providers: [ExpenseComparisonHelper]
})
export class ExpenseComparisonComponent extends BaseFpxFormComponent<ExpenseComparisonHelper, ExpenseComparisonState> {
  @Input() set spendsData(_data: any[]) {
    this.state.expenses = _data;
  }
  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    _ExpenseComparisonHelper: ExpenseComparisonHelper,
  ) {
    super(_formBuilder, _route, _controlContainer, _ExpenseComparisonHelper);
  }

  protected override doPreInit(): void {
    this.addElement('expenseComparisonRoGrid');
  }


}
