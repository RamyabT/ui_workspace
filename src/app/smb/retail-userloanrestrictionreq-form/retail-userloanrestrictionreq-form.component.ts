import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailUserloanrestrictionreqFormHelper,RetailUserloanrestrictionreqFormState} from './retail-userloanrestrictionreq-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { UserloanrestrictionreqService } from '../userloanrestrictionreq-service/userloanrestrictionreq.service';
import { Userloanrestrictionreq } from '../userloanrestrictionreq-service/userloanrestrictionreq.model';

 
 
@Component({
 selector: 'app-retail-userloanrestrictionreq-form',
  templateUrl: './retail-userloanrestrictionreq-form.component.html',
  styleUrls: ['./retail-userloanrestrictionreq-form.component.scss'],
  providers : [ RetailUserloanrestrictionreqFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailUserloanrestrictionreqFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailUserloanrestrictionreqFormComponent)
  }]
  })

export class RetailUserloanrestrictionreqFormComponent extends  BaseFpxFormComponent<RetailUserloanrestrictionreqFormHelper, RetailUserloanrestrictionreqFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailUserloanrestrictionreqFormHelper: RetailUserloanrestrictionreqFormHelper,
    public userloanrestrictionreqService: UserloanrestrictionreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailUserloanrestrictionreqFormHelper);
    this.setServiceCode("RETAILLOANDELEGATE");  
}
   protected override doPreInit(): void {
  this.setDataService(this.userloanrestrictionreqService);
      this.addFormControl('accountNumber', '',[Validators.required, ]  ,
		      [
		        this.validatorService.dataAvailabilityCheck(
		          this.embadedFormMode,
		          'accountNumber',
		          this.userloanrestrictionreqService,
		          this.dataAvailable$
		        ),
		      ],'blur',0,true);			   		 
      this.addFormControl('inquiryAllowed', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('requestAllowed', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('transactionAllowed', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('approvalRequired', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
	this.setServiceCode("RETAILLOANDELEGATE");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

