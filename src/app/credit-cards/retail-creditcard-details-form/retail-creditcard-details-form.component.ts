import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailCreditcardDetailsFormHelper,RetailCreditcardDetailsFormState} from './retail-creditcard-details-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { CreditcardService } from '../creditcard-service/creditcard.service';
import { Creditcard } from '../creditcard-service/creditcard.model';

 
 
@Component({
 selector: 'app-retail-creditcard-details-form',
  templateUrl: './retail-creditcard-details-form.component.html',
  styleUrls: ['./retail-creditcard-details-form.component.scss'],
  providers : [ RetailCreditcardDetailsFormHelper]
  })

export class RetailCreditcardDetailsFormComponent extends  BaseFpxFormComponent<RetailCreditcardDetailsFormHelper, RetailCreditcardDetailsFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailCreditcardDetailsFormHelper: RetailCreditcardDetailsFormHelper,
    public creditcardService: CreditcardService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailCreditcardDetailsFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('cardReference', '',  [Validators.required ]   ,
		      [],'blur',1,false,0);			   		 
    //  this.addFormControl('creditCardNumberUnMasked', '',  [ ]    ,[],'blur',1,false,0);			   		 
    //  this.addFormControl('primaryCardAccNo', '',  [ ]    ,[],'blur',1,false,0);			   		 
    //  this.addFormControl('cardType', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('cardCategory', '',  [ ]    ,[],'blur',1,false,0);			   		 
    //  this.addFormControl('status', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
    //  this.addFormControl('creditLimit', '',  [Validators.required ]    ,[],'blur',1,false,0);	
     this.addFormControl('validFrom', '',  [ ]    ,[],'blur',1,false,0);			   		 
    //  this.addFormControl('validThru', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('issueDate', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('branchDesc', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('currency', '',  [ ]    ,[],'blur',1,false,0);			   		 
    //  this.addFormControl('overDueAmount', '',  []    ,[],'blur',1,false,0);
    this.addFormControl('totalDueAmount', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('outstandingAmount', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('lastPaymentReceived', '',  []    ,[],'blur',1,false,0);		
     this.addFormControl('dueDate', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('lastPaymentDate', '',  []    ,[],'blur',1,false,0);			   		 

	this.addElement('downloadCreditCardDetails');
	this.setDataService(this.creditcardService);
	this.setServiceCode("RETAILFLASHCREDITCARD");

  }
  

  protected override doPostInit(): void {
   
  }

  submitForm() {
    this.submit();
  }
  
}
