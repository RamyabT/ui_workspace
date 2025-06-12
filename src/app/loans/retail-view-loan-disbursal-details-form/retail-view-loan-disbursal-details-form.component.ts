import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { LoansService } from '../loans-service/loans.service';
import { RetailViewLoanDisbursalDetailsFormHelper, } from './retail-view-loan-disbursal-details-form.helper';
import { RetailLoanDisbursalDetailsFormState } from '../retail-loan-disbursal-details-form/retail-loan-disbursal-details-form.helper';

 
 
@Component({
 selector: 'app-retail-view-loan-disbursal-details-form',
  templateUrl: './retail-view-loan-disbursal-details-form.component.html',
  styleUrls: ['./retail-view-loan-disbursal-details-form.component.scss'],
  providers : [ RetailViewLoanDisbursalDetailsFormHelper]
  })

export class RetailViewLoanDisbursalDetailsFormComponent extends  BaseFpxFormComponent<RetailViewLoanDisbursalDetailsFormHelper,RetailLoanDisbursalDetailsFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailViewLoanDisbursalDetailsFormHelper: RetailViewLoanDisbursalDetailsFormHelper,
    public loansService: LoansService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailViewLoanDisbursalDetailsFormHelper);
  }

  protected override doPreInit(): void {
    this.addElement('disbursmentSchedule');
  }
  
}
