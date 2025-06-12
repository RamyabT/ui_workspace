import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailLiabilityLetterFormHelper,RetailLiabilityLetterFormState} from './retail-liability-letter.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { LiabilityLetterService } from '../liabilityLetter-service/liabilityLetter.service';
import { LiabilityLetter } from '../liabilityLetter-service/liabilityLetter.model';

 
 
@Component({
 selector: 'app-retail-liability-letter',
  templateUrl: './retail-liability-letter.component.html',
  styleUrls: ['./retail-liability-letter.component.scss'],
  providers : [ RetailLiabilityLetterFormHelper]
  })

export class RetailLiabilityLetterFormComponent extends  BaseFpxFormComponent<RetailLiabilityLetterFormHelper, RetailLiabilityLetterFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailLiabilityLetterFormHelper: RetailLiabilityLetterFormHelper,
    public liabilityLetterService: LiabilityLetterService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailLiabilityLetterFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('asonDate', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('addressedTo', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('serviceReqDeliveryOption', '',  [Validators.required]    ,[],'change',1,false,0);			   		 
     this.addFormControl('Reason', '',  [Validators.required]    ,[],'blur',1,false,0);	
     this.addFormControl('email','',[]    ,[],'blur',1,false,0)	;	 
     this.addFormControl('deliveryBranch', '',  [Validators.required] ,[],'change',1,false,0);	 
     this.addFormControl('chargesAmount', '',  []    ,[],'blur',1,false,0);
     this.addFormControl('addressInfo', '',  []    ,[],'blur',1,false,0);			
     this.addFormControl('otherReason', '',  [Validators.required]    ,[],'change',1,false,0);		   		 
     this.addFormControl('acknowledgement', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('remarks', '',  []    ,[],'change',1,false,0);	
     this.addFormControl('inventoryNumber', '',  []    ,[],'blur',1,true,0);		  
     this.addElement('addressInfo');	   		 
	this.setDataService(this.liabilityLetterService);
	this.setServiceCode("RETAILLIABILITY");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
