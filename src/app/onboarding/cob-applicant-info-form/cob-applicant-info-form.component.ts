import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { CobApplicantInfoFormHelper,CobApplicantInfoFormState} from './cob-applicant-info-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { ApplicantsService } from '../applicants-service/applicants.service';
import { Applicants } from '../applicants-service/applicants.model';

 
 
@Component({
 selector: 'app-cob-applicant-info-form',
  templateUrl: './cob-applicant-info-form.component.html',
  styleUrls: ['./cob-applicant-info-form.component.scss'],
  providers : [ CobApplicantInfoFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => CobApplicantInfoFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => CobApplicantInfoFormComponent)
  }]
  })

export class CobApplicantInfoFormComponent extends  BaseFpxFormComponent<CobApplicantInfoFormHelper, CobApplicantInfoFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public cobApplicantInfoFormHelper: CobApplicantInfoFormHelper,
    public applicantsService: ApplicantsService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, cobApplicantInfoFormHelper);
    this.setServiceCode("CASAONBOARDING");  
}
   protected override doPreInit(): void {
  this.setDataService(this.applicantsService);
      this.addFormControl('title', '',[Validators.required, ]   ,[],'change',1,false);			   		 
      this.addFormControl('firstName', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('middleName', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('lastName', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('fullName', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('suffix', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('dob', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('gender', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('maritalStatus', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('iSOCodeList', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('mobileNumber', '', [Validators.required,], [], 'blur', 1, false);			   		 
      this.addFormControl('emailAddress', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('residentstatus', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('nationality', '',[ ]   ,[],'blur',1,false);			   		 
      // this.addFormControl('channel', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('udf1', '',[Validators.minLength(3), Validators.maxLength(100)]   ,[],'blur',1,false);			   		 
      this.addFormControl('udf2', '',[Validators.minLength(3), Validators.maxLength(100)]   ,[],'blur',1,false);			   		 
      this.addFormControl('udf3', '',[Validators.minLength(3), Validators.maxLength(100)]   ,[],'blur',1,false);			   		 
      this.addFormControl('udf4', '',[Validators.minLength(3), Validators.maxLength(100)]   ,[],'blur',1,false);			   		 
      this.addFormControl('udf5', '',[Validators.minLength(3), Validators.maxLength(100)]   ,[],'blur',1,false);			   		 
      this.addFormControl('captcha', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('terms', '',[Validators.required] ,[],'change',1,false);			   		 
      this.addFormControl('terms2', '',[Validators.required] ,[],'change',1,false);			   		 
      this.addFormControl('terms3', '',[Validators.required] ,[],'change',1,false);			   		 
      this.addFormControl('productselection', '',[ ]   ,[],'blur',1,false);			   		 
	this.setServiceCode("CASAONBOARDING");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

