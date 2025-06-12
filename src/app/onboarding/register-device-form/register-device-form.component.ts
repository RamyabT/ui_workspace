import { Component, OnInit, Optional } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { RegisterDeviceFormHelper, RegisterDeviceFormState } from './register-device-form.helper';
import { ControlContainer, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterDeviceService } from '../registerdevice-service/register-device.service';

@Component({
  selector: 'app-register-device-form',
  templateUrl: './register-device-form.component.html',
  styleUrls: ['./register-device-form.component.scss'],
  providers: [RegisterDeviceFormHelper]
})
export class RegisterDeviceFormComponent extends BaseFpxFormComponent<RegisterDeviceFormHelper, RegisterDeviceFormState> {

  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    _registerDeviceFormHelper: RegisterDeviceFormHelper,
    private _registerDeviceService: RegisterDeviceService
  ) {
    super(_formBuilder, _route, _controlContainer, _registerDeviceFormHelper);
    this.setServiceCode('REGISTERDEVICE');
  }

  override doPreInit(){
    this.addFormControl('mpin', '', [], [], 'change');
    this.addFormControl('confirmMpin', '', [], [], 'change');
    this.setDataService(this._registerDeviceService);
  }

}
