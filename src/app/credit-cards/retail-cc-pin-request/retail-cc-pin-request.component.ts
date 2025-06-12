import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailCCPinrequestFormHelper,RetailCCPinrequestFormState} from './retail-cc-pin-request.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { CcpinrequestService } from '../ccpinrequest-service/ccpinrequest.service';
import { Ccpinrequest } from '../ccpinrequest-service/ccpinrequest.model';
import { DeviceDetectorService } from '@dep/core';

 
 
@Component({
 selector: 'app-retail-cc-pin-request',
  templateUrl: './retail-cc-pin-request.component.html',
  styleUrls: ['./retail-cc-pin-request.component.scss'],
  providers : [ RetailCCPinrequestFormHelper]
  })

export class RetailCCPinrequestFormComponent extends  BaseFpxFormComponent<RetailCCPinrequestFormHelper, RetailCCPinrequestFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailCCPinrequestFormHelper: RetailCCPinrequestFormHelper,
    public ccpinrequestService: CcpinrequestService,
    private validatorService: ValidatorService,
    public device: DeviceDetectorService
    
  ) {
    super(formBuilder, router,controlContainer, retailCCPinrequestFormHelper);
  }
    protected override doPreInit(): void {  		 
    this.addFormControl('cardRefNumber', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
    this.addFormControl('pin', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
    this.addFormControl('reEnterNewPin', '',  [Validators.required ]    ,[],'change',1,false,0);	
    this.setDataService(this.ccpinrequestService);
    this.setServiceCode("RETAILCCPINREQ");
  }
  

  protected override doPostInit(): void {
   
  }
  
}
