import { Component, EventEmitter, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailEtransferRequestMoneyFormHelper, RetailEtransferRequestMoneyFormState } from './retail-etransfer-request-money-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { EtransferService } from '../etransfer-service/etransfer.service';
import { Etransfer } from '../etransfer-service/etransfer.model';



@Component({
  selector: 'app-retail-etransfer-request-money-form',
  templateUrl: './retail-etransfer-request-money-form.component.html',
  styleUrls: ['./retail-etransfer-request-money-form.component.scss'],
  providers: [RetailEtransferRequestMoneyFormHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RetailEtransferRequestMoneyFormComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => RetailEtransferRequestMoneyFormComponent)
    }]
})

export class RetailEtransferRequestMoneyFormComponent extends BaseFpxFormComponent<RetailEtransferRequestMoneyFormHelper, RetailEtransferRequestMoneyFormState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailEtransferRequestMoneyFormHelper: RetailEtransferRequestMoneyFormHelper,
    public etransferService: EtransferService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailEtransferRequestMoneyFormHelper);
    this.setServiceCode("ETRANSFERREQUESTMONEY");
  }
  protected override doPreInit(): void {
    this.setDataService(this.etransferService);
    this.addFormControl('sourceAccount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
    this.addFormControl('contactCategory', '',[]   ,[],'change',1,false);			   		 
    this.addFormControl('contactId', '',[]   ,[],'change',1,false);			   		 
    this.addFormControl('contactName', '',[]   ,[],'blur',1,false);			   		 
    this.addFormControl('contactEmailId', '',[ ]   ,[],'blur',1,false);			   		 
    this.addFormControl('contactPhoneNumber', '',[ ]   ,[],'blur',1,false);			   		 
    this.addFormControl('notificationPreference', '',[ Validators.required]   ,[],'change',1,false);			   		 
    this.addFormControl('createContact', '',[ ]   ,[],'blur',1,false);			   		 
    this.addFormControl('paymentAmount', '',[Validators.required, ]   ,[],'blur',1,false);		
    this.addFormControl('scheduleType', '',[]   ,[],'change',1,false);	 
    this.addFormControl('paymentDate', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('scheduleHandler', '', [], [], 'change', 1, false, 0);  		 
    this.addFormControl('securityQuestion', '',[]   ,[],'blur',1,false);			   		 
    this.addFormControl('securityAnswer', '',[ ]   ,[],'blur',1,false);			   		 
    this.addFormControl('remarks', '',[ ]   ,[],'blur',1,false);
    this.addFormControl('isPreferred', '',[ ]   ,[],'blur',1,false); 
    this.addFormControl('paymentId', '',[ ]   ,[],'blur',1,true); 
    //this.addFormControl('autoDepositEnabled', '',[ ]   ,[],'blur',1,false); 
    this.addFormControl('preferredLanguage', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('invoiceNumber', '',  []    ,[],'blur',1,false);	
    this.addFormControl('termsFlag', '',[Validators.required],[],'blur',1,false);		
    this.addElement('paymentSummary');	
    this.addElement('profileDetails');
    this.addFormControl('confirmSecurityAnswer', '', [], [], 'blur', 1, false);
    this.setServiceCode("ETRANSFERREQUESTMONEY");

  }


  protected override doPostInit(): void {

  }

}

