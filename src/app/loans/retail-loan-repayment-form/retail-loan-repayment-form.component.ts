import { Component, EventEmitter, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailLoanRepaymentHelper, RetailLoanRepaymentState } from './retail-loan-repayment-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { LoanrepaymentService } from '../loanrepayment-service/loanrepayment.service';
import { Loanrepayment } from '../loanrepayment-service/loanrepayment.model';



@Component({
  selector: 'app-retail-loan-repayment-form',
  templateUrl: './retail-loan-repayment-form.component.html',
  styleUrls: ['./retail-loan-repayment-form.component.scss'],
  providers: [RetailLoanRepaymentHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RetailLoanRepaymentComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => RetailLoanRepaymentComponent)
    }]
})

export class RetailLoanRepaymentComponent extends BaseFpxFormComponent<RetailLoanRepaymentHelper, RetailLoanRepaymentState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailLoanRepaymentHelper: RetailLoanRepaymentHelper,
    public loanrepaymentService: LoanrepaymentService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailLoanRepaymentHelper);
    this.setServiceCode("RETAILLOANREPAYMENT");
  }
  protected override doPreInit(): void {
    this.setDataService(this.loanrepaymentService);
    this.addFormControl('loanAccountNumber', '', [Validators.required], [], 'blur', 1, false);
    this.addFormControl('debitAccountNumber', '', [Validators.required], [], 'blur', 1, false);
    this.addFormControl('dueAmount', '', [Validators.required], [], 'blur', 1, false);
    // this.addFormControl('exchangeRate', '',[ ]   ,[],'blur',1,false);			   		 
    this.addFormControl('remarks', '', [Validators.required], [], 'blur', 1, false);
    this.addFormControl('termsFlag', '', [Validators.required], [], 'blur', 1, false);
    this.addFormControl('repaidDate', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('chargesAmount', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('paymentOption', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('paymentOptionFlag', 1, [Validators.required], [], 'change', 1, false);
    this.addElement('exchangeDetails');
    this.setServiceCode("RETAILLOANREPAYMENT");
    this.addElement('loanDetails');		

  }


  protected override doPostInit(): void {

  }

}

