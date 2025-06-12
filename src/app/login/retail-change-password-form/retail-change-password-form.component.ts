import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailChangePasswordFormHelper,RetailChangePasswordFormState} from './retail-change-password-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { ChangepassService } from '../changepass-service/changepass.service';

 
 
@Component({
 selector: 'app-retail-change-password-form',
  templateUrl: './retail-change-password-form.component.html',
  styleUrls: ['./retail-change-password-form.component.scss'],
  providers : [ RetailChangePasswordFormHelper]
  })

export class RetailChangePasswordFormComponent extends  BaseFpxFormComponent<RetailChangePasswordFormHelper, RetailChangePasswordFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailChangePasswordFormHelper: RetailChangePasswordFormHelper,
    public changepassService: ChangepassService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailChangePasswordFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('oldPassword', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('newPassword', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('confirmPassword', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
	this.setDataService(this.changepassService);
	this.setServiceCode("RETAILCHANGEPASSWORD");


  }
  

  protected override doPostInit(): void {
   
  }
  
}
