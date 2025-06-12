import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { LoansService } from '../loans-service/loans.service';
import { RetailViewLoanRepaymentDetailsFormHelper, RetailViewLoanRepaymentDetailsFormState } from './retail-view-loan-repayment-details-form.helper';

 
 
@Component({
 selector: 'app-retail-view-loan-repayment-details-form',
  templateUrl: './retail-view-loan-repayment-details-form.component.html',
  styleUrls: ['./retail-view-loan-repayment-details-form.component.scss'],
  providers : [ RetailViewLoanRepaymentDetailsFormHelper]
  })

export class RetailViewLoanRepaymentDetailsFormComponent extends  BaseFpxFormComponent<RetailViewLoanRepaymentDetailsFormHelper,RetailViewLoanRepaymentDetailsFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailViewLoanRepaymentDetailsFormHelper: RetailViewLoanRepaymentDetailsFormHelper,
    public loansService: LoansService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailViewLoanRepaymentDetailsFormHelper);
  }

  protected override doPreInit(): void {
    this.addElement('repaymentSchedule');
  }
  
}
