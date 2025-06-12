import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { CCVerifyPinValidationFormHelper, CCVerifyPinValidationFormState} from './cc-verify-pin-validation-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { Dcpinrequest } from '../ccpinvalidation-service/ccpinvalidation.model';
import { CcpinvalidationService } from '../ccpinvalidation-service/ccpinvalidation.service';

 
 
@Component({
 selector: 'app-cc-verify-pin-validation-form',
  templateUrl: './cc-verify-pin-validation-form.component.html',
  styleUrls: ['./cc-verify-pin-validation-form.component.scss'],
  providers : [ CCVerifyPinValidationFormHelper]
  })

export class CCVerifyPinValidationFormComponent extends  BaseFpxFormComponent<CCVerifyPinValidationFormHelper, CCVerifyPinValidationFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public cCVerifyPinValidationFormHelper: CCVerifyPinValidationFormHelper,
    public ccpinrequestService: CcpinvalidationService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, cCVerifyPinValidationFormHelper);
  }
   protected override doPreInit(): void {
    this.addFormControl('cardReference', '',  [ ]    ,[],'blur',1,false,0);	
    this.addFormControl('pin', '',  [Validators.required ]    ,[],'change',1,false,0);		
     		   		 
	this.setDataService(this.ccpinrequestService);
	this.setServiceCode("DCCURRENTPINVALIDATION");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
