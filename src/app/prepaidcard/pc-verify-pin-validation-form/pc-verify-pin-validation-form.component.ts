import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { PcpinvalidationService } from '../pcpinvalidation-service/pcpinvalidation.service';
import { CCVerifyPinValidationFormHelper, CCVerifyPinValidationFormState } from 'src/app/credit-cards/cc-verify-pin-validation-form/cc-verify-pin-validation-form.helper';
import { PCVerifyPinValidationFormHelper, PCVerifyPinValidationFormState } from './pc-verify-pin-validation-form.helper';

 
 
@Component({
 selector: 'app-pc-verify-pin-validation-form',
  templateUrl: './pc-verify-pin-validation-form.component.html',
  styleUrls: ['./pc-verify-pin-validation-form.component.scss'],
  providers : [ PCVerifyPinValidationFormHelper]
  })

export class PCVerifyPinValidationFormComponent extends  BaseFpxFormComponent<PCVerifyPinValidationFormHelper, PCVerifyPinValidationFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public pCVerifyPinValidationFormHelper: PCVerifyPinValidationFormHelper,
    public pcpinrequestService: PcpinvalidationService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, pCVerifyPinValidationFormHelper);
  }
   protected override doPreInit(): void {
    this.addFormControl('cardReference', '',  [ ]    ,[],'blur',1,false,0);	
    this.addFormControl('pin', '',  [Validators.required ]    ,[],'change',1,false,0);		
     		   		 
	this.setDataService(this.pcpinrequestService);
	this.setServiceCode("PCCURRENTPINVALIDATION");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
