import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailBusinessDDReqFormHelper,RetailBusinessDDReqFormState} from './retail-business-ddreq-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { BusinessddreqService } from '../businessddreq-service/businessddreq.service';
import { Businessddreq } from '../businessddreq-service/businessddreq.model';

 
 
@Component({
 selector: 'app-retail-business-ddreq-form',
  templateUrl: './retail-business-ddreq-form.component.html',
  styleUrls: ['./retail-business-ddreq-form.component.scss'],
  providers : [ RetailBusinessDDReqFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailBusinessDDReqFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailBusinessDDReqFormComponent)
  }]
  })

export class RetailBusinessDDReqFormComponent extends  BaseFpxFormComponent<RetailBusinessDDReqFormHelper, RetailBusinessDDReqFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailBusinessDDReqFormHelper: RetailBusinessDDReqFormHelper,
    public businessddreqService: BusinessddreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailBusinessDDReqFormHelper);
    this.setServiceCode("RETAILBUSINESSDDREQ");  
}
   protected override doPreInit(): void {
  this.setDataService(this.businessddreqService);
      this.addFormControl('companyName', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('businessNumber', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('accountNumber', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('socialInsuranceNum', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('firstName', '',[ Validators.required,]   ,[],'blur',1,false);			   		 
      this.addFormControl('lastName', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('dob', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('amount', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('terms', '',[Validators.required,]   ,[],'blur',1,false);		
	this.setServiceCode("RETAILBUSINESSDDREQ");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

