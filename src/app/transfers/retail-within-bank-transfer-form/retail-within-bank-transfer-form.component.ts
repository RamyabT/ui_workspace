import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailWithinBankTransferFormHelper,RetailWithinBankTransferFormState} from './retail-within-bank-transfer-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { WithinbanktransferService } from '../withinbanktransfer-service/withinbanktransfer.service';
import { Withinbanktransfer } from '../withinbanktransfer-service/withinbanktransfer.model';
import { PaymentsFormComponent } from '@dep/core';
import { CustomDatePipe } from 'src/app/common/pipe/custom-date/custom-date.pipe';
 
@Component({
 selector: 'app-retail-within-bank-transfer-form',
  templateUrl: './retail-within-bank-transfer-form.component.html',
  styleUrls: ['./retail-within-bank-transfer-form.component.scss'],
  providers : [ RetailWithinBankTransferFormHelper, CustomDatePipe]
  })

export class RetailWithinBankTransferFormComponent extends PaymentsFormComponent {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailWithinBankTransferFormHelper: RetailWithinBankTransferFormHelper,
    public withinbanktransferService: WithinbanktransferService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailWithinBankTransferFormHelper);
    this.setServiceCode("RETAILTRANINTBT");
  }
  protected override doPreInitAddOn(): void {
    this.addFormControl('sourceAccount', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('beneficiaryId', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('paymentAmount', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('accountNumber', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('recipientName', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('scheduleType', '', [], [], 'change', 1, false, 0);
    this.addFormControl('paymentDate', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('purpose', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('paymentId', '', [], [], 'blur', 1, true, 0);
    this.addFormControl('scheduleId', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('remarks', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('termsFlag', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('rateApplied', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('baseRateApplied', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('debitCurrency', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('debitAmount', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('creditAmount', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('creditCurrency', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('numberOfPayments', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('paymentFrequency', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('endDate', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('paymentDaysInterval', '', [], [], 'change', 1, false, 0);
    this.addFormControl('isNewRequired', '', [], [], 'change', 1, false, 0);
    this.addElement('paymentSummary');
    this.addFormControl('hiddenField', '', [Validators.required], [], 'change', 1, false, 0);
    //  this.addFormControl('paymentStatus', '', [], [], 'blur', 1, false, 0);
    this.addElement('transferSummary');
    this.addElement('disclaimer-box');
    this.addFormControl('paidInstallments', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('beneficiaryName', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('confirmAccountNumber', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addElement('newButton');
    this.addElement('cancel');
    this.addElement('sourceAccountTemplate');
    this.addElement('sourceAccountDisplay');
    this.addElement('creditAccountDisplay');
    this.addElement('scheduleHandler');
    this.addElement('scheduleTypeWrapper');
    this.setDataService(this.withinbanktransferService);
  }

  test(event:any){
    const input = event.target as HTMLInputElement;
    let value:any = input.value;
    if(value.length >= 28){
        value = value.slice(0, 28);
    }
    input.value = value;
    this.formGroup.get('remarks')?.setValue(value, {emitEvent: false});
  }

  

  protected override doPostInit(): void {
   
  }
  
}
