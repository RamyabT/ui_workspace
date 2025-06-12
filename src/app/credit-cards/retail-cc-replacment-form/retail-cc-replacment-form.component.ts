import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailCCReplacementFormHelper,RetailCCReplacementFormState} from './retail-cc-replacment-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { CcaddonrequestService } from '../ccaddonrequest-service/ccaddonrequest.service';
import { Ccaddonrequest } from '../ccaddonrequest-service/ccaddonrequest.model';
import { DeviceDetectorService } from '@dep/core';

 
 
@Component({
 selector: 'app-retail-cc-replacment-form',
  templateUrl: './retail-cc-replacment-form.component.html',
  styleUrls: ['./retail-cc-replacment-form.component.scss'],
  providers : [ RetailCCReplacementFormHelper]
  })

export class RetailCCReplacementFormComponent extends  BaseFpxFormComponent<RetailCCReplacementFormHelper, RetailCCReplacementFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailCCReplacementFormHelper: RetailCCReplacementFormHelper,
    public ccaddonrequestService: CcaddonrequestService,
    private validatorService: ValidatorService,
    public device: DeviceDetectorService
    
  ) {
    super(formBuilder, router,controlContainer, retailCCReplacementFormHelper);
  }
   protected override doPreInit(): void {
    this.addFormControl('inventoryNumber', '',  [ ]    ,[],'blur',1,true,0);	   		 
     this.addFormControl('cardReference', '',  [Validators.required ]   ,[],'change',1,false,0);			   		 
     this.addFormControl('deliveryOption', '',  [Validators.required ]   ,[],'change',1,false,0);
     this.addFormControl('otherReason', '',  [Validators.required,Validators.maxLength(150)]    ,[],'blur',1,false,0);			
    this.addFormControl('reason', '',  [Validators.required ]    ,[],'blur',1,false,0);		   		 
     this.addFormControl('dlvryBranch', '',  [Validators.required]   ,[],'change',1,false,0);				   		 
     this.addFormControl('charges', '',  [ ]   ,[],'change',1,false,0);			   		 
     this.addFormControl('remarks', '',  [Validators.maxLength(150)]   ,[],'change',1,false,0);			   		 
     this.addFormControl('termsFlag', '',  [Validators.required ]   ,[],'change',1,false,0);			   		 
     this.addElement('addressInfo');
     this.addFormControl('addressInformation','',[] ,[],'blur',1,false,0); 
     this.addFormControl('contactNumber','',[] ,[],'blur',1,false,0); 
	this.setDataService(this.ccaddonrequestService);
	 this.setServiceCode("RETAILCCREPLACE");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
