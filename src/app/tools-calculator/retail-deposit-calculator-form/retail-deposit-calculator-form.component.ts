import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailDepositCalculatorFormHelper,RetailDepositCalculatorFormState} from './retail-deposit-calculator-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { DepositCalculatorService } from '../depositCalculator-service/depositCalculator.service';
import { DepositCalculator } from '../depositCalculator-service/depositCalculator.model';

 
 
@Component({
 selector: 'app-retail-deposit-calculator-form',
  templateUrl: './retail-deposit-calculator-form.component.html',
  styleUrls: ['./retail-deposit-calculator-form.component.scss'],
  providers : [ RetailDepositCalculatorFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailDepositCalculatorFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailDepositCalculatorFormComponent)
  }]
  })

export class RetailDepositCalculatorFormComponent extends  BaseFpxFormComponent<RetailDepositCalculatorFormHelper, RetailDepositCalculatorFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailDepositCalculatorFormHelper: RetailDepositCalculatorFormHelper,
    public depositCalculatorService: DepositCalculatorService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailDepositCalculatorFormHelper);
  }
   protected override doPreInit(): void {
  this.setDataService(this.depositCalculatorService);
      this.addFormControl('depositProducts', '',[Validators.required, ]  ,
		      [
		        this.validatorService.dataAvailabilityCheck(
		          this.embadedFormMode,
		          'depositProducts',
		          this.depositCalculatorService,
		          this.dataAvailable$
		        ),
		      ],'blur',0,true);			   		 
      this.addFormControl('amount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('tenure', '',[Validators.required, ]   ,[],'blur',1,false);			 	   		 
      this.addFormControl('depositInterestPayFrequency', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('tenorInDays', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('tenorInMonths', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('tenorInYears', '',[ ]   ,[],'blur',1,false);	
      this.addFormControl('depositDate', '',[ ]   ,[],'blur',1,false);	
	this.setServiceCode("RETAILDEPOSITCALCULATOR");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
