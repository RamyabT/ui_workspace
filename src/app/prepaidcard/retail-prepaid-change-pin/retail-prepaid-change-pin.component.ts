import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailPrepaidChanfePinHelper,RetailPrepaidChanfePinState} from './retail-prepaid-change-pin.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { PcPinRequestService } from '../pcPinRequest-service/pcPinRequest.service';
import { PcPinRequest } from '../pcPinRequest-service/pcPinRequest.model';
import { DeviceDetectorService } from '@dep/core';

 
 
@Component({
 selector: 'app-retail-prepaid-change-pin',
  templateUrl: './retail-prepaid-change-pin.component.html',
  styleUrls: ['./retail-prepaid-change-pin.component.scss'],
  providers : [ RetailPrepaidChanfePinHelper]
  })

export class RetailPrepaidChanfePinComponent extends  BaseFpxFormComponent<RetailPrepaidChanfePinHelper, RetailPrepaidChanfePinState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailPrepaidChanfePinHelper: RetailPrepaidChanfePinHelper,
    public pcPinRequestService: PcPinRequestService,
    private validatorService: ValidatorService,
    public device: DeviceDetectorService
    
  ) {
    super(formBuilder, router,controlContainer, retailPrepaidChanfePinHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('cardReference', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('confirmPin', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('pin', '',  [Validators.required]    ,[],'change',1,false,0);			   		 
     this.addFormControl('reenteredPin', '',  [Validators.required]    ,[],'change',1,false,0);			   		 
     this.addFormControl('remarks', '',  []    ,[],'change',1,false,0);			   		 
     this.addFormControl('termsFlag', '',  [Validators.required ]    ,[],'change',1,false,0);			   		
     this.addElement('infoNote');
     this.addElement('line')
	this.setDataService(this.pcPinRequestService);
	this.setServiceCode("RETAILPREPAIDCHANGEPIN");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
