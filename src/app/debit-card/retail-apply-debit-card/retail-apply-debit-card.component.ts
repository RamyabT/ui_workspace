import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailApplyDebitCardHelper,RetailApplyDebitCardState} from './retail-apply-debit-card.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { ApplyDebitCardService } from '../applyDebitCard-service/applyDebitCard.service';
import { ApplyDebitCard } from '../applyDebitCard-service/applyDebitCard.model';

 
 
@Component({
 selector: 'app-retail-apply-debit-card',
  templateUrl: './retail-apply-debit-card.component.html',
  styleUrls: ['./retail-apply-debit-card.component.scss'],
  providers : [ RetailApplyDebitCardHelper]
  })

export class RetailApplyDebitCardComponent extends  BaseFpxFormComponent<RetailApplyDebitCardHelper, RetailApplyDebitCardState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailApplyDebitCardHelper: RetailApplyDebitCardHelper,
    public applyDebitCardService: ApplyDebitCardService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailApplyDebitCardHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('accountNumber', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('dcCardType', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
    // this.addFormControl('charges', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('deliveryOption', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('remarks', '',  []    ,[],'blur',1,false,0);			   		 
     //this.addFormControl('addressInfo', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('authPersonName', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('authPersonId', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('termsFlag', '',  []    ,[],'blur',1,false,0);		
     this.addFormControl('branches', '',  []    ,[],'blur',1,false,0);			   		 
     this.addElement('addressInfo');	   	
 
	this.setDataService(this.applyDebitCardService);
	this.setServiceCode("RETAILAPPLYDEBITCARD");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
