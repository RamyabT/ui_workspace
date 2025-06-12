import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailFlashPrepaidCardRequestFormHelper,RetailFlashPrepaidCardRequestFormState} from './retail-pp-flash-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { FlashprepaidcardrequestService } from '../flashprepaidcardrequest-service/flashprepaidcardrequest.service';
import { Flashprepaidcardrequest } from '../flashprepaidcardrequest-service/flashprepaidcardrequest.model';

 
 
@Component({
 selector: 'app-retail-pp-flash-form',
  templateUrl: './retail-pp-flash-form.component.html',
  styleUrls: ['./retail-pp-flash-form.component.scss'],
  providers : [ RetailFlashPrepaidCardRequestFormHelper]
  })

export class RetailFlashPrepaidCardRequestFormComponent extends  BaseFpxFormComponent<RetailFlashPrepaidCardRequestFormHelper, RetailFlashPrepaidCardRequestFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailFlashPrepaidCardRequestFormHelper: RetailFlashPrepaidCardRequestFormHelper,
    public flashprepaidcardrequestService: FlashprepaidcardrequestService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailFlashPrepaidCardRequestFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('inventoryNumber', '',  []   ,
		      [
		        this.validatorService.dataAvailabilityCheck(
		          this.embadedFormMode,
		          'inventoryNumber',
		          this.flashprepaidcardrequestService,
		          this.dataAvailable$
		        ),
		      ],'blur',0,true,0);			   		 
     this.addFormControl('cardReference', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('cardNumber', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('cardHolderName', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('cvv', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('validThru', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('status', '',  []    ,[],'blur',1,false,0);			   		 
	this.setDataService(this.flashprepaidcardrequestService);
	this.setServiceCode("RETAILPPFLASHFORM");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
