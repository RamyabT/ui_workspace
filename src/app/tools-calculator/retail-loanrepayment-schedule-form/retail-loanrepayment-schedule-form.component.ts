import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { loanrepaymentscheduleHelper,loanrepaymentscheduleState} from './retail-loanrepayment-schedule-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { LoanrepaymentscheduleService } from '../loanrepaymentschedule-service/loanrepaymentschedule.service';
import { Loanrepaymentschedule } from '../loanrepaymentschedule-service/loanrepaymentschedule.model';

 
 
@Component({
 selector: 'app-retail-loanrepayment-schedule-form',
  templateUrl: './retail-loanrepayment-schedule-form.component.html',
  styleUrls: ['./retail-loanrepayment-schedule-form.component.scss'],
  providers : [ loanrepaymentscheduleHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => loanrepaymentscheduleComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => loanrepaymentscheduleComponent)
  }]
  })

export class loanrepaymentscheduleComponent extends  BaseFpxFormComponent<loanrepaymentscheduleHelper, loanrepaymentscheduleState>  {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public loanrepaymentscheduleHelper: loanrepaymentscheduleHelper,
    public loanrepaymentscheduleService: LoanrepaymentscheduleService,
    private validatorService: ValidatorService,
     _loanrepaymentscheduleHelper:loanrepaymentscheduleHelper
    
  ) {
    super(formBuilder, router,controlContainer, loanrepaymentscheduleHelper);
  }
   protected override doPreInit(): void {
  this.setDataService(this.loanrepaymentscheduleService);
  this.addElement('repaymentSchedule');
	this.setServiceCode("RETAILREPAYMENTSCH");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
