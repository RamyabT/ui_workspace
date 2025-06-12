import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailLoanCalcFormHelper,RetailLoanCalcFormState} from './retail-loancalc-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { LoancalcService } from '../loancalc-service/loancalc.service';
import { Loancalc } from '../loancalc-service/loancalc.model';

 
 
@Component({
 selector: 'app-retail-loancalc-form',
  templateUrl: './retail-loancalc-form.component.html',
  styleUrls: ['./retail-loancalc-form.component.scss'],
  providers : [ RetailLoanCalcFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailLoanCalcFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailLoanCalcFormComponent)
  }]
  })

export class RetailLoanCalcFormComponent extends  BaseFpxFormComponent<RetailLoanCalcFormHelper, RetailLoanCalcFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailLoanCalcFormHelper: RetailLoanCalcFormHelper,
    public loancalcService: LoancalcService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailLoanCalcFormHelper);
  }
   protected override doPreInit(): void {
  this.setDataService(this.loancalcService);
      this.addFormControl('loanType', '',[Validators.required, ]  ,
		      [
		        this.validatorService.dataAvailabilityCheck(
		          this.embadedFormMode,
		          'loanType',
		          this.loancalcService,
		          this.dataAvailable$
		        ),
		      ],'blur',0,true);			   		 
      this.addFormControl('tenure', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('requestDate', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('loanAmount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('downPaymentAmount', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('vehicleCost', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('propertyValue', '',[ ]   ,[],'blur',1,false);			   		 
	this.setServiceCode("loancalc");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
