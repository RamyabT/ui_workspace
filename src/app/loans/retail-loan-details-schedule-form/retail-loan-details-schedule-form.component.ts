import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { LoansService } from '../../loans/loans-service/loans.service';
import { RetailLoanDetailsScheduleFormHelper, RetailLoanDetailsScheduleFormState } from './retail-loan-details-schedule-form.helper';
 
 
@Component({
 selector: 'app-retail-loan-details-schedule-form',
  templateUrl: './retail-loan-details-schedule-form.component.html',
  styleUrls: ['./retail-loan-details-schedule-form.component.scss'],
  providers : [ RetailLoanDetailsScheduleFormHelper]
  })

export class RetailLoanDetailsScheduleFormComponent extends  BaseFpxFormComponent<RetailLoanDetailsScheduleFormHelper, RetailLoanDetailsScheduleFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailLoanDetailsScheduleFormHelper: RetailLoanDetailsScheduleFormHelper,
    public loansService: LoansService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailLoanDetailsScheduleFormHelper);
  }
  
}
