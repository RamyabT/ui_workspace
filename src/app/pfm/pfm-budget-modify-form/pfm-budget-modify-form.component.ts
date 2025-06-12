import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { PfmBudgetModifyFormHelper,PfmBudgetModifyFormState} from './pfm-budget-modify-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { PfmbudgetService } from '../pfmbudget-service/pfmbudget.service';
import { Pfmbudget } from '../pfmbudget-service/pfmbudget.model';
import { PfmbudgetreqService } from '../pfmbudgetreq-service/pfmbudgetreq.service';

 
 
@Component({
 selector: 'app-pfm-budget-modify-form',
  templateUrl: './pfm-budget-modify-form.component.html',
  styleUrls: ['./pfm-budget-modify-form.component.scss'],
  providers : [ PfmBudgetModifyFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => PfmBudgetModifyFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => PfmBudgetModifyFormComponent)
  }]
  })

export class PfmBudgetModifyFormComponent extends  BaseFpxFormComponent<PfmBudgetModifyFormHelper, PfmBudgetModifyFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public pfmBudgetModifyFormHelper: PfmBudgetModifyFormHelper,
    public pfmBudgetReqService: PfmbudgetreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, pfmBudgetModifyFormHelper);
    this.setServiceCode("RETAILMODIFYPFMBUDGET");  
}
   protected override doPreInit(): void { 
      this.setDataService(this.pfmBudgetReqService);
      this.addFormControl('categoryCode', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('pfmSubCategory', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('currencyCode', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('budgetAmount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('startDate', '1',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('endDate', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('frequency', '',[Validators.required, ]   ,[],'blur',1,false);    			   		 
	   //this.setServiceCode("RETAILMODIFYPFMBUDGET");
  }
  

  protected override doPostInit(): void {
   
  }
 
}

