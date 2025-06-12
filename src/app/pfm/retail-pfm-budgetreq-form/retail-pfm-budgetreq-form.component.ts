import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailPfmBudgetReqFormHelper,RetailPfmBudgetReqFormState} from './retail-pfm-budgetreq-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { PfmbudgetreqService } from '../pfmbudgetreq-service/pfmbudgetreq.service';
import { Pfmbudgetreq } from '../pfmbudgetreq-service/pfmbudgetreq.model';

 
 
@Component({
 selector: 'app-retail-pfm-budgetreq-form',
  templateUrl: './retail-pfm-budgetreq-form.component.html',
  styleUrls: ['./retail-pfm-budgetreq-form.component.scss'],
  providers : [ RetailPfmBudgetReqFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailPfmBudgetReqFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailPfmBudgetReqFormComponent)
  }]
  })

export class RetailPfmBudgetReqFormComponent extends  BaseFpxFormComponent<RetailPfmBudgetReqFormHelper, RetailPfmBudgetReqFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailPfmBudgetReqFormHelper: RetailPfmBudgetReqFormHelper,
    public pfmbudgetreqService: PfmbudgetreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailPfmBudgetReqFormHelper);
    this.setServiceCode("RETAILPFMBUDGETREQ");  
}
   protected override doPreInit(): void {
  this.setDataService(this.pfmbudgetreqService);
      this.addFormControl('categoryCode', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('subCategoryCode', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('currencyCode', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('budgetAmount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('startDate', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('endDate', '',[Validators.required]   ,[],'blur',1,false);			   		 
      this.addFormControl('budgetFrequency', '',[ Validators.required,]   ,[],'blur',1,false);			   		 
	this.setServiceCode("RETAILPFMBUDGETREQ");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

