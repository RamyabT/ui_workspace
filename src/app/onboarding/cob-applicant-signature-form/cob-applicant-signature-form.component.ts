import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { CobApplicantSignatureFormHelper,CobApplicantSignatureFormState} from './cob-applicant-signature-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { ObapplicantsignatureService } from '../obapplicantsignature-service/obapplicantsignature.service';
import { Obapplicantsignature } from '../obapplicantsignature-service/obapplicantsignature.model';
 
@Component({
 selector: 'app-cob-applicant-signature-form',
  templateUrl: './cob-applicant-signature-form.component.html',
  styleUrls: ['./cob-applicant-signature-form.component.scss'],
  providers : [ CobApplicantSignatureFormHelper]
  })

export class CobApplicantSignatureFormComponent extends BaseFpxFormComponent<CobApplicantSignatureFormHelper, CobApplicantSignatureFormState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public cobApplicantSignatureFormHelper: CobApplicantSignatureFormHelper,
    public obapplicantsignatureService: ObapplicantsignatureService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, cobApplicantSignatureFormHelper);
  }
   protected override doPreInit(): void {

  //  this.addFormControl('applicantId', '',  []   ,
	// 	      [
	// 	        this.validatorService.dataAvailabilityCheck(
	// 	          this.embadedFormMode,
	// 	          'applicantId',
	// 	          this.obapplicantsignatureService,
	// 	          this.dataAvailable$
	// 	        ),
	// 	      ],'blur',0,true,0);			   		 

  this.addFormControl('signatureImage', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
	this.setDataService(this.obapplicantsignatureService);
	 this.setServiceCode("RETAILUPLOADSIGNATURE");
  }
 

  protected override doPostInit(): void {
   
  }
  
}
