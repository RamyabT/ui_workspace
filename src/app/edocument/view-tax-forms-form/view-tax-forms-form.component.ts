import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { TaxformsService } from '../taxforms-service/taxforms.service';
import { ViewTaxFormsFormComponentHelper, ViewTaxFormsFormComponentState } from './view-tax-forms-form.helper';

@Component({
  selector: 'app-view-tax-forms-form',
  templateUrl: './view-tax-forms-form.component.html',
  styleUrls: ['./view-tax-forms-form.component.scss'],
  providers: [
    ViewTaxFormsFormComponentHelper,
    TaxformsService
  ]
})
export class ViewTaxFormsFormComponent extends BaseFpxFormComponent<ViewTaxFormsFormComponentHelper, ViewTaxFormsFormComponentState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _viewTaxFormsFormHelper: ViewTaxFormsFormComponentHelper
  ) { 
    super(formBuilder, router,controlContainer, _viewTaxFormsFormHelper);
  }

  override doPreInit(){
    this.addElement('taxFormsdetailsGrid');
  }

}
