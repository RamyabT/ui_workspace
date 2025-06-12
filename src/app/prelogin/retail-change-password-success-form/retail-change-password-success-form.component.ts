import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailChangePasswordSuccessFormHelper,RetailChangePasswordSuccessFormState} from './retail-change-password-success-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { ChangepassService } from '../../login/changepass-service/changepass.service';
import { Changepass } from '../../login/changepass-service/changepass.model';

 
 
@Component({
 selector: 'app-retail-change-password-success-form',
  templateUrl: './retail-change-password-success-form.component.html',
  styleUrls: ['./retail-change-password-success-form.component.scss'],
  providers : [ RetailChangePasswordSuccessFormHelper]
  })

export class RetailChangePasswordSuccessFormComponent extends  BaseFpxFormComponent<RetailChangePasswordSuccessFormHelper, RetailChangePasswordSuccessFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailChangePasswordSuccessFormHelper: RetailChangePasswordSuccessFormHelper,
    public changepassService: ChangepassService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailChangePasswordSuccessFormHelper);
  }
   protected override doPreInit(): void {
	this.setDataService(this.changepassService);
	this.setServiceCode("RETAILCHANGEPASS");


  }
  

  protected override doPostInit(): void {
   
  }
  
}
