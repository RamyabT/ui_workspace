import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { retailcreditcardblockHelper,retailcreditcardblockState} from './retail-credit-card-block-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { CcstatusrequestService } from '../ccstatusrequest-service/ccstatusrequest.service';
import { Ccstatusrequest } from '../ccstatusrequest-service/ccstatusrequest.model';
import { DeviceDetectorService } from '@dep/core';

 
 
@Component({
 selector: 'app-retail-credit-card-block-form',
  templateUrl: './retail-credit-card-block-form.component.html',
  styleUrls: ['./retail-credit-card-block-form.component.scss'],
  providers : [ retailcreditcardblockHelper]
  })

export class retailcreditcardblockComponent extends  BaseFpxFormComponent<retailcreditcardblockHelper, retailcreditcardblockState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailcreditcardblockHelper: retailcreditcardblockHelper,
    public ccstatusrequestService: CcstatusrequestService,
    private validatorService: ValidatorService,
    public device: DeviceDetectorService
    
  ) {
    super(formBuilder, router,controlContainer, retailcreditcardblockHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('cardReference', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
    //  this.addFormControl('charges', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('reason', '',  [Validators.required ]    ,[],'blur',1,false,0);
     this.addFormControl('otherReason', '',  [Validators.required,Validators.maxLength(100) ]    ,[],'blur',1,false,0);			 	   		 			   		 
     this.addFormControl('remarks', '',  [Validators.maxLength(150)]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('termsFlag', '',  [Validators.required ]    ,[],'blur',1,false,0);	
     this.addFormControl('cardEndNumber', '',  []    ,[],'blur',1,false,0);		
     this.addElement('infoNote');	
     this.addElement('impNote');
	   this.setDataService(this.ccstatusrequestService);
	   this.setServiceCode("RETAILCCBLOCK");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
