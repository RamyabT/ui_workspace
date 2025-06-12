import { Component, OnInit, Optional } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { EnableBiometricFormHelper, EnableBiometricFormState } from './enable-biometric-form.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EnableBiometricService } from 'src/app/foundation/enablebiometric-service/enable-biometric.service';
import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';

@Component({
  selector: 'app-enable-biometric-form',
  templateUrl: './enable-biometric-form.component.html',
  styleUrls: ['./enable-biometric-form.component.scss'],
  providers: [EnableBiometricFormHelper, EnableBiometricService, FingerprintAIO]
})
export class EnableBiometricFormComponent extends BaseFpxFormComponent<EnableBiometricFormHelper, EnableBiometricFormState> {

  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    _enableBiometricFormHelper: EnableBiometricFormHelper
  ) {
    super(_formBuilder, _route, _controlContainer, _enableBiometricFormHelper);
    this.setServiceCode("ENABLEBIOMETRIC");
  }

}
