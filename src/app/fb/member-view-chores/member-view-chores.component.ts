import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
 import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
 import { MemberViewChoresHelper, MemberViewChoresState } from './member-view-chores.helper';
 import { TasksService } from '../tasks-service/tasks.service';
import { TasklogService } from '../tasklog-service/tasklog.service';

 
 
@Component({
  selector: 'app-member-view-chores',
  templateUrl: './member-view-chores.component.html',
  styleUrls: ['./member-view-chores.component.scss'],
  providers : [ MemberViewChoresHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => MemberViewChoresComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => MemberViewChoresComponent)
  }]
  })

export class MemberViewChoresComponent extends  BaseFpxFormComponent<MemberViewChoresHelper, MemberViewChoresState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public memberTrackGoalsFormHelper: MemberViewChoresHelper,
    public fbchoreService: TasklogService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, memberTrackGoalsFormHelper);
    this.setServiceCode("RETAILTASKINFO");  
}
   protected override doPreInit(): void {
     this.setDataService(this.fbchoreService);
 

     this.addFormControl('taskName', '',[Validators.required, ]   ,[],'blur',1,false);
     this.addFormControl('goalSegments', '', [], [], 'change', 1, false);			
     this.addElement('choresGrid', '');   		 
      this.addFormControl('childAccNo', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('debitAccNo', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('dueDate', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('rewardAmount', '',[Validators.required, ]   ,[],'blur',1,false);	
      this.addFormControl('rewardCurrency', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('proofRequired', '',[Validators.required, ]   ,[],'blur',1,false);	
      this.addFormControl('remarks', '',[]   ,[],'blur',1,false);			
      this.addFormControl('mappedGoal', '',[]   ,[],'blur',1,false);			 
      this.addFormControl('taskInventoryNumber', '',[Validators.required,]   ,[],'blur',1,false);
      this.addFormControl('status', '',[Validators.required,]   ,[],'blur',1,false);
      this.addFormControl('supportingDocument', '',[]   ,[],'blur',1,false);	
     this.addFormControl('operationMode', '', [], [], 'blur', 1, false);
     this.setServiceCode("RETAILTASKINFO");
  }
  

  protected override doPostInit(): void {
   
  }

}
 