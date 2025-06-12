import { Component, EventEmitter, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { applyVirtualCardHelper, applyVirtualCardState } from './cob-applyvirtualcard-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { ApplyvirtualcardService } from '../applyvirtualcard-service/applyvirtualcard.service';
import { Applyvirtualcard } from '../applyvirtualcard-service/applyvirtualcard.model';



@Component({
  selector: 'app-cob-applyvirtualcard-form',
  templateUrl: './cob-applyvirtualcard-form.component.html',
  styleUrls: ['./cob-applyvirtualcard-form.component.scss'],
  providers: [applyVirtualCardHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => applyVirtualCardComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => applyVirtualCardComponent)
    }]
})

export class applyVirtualCardComponent extends BaseFpxFormComponent<applyVirtualCardHelper, applyVirtualCardState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public applyVirtualCardHelper: applyVirtualCardHelper,
    public applyvirtualcardService: ApplyvirtualcardService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, applyVirtualCardHelper);
    this.setServiceCode("COBAPPLYVIRTUALCARD");
  }
  protected override doPreInit(): void {
    this.setDataService(this.applyvirtualcardService);
    this.addFormControl('cardholdername', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('cardspendlimit', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('creditcardexpirymonth', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('creditcardexpiryyear', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('charges', '', [], [], 'blur', 1, false);

    this.addFormControl('addtowallet', '', [], [], 'blur', 1, false);

    this.setServiceCode("COBAPPLYVIRTUALCARD");

  }


  protected override doPostInit(): void {

  }

}

