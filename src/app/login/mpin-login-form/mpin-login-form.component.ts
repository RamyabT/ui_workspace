import { Component, OnInit, Optional } from '@angular/core';
import { MpinLoginFormHelper, MpinLoginFormState } from './mpin-login-form.helper';
import { BaseFpxFormComponent } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MpinLoginService } from '../mpinlogin-service/mpin-login.service';
import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';

@Component({
  selector: 'app-mpin-login-form',
  templateUrl: './mpin-login-form.component.html',
  styleUrls: ['./mpin-login-form.component.scss'],
  providers: [ MpinLoginFormHelper, FingerprintAIO ]
})

export class MpinLoginFormComponent extends BaseFpxFormComponent<MpinLoginFormHelper, MpinLoginFormState> {
  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    _mpinLoginForHelper: MpinLoginFormHelper,
    private _mpinLoginService: MpinLoginService
  ) {
    super(_formBuilder, _route, _controlContainer, _mpinLoginForHelper);
    this.setServiceCode('RETAILMPINLOGIN');
    this.setDataService(this._mpinLoginService);
  }

  override doPreInit(){
    this.addFormControl('mpin', '', [], [], 'change');
  }

}
