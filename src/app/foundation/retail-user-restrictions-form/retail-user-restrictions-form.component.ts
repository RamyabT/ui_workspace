import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailUserRestrictionsFormHelper,RetailUserRestrictionsFormState} from './retail-user-restrictions-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { UserrestrictionsService } from '../userrestrictions-service/userrestrictions.service';
import { Userrestrictions } from '../userrestrictions-service/userrestrictions.model';
 
@Component({
 selector: 'app-retail-user-restrictions-form',
  templateUrl: './retail-user-restrictions-form.component.html',
  styleUrls: ['./retail-user-restrictions-form.component.scss'],
  providers : [
    RetailUserRestrictionsFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailUserRestrictionsFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailUserRestrictionsFormComponent)
  }]
  })

export class RetailUserRestrictionsFormComponent extends  BaseFpxFormComponent<RetailUserRestrictionsFormHelper, RetailUserRestrictionsFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailUserRestrictionsFormHelper: RetailUserRestrictionsFormHelper,
    public userrestrictionsService: UserrestrictionsService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailUserRestrictionsFormHelper);
    this.setServiceCode("USERRESTICTIONS");  
}
   protected override doPreInit(): void {
  this.setDataService(this.userrestrictionsService);
	this.setServiceCode("USERRESTICTIONS");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

