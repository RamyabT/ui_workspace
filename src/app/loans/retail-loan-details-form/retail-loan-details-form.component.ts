import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { LoansService } from "../loans-service/loans.service";
import { RetailLoanDetailsFormHelper, RetailLoanDetailsFormState } from './retail-loan-details-form.helper';
import { CurrencyCodePipe } from 'src/app/common/pipe/currency-code/currency-code.pipe';

 
 
@Component({
 selector: 'app-retail-loan-details-form',
  templateUrl: './retail-loan-details-form.component.html',
  styleUrls: ['./retail-loan-details-form.component.scss'],
  providers : [ RetailLoanDetailsFormHelper,
    CurrencyCodePipe
  ]
  })

export class RetailLoanDetailsFormComponent extends  BaseFpxFormComponent<RetailLoanDetailsFormHelper, RetailLoanDetailsFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailLoanDetailsFormHelper: RetailLoanDetailsFormHelper,
    public loansService: LoansService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailLoanDetailsFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('loanAccountNumber', '',  [Validators.required ]   ,
		      [
		        this.validatorService.dataAvailabilityCheck(
		          this.embadedFormMode,
		          'loanAccountNumber',
		          this.loansService,
		          this.dataAvailable$
		        ),
		      ],'blur',0,true,0);			   		 
     this.addFormControl('loanType', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('productCode', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('currency', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('loanAmount', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('openDate', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('rePaidAmount', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('payOffAmount', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('nextDueDate', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('lastPaymentDate', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('status', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('tenure', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('maturityDate', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('branchDesc', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('totalOutstanding', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('tenorUnit', '',  [Validators.required ]    ,[],'blur',1,false,0);	
     this.addFormControl('loanPeriodInDays', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('loanPeriodInDMonths', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('maximumRedrawAmount', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('minimumRedrawAmount', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('availableBalance', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('otherBalance', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('floatBalance', '',  [Validators.required ]    ,[],'blur',1,false,0);				   		 

	this.setDataService(this.loansService);
	this.setServiceCode("RETAILLOANDETAILS");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
