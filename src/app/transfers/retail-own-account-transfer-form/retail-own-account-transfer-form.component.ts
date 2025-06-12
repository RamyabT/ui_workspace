import { Component, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailOwnAccountTransferFormHelper, RetailOwnAccountTransferFormState } from './retail-own-account-transfer-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { OwnaccounttransferService } from '../ownaccounttransfer-service/ownaccounttransfer.service';
import { Ownaccounttransfer } from '../ownaccounttransfer-service/ownaccounttransfer.model';
import { PaymentsFormComponent } from '@dep/core';
import { CustomDatePipe } from 'src/app/common/pipe/custom-date/custom-date.pipe';



@Component({
  selector: 'app-retail-own-account-transfer-form',
  templateUrl: './retail-own-account-transfer-form.component.html',
  styleUrls: ['./retail-own-account-transfer-form.component.scss'],
  providers: [RetailOwnAccountTransferFormHelper, CustomDatePipe]
})

export class RetailOwnAccountTransferFormComponent extends PaymentsFormComponent {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailOwnAccountTransferFormHelper: RetailOwnAccountTransferFormHelper,
    public ownaccounttransferService: OwnaccounttransferService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailOwnAccountTransferFormHelper);
    this.setServiceCode("RETAILTRANOAT");
  }
  protected override doPreInitAddOn(): void {
    this.addFormControl('sourceAccount', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('creditAccount', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('paymentAmount', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('paymentDate', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('paymentFrequency', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('scheduleType', '', [], [], 'change', 1, false, 0);
    this.addFormControl('endDate', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('numberOfPayments', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('rateApplied', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('baseRateApplied', '', [], [], 'blur', 1, false, 0);
    this.addElement('paymentSummary');
    this.addElement('scheduleHandler');
    this.addElement('scheduleTypeWrapper');
    this.addElement('paymentFrequencyWrapper');
    this.addFormControl('paymentCurrency', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('creditCurrency', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('debitCurrency', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('creditAmount', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('debitAmount', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('scheduleId', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('paymentId', '', [], [], 'blur', 1, true, 0);
    this.addFormControl('hiddenField', '', [Validators.required], [], 'change', 1, false, 0);
    this.setServiceCode("RETAILTRANOAT");
    this.setDataService(this.ownaccounttransferService);
  }


  protected override doPostInit(): void {

  }

}
