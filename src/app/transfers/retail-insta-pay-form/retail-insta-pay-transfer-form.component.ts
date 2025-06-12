import { Component, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailInstaPayFormHelper, RetailInstaPayFormState } from './retail-insta-pay-transfer-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { InstapayService } from '../instapay-service/instapay.service';
import { Instapay } from '../instapay-service/instapay.model';
import { PaymentsFormComponent } from '@dep/core';



@Component({
  selector: 'app-retail-insta-pay-transfer-form',
  templateUrl: './retail-insta-pay-transfer-form.component.html',
  styleUrls: ['./retail-insta-pay-transfer-form.component.scss'],
  providers: [RetailInstaPayFormHelper]
})

export class RetailInstaPayFormComponent extends PaymentsFormComponent {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailInstaPayFormHelper: RetailInstaPayFormHelper,
    public instapayService: InstapayService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailInstaPayFormHelper);
    this.setServiceCode("RETAILTRANINSTA");
  }
  protected override doPreInitAddOn(): void {
    this.addFormControl('sourceAccount', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('iban', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('confirmIban', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('beneficiaryName', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('bankCode', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('branchCode', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('routingCode', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('branchAddress', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('paymentAmount', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('purpose', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('paymentDate', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('remarks', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('termsFlag', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('rateApplied', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('baseRateApplied', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('creditAmount', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('creditCurrency', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('beneCurrency', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('debitCurrency', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('debitAmount', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('paymentId', '', [], [], 'blur', 1, true, 0);
    this.addFormControl('accountNumber', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('creditAccountNumber', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('paymentCurrency', '', [], [], 'blur', 1, false, 0);
    this.addElement('bankDetails');
    this.addElement('paymentSummary');
    this.addElement('transferSummary');	
    this.addElement('disclaimer-box');
    this.setDataService(this.instapayService);

  }


  protected override doPostInit(): void {

  }

}
