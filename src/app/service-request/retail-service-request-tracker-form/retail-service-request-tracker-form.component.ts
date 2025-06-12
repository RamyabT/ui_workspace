import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailServiceRequestTrackerFormHelper, RetailServiceRequestTrackerFormState} from './retail-service-request-tracker-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 

 
 
@Component({
 selector: 'app-retail-service-request-tracker-form',
  templateUrl: './retail-service-request-tracker-form.component.html',
  styleUrls: ['./retail-service-request-tracker-form.component.scss'],
  providers : [ RetailServiceRequestTrackerFormHelper]
  })

export class RetailServiceRequestTrackerFormComponent extends  BaseFpxFormComponent<RetailServiceRequestTrackerFormHelper, RetailServiceRequestTrackerFormState>  {
  selectedData:any;
  workflowHistoryDetails:any;
  item:any;
  status:string='INPROGRESS';
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailServiceRequestTrackerFormHelper: RetailServiceRequestTrackerFormHelper,
    // public beneaedreqService: BeneaedreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailServiceRequestTrackerFormHelper);
  }
   protected override doPreInit(): void {
    this.addFormControl('searchText', '', [], [], 'change');
    this.addElement('serviceRequest');
    
	// this.setDataService(this.beneaedreqService);
	this.setServiceCode("RETAILCBAED");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
