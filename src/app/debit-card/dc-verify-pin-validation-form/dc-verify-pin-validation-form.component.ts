import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { DCVerifyPinValidationFormHelper,DCVerifyPinValidationFormState} from './dc-verify-pin-validation-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { DcpinrequestService } from '../dcpinrequest-service/dcpinrequest.service';
import { Dcpinrequest } from '../dcpinrequest-service/dcpinrequest.model';

 
 
@Component({
 selector: 'app-dc-verify-pin-validation-form',
  templateUrl: './dc-verify-pin-validation-form.component.html',
  styleUrls: ['./dc-verify-pin-validation-form.component.scss'],
  providers : [ DCVerifyPinValidationFormHelper]
  })

export class DCVerifyPinValidationFormComponent extends  BaseFpxFormComponent<DCVerifyPinValidationFormHelper, DCVerifyPinValidationFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public dCVerifyPinValidationFormHelper: DCVerifyPinValidationFormHelper,
    public dcpinrequestService: DcpinrequestService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, dCVerifyPinValidationFormHelper);
  }
   protected override doPreInit(): void {
    this.addFormControl('cardReference', '',  [ ]    ,[],'blur',1,false,0);	
    this.addFormControl('confirmPin', '',  [Validators.required ]    ,[],'change',1,false,0);		
     		   		 
	this.setDataService(this.dcpinrequestService);
	this.setServiceCode("DCCURRENTPINVALIDATION");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
