import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailBeneaedreqFormHelper,RetailBeneaedreqFormState} from './retail-beneaedreq-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { BeneaedreqService } from '../beneaedreq-service/beneaedreq.service';
import { Beneaedreq } from '../beneaedreq-service/beneaedreq.model';

 
 
@Component({
 selector: 'app-retail-beneaedreq-form',
  templateUrl: './retail-beneaedreq-form.component.html',
  styleUrls: ['./retail-beneaedreq-form.component.scss'],
  providers : [ RetailBeneaedreqFormHelper]
  })

export class RetailBeneaedreqFormComponent extends  BaseFpxFormComponent<RetailBeneaedreqFormHelper, RetailBeneaedreqFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailBeneaedreqFormHelper: RetailBeneaedreqFormHelper,
    public beneaedreqService: BeneaedreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailBeneaedreqFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('beneAccType', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('iban', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('accountNumber', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('conAccNumber', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('beneficiaryName', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('bic', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('bankDescription', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('branchDescription', '',  []    ,[],'blur',1,false,0);		
     this.addFormControl('bankCode', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('branchCode', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('bankAddress', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('nickName', '',  []    ,[],'blur',1,false,0);			
     this.addFormControl('isFavourite', '',  [ ]    ,[],'blur',1,false,0);			    		 
     this.addFormControl('beneCountry', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('addressLine1', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('addressLine2', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('city', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('bankCountry', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('intermediaryBank', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('remarks', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('termsFlag', '',  []    ,[],'blur',1,false,0);			   	
     this.addFormControl('inventoryNumber', '',  []    ,[],'blur',0,true,0);		
     this.addElement('bankDetails');
     this.addElement('beneDetails');
     this.addElement('termsDetails');	 	 
	this.setDataService(this.beneaedreqService);
	this.setServiceCode("RETAILCBAED");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
