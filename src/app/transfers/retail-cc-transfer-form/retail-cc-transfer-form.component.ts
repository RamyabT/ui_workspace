import { Component, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailCCTransferFormHelper, RetailCCTransferFormState } from './retail-cc-transfer-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { CctransferService } from '../cctransfer-service/cctransfer.service';
import { Cctransfer } from '../cctransfer-service/cctransfer.model';
import { PaymentsFormComponent } from '@dep/core';



@Component({
  selector: 'app-retail-cc-transfer-form',
  templateUrl: './retail-cc-transfer-form.component.html',
  styleUrls: ['./retail-cc-transfer-form.component.scss'],
  providers: [RetailCCTransferFormHelper]
})

export class RetailCCTransferFormComponent extends PaymentsFormComponent {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailCCTransferFormHelper: RetailCCTransferFormHelper,
    public cctransferService: CctransferService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailCCTransferFormHelper);
    this.setServiceCode("RETAILTRANCC");
  }
  // protected readonly remarks_pattern:any = /^(?!.*\s{2,})(?!\s*$)(\w+(\s\w+)*){3,100}$/;
  protected override doPreInitAddOn(): void {
    this.addFormControl('sourceAccount', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('beneficiaryId', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('paymentAmount', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('scheduleType', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('paymentDate', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('remarks', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('termsFlag', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('scheduleHandler', '', [], [], 'change', 1, false, 0);
    this.addFormControl('paymentFrequency', '', [], [], 'change', 1, false, 0);
    this.addFormControl('numberOfPayments', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('endDate', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('rateApplied', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('baseRateApplied', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('purpose', '', [], [], 'blur', 1, false, 0);

    this.addFormControl('paymentId', '', [], [], 'blur', 1, true, 0);
    this.addFormControl('scheduleId', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('paymentCurrency', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('creditCurrency', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('debitCurrency', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('creditAmount', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('debitAmount', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('chargesAmount', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('paymentDaysInterval', '',  []    ,[],'change',1,false,0);
    this.setDataService(this.cctransferService);
    this.addElement('paymentSummary');
    this.addElement('disclaimer-box');
    // this.addFormControl('paymentStatus', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('paidInstallments', '', [], [], 'blur', 1, false, 0);
this.addElement('transferSummary');

  }


  protected override doPostInit(): void {

  }

}
