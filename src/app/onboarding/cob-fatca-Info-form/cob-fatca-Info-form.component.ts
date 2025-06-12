import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { COBFatcaInfoFormHelper,COBFatcaInfoFormState} from './cob-fatca-Info-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { FatcaInfoService } from '../fatcaInfo-service/fatcaInfo.service';
import { FatcaInfo } from '../fatcaInfo-service/fatcaInfo.model';
 
@Component({
 selector: 'app-cob-fatca-Info-form',
  templateUrl: './cob-fatca-Info-form.component.html',
  styleUrls: ['./cob-fatca-Info-form.component.scss'],
  providers : [ COBFatcaInfoFormHelper]
  })

export class COBFatcaInfoFormComponent extends BaseFpxFormComponent<COBFatcaInfoFormHelper, COBFatcaInfoFormState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public cOBFatcaInfoFormHelper: COBFatcaInfoFormHelper,
    public fatcaInfoService: FatcaInfoService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, cOBFatcaInfoFormHelper);
  }
   protected override doPreInit(): void {
    //  this.addFormControl('usResident', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('countryOfBirth', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('cityOfBirth', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('countryOfTax', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('taxPayerIdAvailable', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('taxPayerId', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
    this.addFormControl('othercountrytaxinfo', '',  []    ,[],'change',1,false,0);		
    this.addFormControl('reasonForNoTin', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('remarks', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('investmentSchemaFlag', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
    this.addFormControl('otherResidentJurisdictionsFlag', '',  [Validators.required ]    ,[],'change',1,false,0);		
    
	this.setDataService(this.fatcaInfoService);
	 this.setServiceCode("RETAILFATCAINFO");

  }
 

  protected override doPostInit(): void {
   
  }
  
}
