import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailUserccrestrictionreqFormHelper,RetailUserccrestrictionreqFormState} from './retail-userccrestrictionreq-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { UserccrestrictionreqService } from '../userccrestrictionreq-service/userccrestrictionreq.service';
import { Userccrestrictionreq } from '../userccrestrictionreq-service/userccrestrictionreq.model';

 
 
@Component({
 selector: 'app-retail-userccrestrictionreq-form',
  templateUrl: './retail-userccrestrictionreq-form.component.html',
  styleUrls: ['./retail-userccrestrictionreq-form.component.scss'],
  providers : [ RetailUserccrestrictionreqFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailUserccrestrictionreqFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailUserccrestrictionreqFormComponent)
  }]
  })

export class RetailUserccrestrictionreqFormComponent extends  BaseFpxFormComponent<RetailUserccrestrictionreqFormHelper, RetailUserccrestrictionreqFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailUserccrestrictionreqFormHelper: RetailUserccrestrictionreqFormHelper,
    public userccrestrictionreqService: UserccrestrictionreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailUserccrestrictionreqFormHelper);
    this.setServiceCode("RETAILCCDELEGATE");  
}
   protected override doPreInit(): void {
  this.setDataService(this.userccrestrictionreqService);
      this.addFormControl('cardRef', '',[Validators.required, ]  ,
		      [
		        this.validatorService.dataAvailabilityCheck(
		          this.embadedFormMode,
		          'cardRef',
		          this.userccrestrictionreqService,
		          this.dataAvailable$
		        ),
		      ],'blur',0,true);			   		 
      this.addFormControl('inquiryAllowed', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('requestAllowed', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('transactionAllowed', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('approvalRequired', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
	this.setServiceCode("RETAILCCDELEGATE");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

