import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailCustomerVerificationFormHelper,RetailCustomerVerificationFormState} from './retail-customer-verification-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 

 
 
@Component({
 selector: 'app-retail-customer-verification-form',
  templateUrl: './retail-customer-verification-form.component.html',
  styleUrls: ['./retail-customer-verification-form.component.scss'],
  providers : [ RetailCustomerVerificationFormHelper]
  })

export class RetailCustomerVerificationFormComponent extends  BaseFpxFormComponent<RetailCustomerVerificationFormHelper, RetailCustomerVerificationFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailCustomerVerificationFormHelper: RetailCustomerVerificationFormHelper,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailCustomerVerificationFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('identificationMode', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('identificationNumber', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('accountNumber', '',  [Validators.required,Validators.minLength(5),Validators.maxLength(10)]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('customerCif', '',  [Validators.required ]    ,[],'blur',1,false,0);	
     this.addFormControl('debitcardNumber', '',  [Validators.minLength(16),Validators.maxLength(16),Validators.required]    ,[],'blur',1,false,0);		
     this.addFormControl('username', '',  []    ,[],'blur',1,false,0);				   		 		   		 
     this.addFormControl('dob', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 	
     this.addFormControl('pin', '',  [Validators.required]    ,[],'change',1,false,0);	
     this.addFormControl('expiryYear', '',  [Validators.required]    ,[],'change',1,false,0);	
     this.addFormControl('expiryMonth', '',  [Validators.required]    ,[],'change',1,false,0);	
     this.addElement('expiryDate');			   		 

  }
  

  protected override doPostInit(): void {
   
  }
  
}
