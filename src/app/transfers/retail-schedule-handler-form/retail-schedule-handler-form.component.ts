import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailScheduleTransferHandlerHelper,RetailScheduleTransferHandlerState} from './retail-schedule-handler-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { PymtsService } from '../pymts-service/pymts.service';
import { Pymts } from '../pymts-service/pymts.model';

 
 
@Component({
 selector: 'app-retail-schedule-handler-form',
  templateUrl: './retail-schedule-handler-form.component.html',
  styleUrls: ['./retail-schedule-handler-form.component.scss'],
  providers : [ RetailScheduleTransferHandlerHelper]
  })

export class RetailScheduleTransferHandlerComponent extends  BaseFpxFormComponent<RetailScheduleTransferHandlerHelper, RetailScheduleTransferHandlerState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailScheduleTransferHandlerHelper: RetailScheduleTransferHandlerHelper,
    public pymtsService: PymtsService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailScheduleTransferHandlerHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('paymentFrequency', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
    this.addFormControl('numberOfPayments', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('paymentDaysInterval', '', [Validators.required], [], 'blur', 1, false, 0);
    
     this.addFormControl('endDate', '',  []    ,[],'blur',1,false,0);			   		 
	this.setDataService(this.pymtsService);
  this.addElement('numberOfPaymentsNote');
	// this.setServiceCode("pymts"); 

  }
  

  protected override doPostInit(): void {
   
  }
  
}
