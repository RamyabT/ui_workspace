import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { LoansService } from '../../loans/loans-service/loans.service';
import { RetailLoanDisbursalDetailsFormHelper, RetailLoanDisbursalDetailsFormState } from './retail-loan-disbursal-details-form.helper';

 
 
@Component({
 selector: 'app-retail-loan-disbursal-details-form',
  templateUrl: './retail-loan-disbursal-details-form.component.html',
  styleUrls: ['./retail-loan-disbursal-details-form.component.scss'],
  providers : [ RetailLoanDisbursalDetailsFormHelper]
  })

export class RetailLoanDisbursalDetailsFormComponent extends  BaseFpxFormComponent<RetailLoanDisbursalDetailsFormHelper, RetailLoanDisbursalDetailsFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailLoanDisbursalDetailsFormHelper: RetailLoanDisbursalDetailsFormHelper,
    public loansService: LoansService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailLoanDisbursalDetailsFormHelper);
  }
  
}
