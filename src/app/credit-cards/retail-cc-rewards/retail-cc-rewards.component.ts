import { Component, EventEmitter, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { ccrewardsHelper, ccrewardsState } from './retail-cc-rewards.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { CcrewardsService } from '../ccrewards-service/ccrewards.service';
import { Ccrewards } from '../ccrewards-service/ccrewards.model';



@Component({
  selector: 'app-retail-cc-rewards',
  templateUrl: './retail-cc-rewards.component.html',
  styleUrls: ['./retail-cc-rewards.component.scss'],
  providers: [ccrewardsHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ccrewardsComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => ccrewardsComponent)
    }]
})

export class ccrewardsComponent extends BaseFpxFormComponent<ccrewardsHelper, ccrewardsState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public ccrewardsHelper: ccrewardsHelper,
    public ccrewardsService: CcrewardsService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, ccrewardsHelper);
    this.setServiceCode("RETAILCCREWARDS");
  }
  protected override doPreInit(): void {
    this.setDataService(this.ccrewardsService);
    this.addFormControl('ccRewardBenefits', '', [], [], 'blur', 1, false);
    this.setServiceCode("RETAILCCREWARDS");

  }


  protected override doPostInit(): void {

  }

}

