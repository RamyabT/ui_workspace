import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailChangePasswordFormHelper,RetailChangePasswordFormState} from './retail-change-password-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { ChangepasswordService } from '../changepassword-service/changepassword.service';
import { Changepassword } from '../changepassword-service/changepassword.model';

 
 
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
    public changepasswordService: ChangepasswordService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailChangePasswordFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('currentPass', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('newPass', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('confirmPass', '',  [Validators.required ]   ,[],'blur',1,false,0);	
     this.addFormControl('isFormValid', '',  []   ,[],'change',1,false,0);			   		   		 		   		 
	this.setDataService(this.changepasswordService);
	this.setServiceCode("RETAILSTNGCHANGEPASSWORD");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
