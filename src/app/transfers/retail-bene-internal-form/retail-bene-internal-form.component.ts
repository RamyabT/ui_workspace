import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailBeneInternalFormHelper,RetailBeneInternalFormState} from './retail-bene-internal-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { BeneintbtreqService } from '../beneintbtreq-service/beneintbtreq.service';
import { Beneintbtreq } from '../beneintbtreq-service/beneintbtreq.model';

 
 
@Component({
 selector: 'app-retail-bene-internal-form',
  templateUrl: './retail-bene-internal-form.component.html',
  styleUrls: ['./retail-bene-internal-form.component.scss'],
  providers : [ RetailBeneInternalFormHelper]
  })

export class RetailBeneInternalFormComponent extends  BaseFpxFormComponent<RetailBeneInternalFormHelper, RetailBeneInternalFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailBeneInternalFormHelper: RetailBeneInternalFormHelper,
    public beneintbtreqService: BeneintbtreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailBeneInternalFormHelper);
  }
  protected readonly confirmAccountNumber_minLength: any = 12;
  // protected readonly confirmAccountNumber_maxLength: any = 12;
   protected override doPreInit(): void {
     this.addFormControl('nickName', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('accountNumber', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('confirmAccountNumber', '',  [Validators.required,Validators.minLength(this.confirmAccountNumber_minLength) ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('beneficiaryName', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('accountCurrency', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('remarks', '',  []    ,[],'blur',1,false,0);		
     this.addFormControl('termsFlag', '',  []    ,[],'blur',1,false,0);	
     this.addFormControl('isFavourite', '',  [ ]    ,[],'blur',1,false,0);			 
     this.addFormControl('inventoryNumber', '',  [ ]    ,[],'blur',0,true,0);			  
     this.addElement('bankDetails');
     this.addElement('beneDetails');
     this.addElement('termsDetails');	 	 		 	   		 
	this.setDataService(this.beneintbtreqService);
	this.setServiceCode("RETAILBENEINTERNAL");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
