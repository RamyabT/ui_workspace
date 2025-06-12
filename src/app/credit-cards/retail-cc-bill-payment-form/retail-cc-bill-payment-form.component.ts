import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailCCBillPaymentFormHelper,RetailCCBillPaymentFormState} from './retail-cc-bill-payment-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { CcbillpaymentrequestService } from '../ccbillpaymentrequest-service/ccbillpaymentrequest.service';
import { Ccbillpaymentrequest } from '../ccbillpaymentrequest-service/ccbillpaymentrequest.model';
import { DeviceDetectorService } from '@dep/core';

 
 
@Component({
 selector: 'app-retail-cc-bill-payment-form',
  templateUrl: './retail-cc-bill-payment-form.component.html',
  styleUrls: ['./retail-cc-bill-payment-form.component.scss'],
  providers : [ RetailCCBillPaymentFormHelper]
  })

export class RetailCCBillPaymentFormComponent extends  BaseFpxFormComponent<RetailCCBillPaymentFormHelper, RetailCCBillPaymentFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailCCBillPaymentFormHelper: RetailCCBillPaymentFormHelper,
    public ccbillpaymentrequestService: CcbillpaymentrequestService,
    private validatorService: ValidatorService,
    public device: DeviceDetectorService
    
  ) {
    super(formBuilder, router,controlContainer, retailCCBillPaymentFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('cardRefNumber', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('debitAccount', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('paymentOption', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('amount', '',  [Validators.required ]    ,[],'blur',1,false,0);
     this.addFormControl('otherAmount', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('autoPay', '',  [Validators.required]    ,[],'change',1,false,0);			   		 
     this.addFormControl('charges', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('remarks', '',  [Validators.maxLength(150)]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('termsFlag', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('baseRate', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('exchangeRate', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('debitAmount', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('creditAmount', '',  []    ,[],'blur',1,false,0);			  
     this.addElement('exchangeDetails'); 		 
	this.setDataService(this.ccbillpaymentrequestService);
	this.setServiceCode("RETAILCCBILLPAYMENT");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
