import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailDcActivateCardFormHelper,RetailDcActivateCardFormState} from './retail-dc-activate-card-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { DcactivatecardService } from '../dcactivatecard-service/dcactivatecard.service';
import { Dcactivatecard } from '../dcactivatecard-service/dcactivatecard.model';
import { DeviceDetectorService } from '@dep/core';

 
 
@Component({
 selector: 'app-retail-dc-activate-card-form',
  templateUrl: './retail-dc-activate-card-form.component.html',
  styleUrls: ['./retail-dc-activate-card-form.component.scss'],
  providers : [ RetailDcActivateCardFormHelper]
  })

export class RetailDcActivateCardFormComponent extends  BaseFpxFormComponent<RetailDcActivateCardFormHelper, RetailDcActivateCardFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailDcActivateCardFormHelper: RetailDcActivateCardFormHelper,
    public dcactivatecardService: DcactivatecardService,
    private validatorService: ValidatorService,
    public device: DeviceDetectorService
    
  ) {
    super(formBuilder, router,controlContainer, retailDcActivateCardFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('cardReference', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 		   		 		   		 			   		 
     this.addFormControl('cardName', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('expiryMonth', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('expiryYear', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('cvv', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 		   		 
     this.addFormControl('remarks', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('termsFlag', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     		 
	this.setDataService(this.dcactivatecardService);
	this.setServiceCode("RETAILDCACTIVATECARD");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
