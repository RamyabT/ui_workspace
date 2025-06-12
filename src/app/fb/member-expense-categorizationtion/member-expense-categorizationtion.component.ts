
import { Component, EventEmitter, Input, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberExpenseCategorizationtionHelper, MemberExpenseCategorizationtionState } from './member-expense-categorizationtion.helper';

@Component({
  selector: 'app-member-expense-categorizationtion',
  templateUrl: './member-expense-categorizationtion.component.html',
  styleUrls: ['./member-expense-categorizationtion.component.scss'],
    providers: [MemberExpenseCategorizationtionHelper]
  
})
 
export class MemberExpenseCategorizationtionComponent extends BaseFpxFormComponent<MemberExpenseCategorizationtionHelper, MemberExpenseCategorizationtionState> {
  @Input() set spendsData(_data: any[]) {
    this.state.expenses = _data || [];
  }
  
  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    _MemberExpenseCategorizationtionHelper: MemberExpenseCategorizationtionHelper,
  ) {
    super(_formBuilder, _route, _controlContainer, _MemberExpenseCategorizationtionHelper);
  }

  protected override doPreInit(): void {

  }


}
