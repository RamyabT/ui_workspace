import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailUsercasarestrictionreqFormHelper,RetailUsercasarestrictionreqFormState} from './retail-usercasarestrictionreq-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { UsercasarestrictionreqService } from '../usercasarestrictionreq-service/usercasarestrictionreq.service';
import { Usercasarestrictionreq } from '../usercasarestrictionreq-service/usercasarestrictionreq.model';

 
 
@Component({
 selector: 'app-retail-usercasarestrictionreq-form',
  templateUrl: './retail-usercasarestrictionreq-form.component.html',
  styleUrls: ['./retail-usercasarestrictionreq-form.component.scss'],
  providers : [ RetailUsercasarestrictionreqFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailUsercasarestrictionreqFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailUsercasarestrictionreqFormComponent)
  }]
  })

export class RetailUsercasarestrictionreqFormComponent extends  BaseFpxFormComponent<RetailUsercasarestrictionreqFormHelper, RetailUsercasarestrictionreqFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailUsercasarestrictionreqFormHelper: RetailUsercasarestrictionreqFormHelper,
    public usercasarestrictionreqService: UsercasarestrictionreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailUsercasarestrictionreqFormHelper);
    this.setServiceCode("RETAILCASADELEGATE");  
}
   protected override doPreInit(): void {
  this.setDataService(this.usercasarestrictionreqService);
      this.addFormControl('accountNumber', '',[Validators.required, ]  ,
		      [
		        this.validatorService.dataAvailabilityCheck(
		          this.embadedFormMode,
		          'accountNumber',
		          this.usercasarestrictionreqService,
		          this.dataAvailable$
		        ),
		      ],'blur',0,true);			   		 
      this.addFormControl('inquiryAllowed', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('requestAllowed', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('transactionAllowed', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('approvalRequired', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
	this.setServiceCode("RETAILCASADELEGATE");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

