import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailFlashDebitCardRequestFormHelper,RetailFlashDebitCardRequestFormState} from './retail-flash-debit-card-request-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { FlashdebitcardrequestService } from '../flashdebitcardrequest-service/flashdebitcardrequest.service';
import { Flashdebitcardrequest } from '../flashdebitcardrequest-service/flashdebitcardrequest.model';

 
 
@Component({
 selector: 'app-retail-flash-debit-card-request-form',
  templateUrl: './retail-flash-debit-card-request-form.component.html',
  styleUrls: ['./retail-flash-debit-card-request-form.component.scss'],
  providers : [ RetailFlashDebitCardRequestFormHelper]
  })

export class RetailFlashDebitCardRequestFormComponent extends  BaseFpxFormComponent<RetailFlashDebitCardRequestFormHelper, RetailFlashDebitCardRequestFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailFlashDebitCardRequestFormHelper: RetailFlashDebitCardRequestFormHelper,
    public flashdebitcardrequestService: FlashdebitcardrequestService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailFlashDebitCardRequestFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('inventoryNumber', '',  []   ,
		      [
		        this.validatorService.dataAvailabilityCheck(
		          this.embadedFormMode,
		          'inventoryNumber',
		          this.flashdebitcardrequestService,
		          this.dataAvailable$
		        ),
		      ],'blur',0,true,0);			   		 
     this.addFormControl('cardReference', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('cardNumber', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('cardHolderName', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('cvv', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('validThru', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('validFrom', '',  []    ,[],'blur',1,false,0);	
    //  this.addFormControl('status', '',  []    ,[],'blur',1,false,0);				   		 
	this.setDataService(this.flashdebitcardrequestService);
	this.setServiceCode("RETAILFLASHDEBITCARD");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
