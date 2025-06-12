import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailPCFlashDetailsFormHelper,RetailPCFlashDetailsFormState} from './retail-pc-flash-details-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { PpCardService } from '../ppCard-service/ppCard.service';
import { PpCard } from '../ppCard-service/ppCard.model';

 
 
@Component({
 selector: 'app-retail-pc-flash-details-form',
  templateUrl: './retail-pc-flash-details-form.component.html',
  styleUrls: ['./retail-pc-flash-details-form.component.scss'],
  providers : [ RetailPCFlashDetailsFormHelper]
  })

export class RetailPCFlashDetailsFormComponent extends  BaseFpxFormComponent<RetailPCFlashDetailsFormHelper, RetailPCFlashDetailsFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailPCFlashDetailsFormHelper: RetailPCFlashDetailsFormHelper,
    public ppCardService: PpCardService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailPCFlashDetailsFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('cardReference', '',  [Validators.required ]   ,
		      [
		        // this.validatorService.dataAvailabilityCheck(
		        //   this.embadedFormMode,
		        //   'cardReference',
		        //   this.ppCardService,
		        //   this.dataAvailable$
		        // ),
		      ],'blur',1,false,0);			   		 
    this.addFormControl('validFrom', '',  [ ]    ,[],'blur',1,false,0);			   	
     this.addFormControl('cardNumber', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('cardType', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('status', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('productDesc', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('branchDesc', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('issueDate', '',  [ ]    ,[],'blur',1,false,0);			  	 
     this.addFormControl('accountNumber', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('cardHolderName', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('actualBalance', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('accountType', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('avlBalance', '',  [ ]    ,[],'blur',1,false,0);			   		 
	this.setDataService(this.ppCardService);
	this.setServiceCode("RETAILFLASHPREPAIDCARD");

  }
  

  protected override doPostInit(): void {
   
  }

  submitForm() {
    this.submit();
  }
  
}
