import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailAddTaskFromHelper,RetailAddTaskFromState} from './reatail-add-task-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { TasklogService } from '../tasklog-service/tasklog.service';
import { TasksService } from '../tasks-service/tasks.service';
  

 
 
@Component({
 selector: 'app-reatail-add-task-form',
  templateUrl: './reatail-add-task-form.component.html',
  styleUrls: ['./reatail-add-task-form.component.scss'],
  providers : [ RetailAddTaskFromHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailAddTaskFromComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailAddTaskFromComponent)
  }]
  })

export class RetailAddTaskFromComponent extends  BaseFpxFormComponent<RetailAddTaskFromHelper, RetailAddTaskFromState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailAddTaskFromHelper: RetailAddTaskFromHelper,
    public tasklogService: TasklogService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailAddTaskFromHelper);
    this.setServiceCode("RETAILTASKINFO");  
}
   protected override doPreInit(): void {
      this.setDataService(this.tasklogService);
      this.addFormControl('taskName', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('childAccNo', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('debitAccNo', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('dueDate', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('rewardAmount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('proofRequired', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('remarks', '',[]   ,[],'blur',1,false);			
      this.addFormControl('mappedGoal', '',[]   ,[],'blur',1,false);			   		    	
      this.addFormControl('supportingDocument', '',[]   ,[],'blur',1,false);				 
	this.setServiceCode("RETAILTASKINFO");
  
  }
  

  protected override doPostInit(): void {
   
  }
 
}

