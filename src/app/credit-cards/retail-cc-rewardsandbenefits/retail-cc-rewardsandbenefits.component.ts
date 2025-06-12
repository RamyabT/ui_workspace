import { Component, EventEmitter, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { ccRewardBenefitsHelper, ccRewardBenefitsState } from './retail-cc-rewardsandbenefits.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { CcRewardBenefitsService } from '../ccRewardBenefits-service/ccRewardBenefits.service';
import { CcRewardBenefits } from '../ccRewardBenefits-service/ccRewardBenefits.model';



@Component({
  selector: 'app-retail-cc-rewardsandbenefits',
  templateUrl: './retail-cc-rewardsandbenefits.component.html',
  styleUrls: ['./retail-cc-rewardsandbenefits.component.scss'],
  providers: [ccRewardBenefitsHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ccRewardBenefitsComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => ccRewardBenefitsComponent)
    }]
})

export class ccRewardBenefitsComponent extends BaseFpxFormComponent<ccRewardBenefitsHelper, ccRewardBenefitsState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public ccRewardBenefitsHelper: ccRewardBenefitsHelper,
    public ccRewardBenefitsService: CcRewardBenefitsService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, ccRewardBenefitsHelper);
    this.setServiceCode("RETAILCCREWARDSBENEFITS");
  }
  protected override doPreInit(): void {
    this.setDataService(this.ccRewardBenefitsService);
    this.addFormControl('description', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('prodCode', '', [Validators.required,],
      [
        this.validatorService.dataAvailabilityCheck(
          this.embadedFormMode,
          'prodCode',
          this.ccRewardBenefitsService,
          this.dataAvailable$
        ),
      ], 'blur', 0, true);
    this.addFormControl('prodctLink', '', [Validators.required,], [], 'blur', 1, false);
    this.addElement('ccRewardsInfo');
    this.addElement('ccBenefitsInfo');
    this.setServiceCode("RETAILCCREWARDSBENEFITS");

  }


  protected override doPostInit(): void {

  }

}

