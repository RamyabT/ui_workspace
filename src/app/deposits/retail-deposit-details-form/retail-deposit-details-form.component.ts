import { Component, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { DepositsService } from '../deposits-service/deposits.service';
import { BaseFpxFormComponent } from '@fpx/core';
import { RetailDepositDetailsFormHelper, RetailDepositDetailsFormState } from './retail-deposit-details.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-retail-deposit-details-form',
  templateUrl: './retail-deposit-details-form.component.html',
  styleUrls: ['./retail-deposit-details-form.component.scss'],
  providers: [RetailDepositDetailsFormHelper, DepositsService]
})

export class RetailDepositDetailsFormComponent extends BaseFpxFormComponent<RetailDepositDetailsFormHelper, RetailDepositDetailsFormState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailDepositDetailsHelper: RetailDepositDetailsFormHelper
  ) { 
    super(formBuilder, router,controlContainer, retailDepositDetailsHelper);
  }
}