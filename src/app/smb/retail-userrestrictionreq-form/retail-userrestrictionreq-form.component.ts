import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailUserrestrictionreqFormHelper,RetailUserrestrictionreqFormState} from './retail-userrestrictionreq-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { UserrestrictionreqService } from '../userrestrictionreq-service/userrestrictionreq.service';
import { Userrestrictionreq } from '../userrestrictionreq-service/userrestrictionreq.model';

 
 
@Component({
 selector: 'app-retail-userrestrictionreq-form',
  templateUrl: './retail-userrestrictionreq-form.component.html',
  styleUrls: ['./retail-userrestrictionreq-form.component.scss'],
  providers : [ RetailUserrestrictionreqFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailUserrestrictionreqFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailUserrestrictionreqFormComponent)
  }]
  })

export class RetailUserrestrictionreqFormComponent extends  BaseFpxFormComponent<RetailUserrestrictionreqFormHelper, RetailUserrestrictionreqFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailUserrestrictionreqFormHelper: RetailUserrestrictionreqFormHelper,
    public userrestrictionreqService: UserrestrictionreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailUserrestrictionreqFormHelper);
    this.setServiceCode("RETAILDELEGATEUSER");  
}
   protected override doPreInit(): void {
  this.setDataService(this.userrestrictionreqService);
      this.addFormControl('firstName', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('middleName', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('lastName', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('mobileNumber', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('emailAddress', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('userName', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('nationality', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('remarks', '',[ ]   ,[],'blur',1,false);	
      this.addFormControl('accessLevel', '',[Validators.required, ]   ,[],'blur',1,false);			   		 		   		 
	this.setServiceCode("RETAILDELEGATEUSER");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

