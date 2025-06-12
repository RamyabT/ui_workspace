import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailTrackBudgetFormHelper,RetailTrackBudgetFormState} from './retail-track-budget-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { PfmbudgetService } from '../pfmbudget-service/pfmbudget.service';
import { Pfmbudget } from '../pfmbudget-service/pfmbudget.model';

 
 
@Component({
 selector: 'app-retail-track-budget-form',
  templateUrl: './retail-track-budget-form.component.html',
  styleUrls: ['./retail-track-budget-form.component.scss'],
  providers : [ RetailTrackBudgetFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailTrackBudgetFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailTrackBudgetFormComponent)
  }]
  })

export class RetailTrackBudgetFormComponent extends  BaseFpxFormComponent<RetailTrackBudgetFormHelper, RetailTrackBudgetFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailTrackBudgetFormHelper: RetailTrackBudgetFormHelper,
    public pfmbudgetService: PfmbudgetService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailTrackBudgetFormHelper);
    this.setServiceCode("RETAILPFMBUDGETREQ");  
}
   protected override doPreInit(): void {
    this.addFormControl('budgetSegments', '',[ ]   ,[],'change',1,false);
    this.addFormControl('budgetGrid', '',[ ]   ,[],'blur',1,false);
  this.setDataService(this.pfmbudgetService);
	
  this.addFormControl('categoryCode', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
  this.addFormControl('pfmSubCategory', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
  this.addFormControl('currencyCode', '',[ ]   ,[],'blur',1,false);			   		 
  this.addFormControl('budgetAmount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
  this.addFormControl('startDate', '1',[ ]   ,[],'blur',1,false);			   		 
  this.addFormControl('endDate', '',[ ]   ,[],'blur',1,false);			   		 
  this.addFormControl('frequency', '',[Validators.required, ]   ,[],'blur',1,false); 

  }
  

  protected override doPostInit(): void {
   
  }
 
}

