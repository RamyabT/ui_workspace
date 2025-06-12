import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RetailMyProfileFormHelper, RetailMyProfileFormState } from './retail-my-profile-form.helper';

 
 
@Component({
 selector: 'app-retail-my-profile-form',
  templateUrl: './retail-my-profile-form.component.html',
  styleUrls: ['./retail-my-profile-form.component.scss'],
  providers : [ RetailMyProfileFormHelper]
  })

export class RetailMyProfileFormComponent extends  BaseFpxFormComponent<RetailMyProfileFormHelper, RetailMyProfileFormState>  {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailMyProfileFormHelper: RetailMyProfileFormHelper,
    // public beneaedreqService: BeneaedreqService,
    private validatorService: ValidatorService,
  ) {
    super(formBuilder, router,controlContainer, retailMyProfileFormHelper);
  }
   protected override doPreInit(): void {
    this.addFormControl('profileDetails', '', [], [], 'change');
    this.addElement('profileDocGridGroup');
    this.addElement('emptyProfileDocGroup');
    this.addElement('uploadProfileDocGroup');
    this.addElement('footerButtonContainer');    
  }
  

  protected override doPostInit(): void {
   
  }
  
}
