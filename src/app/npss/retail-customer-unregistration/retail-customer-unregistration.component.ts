import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailCustomerUnregistrationHelper,RetailCustomerUnregistrationState} from './retail-customer-unregistration.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { CustomerunregistrationService } from '../customerunregistration-service/customerunregistration.service';
import { Customerunregistration } from '../customerunregistration-service/customerunregistration.model';

 
 
@Component({
 selector: 'app-retail-customer-unregistration',
  templateUrl: './retail-customer-unregistration.component.html',
  styleUrls: ['./retail-customer-unregistration.component.scss'],
  providers : [ RetailCustomerUnregistrationHelper]
  })

export class RetailCustomerUnregistrationComponent extends  BaseFpxFormComponent<RetailCustomerUnregistrationHelper, RetailCustomerUnregistrationState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailCustomerUnregistrationHelper: RetailCustomerUnregistrationHelper,
    public customerunregistrationService: CustomerunregistrationService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailCustomerUnregistrationHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('termsFlag', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('FieldId_1', '',  []    ,[],'blur',1,false,0);			   		 
	this.setDataService(this.customerunregistrationService);
	this.setServiceCode("RETAILCUSTOMERUNREGISTER");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
