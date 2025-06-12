import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailUserpcrestrictionreqFormHelper,RetailUserpcrestrictionreqFormState} from './retail-userpcrestrictionreq-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { UserpcrestrictionreqService } from '../userpcrestrictionreq-service/userpcrestrictionreq.service';
import { Userpcrestrictionreq } from '../userpcrestrictionreq-service/userpcrestrictionreq.model';

 
 
@Component({
 selector: 'app-retail-userpcrestrictionreq-form',
  templateUrl: './retail-userpcrestrictionreq-form.component.html',
  styleUrls: ['./retail-userpcrestrictionreq-form.component.scss'],
  providers : [ RetailUserpcrestrictionreqFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailUserpcrestrictionreqFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailUserpcrestrictionreqFormComponent)
  }]
  })

export class RetailUserpcrestrictionreqFormComponent extends  BaseFpxFormComponent<RetailUserpcrestrictionreqFormHelper, RetailUserpcrestrictionreqFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailUserpcrestrictionreqFormHelper: RetailUserpcrestrictionreqFormHelper,
    public userpcrestrictionreqService: UserpcrestrictionreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailUserpcrestrictionreqFormHelper);
    this.setServiceCode("RETAILPCDELEGATE");  
}
   protected override doPreInit(): void {
  this.setDataService(this.userpcrestrictionreqService);
      this.addFormControl('cardRef', '',[Validators.required, ]  ,
		      [
		        this.validatorService.dataAvailabilityCheck(
		          this.embadedFormMode,
		          'cardRef',
		          this.userpcrestrictionreqService,
		          this.dataAvailable$
		        ),
		      ],'blur',0,true);			   		 
      this.addFormControl('inquiryAllowed', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('requestAllowed', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('transactionAllowed', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('approvalRequired', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
	this.setServiceCode("RETAILPCDELEGATE");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

