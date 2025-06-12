import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { ManageBiometricFormHelper, ManageBiometricFormState } from './manage-biometric-form.helper';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { EnableBiometricService } from 'src/app/foundation/enablebiometric-service/enable-biometric.service';

@Component({
  selector: 'app-manage-biometric-form',
  templateUrl: './manage-biometric-form.component.html',
  styleUrls: ['./manage-biometric-form.component.scss'],
  providers: [ManageBiometricFormHelper, EnableBiometricService]
})
export class ManageBiometricFormComponent extends BaseFpxFormComponent<ManageBiometricFormHelper, ManageBiometricFormState> {
  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    _manageBiometricHelper: ManageBiometricFormHelper,
    private _enableBiometricService: EnableBiometricService
  ) {
    super(_formBuilder, _route, _controlContainer, _manageBiometricHelper);
    this.setServiceCode('MANAGEBIOMETRIC');
  }

  override doPreInit(){
    this.setDataService(this._enableBiometricService);
  }

}
