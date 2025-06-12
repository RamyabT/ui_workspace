import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, ControlContainer, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { LoginHelper, LoginState } from './test-login-helper';
import { TestLoginService } from '../test-services/test-login.service';

@Component({
  selector: 'app-test-login-form',
  templateUrl: './test-login-form.component.html',
  styleUrls: ['./test-login-form.component.scss'],
  providers: [LoginHelper]
})
export class TestLoginFormComponent extends BaseFpxFormComponent<
  LoginHelper,
  LoginState
> {
  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    _helper: LoginHelper,
    private _loginService: TestLoginService,
    private _testLogin: TestLoginService,
    private _router: Router,
  ) {
    super(_formBuilder, _route, _controlContainer, _helper);
  }

  protected override doPreInit(): void {
    this.addFormControl('username', '', [Validators.required], [], 'blur');
    this.addFormControl('password', '', [Validators.required], [], 'change');
    // this.addFormControl('rememberDevice', '', [], [], 'change');
    this.setDataService(this._loginService);
  }

  oktaLogin() {
    sessionStorage.setItem('isOktaLogin', 'true'); 
    this._router.navigate(['home']);
  }

}
