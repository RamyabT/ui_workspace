 
import { Component, EventEmitter, Input, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
 import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberExpenseComparisonHelper, MemberExpenseComparisonState } from './member-expense-comparison.helper';

@Component({
  selector: 'app-member-expense-comparison',
  templateUrl: './member-expense-comparison.component.html',
  styleUrls: ['./member-expense-comparison.component.scss'],
  providers: [MemberExpenseComparisonHelper]
})
export class MemberExpenseComparisonComponent extends BaseFpxFormComponent<MemberExpenseComparisonHelper, MemberExpenseComparisonState> {
  @Input() set spendsData(_data: any[]) {
    this.state.expenses = _data;
  }
  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    _ExpenseComparisonHelper: MemberExpenseComparisonHelper,
  ) {
    super(_formBuilder, _route, _controlContainer, _ExpenseComparisonHelper);
  }

  protected override doPreInit(): void {
    this.addElement('expenseComparisonRoGrid');
  }


}
