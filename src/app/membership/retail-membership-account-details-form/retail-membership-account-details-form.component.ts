import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailMembershipAccountDetailsFormHelper,RetailMembershipAccountDetailsFormState} from './retail-membership-account-details-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { MembershipService } from '../membership-service/membership.service';
import { Membership } from '../membership-service/membership.model';

 
 
@Component({
 selector: 'app-retail-membership-account-details-form',
  templateUrl: './retail-membership-account-details-form.component.html',
  styleUrls: ['./retail-membership-account-details-form.component.scss'],
  providers : [ RetailMembershipAccountDetailsFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailMembershipAccountDetailsFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailMembershipAccountDetailsFormComponent)
  }]
  })

export class RetailMembershipAccountDetailsFormComponent extends  BaseFpxFormComponent<RetailMembershipAccountDetailsFormHelper, RetailMembershipAccountDetailsFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailMembershipAccountDetailsFormHelper: RetailMembershipAccountDetailsFormHelper,
    public membershipService: MembershipService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailMembershipAccountDetailsFormHelper);
}
 
}

