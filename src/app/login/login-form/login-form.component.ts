import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, ControlContainer, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { LoginHelper, LoginState } from './login-helper';
import { TestLoginService } from '../test-services/test-login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  providers: [LoginHelper]
})
export class LoginFormComponent extends BaseFpxFormComponent<
  LoginHelper,
  LoginState
> {
  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    _helper: LoginHelper,
    private _loginService: TestLoginService,
  ) {
    super(_formBuilder, _route, _controlContainer, _helper);
  }

  protected override doPreInit(): void {
    this.addFormControl('username', '', [Validators.required], [], 'blur');
    this.addFormControl('password', '', [Validators.required], [], 'change');
    this.addFormControl('rememberDevice', '', [], [], 'change');
    this.setDataService(this._loginService);
    this._loginService.clearUserActivity();
  }

}
