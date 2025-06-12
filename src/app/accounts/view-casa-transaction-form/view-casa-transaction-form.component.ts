import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewCasaTransactionFormComponentHelper, ViewCasaTransactionFormComponentState } from './view-casa-transaction-form.helper';
import { BaseFpxFormComponent } from '@fpx/core';
import { CasatransactiondtlsService } from '../casatransactiondtls-service/casatransactiondtls.service';

@Component({
  selector: 'app-view-casa-transaction-form',
  templateUrl: './view-casa-transaction-form.component.html',
  styleUrls: ['./view-casa-transaction-form.component.scss'],
  providers: [
    ViewCasaTransactionFormComponentHelper,
    CasatransactiondtlsService
  ]
})
export class ViewCasaTransactionFormComponent extends BaseFpxFormComponent<ViewCasaTransactionFormComponentHelper, ViewCasaTransactionFormComponentState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _viewCasaTransactionFormHelper: ViewCasaTransactionFormComponentHelper
  ) { 
    super(formBuilder, router,controlContainer, _viewCasaTransactionFormHelper);
  }

  override doPreInit(){
    this.addElement('casatransactiondetailsGrid');
  }

}
