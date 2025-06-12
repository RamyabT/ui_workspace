import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailSelfRegisterFormHelper,RetailSelfRegisterFormState} from './retail-self-register-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RetailselfregisterService } from '../retailselfregister-service/retailselfregister.service';
import { Retailselfregister } from '../retailselfregister-service/retailselfregister.model';

 
 
@Component({
 selector: 'app-retail-self-register-form',
  templateUrl: './retail-self-register-form.component.html',
  styleUrls: ['./retail-self-register-form.component.scss'],
  providers : [ RetailSelfRegisterFormHelper]
  })

export class RetailSelfRegisterFormComponent extends  BaseFpxFormComponent<RetailSelfRegisterFormHelper, RetailSelfRegisterFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailSelfRegisterFormHelper: RetailSelfRegisterFormHelper,
    public retailselfregisterService: RetailselfregisterService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailSelfRegisterFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('identificationMode', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('dob', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('identificationNumber', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
	this.setDataService(this.retailselfregisterService);
	this.setServiceCode("retailselfregister");


  }
  

  protected override doPostInit(): void {
   
  }
  
}
