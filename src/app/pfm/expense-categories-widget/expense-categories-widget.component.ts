import { Component, EventEmitter, Input, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { ExpenseCategoriesWidgetHelper, ExpenseCategoriesWidgetState } from './expense-categories-widget.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-categories-widget',
  templateUrl: './expense-categories-widget.component.html',
  styleUrls: ['./expense-categories-widget.component.scss'],
  providers: [ExpenseCategoriesWidgetHelper]
})
export class ExpenseCategoriesWidgetComponent extends BaseFpxFormComponent<ExpenseCategoriesWidgetHelper, ExpenseCategoriesWidgetState> {
  @Input() set spendsData(_data: any[]) {
    this.state.expenses = _data || [];
  }
  
  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    _ExpenseCategoriesWidgetHelper: ExpenseCategoriesWidgetHelper,
  ) {
    super(_formBuilder, _route, _controlContainer, _ExpenseCategoriesWidgetHelper);
  }

  protected override doPreInit(): void {

  }


}
