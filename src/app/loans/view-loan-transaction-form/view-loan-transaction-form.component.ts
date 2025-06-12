import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewLoanTransactionFormComponentHelper, ViewLoanTransactionFormComponentState } from './view-loan-transaction-form.helper';
import { BaseFpxFormComponent } from '@fpx/core';
import { LoantransactiondtlsService } from '../loantransactiondtls-service/loantransactiondtls.service';

@Component({
  selector: 'app-view-loan-transaction-form',
  templateUrl: './view-loan-transaction-form.component.html',
  styleUrls: ['./view-loan-transaction-form.component.scss'],
  providers: [
    ViewLoanTransactionFormComponentHelper,
    LoantransactiondtlsService
  ]
})
export class ViewLoanTransactionFormComponent extends BaseFpxFormComponent<ViewLoanTransactionFormComponentHelper, ViewLoanTransactionFormComponentState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _viewLoanTransactionFormHelper: ViewLoanTransactionFormComponentHelper
  ) { 
    super(formBuilder, router,controlContainer, _viewLoanTransactionFormHelper);
  }

  override doPreInit(){
    this.addElement('loantransactiondetailsGrid');
  }

}
