import { Component, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailPrepaidTopUpFormHelper, RetailPrepaidTopUpFormState } from './retail-prepaid-topup-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { PrepaidLoadMoneyService } from '../prepaidLoadMoney-service/prepaidLoadMoney.service';
import { PrepaidLoadMoney } from '../prepaidLoadMoney-service/prepaidLoadMoney.model';
import { DeviceDetectorService } from '@dep/core';



@Component({
  selector: 'app-retail-prepaid-topup-form',
  templateUrl: './retail-prepaid-topup-form.component.html',
  styleUrls: ['./retail-prepaid-topup-form.component.scss'],
  providers: [RetailPrepaidTopUpFormHelper]
})

export class RetailPrepaidTopUpFormComponent extends BaseFpxFormComponent<RetailPrepaidTopUpFormHelper, RetailPrepaidTopUpFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailPrepaidTopUpFormHelper: RetailPrepaidTopUpFormHelper,
    public prepaidLoadMoneyService: PrepaidLoadMoneyService,
    private validatorService: ValidatorService,
    public device: DeviceDetectorService

  ) {
    super(formBuilder, router, controlContainer, retailPrepaidTopUpFormHelper);
  }
  protected override doPreInit(): void {
    this.addFormControl('cardRefNumber', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('accountNumber', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('currency', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('amount', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('charges', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('remarks', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('termsFlag', '', [Validators.required], [], 'blur', 1, false, 0);
    // this.addFormControl('balance', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('debitAmount', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('creditAmount', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('exchangeRate', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('baseRate', '', [], [], 'blur', 1, false, 0);
    this.addElement('exchangeDetails');
    this.addElement('impNote');
    this.setDataService(this.prepaidLoadMoneyService);
    this.setServiceCode("RETAILPCTOPUP");

  }


  protected override doPostInit(): void {

  }

}
