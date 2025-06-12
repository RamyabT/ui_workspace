import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { BasicDetailsFormFormState, BasicDetailsFormHelper } from './basic-details-form.helper';
import { basicDetailsService } from '../basicDetails-service/basicDetails.service';

 
 
@Component({
 selector: 'app-basic-details-form',
  templateUrl: './basic-details-form.component.html',
  styleUrls: ['./basic-details-form.component.scss'],
  providers : [ BasicDetailsFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => BasicDetailsFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => BasicDetailsFormComponent)
  }]
  })

export class BasicDetailsFormComponent extends  BaseFpxFormComponent<BasicDetailsFormHelper, BasicDetailsFormFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public BasicDetailsFormHelper: BasicDetailsFormHelper,
    public basicDetailsService: basicDetailsService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, BasicDetailsFormHelper);
    this.setServiceCode("RETAILWALLETREG");  
}
   protected override doPreInit(): void {
  this.setDataService(this.basicDetailsService);
      this.addFormControl('tenantId', '',[ ]   ,[],'blur',1,true);			   		 
      this.addFormControl('inventoryNumber', '',[ ]  ,
		      [
		        this.validatorService.dataAvailabilityCheck(
		          this.embadedFormMode,
		          'inventoryNumber',
		          this.basicDetailsService,
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
      this.addFormControl('additionalEmploymentInfo', '',[ ]   ,[],'blur',1,false);
      
      this.addFormControl('otherLoanEMI', '',[ ]   ,[],'blur',1,false);
      this.addFormControl('monthlyExpenses', '',[ ]   ,[],'blur',1,false);
      this.addFormControl('annualPropertyTax', '',[ ]   ,[],'blur',1,false);
      this.addFormControl('monthlyCondominiumFees', '',[ ]   ,[],'blur',1,false);
	this.setServiceCode("RETAILWALLETREG");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

