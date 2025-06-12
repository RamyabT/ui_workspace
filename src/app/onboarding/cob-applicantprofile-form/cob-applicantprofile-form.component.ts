import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { CobApplicantProfileFormHelper,CobApplicantProfileFormState} from './cob-applicantprofile-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { ObapplicantprofileService } from '../obapplicantprofile-service/obapplicantprofile.service';
import { Obapplicantprofile } from '../obapplicantprofile-service/obapplicantprofile.model';

 
 
@Component({
 selector: 'app-cob-applicantprofile-form',
  templateUrl: './cob-applicantprofile-form.component.html',
  styleUrls: ['./cob-applicantprofile-form.component.scss'],
  providers : [ CobApplicantProfileFormHelper]
  })

export class CobApplicantProfileFormComponent extends  BaseFpxFormComponent<CobApplicantProfileFormHelper, CobApplicantProfileFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public cobApplicantProfileFormHelper: CobApplicantProfileFormHelper,
    public obapplicantprofileService: ObapplicantprofileService,
    private validatorService: ValidatorService,
  ) {
    super(formBuilder, router,controlContainer, cobApplicantProfileFormHelper);
  }
   protected override doPreInit(): void {
    this.addFormControl('applicantId', '',  []   ,[],'blur',0,false,0);	
     this.addFormControl('userName', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('password', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('confirmPassword', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
	this.setDataService(this.obapplicantprofileService);
	 this.setServiceCode("RETAILAPPLICANTPROFILE");

  }


  protected override doPostInit(): void {
   
  }
  

  
}
