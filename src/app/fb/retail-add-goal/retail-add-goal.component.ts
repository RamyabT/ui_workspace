import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailAddGoalHelper,RetailAddGoalState} from './retail-add-goal.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { GoallogService } from '../goallog-service/goallog.service';
import { Goallog } from '../goallog-service/goallog.model';

 
 
@Component({
 selector: 'app-retail-add-goal',
  templateUrl: './retail-add-goal.component.html',
  styleUrls: ['./retail-add-goal.component.scss'],
  providers : [ RetailAddGoalHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailAddGoalComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailAddGoalComponent)
  }]
  })

export class RetailAddGoalComponent extends  BaseFpxFormComponent<RetailAddGoalHelper, RetailAddGoalState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailAddGoalHelper: RetailAddGoalHelper,
    public goallogService: GoallogService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailAddGoalHelper);
    this.setServiceCode("RETAILGOALINFO");  
}
   protected override doPreInit(): void {
  this.setDataService(this.goallogService);
      this.addFormControl('goalname', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('childAcc', '',[Validators.required,]   ,[],'blur',1,false);			   		 
      this.addFormControl('targetAmt', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('dueDt', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('initialContribution', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('debitAcc', '',[Validators.required,]   ,[],'blur',1,false);			   		 
	this.setServiceCode("RETAILGOALINFO");
  this.setDataService(this.goallogService);


  }
  

  protected override doPostInit(): void {
   
  }
 

//nidhi 



//nidhi

}

