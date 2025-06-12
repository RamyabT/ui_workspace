import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, ControlContainer, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { ChangePasswordService } from './services/change-password.service';
import {
  ChangePasswordHelper,
  ChangePasswordState,
} from './services/changes-password.helper';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent extends BaseFpxFormComponent<
  ChangePasswordHelper,
  ChangePasswordState
> {
  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    _helper: ChangePasswordHelper,
    private _service : ChangePasswordService
  ) {
    super(_formBuilder, _route, _controlContainer, _helper);
  }

  protected override doPreInit(): void {
    this.addFormControl("currentPass", "", [Validators.required], [], "change");
    this.addFormControl("newPass", "", [Validators.required], [], "change");
    this.addFormControl("confirmPass", "", [Validators.required], [], "change");
    this.setDataService(this._service);
  }
}
