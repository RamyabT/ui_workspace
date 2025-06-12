import { Component, EventEmitter, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
// import { applyHomeLoanHelper, applyHomeLoanState } from './apply-home-loan.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { ApplyloanService } from '../applyloan-service/applyloan.service';
import { Applyloan } from '../applyloan-service/applyloan.model';
import { applyVehicleLoanHelper, applyVehicleLoanState } from './apply-vehicle-loan.helper';



@Component({
  selector: 'app-apply-vehicle-loan',
  templateUrl: './apply-vehicle-loan.component.html',
  styleUrls: ['./apply-vehicle-loan.component.scss'],
  providers: [applyVehicleLoanHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => applyVehicleLoanComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => applyVehicleLoanComponent)
    }]
})

export class applyVehicleLoanComponent extends BaseFpxFormComponent<applyVehicleLoanHelper, applyVehicleLoanState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public applyVehicleLoanHelper: applyVehicleLoanHelper,
    public applyloanService: ApplyloanService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, applyVehicleLoanHelper);
    this.setServiceCode("RETAILAPPLYHOMELOAN"); 
  }
  protected override doPreInit(): void {
    this.setDataService(this.applyloanService);
    this.setTabConfiguration("transparent", true, true, false, false, 'tabGroup', '');

    this.addTab('Basic Info', '', false, false, false, 'basicInfoTab', 'tabGroup');
    this.addTab('Loan Details', '', false, false, false, 'loandetailsTab', 'tabGroup');
    this.addTab('Co-Applicants Details', '', false, false, false, 'coApplicantsDetailsTab', 'tabGroup');
    this.addTab('Document Upload', '', false, false, false, 'documentUploadTab', 'tabGroup');

    this.addFormControl('basicDetails', '', [Validators.required], [], 'blur', 1, false);
    this.addFormControl('loanDetails', '', [Validators.required], [], 'blur', 1, false);
    this.addFormControl('existingloanDetails', '', [], [], 'blur', 1, false);
    this.addFormControl('coApplicantDetails', '', [], [], 'blur', 1, false);
    this.addFormControl('documentUpload', '', [Validators.required], [], 'blur', 1, false);
    this.addFormControl('coApplicant', '', [Validators.required], [], 'change', 1, false);

    this.setServiceCode("RETAILAPPLYHOMELOAN");

  }


  protected override doPostInit(): void {

  }

}

