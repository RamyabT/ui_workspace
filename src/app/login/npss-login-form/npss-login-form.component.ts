import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, ControlContainer, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
// import { LoginService } from '../services/login.service';
import {  NPSSLoginHelper, NPSSLoginState } from './npss-login-form.helper';
import { NPSSLoginService } from '../services/npss-login.service';

@Component({
  selector: 'npsslogin',
  templateUrl: './npss-login-form.component.html',
  styleUrls: ['./npss-login-form.component.scss'],
  providers: [NPSSLoginHelper]
})
export class NPSSLoginFormComponent extends BaseFpxFormComponent<
  NPSSLoginHelper,
  NPSSLoginState
> {
  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    _helper: NPSSLoginHelper,
    private _loginService: NPSSLoginService,
  ) {
    super(_formBuilder, _route, _controlContainer, _helper);
    this.setServiceCode("RETAILNPSSLOGIN");
    

  }

  protected override doPreInit(): void {
    this.addFormControl('username', '', [Validators.required], [], 'change');
    this.addFormControl('password', '', [Validators.required], [], 'change');
    this.addFormControl('rememberDevice', '', [], [], 'change');
    this.addFormControl('verificationCode','',[],[],'blur');
    this.setDataService(this._loginService);
  }

}
