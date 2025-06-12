import { Component, forwardRef, OnInit ,Optional} from '@angular/core';
import { ControlContainer, FormBuilder, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { ViewDepositsTransactionFormComponentHelper, ViewDepositsTransactionFormComponentState } from './view-deposits-transaction-form.helper';

@Component({
  selector: 'app-view-deposits-transaction-form',
  templateUrl: './view-deposits-transaction-form.component.html',
  styleUrls: ['./view-deposits-transaction-form.component.scss'],
  providers:[ViewDepositsTransactionFormComponentHelper, 
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ViewDepositsTransactionFormComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => ViewDepositsTransactionFormComponent)
    }]
})
export class ViewDepositsTransactionFormComponent extends BaseFpxFormComponent<ViewDepositsTransactionFormComponentHelper, ViewDepositsTransactionFormComponentState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _viewDepositsTransactionFormHelper: ViewDepositsTransactionFormComponentHelper
  ) { 
    super(formBuilder, router,controlContainer, _viewDepositsTransactionFormHelper);
  }

  override doPreInit(){
    this.addElement('InvestmentTransactionSummaryGrid');
  }

}
