import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailPayInsuranceHelper,RetailPayInsuranceState} from './retail-pay-insurance.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { PayinsuranceService } from '../payinsurance-service/payinsurance.service';
import { Payinsurance } from '../payinsurance-service/payinsurance.model';
import { PaymentsFormComponent } from '@dep/core';

 
 
@Component({
 selector: 'app-retail-pay-insurance',
  templateUrl: './retail-pay-insurance.component.html',
  styleUrls: ['./retail-pay-insurance.component.scss'],
  providers : [ RetailPayInsuranceHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailPayInsuranceComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailPayInsuranceComponent)
  }]
  })

export class RetailPayInsuranceComponent extends PaymentsFormComponent {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailPayInsuranceHelper: RetailPayInsuranceHelper,
    public payinsuranceService: PayinsuranceService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailPayInsuranceHelper);
    this.setServiceCode("RETAILPAYINSURANCE");  
}
   protected override doPreInitAddOn(): void {
  this.setDataService(this.payinsuranceService);
      this.addFormControl('paymentAmount', '',[ ]   ,[],'change',1,false);			   		 
      this.addFormControl('paymentDate', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('paymentMethod', '',[Validators.required,  ]   ,[],'change',1,false);			   		 
      this.addFormControl('creditcardRefNum', '',[Validators.required,  ]   ,[],'blur',1,false);			   		 	   		 
      this.addFormControl('autoPay', '',[Validators.required,  ]   ,[],'blur',1,false);
      this.addFormControl('termsFlag', '',[Validators.required,  ]   ,[],'blur',1,false);		   	
      this.addFormControl('walletId', '',[Validators.required,  ]   ,[],'blur',1,false);
      this.addFormControl('accountNum', '',[Validators.required,  ]   ,[],'blur',1,false);	
      this.addFormControl('chargesBorneBy', '',[ ]   ,[],'blur',1,false);	
      this.addFormControl('chargesAmount', '',[ ]   ,[],'blur',1,false);	
      this.addFormControl('exchangeRate', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('baseRate', '',[ ]   ,[],'blur',1,false);	
      // this.addFormControl('BalanceError', '',[Validators.required,  ]   ,[],'change',1,false);		
      this.addElement('exchangeDetails');
				 
	this.setServiceCode("RETAILPAYINSURANCE");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

