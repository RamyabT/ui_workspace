import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailPrepaidBlockFormHelper,RetailPrepaidBlockFormState} from './retail-prepaid-card-block-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { PpcardBlockedService } from '../ppcardBlocked-service/ppcardBlocked.service';
import { PpcardBlocked } from '../ppcardBlocked-service/ppcardBlocked.model';
import { DeviceDetectorService } from '@dep/core';

 
 
@Component({
 selector: 'app-retail-prepaid-card-block-form',
  templateUrl: './retail-prepaid-card-block-form.component.html',
  styleUrls: ['./retail-prepaid-card-block-form.component.scss'],
  providers : [ RetailPrepaidBlockFormHelper]
  })

export class RetailPrepaidBlockFormComponent extends  BaseFpxFormComponent<RetailPrepaidBlockFormHelper, RetailPrepaidBlockFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailPrepaidBlockFormHelper: RetailPrepaidBlockFormHelper,
    public ppcardBlockedService: PpcardBlockedService,
    private validatorService: ValidatorService,
    public device: DeviceDetectorService
    
  ) {
    super(formBuilder, router,controlContainer, retailPrepaidBlockFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('cardRefNumber', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('blockReason', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
   //  this.addFormControl('charges', '',  []    ,[],'blur',1,false,0);			   	
     this.addFormControl('otherReason', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('remarks', '',  []    ,[],'blur',1,false,0);			   	
     this.addFormControl('cardEndNumber', '',  []    ,[],'blur',1,false,0);		 
     this.addFormControl('termsAndCondition', '',  [Validators.required ]    ,[],'blur',1,false,0);
     this.addElement('impNote');	   		 
	this.setDataService(this.ppcardBlockedService);
	this.setServiceCode("RETAILPREPAIDBLOCK");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
