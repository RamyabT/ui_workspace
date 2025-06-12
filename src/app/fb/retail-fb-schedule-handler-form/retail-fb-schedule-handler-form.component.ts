import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailFbScheduleTransferHandlerHelper, RetailFbScheduleTransferHandlerState} from './retail-fb-schedule-handler-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { PymtsService } from 'src/app/transfers/pymts-service/pymts.service';


 
 
@Component({
 selector: 'app-retail-fb-schedule-handler-form',
  templateUrl: './retail-fb-schedule-handler-form.component.html',
  styleUrls: ['./retail-fb-schedule-handler-form.component.scss'],
  providers : [ RetailFbScheduleTransferHandlerHelper]
  })

export class RetailFbScheduleTransferHandlerComponent extends  BaseFpxFormComponent<RetailFbScheduleTransferHandlerHelper, RetailFbScheduleTransferHandlerState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailFbScheduleTransferHandlerHelper: RetailFbScheduleTransferHandlerHelper,
    public pymtsService: PymtsService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailFbScheduleTransferHandlerHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('paymentFrequency', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
    this.addFormControl('numberOfPayments', '', [Validators.required], [], 'blur', 1, false, 0);    
     this.addFormControl('endDate', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
	this.setDataService(this.pymtsService);
  this.addElement('numberOfPaymentsNote');
  }
  

  protected override doPostInit(): void {
   
  }
  
}
