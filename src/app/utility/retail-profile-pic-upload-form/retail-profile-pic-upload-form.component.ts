import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RetailProfilePicUploadFormHelper, RetailProfilePicUploadFormState } from './retail-profile-pic-upload-form.helper';

 
 
@Component({
 selector: 'app-retail-profile-pic-upload-form',
  templateUrl: './retail-profile-pic-upload-form.component.html',
  styleUrls: ['./retail-profile-pic-upload-form.component.scss'],
  providers : [ RetailProfilePicUploadFormHelper]
  })

export class RetailProfilePicUploadFormComponent extends  BaseFpxFormComponent<RetailProfilePicUploadFormHelper, RetailProfilePicUploadFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailProfilePicUploadFormHelper: RetailProfilePicUploadFormHelper,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailProfilePicUploadFormHelper);
  }
   protected override doPreInit(): void {
	this.setServiceCode("RETAILCBAED");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
