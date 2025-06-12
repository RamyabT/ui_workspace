import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailAedTransferFormHelper,RetailAedTransferFormState} from './retail-aed-transfer-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { AedtransferService } from '../aedtransfer-service/aedtransfer.service';
import { Aedtransfer } from '../aedtransfer-service/aedtransfer.model';
import { PaymentsFormComponent } from '@dep/core';

 
 
@Component({
 selector: 'app-retail-aed-transfer-form',
  templateUrl: './retail-aed-transfer-form.component.html',
  styleUrls: ['./retail-aed-transfer-form.component.scss'],
  providers : [ RetailAedTransferFormHelper]
  })

export class RetailAedTransferFormComponent extends PaymentsFormComponent {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailAedTransferFormHelper: RetailAedTransferFormHelper,
    public aedtransferService: AedtransferService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailAedTransferFormHelper);
    this.setServiceCode("RETAILTRANCBAED");
  }
   protected override doPreInitAddOn(): void {
     this.addFormControl('sourceAccount', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('beneficiaryId', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('paymentAmount', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('scheduleType', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('paymentDate', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('purpose', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('chargesBorneBy', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 		   		 
     this.addFormControl('paymentDetails', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('remarks', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('termsFlag', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
    //  this.addFormControl('debitAmount', '',  []    ,[],'blur',1,false,0);			   		 
    //  this.addFormControl('debitCurrency', '',  []    ,[],'blur',1,false,0);			   		 
    //  this.addFormControl('creditCurrency', '',  []    ,[],'blur',1,false,0);			   		 
    //  this.addFormControl('creditAmount', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('rateApplied', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('baseRateApplied', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('endDate', '',  []    ,[],'blur',1,false,0);		
     this.addElement('paymentSummary');	   		 
	this.setDataService(this.aedtransferService);
	

  }
  

  protected override doPostInit(): void {
   
  }
  
}
