import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailUpdateProfileDocFormHelper,RetailUpdateProfileDocFormState} from './retail-update-profile-doc-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { UpdatedocumentreqService } from '../updatedocumentreq-service/updatedocumentreq.service';
import { Updatedocumentreq } from '../updatedocumentreq-service/updatedocumentreq.model';

 
 
@Component({
 selector: 'app-retail-update-profile-doc-form',
  templateUrl: './retail-update-profile-doc-form.component.html',
  styleUrls: ['./retail-update-profile-doc-form.component.scss'],
  providers : [ RetailUpdateProfileDocFormHelper]
  })

export class RetailUpdateProfileDocFormComponent extends  BaseFpxFormComponent<RetailUpdateProfileDocFormHelper, RetailUpdateProfileDocFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailUpdateProfileDocFormHelper: RetailUpdateProfileDocFormHelper,
    public updatedocumentreqService: UpdatedocumentreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailUpdateProfileDocFormHelper);
  }
   protected override doPreInit(): void {
  
    this.addFormControl('inventoryNumber', '',  [Validators.required]   ,[],'change',1,true,0);			   		 
    this.addFormControl('id', '',  [Validators.required]   ,[],'blur',1,false,0);			   		 
     this.addFormControl('idNumber', '',  [Validators.required]   ,[],'blur',1,false,0);	
     this.addFormControl('uploadType', '',  [Validators.required]   ,[],'change',1,false,0);			   		 
     this.addFormControl('expiryDate', '',  [Validators.required ]   ,[],'change',1,false,0);	
     this.addFormControl('updatedocfrontimg', '',  [Validators.required ]   ,[],'change',1,false,0);		
     this.addFormControl('updatedocbackimg', '',  [Validators.required ]   ,[],'change',1,false,0);			   		 
     this.addElement('frontBtnGroup');
     this.addElement('backBtnGroup')
     this.addElement('frontViewImgGroup');
     this.addElement('backViewImgGroup')

		   		 
	this.setDataService(this.updatedocumentreqService);
	this.setServiceCode("RETAILUPDATEDOC");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
