import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailEtransferHelper,RetailEtransferState} from './retail-etransfer-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { EtransferService } from '../etransfer-service/etransfer.service';
import { Etransfer } from '../etransfer-service/etransfer.model';

 
 
@Component({
 selector: 'app-retail-etransfer-form',
  templateUrl: './retail-etransfer-form.component.html',
  styleUrls: ['./retail-etransfer-form.component.scss'],
  providers : [ RetailEtransferHelper]
  })

export class RetailEtransferComponent extends  BaseFpxFormComponent<RetailEtransferHelper, RetailEtransferState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailEtransferHelper: RetailEtransferHelper,
    public etransferService: EtransferService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailEtransferHelper);
    this.setServiceCode("ETRANSFERSENDMONEY");  
}
   protected override doPreInit(): void {
  this.setDataService(this.etransferService);
      this.addFormControl('sourceAccount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('contactCategory', '',[Validators.required, ]   ,[],'change',1,false);			   		 
      this.addFormControl('contactId', '',[ Validators.required,]   ,[],'change',1,false);			   		 
      this.addFormControl('contactName', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('contactEmailId', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('contactPhoneNumber', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('notificationPreference', '',[ Validators.required]   ,[],'change',1,false);			   		 
      this.addFormControl('createContact', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('paymentAmount', '',[Validators.required, ]   ,[],'blur',1,false);		
      this.addFormControl('scheduleType', '',[Validators.required, ]   ,[],'change',1,false);	 
      this.addFormControl('paymentDate', '', [Validators.required], [], 'change', 1, false, 0);		 
      this.addFormControl('securityQuestion', '',[Validators.required ]   ,[],'blur',1,false);			   		 
      this.addFormControl('securityAnswer', '',[Validators.required ]   ,[],'blur',1,false);			   		 
      this.addFormControl('remarks', '',[ ]   ,[],'blur',1,false);
      this.addFormControl('isPreferred', '',[ ]   ,[],'blur',1,false); 
      this.addFormControl('paymentId', '',[ ]   ,[],'blur',1,true); 
      this.addFormControl('autoDepositEnabled', '',[ ]   ,[],'blur',1,false); 
      this.addFormControl('serviceFeeDisclaimer', '',[ ]   ,[],'blur',1,false); 

      this.addFormControl('preferredLanguage', '', [Validators.required,], [], 'blur', 1, false);

      this.addFormControl('paymentFrequency', '', [Validators.required,], [], 'change', 1, false);
      this.addFormControl('paymentFrequencyFlag', '', [Validators.required,], [], 'change', 1, false);
      this.addFormControl('numberOfPayments', '', [Validators.required,], [], 'change', 1, false);
      this.addFormControl('endDate', '', [Validators.required,], [], 'blur', 1, false);
      this.addFormControl('rateApplied', '', [], [], 'blur', 1, false, 0);
      this.addFormControl('baseRateApplied', '', [], [], 'blur', 1, false, 0);

      
      this.addElement('paymentSummary');	
      this.addElement('profileDetails');
      this.addElement('contactDetails');
      this.addElement('autoDepositEnabledMsg');
      this.addElement('oneOffContactTitle');
      this.addFormControl('confirmSecurityAnswer', '', [], [], 'blur', 1, false);
	this.setServiceCode("ETRANSFERSENDMONEY");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

