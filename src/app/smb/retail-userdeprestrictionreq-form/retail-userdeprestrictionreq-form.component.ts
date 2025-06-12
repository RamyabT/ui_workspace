import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailUserdeprestrictionreqFormHelper,RetailUserdeprestrictionreqFormState} from './retail-userdeprestrictionreq-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { UserdeprestrictionreqService } from '../userdeprestrictionreq-service/userdeprestrictionreq.service';
import { Userdeprestrictionreq } from '../userdeprestrictionreq-service/userdeprestrictionreq.model';

 
 
@Component({
 selector: 'app-retail-userdeprestrictionreq-form',
  templateUrl: './retail-userdeprestrictionreq-form.component.html',
  styleUrls: ['./retail-userdeprestrictionreq-form.component.scss'],
  providers : [ RetailUserdeprestrictionreqFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailUserdeprestrictionreqFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailUserdeprestrictionreqFormComponent)
  }]
  })

export class RetailUserdeprestrictionreqFormComponent extends  BaseFpxFormComponent<RetailUserdeprestrictionreqFormHelper, RetailUserdeprestrictionreqFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailUserdeprestrictionreqFormHelper: RetailUserdeprestrictionreqFormHelper,
    public userdeprestrictionreqService: UserdeprestrictionreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailUserdeprestrictionreqFormHelper);
    this.setServiceCode("RETAILDEPDELEGATE");  
}
   protected override doPreInit(): void {
  this.setDataService(this.userdeprestrictionreqService);
      this.addFormControl('accountNumber', '',[Validators.required, ]  ,
		      [
		        this.validatorService.dataAvailabilityCheck(
		          this.embadedFormMode,
		          'accountNumber',
		          this.userdeprestrictionreqService,
		          this.dataAvailable$
		        ),
		      ],'blur',0,true);			   		 
      this.addFormControl('inquiryAllowed', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('requestAllowed', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('transactionAllowed', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('approvalRequired', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
	this.setServiceCode("RETAILDEPDELEGATE");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

