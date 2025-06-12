import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailDebitCardSetPinFormHelper,RetailDebitCardSetPinFormState} from './retail-debit-card-set-pin-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { DebitcardsetpinService } from '../debitcardsetpin-service/debitcardsetpin.service';
import { Debitcardsetpin } from '../debitcardsetpin-service/debitcardsetpin.model';

 
 
@Component({
 selector: 'app-retail-debit-card-set-pin-form',
  templateUrl: './retail-debit-card-set-pin-form.component.html',
  styleUrls: ['./retail-debit-card-set-pin-form.component.scss'],
  providers : [ RetailDebitCardSetPinFormHelper]
  })

export class RetailDebitCardSetPinFormComponent extends  BaseFpxFormComponent<RetailDebitCardSetPinFormHelper, RetailDebitCardSetPinFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailDebitCardSetPinFormHelper: RetailDebitCardSetPinFormHelper,
    public debitcardsetpinService: DebitcardsetpinService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailDebitCardSetPinFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('inventoryNumber', '',  []   ,
		      [
		        this.validatorService.dataAvailabilityCheck(
		          this.embadedFormMode,
		          'inventoryNumber',
		          this.debitcardsetpinService,
		          this.dataAvailable$
		        ),
		      ],'blur',0,true,0);			   		 
    this.addFormControl('cardReference', '',  [Validators.required ]    ,[],'blur',1,false,0);	
     this.addFormControl('newPin', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('reenteredPin', '',  [Validators.required ]    ,[],'change',1,false,0);		
     this.addFormControl('remarks', '',  []    ,[],'blur',1,false,0);			 
     this.addFormControl('termsFlag', '',  [ ]    ,[],'blur',1,false,0);	  		 
	this.setDataService(this.debitcardsetpinService);
	this.setServiceCode("RETAILDCSETPIN");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
