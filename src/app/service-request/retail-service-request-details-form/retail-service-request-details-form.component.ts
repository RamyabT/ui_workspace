import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailServiceRequestDetailsFormHelper,RetailServiceRequestDetailsFormState} from './retail-service-request-details-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { ServicerequestadhocService } from '../servicerequestadhoc-service/servicerequestadhoc.service';
import { Servicerequestadhoc } from '../servicerequestadhoc-service/servicerequestadhoc.model';

 
 
@Component({
 selector: 'app-retail-service-request-details-form',
  templateUrl: './retail-service-request-details-form.component.html',
  styleUrls: ['./retail-service-request-details-form.component.scss'],
  providers : [ RetailServiceRequestDetailsFormHelper]
  })

export class RetailServiceRequestDetailsFormComponent extends  BaseFpxFormComponent<RetailServiceRequestDetailsFormHelper, RetailServiceRequestDetailsFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailServiceRequestDetailsFormHelper: RetailServiceRequestDetailsFormHelper,
    public servicerequestadhocService: ServicerequestadhocService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailServiceRequestDetailsFormHelper);
  }
   protected override doPreInit(): void {
	this.setDataService(this.servicerequestadhocService);
	this.setServiceCode("RETAILSERVICEREQUESTADHOC");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
