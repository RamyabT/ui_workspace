import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RetailProfileDocUploadFormHelper, RetailProfileDocUploadFormState } from './retail-profile-doc-upload-form.helper';

 
 
@Component({
 selector: 'app-retail-profile-doc-upload-form',
  templateUrl: './retail-profile-doc-upload-form.component.html',
  styleUrls: ['./retail-profile-doc-upload-form.component.scss'],
  providers : [ RetailProfileDocUploadFormHelper]
  })

export class RetailProfileDocUploadFormComponent extends  BaseFpxFormComponent<RetailProfileDocUploadFormHelper, RetailProfileDocUploadFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailProfileDocUploadFormHelper: RetailProfileDocUploadFormHelper,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailProfileDocUploadFormHelper);
  }
   protected override doPreInit(): void {
  this.addFormControl('fileUpload', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
	this.setServiceCode("RETAILCBAED");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
