import { Component, EventEmitter, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { cobAdditionalInformationHelper, cobAdditionalInformationState } from './cob-additional-information.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { AdditionalInformationService } from '../additionalInformation-service/additionalInformation.service';
import { AdditionalInformation } from '../additionalInformation-service/additionalInformation.model';
import { AppConfigService } from '@dep/services';



@Component({
  selector: 'app-cob-additional-information',
  templateUrl: './cob-additional-information.component.html',
  styleUrls: ['./cob-additional-information.component.scss'],
  providers: [cobAdditionalInformationHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => cobAdditionalInformationComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => cobAdditionalInformationComponent)
    }]
})

export class cobAdditionalInformationComponent extends BaseFpxFormComponent<cobAdditionalInformationHelper, cobAdditionalInformationState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public cobAdditionalInformationHelper: cobAdditionalInformationHelper,
    public additionalInformationService: AdditionalInformationService,
    private validatorService: ValidatorService,
    public appConfig: AppConfigService
  ) {
    super(formBuilder, router, controlContainer, cobAdditionalInformationHelper);
    this.setServiceCode("COBADDITIONALINFO");
  }
  protected override doPreInit(): void {
    this.setDataService(this.additionalInformationService);
    this.addFormControl('purposeOfAccount', '', [Validators.required], [], 'blur', 1, false);
    this.addFormControl('mainSourceOfIncome', '', [Validators.required], [], 'blur', 1, false);
    this.addFormControl('branch', '', [Validators.required], [], 'blur', 1, false);
    this.addFormControl('mailingAddress', '', [Validators.required], [], 'change', 1, false);
    this.addFormControl('dualNationalityHolderFlag', '', [Validators.required], [], 'change', 1, false);
    this.addFormControl('dualNationalityHolder', '', [], [], 'blur', 1, false);
    this.addFormControl('maritalStatus', '', [Validators.required], [], 'blur', 1, false);
    this.addFormControl('occupation', '', [Validators.required], [], 'blur', 1, false);
    this.addFormControl('address', '', [], [], 'blur', 1, false);
    this.addFormControl('otherIncome', '', [], [], 'blur', 1, false);
    this.addFormControl('cashDeposit', '', [], [], 'blur', 1, false);
    this.addFormControl('localForeignInward', '', [], [], 'blur', 1, false);
    this.addFormControl('outwardClearing', '', [], [], 'blur', 1, false);
    this.addFormControl('grossCreditTurnover', '', [], [], 'blur', 1, false);
    this.addFormControl('avgCashWithdraw', '', [], [], 'blur', 1, false);
    this.addFormControl('localForeignOutward', '', [], [], 'blur', 1, false);
    this.addFormControl('InwardClearing', '', [], [], 'blur', 1, false);
    this.addFormControl('grossDebitTurnover', '', [], [], 'blur', 1, false);
    // this.addFormControl('UDF1', '', [], [], 'blur', 1, false);
    // this.addFormControl('UDF2', '', [], [], 'blur', 1, false);
    // this.addFormControl('UDF3', '', [], [], 'blur', 1, false);
    // this.addFormControl('UDF4', '', [], [], 'blur', 1, false);
    // this.addFormControl('UDF5', '', [], [], 'blur', 1, false);
    this.setServiceCode("COBADDITIONALINFO");

  }


  protected override doPostInit(): void {

  }

}

