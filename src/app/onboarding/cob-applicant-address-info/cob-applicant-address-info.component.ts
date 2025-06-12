import { Component,ComponentRef,EventEmitter,Optional, ViewChild} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { COBApplicantAddressInfoHelper,COBApplicantAddressInfoState} from './cob-applicant-address-info.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { ApplicantaddressinfoService } from '../applicantaddressinfo-service/applicantaddressinfo.service';
import { Applicantaddressinfo } from '../applicantaddressinfo-service/applicantaddressinfo.model';
import { AddressDetailFormComponent } from '../address-detail-form/address-detail-form.component';

 
 
@Component({
 selector: 'app-cob-applicant-address-info',
  templateUrl: './cob-applicant-address-info.component.html',
  styleUrls: ['./cob-applicant-address-info.component.scss'],
  providers : [ COBApplicantAddressInfoHelper]
  })

export class COBApplicantAddressInfoComponent extends  BaseFpxFormComponent<COBApplicantAddressInfoHelper, COBApplicantAddressInfoState>  {
  @ViewChild("addressForm")
  addressForm!: ComponentRef<AddressDetailFormComponent>;

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public cOBApplicantAddressInfoHelper: COBApplicantAddressInfoHelper,
    public applicantaddressinfoService: ApplicantaddressinfoService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, cOBApplicantAddressInfoHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('applicantId', '',  [ ]   ,
		      [
		        this.validatorService.dataAvailabilityCheck(
		          this.embadedFormMode,
		          'applicantId',
		          this.applicantaddressinfoService,
		          this.dataAvailable$
		        ),
		      ],'blur',0,true,0);			   		 
     this.addFormControl('communicationAddressInv', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('permenantAddressFlag', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('permenantAddressInv', '',  [Validators.required]    ,[],'blur',1,false,0);	
    //  this.addFormControl('workAddressInv', '',  []    ,[],'blur',1,false,0);			
		
     this.addElement('headerbox')   		 
	this.setDataService(this.applicantaddressinfoService);
	 this.setServiceCode("RETAILADDRESSINFO");

  }
  

  protected override doPostInit(): void {
    // this.addFormGroup('address', this.addressForm['formGroup']);		
  }
  
}
