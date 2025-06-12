import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailDebitCardBlockFormHelper,RetailDebitCardBlockFormState} from './retail-debit-card-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { DcstatusrequestService } from '../dcstatusrequest-service/dcstatusrequest.service';
import { Dcstatusrequest } from '../dcstatusrequest-service/dcstatusrequest.model';
import { DeviceDetectorService } from '@dep/core';

 
 
@Component({
 selector: 'app-retail-debit-card-form',
  templateUrl: './retail-debit-card-form.component.html',
  styleUrls: ['./retail-debit-card-form.component.scss'],
  providers : [ RetailDebitCardBlockFormHelper]
  })

export class RetailDebitCardBlockFormComponent extends  BaseFpxFormComponent<RetailDebitCardBlockFormHelper, RetailDebitCardBlockFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailDebitCardBlockFormHelper: RetailDebitCardBlockFormHelper,
    public dcstatusrequestService: DcstatusrequestService,
    private validatorService: ValidatorService,
    public device: DeviceDetectorService
    
  ) {
    super(formBuilder, router,controlContainer, retailDebitCardBlockFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('cardReference', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('reason', '',  [Validators.required ]    ,[],'blur',1,false,0);		
     //this.addFormControl('charges', '',  []    ,[],'blur',1,false,0);			 
     this.addFormControl('otherReason', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 	   		 
     this.addFormControl('remarks', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('termsFlag', '',  [Validators.required ]    ,[],'blur',1,false,0);		
     this.addFormControl('cardEndNumber', '',  []    ,[],'blur',1,false,0);	
     this.addElement('impNote');
	this.setDataService(this.dcstatusrequestService);
	this.setServiceCode("RETAILDCBLOCK");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
