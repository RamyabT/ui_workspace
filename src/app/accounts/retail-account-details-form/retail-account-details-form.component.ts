import { Component, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { CasaaccountService } from 'src/app/foundation/casaaccount-service/casaaccount.service';
import { AccountsService } from 'src/app/foundation/validator-service/accounts.service';
import { RetailAccountDetailsFormState, RetailAccountsDetailsFormHelper } from './retail-account-details-form.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-retail-account-details-form',
  templateUrl: './retail-account-details-form.component.html',
  styleUrls: ['./retail-account-details-form.component.scss'],
  providers: [RetailAccountsDetailsFormHelper, CasaaccountService]
})

export class RetailAccountDetailsFormComponent extends BaseFpxFormComponent<RetailAccountsDetailsFormHelper, RetailAccountDetailsFormState> {

  constructor(
    
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public RetailAccountsDetailsFormHelper: RetailAccountsDetailsFormHelper
  ) {
    super(formBuilder, router,controlContainer, RetailAccountsDetailsFormHelper);
  }

}