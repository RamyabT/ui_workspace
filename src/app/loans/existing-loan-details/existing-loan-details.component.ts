import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { ExistingLoanDetailsHelper, ExistingLoanDetailsState } from './existing-loan-details.helper';

@Component({
  selector: 'app-existing-loan-details',
  templateUrl: './existing-loan-details.component.html',
  styleUrls: ['./existing-loan-details.component.scss'],
  providers : [ ExistingLoanDetailsHelper, 
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ExistingLoanDetailsComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => ExistingLoanDetailsComponent)
    }]  
})  

export class ExistingLoanDetailsComponent extends  BaseFpxFormComponent<ExistingLoanDetailsHelper, ExistingLoanDetailsState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public existingloanDetailsHelper: ExistingLoanDetailsHelper,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, existingloanDetailsHelper);
     
}
   protected override doPreInit(): void {
    this.addFormControl('sameBankOutstandingLoanAmount', '',[ ]   ,[],'blur',1,false);
    this.addFormControl('sameBankLoanAccountNumber', '',[ ]   ,[],'change',1,false);		
    this.addFormControl('differentBankloanProvider', '',[ ]   ,[],'blur',1,false);		
    this.addFormControl('differentBankOutstandingLoanAmount', '',[ ]   ,[],'blur',1,false);	
    this.addFormControl('differentBankLoanAccountNumber', '',[ ]   ,[],'blur',1,false);		   		
  }
  

  protected override doPostInit(): void {
   
  }
 
}

