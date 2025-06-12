import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailFamilyPaymentFormHelper,RetailFamilyPaymentFormState} from './retail-family-payment-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { FamilypaymentService } from '../familypayment-service/familypayment.service';
import { Familypayment } from '../familypayment-service/familypayment.model';
import { PymtsService } from 'src/app/transfers/pymts-service/pymts.service';
import { PaymentsFormComponent } from '@dep/core';

 
 
@Component({
 selector: 'app-retail-family-payment-form',
  templateUrl: './retail-family-payment-form.component.html',
  styleUrls: ['./retail-family-payment-form.component.scss'],
  providers : [ RetailFamilyPaymentFormHelper]

  })

export class RetailFamilyPaymentFormComponent extends  PaymentsFormComponent {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailFamilyPaymentFormHelper: RetailFamilyPaymentFormHelper,
    public familypaymentService: FamilypaymentService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailFamilyPaymentFormHelper);
    this.setServiceCode("RETAILFAMILYPAYMENT");  
}
   protected override doPreInitAddOn(): void {
      this.addFormControl('childAccount', '',[Validators.required, ]   ,[],'change',1,false);			   		 
      this.addFormControl('sourceAccount', '',[Validators.required, ]   ,[],'change',1,false);			   		 
      this.addFormControl('purpose', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('paymentAmount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('scheduleType', '',[Validators.required, ]   ,[],'change',1,false);			   		 
      this.addFormControl('paymentDate', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('remarks', '',[ ]   ,[],'blur',1,false);		
      this.addFormControl('scheduleHandler', '', [], [], 'blur', 1, false, 0);
      this.addFormControl('rateApplied', '',  []    ,[],'blur',1,false,0);			   		 
      this.addFormControl('baseRateApplied', '',  []    ,[],'blur',1,false,0);	
      this.addFormControl('debitCurrency', '', [], [], 'blur', 1, false, 0);		
      this.addFormControl('creditAmount', '', [], [], 'blur', 1, false, 0);
      this.addFormControl('creditCurrency', '', [], [], 'blur', 1, false, 0);
      this.addFormControl('paymentId', '', [], [], 'blur', 1, true, 0);
      this.addFormControl('paymentFrequency', '', [], [], 'change', 1, false, 0);
      this.addFormControl('scheduleId', '', [], [], 'blur', 1, false, 0);
      this.addFormControl('termsFlag', '',  [Validators.required]    ,[],'blur',1,false,0);	
      this.addElement('paymentSummary');
      this.setDataService(this.familypaymentService);
  }
  

  protected override doPostInit(): void {
   
  }
 
}

