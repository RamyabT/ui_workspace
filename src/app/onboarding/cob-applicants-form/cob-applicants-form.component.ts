import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicantsFormHelper,ApplicantsFormState} from './cob-applicants-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { ApplicantsService } from '../applicants-service/applicants.service';
import { Applicants } from '../applicants-service/applicants.model';
 
@Component({
 selector: 'app-cob-applicants-form',
  templateUrl: './cob-applicants-form.component.html',
  styleUrls: ['./cob-applicants-form.component.scss'],
  providers : [ ApplicantsFormHelper]
  })

export class ApplicantsFormComponent extends BaseFpxFormComponent<ApplicantsFormHelper, ApplicantsFormState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public applicantsFormHelper: ApplicantsFormHelper,
    public applicantsService: ApplicantsService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, applicantsFormHelper);

  }

   protected override doPreInit(): void {
     this.addFormControl('applicantId', '',  []   ,
		      [
		        this.validatorService.dataAvailabilityCheck(
		          this.embadedFormMode,
		          'applicantId',
		          this.applicantsService,
		          this.dataAvailable$
		        ),
		      ],'blur',0,true,0);			   		 
  this.addFormControl('firstName', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
    this.addFormControl('middleName', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
    this.addFormControl('lastName', '',  [Validators.required]    ,[],'blur',1,false,0);			 
    this.addFormControl('fullName', '',  []    ,[],'blur',1,false,0);			   		 
    this.addFormControl('mobileNum', '',  [Validators.required ]    ,[],'blur',1,false,0);   		 
     this.addFormControl('emailAddress', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
    //  this.addFormControl('otpVerificationMode', '',  [Validators.required ]    ,[],'change',1,false,0);	
     this.addFormControl('terms', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('captcha', '',  [Validators.required ]    ,[],'blur',1,false,0);	
    //  this.addFormControl('productSegment', '',  [Validators.required ]    ,[],'blur',1,false,0);	
     this.addFormControl('dob', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
     this.addFormControl('isoCode', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
     this.addFormControl('maritalStatus', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
     this.addFormControl('nationality', '',[ ]   ,[],'blur',1,false);			   		 
     this.addFormControl('suffix', '',[ ]   ,[],'blur',1,false);			   		 
     this.addFormControl('channel', '',[ ]   ,[],'blur',1,false);			   		 
     this.addFormControl('title', '',[ ]   ,[],'blur',1,false);			   		 
     this.addFormControl('residentstatus', '',[ ]   ,[],'blur',1,false);			   		 
     this.addFormControl('gender', '',[Validators.required, ]   ,[],'blur',1,false);	
     this.addFormControl('udf1', '', [], [], 'blur', 1, false);
    this.addFormControl('udf2', '', [], [], 'blur', 1, false);
    this.addFormControl('udf3', '', [], [], 'blur', 1, false);
    this.addFormControl('udf4', '', [], [], 'blur', 1, false);
    this.addFormControl('udf5', '', [], [], 'blur', 1, false);
    this.addFormControl('terms1', '',  [Validators.required ]    ,[],'change',1,false,0);	
    this.addFormControl('terms2', '',  [Validators.required ]    ,[],'change',1,false,0);	
    //  this.addFormControl('productId', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
    //  this.addFormControl('kfsFlag', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
	  this.setDataService(this.applicantsService);

  }
 

  protected override doPostInit(): void {
   
  }
  
}
