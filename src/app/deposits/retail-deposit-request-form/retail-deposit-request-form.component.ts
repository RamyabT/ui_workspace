import { Component, EventEmitter, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailDepositRequestFormHelper, RetailDepositRequestFormState } from './retail-deposit-request-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { DepositrequestService } from '../depositrequest-service/depositrequest.service';
import { Depositrequest } from '../depositrequest-service/depositrequest.model';



@Component({
  selector: 'app-retail-deposit-request-form',
  templateUrl: './retail-deposit-request-form.component.html',
  styleUrls: ['./retail-deposit-request-form.component.scss'],
  providers: [RetailDepositRequestFormHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RetailDepositRequestFormComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => RetailDepositRequestFormComponent)
    }]
})

export class RetailDepositRequestFormComponent extends BaseFpxFormComponent<RetailDepositRequestFormHelper, RetailDepositRequestFormState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailDepositRequestFormHelper: RetailDepositRequestFormHelper,
    public depositrequestService: DepositrequestService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailDepositRequestFormHelper);
    this.setServiceCode("RETAILOPENNEWDEPOSIT");
  }
  protected override doPreInit(): void {
    this.setDataService(this.depositrequestService);
    this.addFormControl('productCode', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('depositCurrency', '', [], [], 'blur', 1, false);
    this.addFormControl('depositDate', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('debitAccount', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('availableBalanceLbl', '', [], [], 'blur', 1, false);
    this.addFormControl('depositAmount', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('fxDetailsLbl', '', [], [], 'blur', 1, false);
    this.addFormControl('tenorInMonths', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('interestpaymentfrequency', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('maturityDetailsLbl', '', [], [], 'blur', 1, false);
    this.addFormControl('maturityInstructions', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('creditAccount', '', [Validators.required,], [], 'blur', 1, false);
    // this.addFormControl('charity', '', [], [], 'blur', 1, false);
    // this.addFormControl('charityPercentage', '', [], [], 'blur', 1, false);
    this.addFormControl('remarks', '', [], [], 'blur', 1, false);
    this.addFormControl('termsFlag', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('baseRate', '', [], [], 'blur', 1, false);
    this.addFormControl('exchangeRate', '', [], [], 'blur', 1, false);
    this.addFormControl('chargesAmount', '', [], [], 'blur', 1, false);
    this.addElement('availableBalanceGroup');
    this.addElement('fxRates');
    this.addElement('maturityDetailsGroup');
    this.setServiceCode("RETAILOPENNEWDEPOSIT");

  }


  protected override doPostInit(): void {

  }

}

