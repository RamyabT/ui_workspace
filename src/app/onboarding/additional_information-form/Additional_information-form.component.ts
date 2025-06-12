import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { AdditionalInformationHelper,AdditionalInformationState} from './Additional_information-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { AdditionalInformationService } from '../additionalInformation-service/additionalInformation.service';
import { AdditionalInformation } from '../additionalInformation-service/additionalInformation.model';

 
 
@Component({
 selector: 'app-Additional_information-form',
  templateUrl: './Additional_information-form.component.html',
  styleUrls: ['./Additional_information-form.component.scss'],
  providers : [ AdditionalInformationHelper]
  })

export class AdditionalInformationComponent extends  BaseFpxFormComponent<AdditionalInformationHelper, AdditionalInformationState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public additionalInformationHelper: AdditionalInformationHelper,
    public additionalInformationService: AdditionalInformationService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, additionalInformationHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('accountNumber', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('bankName', '',  []    ,[],'blur',1,false,0);			   
     this.addFormControl('country', '',  []    ,[],'change',1,false,0);			   		 		 
     this.addFormControl('countryinfo', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 		 
     this.addFormControl('otherIncome', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('cashDeposit', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('localForeignInward', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('outwardClearing', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('avgCashWithdraw', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('localForeignOutward', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('InwardClearing', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
    //  this.addFormControl('applicantId', '',  [Validators.required ]   ,
		//       [
		//         this.validatorService.dataAvailabilityCheck(
		//           this.embadedFormMode,
		//           'applicantId',
		//           this.additionalInformationService,
		//           this.dataAvailable$
		//         ),
		//       ],'blur',0,true,0);			   		 
     this.addFormControl('yearResidence', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('monthResidence', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
	this.setDataService(this.additionalInformationService);
	this.setServiceCode("ADDITIONALINFORMATION");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
