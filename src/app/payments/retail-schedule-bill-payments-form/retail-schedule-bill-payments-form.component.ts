import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailScheduleBillPaymentsFormHelper,RetailScheduleBillPaymentsFormState} from './retail-schedule-bill-payments-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { SchedulebillpaymentslogService } from '../schedulebillpaymentslog-service/schedulebillpaymentslog.service';
 
 
@Component({
 selector: 'app-retail-schedule-bill-payments-form',
  templateUrl: './retail-schedule-bill-payments-form.component.html',
  styleUrls: ['./retail-schedule-bill-payments-form.component.scss'],
  providers : [ RetailScheduleBillPaymentsFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailScheduleBillPaymentsFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailScheduleBillPaymentsFormComponent)
  }]
  })

export class RetailScheduleBillPaymentsFormComponent extends  BaseFpxFormComponent<RetailScheduleBillPaymentsFormHelper, RetailScheduleBillPaymentsFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailScheduleBillPaymentsFormHelper: RetailScheduleBillPaymentsFormHelper,
    public schedulebillpaymentslogService: SchedulebillpaymentslogService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailScheduleBillPaymentsFormHelper);
    this.setServiceCode("RETAILSCHBILLPAYMENTS");  
}
   protected override doPreInit(): void {
  this.setDataService(this.schedulebillpaymentslogService);
      this.addFormControl('sourceAccount', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('beneficiaryName', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('paymentAmount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('paymentDate', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('paymentFrequency', '',[Validators.required, ]   ,[],'change',1,false);			   		 
      this.addFormControl('numberOfPayments', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('endDate', '',[ ]   ,[],'blur',1,false);
      this.addFormControl('scheduleType', '',[ ]   ,[],'blur',1,false);		
      this.addFormControl('operationMode', '',[ ]   ,[],'blur',1,false);		
      this.addFormControl('scheduleId', '',[ ]   ,[],'blur',1,false);	
      this.addFormControl('serviceCode', '',[ ]   ,[],'blur',1,false);	
      this.addFormControl('hiddenField', '',  [Validators.required]    ,[],'change',1,false,0);	

	this.setServiceCode("RETAILSCHBILLPAYMENTS");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

