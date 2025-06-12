import { Component, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { COBEmploymentInfoFormHelper, COBEmploymentInfoFormState } from './cob-employment-info-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { EmploymentInfoService } from '../employmentInfo-service/employmentInfo.service';
import { EmploymentInfo } from '../employmentInfo-service/employmentInfo.model';

@Component({
  selector: 'app-cob-employment-info-form',
  templateUrl: './cob-employment-info-form.component.html',
  styleUrls: ['./cob-employment-info-form.component.scss'],
  providers: [COBEmploymentInfoFormHelper]
})

export class COBEmploymentInfoFormComponent extends BaseFpxFormComponent<COBEmploymentInfoFormHelper, COBEmploymentInfoFormState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public cOBEmploymentInfoFormHelper: COBEmploymentInfoFormHelper,
    public employmentInfoService: EmploymentInfoService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, cOBEmploymentInfoFormHelper);
  }
  protected override doPreInit(): void {
    // this.addFormControl('applicantId', '', [],
    //   [
    //     this.validatorService.dataAvailabilityCheck(
    //       this.embadedFormMode,
    //       'applicantId',
    //       this.employmentInfoService,
    //       this.dataAvailable$
    //     ),
    //   ], 'blur', 0, true, 0);
    // this.addFormControl('empstatus', '', [Validators.required], [], 'blur', 1, false, 0);
    // this.addFormControl('empsoi', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('employmentType', 'E', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('occupationType', '', [Validators.required], [], 'blur', 1, false, 0);
    // this.addFormControl('monthlyIncome', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('companyName', '', [Validators.required , Validators.minLength(1), Validators.maxLength(50)], [], 'blur', 1, false, 0);
    this.addFormControl('addressdetail', '', [Validators.required], [], 'blur', 1, false, 0);

    // this.addFormControl('areaName', '', [Validators.required], [], 'blur', 1, false, 0);
    // this.addFormControl('locationName', '', [Validators.required], [], 'blur', 1, false, 0);
    // this.addFormControl('buildingName', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('designation', '', [Validators.required , Validators.minLength(1), Validators.maxLength(50)], [], 'blur', 1, false, 0);
    this.addFormControl('workingSince', '', [Validators.required , Validators.minLength(1), Validators.maxLength(2)], [], 'blur', 1, false, 0);
    this.addFormControl('lastEmployersName', '', [Validators.required], [], 'blur', 1, false, 0);
    // this.addFormControl('nearestLandmark', '', [Validators.required], [], 'blur', 1, false, 0);
    // this.addFormControl('empbusinesstypes', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('emptypesofentity', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('empNameOwnCompany', '', [Validators.required], [], 'blur', 1, false, 0);
    // this.addFormControl('empAddressOfLastYear', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('empWorkExpDetails', '', [Validators.required , Validators.minLength(1), Validators.maxLength(50)], [], 'blur', 1, false, 0);
    this.addFormControl('empAddressOwnCompany', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('ownershipPercent', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('empPositionAndTitle', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('empyearofbusiness', '', [Validators.required , Validators.minLength(1), Validators.maxLength(3)], [], 'blur', 1, false, 0);
  // this.addFormControl('country', '', [Validators.required], [], 'blur', 1, false, 0);
    // this.addFormControl('states', '', [Validators.required], [], 'blur', 1, false, 0);
    // this.addFormControl('city', '', [Validators.required], [], 'blur', 1, false, 0);
    // this.addFormControl('zipCode', '', [Validators.required, Validators.minLength(6), Validators.maxLength(6)], [], 'change', 1, false, 0);
    // this.addFormControl('street', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('dependentIdNumber', '', [Validators.required , Validators.minLength(8), Validators.maxLength(20) ], [], 'blur', 1, false, 0);
    this.addFormControl('dependentName', '', [Validators.required , Validators.minLength(1), Validators.maxLength(50)], [], 'blur', 1, false, 0);
    this.addFormControl('previouslyemployed', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('emprelationship', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('monthlyIncome', '',  [Validators.required , Validators.minLength(1), Validators.maxLength(16)]    ,[],'blur',1,false,0);
    this.addFormControl('annualIncome', '',  [Validators.required , Validators.minLength(1), Validators.maxLength(16)]    ,[],'change',1,false,0);	
    this.addFormControl('universityName', '',  [Validators.required , Validators.minLength(1), Validators.maxLength(50)]    ,[],'blur',1,false,0);	
    this.addFormControl('courseName', '',  [Validators.required , Validators.minLength(1), Validators.maxLength(50)]    ,[],'blur',1,false,0);	
    this.addFormControl('courseDuration', '',  [Validators.required, Validators.minLength(1), Validators.maxLength(2)]    ,[],'blur',1,false,0);	
    this.setDataService(this.employmentInfoService);
    this.setServiceCode("RETAILEMPLOYMENTINFO");
  }


  protected override doPostInit(): void {

  }

}
