import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailPCDetailsFormHelper,RetailPCDetailsFormState} from './retail-pc-details-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { PpCardService } from '../ppCard-service/ppCard.service';
import { PpCard } from '../ppCard-service/ppCard.model';

 
 
@Component({
 selector: 'app-retail-pc-details-form',
  templateUrl: './retail-pc-details-form.component.html',
  styleUrls: ['./retail-pc-details-form.component.scss'],
  providers : [ RetailPCDetailsFormHelper]
  })

export class RetailPCDetailsFormComponent extends  BaseFpxFormComponent<RetailPCDetailsFormHelper, RetailPCDetailsFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailPCDetailsFormHelper: RetailPCDetailsFormHelper,
    public ppCardService: PpCardService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailPCDetailsFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('cardReference', '',  [Validators.required ]   ,
		      [
		      ],'blur',1,false,0);			   		 
    this.addFormControl('validFrom', '',  [ ]    ,[],'blur',1,false,0);			   	
     this.addFormControl('cardNumber', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('cardType', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('status', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('productDesc', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('branchDesc', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('issueDate', '',  [ ]    ,[],'blur',1,false,0);			  	 
    //  this.addFormControl('accountNumber', '',  [ ]    ,[],'blur',1,false,0);			   		 
    //  this.addFormControl('cardHolderName', '',  [ ]   ,[],'blur',1,false,0);			   		 
     this.addFormControl('actualBalance', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('accountType', '',  [ ]    ,[],'blur',1,false,0);			   		 
    this.addFormControl('avlBalance', '',  [ ]    ,[],'blur',1,false,0);			   		 
	this.setDataService(this.ppCardService);
	this.setServiceCode("RETAILPCDETAILS");

  }
  

  protected override doPostInit(): void {
   
  }

  submitForm() {
    this.submit();
  }
  
}
