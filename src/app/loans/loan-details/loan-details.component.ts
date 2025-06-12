import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { LoanDetailsHelper, LoanDetailsState } from './loan-details.helper';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.scss'],
  providers : [ LoanDetailsHelper, 
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => LoanDetailsComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => LoanDetailsComponent)
    }]  
})  

export class LoanDetailsComponent extends  BaseFpxFormComponent<LoanDetailsHelper, LoanDetailsState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public loanDetailsHelper: LoanDetailsHelper,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, loanDetailsHelper);
     
}
   protected override doPreInit(): void {
    const currentYear = new Date().getFullYear();
    this.addFormControl('loanAmount', '',[ ]   ,[],'blur',1,false);
    this.addFormControl('propCost', '',[ ]   ,[],'blur',1,false);		
    this.addFormControl('downPayment', '',[ ]   ,[],'blur',1,false);			   	
    this.addFormControl('tenor', '',[ ]   ,[],'blur',1,false);		
    this.addFormControl('interestRate', '',[ ]   ,[],'blur',1,false);		
    this.addFormControl('emi', '',[ ]   ,[],'blur',1,false);		
    this.addFormControl('interestAmount', '',[ ]   ,[],'blur',1,false);		
    this.addFormControl('repaymentAmount', '',[ ]   ,[],'blur',1,false);

    this.addFormControl('countryOfTax', '',[ ]   ,[],'blur',1,false);		
    this.addFormControl('propLoc', '',[ ]   ,[],'blur',1,false);			   	
    this.addFormControl('zipcode', '',[ ]   ,[],'blur',1,false);		
    this.addFormControl('addressLine1', '',[ ]   ,[],'blur',1,false);		
    this.addFormControl('addressLine2', '',[ ]   ,[],'blur',1,false);		
    this.addFormControl('state', '',[ ]   ,[],'blur',1,false);		
    this.addFormControl('city', '',[ ]   ,[],'blur',1,false);		

    this.addFormControl('vehicleCost', '',[ ]   ,[],'change',1,false);
    this.addFormControl('vehicleStatus', '',[ ]   ,[],'change',1,false);
    this.addFormControl('vehicleMake', '',[ ]   ,[],'blur',1,false);
    this.addFormControl('vehicleModel', '',[ ]   ,[],'blur',1,false);
    this.addFormControl('yearsOfManufacture', '',[Validators.min(1900), Validators.max(currentYear) ]   ,[],'blur',1,false);
    this.addFormControl('vehiclePrice', '',[ ]   ,[],'blur',1,false);
    this.addFormControl('vehicleRegistrationNumber', '',[Validators.pattern('^[0-9]*$') ]   ,[],'blur',1,false);
    this.addFormControl('odometerReading', '',[Validators.pattern('^[0-9]*$') ]   ,[],'blur',1,false);
    this.addFormControl('previousOwner', '',[Validators.pattern('^[0-9]*$') ]   ,[],'blur',1,false);
    this.addFormControl('hpi', '',[ ]   ,[],'blur',1,false);
    this.addFormControl('dealerName', '',[ ]   ,[],'blur',1,false);
    this.addFormControl('streetAddress', '',[ ]   ,[],'blur',1,false);
    this.addFormControl('dealerContactPerson', '',[ ]   ,[],'blur',1,false);
    this.addFormControl('dealerContactPhoneNumber', '',[ ]   ,[],'blur',1,false);
    this.addFormControl('dealerEmailID', '',[ ]   ,[],'blur',1,false);
  }
  

  protected override doPostInit(): void {
   
  }
 
}

