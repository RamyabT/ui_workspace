import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { CobResumebackFormHelper,CobResumebackFormState} from './cob-resumeback-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { ResumebackService } from '../resumeback-service/resumeback.service';
import { Resumeback } from '../resumeback-service/resumeback.model';

 
 
@Component({
 selector: 'app-cob-resumeback-form',
  templateUrl: './cob-resumeback-form.component.html',
  styleUrls: ['./cob-resumeback-form.component.scss'],
  providers : [ CobResumebackFormHelper, ResumebackService]
  })

export class CobResumebackFormComponent extends  BaseFpxFormComponent<CobResumebackFormHelper, CobResumebackFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public cobResumebackFormHelper: CobResumebackFormHelper,
    public resumebackService: ResumebackService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, cobResumebackFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('resumeOption', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('onboardingRef', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('mobileNumber', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('emailAddress', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
	this.setDataService(this.resumebackService);
	 this.setServiceCode("OBRESUMEAPP");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
