import { Component, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailDomesticTransferFormHelper, RetailDomesticTransferFormState } from './retail-domestic-transfer.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { DomestictransferService } from '../domestictransfer-service/domestictransfer.service';
import { Domestictransfer } from '../domestictransfer-service/domestictransfer.model';
import { PaymentsFormComponent } from '@dep/core';



@Component({
  selector: 'app-retail-domestic-transfer',
  templateUrl: './retail-domestic-transfer.component.html',
  styleUrls: ['./retail-domestic-transfer.component.scss'],
  providers: [RetailDomesticTransferFormHelper]
})

export class RetailDomesticTransferFormComponent extends PaymentsFormComponent  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailDomesticTransferFormHelper: RetailDomesticTransferFormHelper,
    public domestictransferService: DomestictransferService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailDomesticTransferFormHelper);
    this.setServiceCode("RETAILTRANDOMESTIC");
  }
  // protected readonly remarks_pattern:any = /^(?!.*\s{2,})(?!\s*$)(\w+(\s\w+)*){3,100}$/;
  protected override doPreInitAddOn(): void {
    this.addFormControl('sourceAccount', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('beneficiaryId', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('paymentAmount', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('chargesAmount', '', [], [], 'change', 1, false, 0);
    this.addFormControl('scheduleType', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('paymentDate', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('scheduleHandler', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('purpose', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('transferType', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('chargesBorneBy', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('remarks', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('termsFlag', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('paymentFrequency', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('numberOfPayments', '', [], [], 'change', 1, false, 0);
    this.addFormControl('endDate', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('rateApplied', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('baseRateApplied', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('paymentId', '', [], [], 'blur', 1, true, 0);
    this.addFormControl('scheduleId', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('paymentCurrency', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('creditCurrency', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('debitCurrency', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('creditAmount', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('debitAmount', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('paymentDaysInterval', '',  []    ,[],'change',1,false,0);
    // this.addFormControl('paymentStatus', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('creditAccountNumber', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('serviceCode', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('iscutOffExceed', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('paidInstallments', '', [], [], 'blur', 1, false, 0);
    // this.addFormControl('nextPaymentDate', '', [], [], 'blur', 1, false, 0);
        this.addFormControl('transferInformation', '', [], [], 'change', 1, false, 0);
    this.addElement('paymentSummary');		
    this.addElement('transferSummary');
    this.addElement('disclaimer-box');
    this.setDataService(this.domestictransferService);
        // this.addFormControl('nextPaymentDate', '', [], [], 'blur', 1, false, 0);
  }

}
