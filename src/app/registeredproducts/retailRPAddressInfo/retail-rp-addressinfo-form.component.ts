import { Component, EventEmitter, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailRPAddressInfoHelper, RetailRPAddressInfoState } from './retail-rp-addressinfo-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { RpaddressinfoService } from '../rpaddressinfo-service/rpaddressinfo.service';
import { Rpaddressinfo } from '../rpaddressinfo-service/rpaddressinfo.model';
import { AppConfigService } from '@dep/services';



@Component({
  selector: 'app-retail-rp-addressinfo-form',
  templateUrl: './retail-rp-addressinfo-form.component.html',
  styleUrls: ['./retail-rp-addressinfo-form.component.scss'],
  providers: [RetailRPAddressInfoHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RetailRPAddressInfoComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => RetailRPAddressInfoComponent)
    }]
})

export class RetailRPAddressInfoComponent extends BaseFpxFormComponent<RetailRPAddressInfoHelper, RetailRPAddressInfoState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailRPAddressInfoHelper: RetailRPAddressInfoHelper,
    public rpaddressinfoService: RpaddressinfoService,
    private validatorService: ValidatorService,
    private _appConfig: AppConfigService,

  ) {
    super(formBuilder, router, controlContainer, retailRPAddressInfoHelper);
    this.setServiceCode(this._appConfig.getData('serviceCode'));
  }
  protected override doPreInit(): void {
    this.setDataService(this.rpaddressinfoService);
    this.addFormControl('rpaddressType', '', [Validators.required,], [], 'blur', 1, false, 0);
    this.addFormControl('pobox', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('street', '', [Validators.required, Validators.pattern(/^[A-Za-z0-9,\s\.\-\#\/]{1,50}$/)], [], 'blur', 1, false, 0);
    this.addFormControl('city', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('province', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('country', '', [Validators.required, Validators.pattern(/^[A-Za-z\s\-]{2,30}$/)], [], 'blur', 1, false, 0);
    this.addFormControl('postalCode', '', [Validators.required, Validators.pattern(/^\d{6}$/)], [], 'blur', 1, false, 0);
    this.setServiceCode(this._appConfig.getData('serviceCode'));
  }


  protected override doPostInit(): void {

  }

}

