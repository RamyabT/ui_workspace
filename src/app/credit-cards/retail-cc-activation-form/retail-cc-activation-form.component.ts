import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailCCActivationFormHelper,RetailCCActivationFormState} from './retail-cc-activation-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { CcactivationService } from '../ccactivation-service/ccactivation.service';
//import { Ccactivation } from '../ccactivation-service/ccactivation.model';

 
 
@Component({
 selector: 'app-retail-cc-activation-form',
  templateUrl: './retail-cc-activation-form.component.html',
  styleUrls: ['./retail-cc-activation-form.component.scss'],
  providers : [ RetailCCActivationFormHelper]
  })

export class RetailCCActivationFormComponent extends  BaseFpxFormComponent<RetailCCActivationFormHelper, RetailCCActivationFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailCCActivationFormHelper: RetailCCActivationFormHelper,
    public ccactivationService: CcactivationService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailCCActivationFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('cardReference', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('cardHolderName', '',  [Validators.required]    ,[],'blur',1,false,0);
     this.addFormControl('expiryMonth', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('expiryYear', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('cvv', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('remarks', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('termsFlag', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
	this.setDataService(this.ccactivationService);
	 this.setServiceCode("RETAILCCACTIVATION");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
