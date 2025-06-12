import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { expensesDetailsHelper,expensesDetailsState} from './expensesDetails.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { ExpensesDetailsService } from '../expensesDetails-service/expensesDetails.service';
import { ExpensesDetails } from '../expensesDetails-service/expensesDetails.model';

 
 
@Component({
 selector: 'app-expensesDetails',
  templateUrl: './expensesDetails.component.html',
  styleUrls: ['./expensesDetails.component.scss'],
  providers : [ expensesDetailsHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => expensesDetailsComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => expensesDetailsComponent)
  }]
  })

export class expensesDetailsComponent extends  BaseFpxFormComponent<expensesDetailsHelper, expensesDetailsState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public expensesDetailsHelper: expensesDetailsHelper,
    public expensesDetailsService: ExpensesDetailsService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, expensesDetailsHelper);
    this.setServiceCode("expensesDetails");  
}
   protected override doPreInit(): void {
  this.setDataService(this.expensesDetailsService);
      this.addFormControl('tenantId', '',[Validators.required, ]   ,[],'blur',1,true);			   		 
      this.addFormControl('applicantId', '',[Validators.required, ]  ,
		      [
		        this.validatorService.dataAvailabilityCheck(
		          this.embadedFormMode,
		          'applicantId',
		          this.expensesDetailsService,
		          this.dataAvailable$
		        ),
		      ],'blur',0,true);			   		 
      this.addFormControl('monthlyExpenses', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('otherLoanEMI', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('annualPropertyTax', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('monthlyCondominiumFees', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
	this.setServiceCode("expensesDetails");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

