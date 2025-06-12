import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailCreditcardFlashDetailsFormHelper,retaildebitcardformState} from './retail-creditcard-flash-details-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { CreditcardService } from '../creditcard-service/creditcard.service';

 
 
@Component({
 selector: 'app-retail-creditcard-flash-details-form',
  templateUrl: './retail-creditcard-flash-details-form.component.html',
  styleUrls: ['./retail-creditcard-flash-details-form.component.scss'],
  providers : [ RetailCreditcardFlashDetailsFormHelper]
  })

export class RetailCreditcardFlashDetailsFormComponent extends  BaseFpxFormComponent<RetailCreditcardFlashDetailsFormHelper, retaildebitcardformState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _retailCreditcardFlashDetailsFormHelper: RetailCreditcardFlashDetailsFormHelper,
    public creditcardService: CreditcardService,
    // public _debitcardDetailsService: DebitcardDetailsService,
    private validatorService: ValidatorService,
  ) {
    super(formBuilder, router,controlContainer, _retailCreditcardFlashDetailsFormHelper);
  }
   protected override doPreInit(): void {
    this.addFormControl('cardRefNumber', '',  [ ]   ,
		      [
		        // this.validatorService.dataAvailabilityCheck(
		        //   this.embadedFormMode,
		        //   'cardRefNumber',
		        //   this.creditcardService,
		        //   this.dataAvailable$
		        // ),
		      ],'blur',1,false,0);			   		 
    //  this.addFormControl('creditCardNumberUnMasked', '',  [ ]    ,[],'blur',1,false,0);			   		 
    //  this.addFormControl('primaryCardAccNo', '',  [ ]    ,[],'blur',1,false,0);			   		 
    //  this.addFormControl('cardType', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('cardCategory', '',  [ ]    ,[],'blur',1,false,0);			   		 
    //  this.addFormControl('status', '',  [ ]    ,[],'blur',1,false,0);			   		 
    //  this.addFormControl('creditLimit', '',  [ ]    ,[],'blur',1,false,0);	
     this.addFormControl('validFrom', '',  [ ]    ,[],'blur',1,false,0);			   		 
    //  this.addFormControl('validThru', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('issueDate', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('branchDesc', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('currency', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('overDueAmount', '',  [ ]    ,[],'blur',1,false,0);
     this.addFormControl('totalDueAmount', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('outstandingAmount', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('lastPaymentReceived', '',  [ ]    ,[],'blur',1,false,0);		
     this.addFormControl('dueDate', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('lastPaymentDate', '',  [ ]    ,[],'blur',1,false,0);		
	// this.setServiceCode("RETAILDCSUMMARY");
	  // this.setDataService(this._debitcardDetailsService);

  }
  

  protected override doPostInit(): void {
   
  }
  
}
