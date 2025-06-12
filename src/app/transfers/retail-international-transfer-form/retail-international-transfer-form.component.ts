import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailInternationalTransferFormHelper,RetailInternationalTransferFormState} from './retail-international-transfer-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { InternationalTransferService } from '../internationalTransfer-service/internationalTransfer.service';
import { InternationalTransfer } from '../internationalTransfer-service/internationalTransfer.model';
import { PaymentsFormComponent } from '@dep/core';

 
 
@Component({
 selector: 'app-retail-international-transfer-form',
  templateUrl: './retail-international-transfer-form.component.html',
  styleUrls: ['./retail-international-transfer-form.component.scss'],
  providers : [ RetailInternationalTransferFormHelper]
  })

export class RetailInternationalTransferFormComponent extends PaymentsFormComponent {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailInternationalTransferFormHelper: RetailInternationalTransferFormHelper,
    public internationalTransferService: InternationalTransferService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailInternationalTransferFormHelper);
    this.setServiceCode("RETAILTRANSWIFT");
  }
  // protected readonly remarks_pattern:any = /^(?!.*\s{2,})(?!\s*$)(\w+(\s\w+)*){3,100}$/;

   protected override doPreInitAddOn(): void {
     this.addFormControl('sourceAccount', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('beneficiaryId', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('paymentAmount', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('scheduleType', '',  [Validators.required ]   ,[],'change',1,false,0);			   		 
     this.addFormControl('paymentDate', '',  [Validators.required ]   ,[],'change',1,false,0);			   		 
     this.addFormControl('chargesBorneBy', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('purpose', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 			   		 		   		 
     this.addFormControl('remarks', '',  []   ,[],'blur',1,false,0);			   		 
     this.addFormControl('termsFlag', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('numberOfPayments', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('paymentFrequency', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('rateApplied', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('baseRateApplied', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('debitAmount', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('debitCurrency', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('creditAmount', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('creditCurrency', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('endDate', '',  []    ,[],'blur',1,false,0);		
     this.addFormControl('scheduleHandler', '', [], [], 'blur', 1, false, 0);	 
     this.addFormControl('paymentId', '',  []   ,[],'blur',1,true,0);	
     this.addFormControl('scheduleId', '',  []   ,[],'blur',1,false,0);	
     this.addFormControl('chargesAmount', '', [], [], 'blur', 1, false, 0);  
     this.addFormControl('paymentCurrency', '', [], [], 'blur', 1, false, 0);  
     this.addFormControl('paymentDaysInterval', '',  []    ,[],'change',1,false,0); 
     this.addElement('paymentSummary');	   	
    //  this.addFormControl('paymentStatus', '', [], [], 'blur', 1, false, 0);
     this.addFormControl('serviceCode', '', [], [], 'blur', 1, false, 0);
    //  this.addFormControl('nextPaymentDate', '', [], [], 'blur', 1, false, 0);
this.addElement('transferSummary');		 
this.addElement('disclaimer-box');
this.addFormControl('paidInstallments', '', [], [], 'blur', 1, false, 0);
	this.setDataService(this.internationalTransferService);
   }
  

  protected override doPostInit(): void {
   
  }
  
}
