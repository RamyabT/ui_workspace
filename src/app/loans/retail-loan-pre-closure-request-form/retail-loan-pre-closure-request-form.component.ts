import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailLoanPreClosureRequestHelper,RetailLoanPreClosureRequestState} from './retail-loan-pre-closure-request-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { LoanpreclosurerequestService } from '../loanpreclosurerequest-service/loanpreclosurerequest.service';
import { Loanpreclosurerequest } from '../loanpreclosurerequest-service/loanpreclosurerequest.model';

 
 
@Component({
 selector: 'app-retail-loan-pre-closure-request-form',
  templateUrl: './retail-loan-pre-closure-request-form.component.html',
  styleUrls: ['./retail-loan-pre-closure-request-form.component.scss'],
  providers : [ RetailLoanPreClosureRequestHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailLoanPreClosureRequestComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailLoanPreClosureRequestComponent)
  }]
  })

export class RetailLoanPreClosureRequestComponent extends  BaseFpxFormComponent<RetailLoanPreClosureRequestHelper, RetailLoanPreClosureRequestState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailLoanPreClosureRequestHelper: RetailLoanPreClosureRequestHelper,
    public loanpreclosurerequestService: LoanpreclosurerequestService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailLoanPreClosureRequestHelper);
    this.setServiceCode("RETAILLOANPREPAYMENT");  
}
   protected override doPreInit(): void {
  this.setDataService(this.loanpreclosurerequestService);
      this.addFormControl('loanAccountNumber', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('debitAccountNumber', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('prePaymentAmount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('paymentDate', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('remarks', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('termsFlag', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('chargesAmount', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
      this.addElement('exchangeDetails');

	this.setServiceCode("RETAILLOANPREPAYMENT");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

