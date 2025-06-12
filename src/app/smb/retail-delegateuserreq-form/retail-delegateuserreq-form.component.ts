import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailDelegateuserreqFormHelper,RetailDelegateuserreqFormState} from './retail-delegateuserreq-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { DelegateuserreqService } from '../delegateuserreq-service/delegateuserreq.service';
import { Delegateuserreq } from '../delegateuserreq-service/delegateuserreq.model';

 
 
@Component({
 selector: 'app-retail-delegateuserreq-form',
  templateUrl: './retail-delegateuserreq-form.component.html',
  styleUrls: ['./retail-delegateuserreq-form.component.scss'],
  providers : [ RetailDelegateuserreqFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailDelegateuserreqFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailDelegateuserreqFormComponent)
  }]
  })

export class RetailDelegateuserreqFormComponent extends  BaseFpxFormComponent<RetailDelegateuserreqFormHelper, RetailDelegateuserreqFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailDelegateuserreqFormHelper: RetailDelegateuserreqFormHelper,
    public delegateuserreqService: DelegateuserreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailDelegateuserreqFormHelper);
    this.setServiceCode("RETAILDELEUSER");  
}
   protected override doPreInit(): void {
  this.setDataService(this.delegateuserreqService);
      this.addFormControl('initial', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('firstName', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('lastName', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('mobileNumber', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('emailAddress', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('userName', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('nationality', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('accessLevel', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('remarks', '',[ ]   ,[],'blur',1,false);			   		 
	this.setServiceCode("RETAILDELEUSER");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

