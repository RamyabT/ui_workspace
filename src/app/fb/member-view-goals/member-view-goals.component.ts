import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
 import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { MemberViewGoalsFormHelper, MemberViewGoalsFormState } from './member-view-goals.helper';
import { PfmgoalsService } from 'src/app/pfm/pfmgoals-service/pfmgoals.service';
import { Goallog } from '../goallog-service/goallog.model';
import { GoallogService } from '../goallog-service/goallog.service';
import { FbgoalserviceService } from '../fb-goal-service/fbgoalservice.service';
import { GoalsService } from '../goals-service/goals.service';

 
 
@Component({
  selector: 'app-member-view-goals',
  templateUrl: './member-view-goals.component.html',
  styleUrls: ['./member-view-goals.component.scss'],
  providers : [ MemberViewGoalsFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => MemberViewGoalsComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => MemberViewGoalsComponent)
  }]
  })

export class MemberViewGoalsComponent extends  BaseFpxFormComponent<MemberViewGoalsFormHelper, MemberViewGoalsFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public memberTrackGoalsFormHelper: MemberViewGoalsFormHelper,
    public fbgoalsService: GoallogService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, memberTrackGoalsFormHelper);
    this.setServiceCode("RETAILGOALINFO");  
}
   protected override doPreInit(): void {
      this.setDataService(this.fbgoalsService);
      this.addFormControl('goalname', '',[Validators.required, ]   ,[],'blur',1,false);		
      this.addFormControl('goalSegments', '',[ ]   ,[],'change',1,false);		 		 
      this.addElement('goalsGrid', '');	
      this.addFormControl('childAcc', '',[Validators.required,]   ,[],'blur',1,false);			   		 
      this.addFormControl('targetAmt', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('dueDt', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('initialContribution', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('debitAcc', '',[Validators.required,]   ,[],'blur',1,false);	 	
       this.addFormControl('status', '',[Validators.required, ]   ,[],'blur',1,false);		   		 
	 		 this.addFormControl('goalInventoryNumber', '',[Validators.required, ]   ,[],'blur',1,false);		   		 
      this.addFormControl('operationMode', '',[ ]   ,[],'blur',1,false);			   		 	   		
      this.setServiceCode("RETAILGOALINFO");
  }
  

  protected override doPostInit(): void {
   
  }

}
 