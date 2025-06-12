import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { LogoutFeedBackFormHelper,LogoutFeedBackFormState} from './logout-feedback-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { UserfeedbacklogService } from '../userfeedbacklog-service/userfeedbacklog.service';
import { Userfeedbacklog } from '../userfeedbacklog-service/userfeedbacklog.model';

 
 
@Component({
 selector: 'app-logout-feedback-form',
  templateUrl: './logout-feedback-form.component.html',
  styleUrls: ['./logout-feedback-form.component.scss'],
  providers : [ LogoutFeedBackFormHelper]
  })

export class LogoutFeedBackFormComponent extends  BaseFpxFormComponent<LogoutFeedBackFormHelper, LogoutFeedBackFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public logoutFeedBackFormHelper: LogoutFeedBackFormHelper,
    public userfeedbacklogService: UserfeedbacklogService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, logoutFeedBackFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('appVersion', '',  []   ,[],'change',1,false,0);			   		 
     this.addFormControl('feedBackComments', '',  []   ,[],'change',1,false,0);			   		 
     this.addFormControl('rating', '',  [Validators.required]   ,[],'change',1,false,0);			   		 
	   this.setDataService(this.userfeedbacklogService);
	  this.setServiceCode("RETAILUSERFEEDBACK");
  }
  

  protected override doPostInit(): void {
   
  }
  
}
