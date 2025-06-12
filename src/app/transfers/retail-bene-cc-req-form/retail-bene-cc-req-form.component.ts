import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailBeneCCReqFormHelper,RetailBeneCCReqFormState} from './retail-bene-cc-req-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { BeneccreqService } from '../beneccreq-service/beneccreq.service';
import { Beneccreq } from '../beneccreq-service/beneccreq.model';

 
 
@Component({
 selector: 'app-retail-bene-cc-req-form',
  templateUrl: './retail-bene-cc-req-form.component.html',
  styleUrls: ['./retail-bene-cc-req-form.component.scss'],
  providers : [ RetailBeneCCReqFormHelper]
  })

export class RetailBeneCCReqFormComponent extends  BaseFpxFormComponent<RetailBeneCCReqFormHelper, RetailBeneCCReqFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailBeneCCReqFormHelper: RetailBeneCCReqFormHelper,
    public beneccreqService: BeneccreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailBeneCCReqFormHelper);
  }
  // protected readonly remarks_pattern:any = /^(?!.*\s{2,})(?!\s*$)(\w+(\s\w+)*){3,100}$/;

   protected override doPreInit(): void {
     this.addFormControl('creditCardNumber', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('confirmCreditCardNumber', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('nickName', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('bic', '',  [Validators.required ]    ,[],'blur',1,false,0);	
     this.addFormControl('branchDescription', '',  []    ,[],'blur',1,false,0);	
     this.addFormControl('bankDescription', '',  []    ,[],'blur',1,false,0);		   				   		 
     this.addFormControl('bankCode', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('branchCode', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('branchAddress', '',  []    ,[],'blur',1,false,0);		
     this.addFormControl('isFavourite', '',  [ ]    ,[],'blur',1,false,0);			 
     this.addFormControl('inventoryNumber', '',  [Validators.required ]    ,[],'blur',0,true,0);	   		 
     this.addFormControl('termsFlag', '',  [Validators.required]    ,[],'blur',1,false,0);			   	
     this.addFormControl('remarks', '',  []    ,[],'blur',1,false,0);			
     this.addFormControl('beneficiaryName', '',  [Validators.required]    ,[],'blur',1,false,0);			
     this.addElement('bankDetails');
     this.addElement('beneDetails');
     this.addElement('termsDetails');	 	   		 		   		 	 
	this.setDataService(this.beneccreqService);
	this.setServiceCode("RETAILBENECC");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
