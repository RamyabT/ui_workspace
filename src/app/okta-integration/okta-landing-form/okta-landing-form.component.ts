import { Component, Optional, forwardRef } from '@angular/core';
import { FormBuilder, ControlContainer, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { OktaLandingFormHelper, OktaLandingFormState } from './okta-landing-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { OktalandingformService } from '../oktalandingform-service/oktalandingform.service';

@Component({
  selector: 'app-okta-landing-form',
  templateUrl: './okta-landing-form.component.html',
  styleUrls: ['./okta-landing-form.component.scss'],
  providers: [OktaLandingFormHelper, OktalandingformService,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => OktaLandingFormComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => OktaLandingFormComponent)
    }]
})

export class OktaLandingFormComponent extends BaseFpxFormComponent<OktaLandingFormHelper, OktaLandingFormState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private _router: Router,
    public oktaLandingFormHelper: OktaLandingFormHelper,
    public oktalandingformService: OktalandingformService,
    private validatorService: ValidatorService
  ) {
    super(formBuilder, _router, controlContainer, oktaLandingFormHelper);
    this.setServiceCode("RETAILOKTALOGIN");
  }
  protected override doPreInit(): void {
    this.setDataService(this.oktalandingformService);
    this.setServiceCode("RETAILOKTALOGIN");
  }

  protected override doPostInit(): void {

  }
}

