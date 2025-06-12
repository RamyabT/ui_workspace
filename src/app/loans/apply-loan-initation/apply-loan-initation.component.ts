import { Component, EventEmitter, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { applyloaninitiationHelper, applyloaninitiationState } from './apply-loan-initation.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { ApplyloaninitiationService } from '../apply-loan-initiation-service/apply-loan-initiation.service';
import { Applyloaninitiation } from '../apply-loan-initiation-service/apply-loan-initiation.model';



@Component({
  selector: 'app-apply-loan-initation',
  templateUrl: './apply-loan-initation.component.html',
  styleUrls: ['./apply-loan-initation.component.scss'],
  providers: [applyloaninitiationHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => applyloaninitiationComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => applyloaninitiationComponent)
    }]
})

export class applyloaninitiationComponent extends BaseFpxFormComponent<applyloaninitiationHelper, applyloaninitiationState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public applyloaninitiationHelper: applyloaninitiationHelper,
    public applyloaninitiationService: ApplyloaninitiationService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, applyloaninitiationHelper);
    this.setServiceCode("RETAILAPPLYLOANINITIATION");
  }
  protected override doPreInit(): void {
    this.setDataService(this.applyloaninitiationService);
    this.addFormControl('loanSegments', '', [], [], 'change', 1, false);
    this.addFormControl('homeloanType', '', [], [], 'change', 1, false);
    this.addFormControl('loanAmount', '', [], [], 'change', 1, false);
    this.addFormControl('downPayment', '', [], [], 'change', 1, false);
    this.addFormControl('loanDuration', '', [], [], 'change', 1, false);

    this.addFormControl('vehicalType', '', [], [], 'blur', 1, false);
    this.addFormControl('vehicalStatus', '', [], [], 'blur', 1, false);
    this.addFormControl('vehicleloanAmount', '', [], [], 'change', 1, false);
    this.addFormControl('vehicledownPayment', '', [], [], 'change', 1, false);
    this.addFormControl('vehicleloanDuration', '', [], [], 'change', 1, false);

    this.addFormControl('personalloanAmount', '', [], [], 'change', 1, false);
    this.addFormControl('personalloanDuration', '', [], [], 'change', 1, false);

    this.addFormControl('downPayAmount', '', [], [], 'blur', 1, false);
    this.addFormControl('emi', '', [], [], 'blur', 1, false);
    this.addFormControl('interestRate', '', [], [], 'blur', 1, false);
    this.addFormControl('totalInterest', '', [], [], 'blur', 1, false);
    this.addFormControl('totalRepayAmount', '', [], [], 'blur', 1, false);
    this.setServiceCode("RETAILAPPLYLOANINITIATION");

  }


  protected override doPostInit(): void {

  }

}

