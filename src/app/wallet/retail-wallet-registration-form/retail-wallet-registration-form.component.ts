import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailWalletRegistrationFormHelper,RetailWalletRegistrationFormState} from './retail-wallet-registration-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { WalletregistrationService } from '../walletregistration-service/walletregistration.service';
import { Walletregistration } from '../walletregistration-service/walletregistration.model';

 
 
@Component({
 selector: 'app-retail-wallet-registration-form',
  templateUrl: './retail-wallet-registration-form.component.html',
  styleUrls: ['./retail-wallet-registration-form.component.scss'],
  providers : [ RetailWalletRegistrationFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailWalletRegistrationFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailWalletRegistrationFormComponent)
  }]
  })

export class RetailWalletRegistrationFormComponent extends  BaseFpxFormComponent<RetailWalletRegistrationFormHelper, RetailWalletRegistrationFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailWalletRegistrationFormHelper: RetailWalletRegistrationFormHelper,
    public walletregistrationService: WalletregistrationService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailWalletRegistrationFormHelper);
    this.setServiceCode("RETAILWALLETLIMIT");  
}
   protected override doPreInit(): void {
  this.setDataService(this.walletregistrationService);
      this.addFormControl('tenantId', '',[ ]   ,[],'blur',1,true);			   		 
      this.addFormControl('inventoryNumber', '',[ ]  ,
		      [
		        this.validatorService.dataAvailabilityCheck(
		          this.embadedFormMode,
		          'inventoryNumber',
		          this.walletregistrationService,
		          this.dataAvailable$
		        ),
		      ],'blur',0,true);			   		 
      this.addFormControl('customerCode', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('walletName', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('walletType', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('walletTypeDesc', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('currency', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('country', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('firstName', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('lastName', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('mobileNumber', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('email', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('dob', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('empstatus', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('addressinfo', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('empName', '',[ ]   ,[],'blur',1,false);	
      this.addFormControl('monthlyIncome', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('empPosition', '',[ ]   ,[],'blur',1,false);		   		 
      this.addFormControl('city', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('state', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('zipcode', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('addressLine1', '',[ ]   ,[],'blur',1,false);			
      this.addFormControl('addressLine2', '',[ ]   ,[],'blur',1,false);		
      this.addFormControl('empcity', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('empstate', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('empzipcode', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('empaddressLine1', '',[ ]   ,[],'blur',1,false);			
      this.addFormControl('empaddressLine2', '',[ ]   ,[],'blur',1,false);		   		 
	this.setServiceCode("RETAILWALLETLIMIT");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

