import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailUserdcrestrictionreqFormHelper,RetailUserdcrestrictionreqFormState} from './retail-userdcrestrictionreq-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { UserdcrestrictionreqService } from '../userdcrestrictionreq-service/userdcrestrictionreq.service';
import { Userdcrestrictionreq } from '../userdcrestrictionreq-service/userdcrestrictionreq.model';

 
 
@Component({
 selector: 'app-retail-userdcrestrictionreq-form',
  templateUrl: './retail-userdcrestrictionreq-form.component.html',
  styleUrls: ['./retail-userdcrestrictionreq-form.component.scss'],
  providers : [ RetailUserdcrestrictionreqFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailUserdcrestrictionreqFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailUserdcrestrictionreqFormComponent)
  }]
  })

export class RetailUserdcrestrictionreqFormComponent extends  BaseFpxFormComponent<RetailUserdcrestrictionreqFormHelper, RetailUserdcrestrictionreqFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailUserdcrestrictionreqFormHelper: RetailUserdcrestrictionreqFormHelper,
    public userdcrestrictionreqService: UserdcrestrictionreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailUserdcrestrictionreqFormHelper);
    this.setServiceCode("RETAILDCDELEGATE");  
}
   protected override doPreInit(): void {
  this.setDataService(this.userdcrestrictionreqService);
      this.addFormControl('cardRef', '',[Validators.required, ]  ,
		      [
		        this.validatorService.dataAvailabilityCheck(
		          this.embadedFormMode,
		          'cardRef',
		          this.userdcrestrictionreqService,
		          this.dataAvailable$
		        ),
		      ],'blur',0,true);			   		 
      this.addFormControl('inquiryAllowed', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('requestAllowed', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('transactionAllowed', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('approvalRequired', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
	this.setServiceCode("RETAILDCDELEGATE");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

