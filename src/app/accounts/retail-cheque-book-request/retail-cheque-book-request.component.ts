import { Component, EventEmitter, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailChequeBookRequestHelper, RetailChequeBookRequestState } from './retail-cheque-book-request.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { ChequebookrequestService } from '../chequebookrequest-service/chequebookrequest.service';
import { Chequebookrequest } from '../chequebookrequest-service/chequebookrequest.model';
import { DeviceDetectorService } from '@dep/core';



@Component({
  selector: 'app-retail-cheque-book-request',
  templateUrl: './retail-cheque-book-request.component.html',
  styleUrls: ['./retail-cheque-book-request.component.scss'],
  providers: [RetailChequeBookRequestHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RetailChequeBookRequestComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => RetailChequeBookRequestComponent)
    }]
})

export class RetailChequeBookRequestComponent extends BaseFpxFormComponent<RetailChequeBookRequestHelper, RetailChequeBookRequestState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailChequeBookRequestHelper: RetailChequeBookRequestHelper,
    public chequebookrequestService: ChequebookrequestService,
    private validatorService: ValidatorService,
    protected _device: DeviceDetectorService,
  ) {
    super(formBuilder, router, controlContainer, retailChequeBookRequestHelper);
  }
  protected readonly firstName_maxLength: any = 35;
  protected readonly lastName_maxLength: any = 35;
  protected override doPreInit(): void {
    this.setDataService(this.chequebookrequestService);
    this.addFormControl('accountNumber', '', [], [], 'change', 1, false);
    this.addFormControl('noOfChequeBooks', '', [], [], 'change', 1, false);
    this.addFormControl('noOfLeaves', '', [Validators.required,], [], 'change', 1, false);
    this.addFormControl('chequeStartNumber', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('firstName', 'Suresh', [Validators.required,Validators.maxLength(this.firstName_maxLength)], [], 'blur', 1, false);
    this.addFormControl('lastName', '', [Validators.required,Validators.maxLength(this.lastName_maxLength)], [], 'blur', 1, false);
    this.addFormControl('phoneNumber', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('isCardUpdateRequired', '', [Validators.required,], [], 'change', 1, false);
    this.addFormControl('cardFourDigits', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('deliveryOption', '', [Validators.required,], [], 'change', 1, false);
    this.addFormControl('isPhoneNumberRequired', '', [Validators.required,], [], 'change', 1, false);
    this.addFormControl('deliveryBranch', '', [Validators.required,], [], 'change', 1, false);
    this.addFormControl('chargesAmount', '', [], [], 'blur', 1, false);
    this.addFormControl('remarks', '', [], [], 'blur', 1, false);
    this.addFormControl('inventoryNumber', '', [], [], 'blur', 1, true);
    this.addFormControl('termsFlag', 'N', [Validators.required,], [], 'blur', 1, false);
    this.setServiceCode("RETAILCHQBKREQ");
  }


  protected override doPostInit(): void {

  }

}
