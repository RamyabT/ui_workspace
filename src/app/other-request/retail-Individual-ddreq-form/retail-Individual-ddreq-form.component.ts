import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailIndIndividualsDDReqFormHelper,RetailIndIndividualsDDReqFormState} from './retail-Individual-ddreq-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { BusinessddreqService } from '../businessddreq-service/businessddreq.service';
import { Businessddreq } from '../businessddreq-service/businessddreq.model';

 
 
@Component({
 selector: 'app-retail-Individual-ddreq-form',
  templateUrl: './retail-Individual-ddreq-form.component.html',
  styleUrls: ['./retail-Individual-ddreq-form.component.scss'],
  providers : [ RetailIndIndividualsDDReqFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailIndIndividualsDDReqFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailIndIndividualsDDReqFormComponent)
  }]
  })

export class RetailIndIndividualsDDReqFormComponent extends  BaseFpxFormComponent<RetailIndIndividualsDDReqFormHelper, RetailIndIndividualsDDReqFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailIndIndividualsDDReqFormHelper: RetailIndIndividualsDDReqFormHelper,
    public businessddreqService: BusinessddreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailIndIndividualsDDReqFormHelper);
    this.setServiceCode("RETAILINDIVIDUALDDREQ");  
}
   protected override doPreInit(): void {
  this.setDataService(this.businessddreqService);
      this.addFormControl('firstName', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('lastName', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('dob', '',[Validators.required, ]   ,[],'blur',1,false);		
      this.addFormControl('accountNumber', '',[Validators.required, ]   ,[],'blur',1,false);			   		 	   		 
      this.addFormControl('socialInsuranceNum', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('amount', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('terms', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
	this.setServiceCode("RETAILINDIVIDUALDDREQ");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

