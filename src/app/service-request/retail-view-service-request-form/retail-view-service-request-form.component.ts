import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailViewServiceRequestFormHelper, RetailViewServiceRequestFormState} from './retail-view-service-request-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 

 
 
@Component({
 selector: 'app-retail-view-service-request-form',
  templateUrl: './retail-view-service-request-form.component.html',
  styleUrls: ['./retail-view-service-request-form.component.scss'],
  providers : [ RetailViewServiceRequestFormHelper]
  })

export class RetailViewServiceRequestFormComponent extends  BaseFpxFormComponent<RetailViewServiceRequestFormHelper, RetailViewServiceRequestFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailViewServiceRequestFormHelper: RetailViewServiceRequestFormHelper,
    // public beneaedreqService: BeneaedreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailViewServiceRequestFormHelper);
  }
   protected override doPreInit(): void {
    // this.addFormControl('searchText', '', [], [], 'change');
    this.addElement('serviceRequest');
    
	// this.setDataService(this.beneaedreqService);
	this.setServiceCode("RETAILCBAED");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
