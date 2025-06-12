import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RetailProfilePicPreviewFormHelper, RetailProfilePicPreviewFormState } from './retail-profile-pic-preview-form.helper';

 
 
@Component({
 selector: 'app-retail-profile-pic-preview-form',
  templateUrl: './retail-profile-pic-preview-form.component.html',
  styleUrls: ['./retail-profile-pic-preview-form.component.scss'],
  providers : [ RetailProfilePicPreviewFormHelper]
  })

export class RetailProfilePicPreviewFormComponent extends  BaseFpxFormComponent<RetailProfilePicPreviewFormHelper, RetailProfilePicPreviewFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailProfilePicPreviewFormHelper: RetailProfilePicPreviewFormHelper,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailProfilePicPreviewFormHelper);
  }
   protected override doPreInit(): void {

  }
  

  protected override doPostInit(): void {
   
  }
  
}
