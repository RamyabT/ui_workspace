import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { ViewLoanDisclosureFormComponentHelper, ViewLoanDisclosureFormComponentState } from './view-loan-disclosure-form.helper';
import { LoandisclosureService } from '../loandisclosure-service/loandisclosure.service';

@Component({
  selector: 'app-view-loan-disclosure-form',
  templateUrl: './view-loan-disclosure-form.component.html',
  styleUrls: ['./view-loan-disclosure-form.component.scss'],
  providers: [
    ViewLoanDisclosureFormComponentHelper,
    LoandisclosureService
  ]
})
export class ViewLoanDisclosureFormComponent extends BaseFpxFormComponent<ViewLoanDisclosureFormComponentHelper, ViewLoanDisclosureFormComponentState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _viewLoanDisclosureFormHelper: ViewLoanDisclosureFormComponentHelper
  ) { 
    super(formBuilder, router,controlContainer, _viewLoanDisclosureFormHelper);
  }

  override doPreInit(){
    this.addElement('LoanDisclosureFormDetailsGrid');
  }

}
