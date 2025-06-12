import { Component, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailSingleBillPaymentFormHelper, RetailSingleBillPaymentFormState } from './retail-single-bill-payment-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { BillRequestService } from '../billRequest-service/billRequest.service';
import { BillRequest } from '../billRequest-service/billRequest.model';



@Component({
  selector: 'app-retail-single-bill-payment-form',
  templateUrl: './retail-single-bill-payment-form.component.html',
  styleUrls: ['./retail-single-bill-payment-form.component.scss'],
  providers: [RetailSingleBillPaymentFormHelper]
})

export class RetailSingleBillPaymentFormComponent extends BaseFpxFormComponent<RetailSingleBillPaymentFormHelper, RetailSingleBillPaymentFormState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailSingleBillPaymentFormHelper: RetailSingleBillPaymentFormHelper,
    public billRequestService: BillRequestService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailSingleBillPaymentFormHelper);
  }
  protected override doPreInit(): void {
    this.addFormControl('tranRef', '', [],

      [
        this.validatorService.dataAvailabilityCheck(
          this.embadedFormMode,
          'tranRef',
          this.billRequestService,
          this.dataAvailable$
        ),
      ], 'blur', 0, true, 0);
    // this.addFormControl('accountType', '', [Validators.required], [], 'change', 1, false, 0);
    // this.addFormControl('creditCradDebitAccount', '', [Validators.required], [], 'change', 1, false, 0);
    // this.addFormControl('availableLimit', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('balance', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('paymentAmount', '', [Validators.required], [], 'blur', 1, false, 0);
    // this.addFormControl('billerBeneficiaryId', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('debitAccount', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('paymentDate', '', [Validators.required], [], 'blur', 1, false, 0);
    //  this.addFormControl('remarks', '',  []    ,[],'change',1,false,0); 
    this.addFormControl('billReference', '', [], [], 'change', 1, false, 0);
    this.addFormControl('requestReference', '', [], [], 'change', 1, false, 0);
    //  this.addFormControl('termsFlag', '',  [Validators.required]    ,[],'change',1,false,0);	
    //  this.addFormControl('dueDate', '', []   ,[],'blur',1,false,0);	
    //  this.addFormControl('chargesAmount', '', []   ,[],'blur',1,false,0);			
    //  this.addFormControl('hiddenPaymentAmount', '',  []    ,[],'blur',1,false,0);	
    //  this.addFormControl('serviceType', '',  []    ,[],'blur',1,false,0);			
    this.addElement('refreshBtn');
    this.addElement('paymentSummary');
    //  this.addElement('disclaimerBox');   
    // this.addElement('billerBeneficiaryIdGroup');
    this.addFormControl('paymentFrequency', '', [], [], 'blur', 1);
    this.addFormControl('numberOfPayments', '', [], [], 'blur', 1);
    this.addFormControl('paymentEndDate', '', [], [], 'blur', 1);
    this.addFormControl('action', '', [Validators.required,], [], 'change', 1, false, 0);

    this.setDataService(this.billRequestService);
    this.setServiceCode("RETAILSINGLEPAYMENT");

  }


  protected override doPostInit(): void {

  }

}
