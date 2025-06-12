import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailEtransferFulfillRequestMoneyFormHelper,RetailEtransferFulfillRequestMoneyFormState} from './retail-etransfer-fulfill-request-money-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { EtransferService } from '../etransfer-service/etransfer.service';
import { Etransfer } from '../etransfer-service/etransfer.model';

 
 
@Component({
 selector: 'app-retail-etransfer-fulfill-request-money-form',
  templateUrl: './retail-etransfer-fulfill-request-money-form.component.html',
  styleUrls: ['./retail-etransfer-fulfill-request-money-form.component.scss'],  
  providers : [ RetailEtransferFulfillRequestMoneyFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailEtransferFulfillRequestMoneyFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailEtransferFulfillRequestMoneyFormComponent)
  }]
  })

export class RetailEtransferFulfillRequestMoneyFormComponent extends  BaseFpxFormComponent<RetailEtransferFulfillRequestMoneyFormHelper, RetailEtransferFulfillRequestMoneyFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailEtransferFulfillRequestMoneyFormHelper: RetailEtransferFulfillRequestMoneyFormHelper,
    public etransferService: EtransferService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailEtransferFulfillRequestMoneyFormHelper);
    this.setServiceCode("ETRANSFERFULFILLREQUESTMONEY");  
}
   protected override doPreInit(): void {
  this.setDataService(this.etransferService);
  // this.addFormControl('contactId', '',[ Validators.required,]   ,[],'change',1,false);			   		 
  this.addFormControl('remarks', '',[ ]   ,[],'blur',1,false);			   		 
  this.addFormControl('paymentAmount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
 // this.addFormControl('autoDepositFlag', '',[Validators.required]   ,[],'change',1,false);			   		 
  this.addFormControl('sourceAccount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
 // this.addFormControl('securityQuestion', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
  //this.addFormControl('securityAnswer', '',[Validators.required, ]   ,[],'blur',1,false);	
  this.addFormControl('remarks1', '', [Validators.required], [], 'change', 1, false);		   		
  this.addFormControl('remarks2', '', [], [], 'change', 1, false);	 	   		 
	this.setServiceCode("ETRANSFERFULFILLREQUESTMONEY");
  this.addFormControl('hiddenField', '',  [Validators.required]    ,[],'change',1,false,0);	
  this.addElement('profileDetails');

  }
  

  protected override doPostInit(): void {
  }
 
}

