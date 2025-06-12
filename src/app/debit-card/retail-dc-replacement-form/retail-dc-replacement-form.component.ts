import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { retaildcreplacementHelper,retaildcreplacementState} from './retail-dc-replacement-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { DcaddonrequestService } from '../dcaddonrequest-service/dcaddonrequest.service';
import { Dcaddonrequest } from '../dcaddonrequest-service/dcaddonrequest.model';
import { DeviceDetectorService } from '@dep/core';

 
 
@Component({
 selector: 'app-retail-dc-replacement-form',
  templateUrl: './retail-dc-replacement-form.component.html',
  styleUrls: ['./retail-dc-replacement-form.component.scss'],
  providers : [ retaildcreplacementHelper]
  })

export class retaildcreplacementComponent extends  BaseFpxFormComponent<retaildcreplacementHelper, retaildcreplacementState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retaildcreplacementHelper: retaildcreplacementHelper,
    public dcaddonrequestService: DcaddonrequestService,
    private validatorService: ValidatorService,
    public device: DeviceDetectorService
  ) {
    super(formBuilder, router,controlContainer, retaildcreplacementHelper);
  }

  protected readonly otherReason_pattern: any = /^[A-Za-z0-9 _@.'\-\/#&+-,\s]{3,100}$/;
  protected readonly otherReason_minLength: any = 3;
  protected readonly otherReason_maxLength: any = 100;
   protected override doPreInit(): void {
    this.addFormControl('inventoryNumber', '',  [ ]    ,[],'blur',1,true,0);	   		 
     this.addFormControl('cardReference', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('deliveryOption', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('dlvryBranch', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
     //this.addFormControl('authPersonName', '',  []    ,[],'blur',1,false,0);			   		 
     //this.addFormControl('authPersonId', '',  []    ,[],'blur',1,false,0);			
     this.addFormControl('charges', '',  []    ,[],'blur',1,false,0);		
     this.addFormControl('otherReason', '',  [Validators.required,Validators.minLength(this.otherReason_minLength), Validators.maxLength(this.otherReason_maxLength)]    ,[],'blur',1,false,0);			   		    		 
     this.addFormControl('reason', '',  [Validators.required ]    ,[],'blur',1,false,0);			
     this.addFormControl('remarks','',[] ,[],'blur',1,false,0); 		 
    // this.addFormControl('addressInfo', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('termsFlag', '',  [Validators.required]    ,[],'blur',1,false,0);		
     this.addElement('addressInfo');	   	
     this.addFormControl('addressInformation','',[] ,[],'blur',1,false,0); 
     this.addFormControl('contactNumber','',[] ,[],'blur',1,false,0); 
	this.setDataService(this.dcaddonrequestService);
	this.setServiceCode("RETAILDCREPLACE");


  }
  

  protected override doPostInit(): void {
   
  }
  
}
