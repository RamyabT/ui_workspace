import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailNoLiabilityLetterHelper,RetailNoLiabilityLetterState} from './retail-no-liability-letter-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { NoLiabilityletterService } from 'src/app/service-request/noLiabilityletter-service/noLiabilityletter.service';

 
 
@Component({
 selector: 'app-retail-no-liability-letter-form',
  templateUrl: './retail-no-liability-letter-form.component.html',
  styleUrls: ['./retail-no-liability-letter-form.component.scss'],
  providers : [ RetailNoLiabilityLetterHelper]
  })

export class RetailNoLiabilityLetterComponent extends  BaseFpxFormComponent<RetailNoLiabilityLetterHelper, RetailNoLiabilityLetterState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailNoLiabilityLetterHelper: RetailNoLiabilityLetterHelper,
    public noLiabilityletterService: NoLiabilityletterService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailNoLiabilityLetterHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('date', '1',  [Validators.required]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('addressedTo', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('deliveryOption', '',  [Validators.required]    ,[],'change',1,false,0);
     this.addFormControl('deliveryBranch', '',  [Validators.required] ,[],'change',1,false,0);	 			   		 
     this.addFormControl('chargesAmount', '',  []    ,[],'blur',1,false,0);	
     this.addFormControl('email','',[]    ,[],'blur',1,false,0)	;	 		   		 
     this.addFormControl('Reason', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('otherReason', '',  [Validators.required]    ,[],'change',1,false,0);	   		 
     this.addFormControl('remarks', '',  []    ,[],'change',1,false,0);			   		 
     this.addFormControl('addressDetails', '',  []    ,[],'blur',1,false,0);			
     this.addFormControl('termsFlag', '',  [Validators.required]    ,[],'blur',1,false,0);	
     this.addFormControl('inventoryNumber', '',  []    ,[],'blur',1,true,0);
     this.addElement('addressDetails');		   		 
	this.setDataService(this.noLiabilityletterService);
	this.setServiceCode("RETAILNOLIABILITY");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
