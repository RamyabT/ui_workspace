import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { MembershiptransactiondtlsService } from '../membershiptransactiondtls-service/membershiptransactiondtls.service';
import { ViewMembershipTransactionFormComponentHelper, ViewMembershipTransactionFormComponentState } from './view-membership-transaction-form.helper';

@Component({
  selector: 'app-view-membership-transaction-form',
  templateUrl: './view-membership-transaction-form.component.html',
  styleUrls: ['./view-membership-transaction-form.component.scss'],
  providers: [
    ViewMembershipTransactionFormComponentHelper,
    MembershiptransactiondtlsService
  ]
})
export class ViewMembershipTransactionFormComponent extends BaseFpxFormComponent<ViewMembershipTransactionFormComponentHelper, ViewMembershipTransactionFormComponentState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _viewMembershipTransactionFormHelper: ViewMembershipTransactionFormComponentHelper
  ) { 
    super(formBuilder, router,controlContainer, _viewMembershipTransactionFormHelper);
  }

  override doPreInit(){
    this.addElement('membershiptransactiondetailsGrid');
  }

}
