import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailIBANLetterReqFormHelper,RetailIBANLetterReqFormState} from './retail-iban-letter-req-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { IbanLetterReqService } from '../ibanLetterReq-service/ibanLetterReq.service';

 
 
@Component({
 selector: 'app-retail-iban-letter-req-form',
  templateUrl: './retail-iban-letter-req-form.component.html',
  styleUrls: ['./retail-iban-letter-req-form.component.scss'],
  providers : [ RetailIBANLetterReqFormHelper]
  })

export class RetailIBANLetterReqFormComponent extends  BaseFpxFormComponent<RetailIBANLetterReqFormHelper, RetailIBANLetterReqFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailIBANLetterReqFormHelper: RetailIBANLetterReqFormHelper,
    public ibanLetterReqService: IbanLetterReqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailIBANLetterReqFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('accountNumber', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('iBAN', '',   []   ,[],'blur',1,false,0);			   		 
     this.addFormControl('deliveryOption', '',  [Validators.required]    ,[],'change',1,false,0);	
     this.addFormControl('emailId', '', [], [], 'blur', 1, false, 0);
     this.addFormControl('deliveryBranch', '',  [Validators.required] ,[],'blur',1,false,0);		   		 
     this.addFormControl('termsFlag', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('remarks', '',  []    ,[],'change',1,false,0);			   		 
     this.addFormControl('chargesAmount', '',  []    ,[],'blur',1,false,0);	
     this.addFormControl('address', '',  []    ,[],'blur',1,false,0);	
     this.addFormControl('inventoryNumber', '',  []    ,[],'blur',1,true,0);		  
     this.addElement('address');
	this.setDataService(this.ibanLetterReqService);
	this.setServiceCode("RETAILIBANLETTER");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
