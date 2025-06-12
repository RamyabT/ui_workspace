import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailCustomerActivationHelper,RetailCustomerActivationState} from './retail-customer-activation.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { CustomerActivationService } from '../customerActivation-service/customerActivation.service';
import { CustomerActivation } from '../customerActivation-service/customerActivation.model';

 
 
@Component({
 selector: 'app-retail-customer-activation',
  templateUrl: './retail-customer-activation.component.html',
  styleUrls: ['./retail-customer-activation.component.scss'],
  providers : [ RetailCustomerActivationHelper]
  })

export class RetailCustomerActivationComponent extends  BaseFpxFormComponent<RetailCustomerActivationHelper, RetailCustomerActivationState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailCustomerActivationHelper: RetailCustomerActivationHelper,
    public customerActivationService: CustomerActivationService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailCustomerActivationHelper);
    this.setServiceCode("RETAILCUSTOMERACTIVATION");
  }
   protected override doPreInit(): void {
     this.addFormControl('termsFlag', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
	this.setDataService(this.customerActivationService);

  }
  

  protected override doPostInit(): void {
   
  }
  
}
