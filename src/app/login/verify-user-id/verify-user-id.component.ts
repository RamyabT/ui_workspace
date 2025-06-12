import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, ControlContainer, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { VerifyUserIdHelper, VerifyUserIdState } from './service/verify-user-id.helper';
import { VerifyUserIdService } from './service/verify-user-id.service';

@Component({
  selector: 'app-verify-user-id',
  templateUrl: './verify-user-id.component.html',
  styleUrls: ['./verify-user-id.component.scss'],
  providers: [VerifyUserIdHelper]
})
export class VerifyUserIdComponent extends BaseFpxFormComponent<
VerifyUserIdHelper,
VerifyUserIdState
> {
constructor(
  _formBuilder: FormBuilder,
  _route: Router,
  @Optional() _controlContainer: ControlContainer,
  _helper: VerifyUserIdHelper,
  private _verifyUserIdService : VerifyUserIdService,
) {
  super(_formBuilder, _route, _controlContainer, _helper);
}

protected override doPreInit(): void {
  this.addFormControl('username','',[Validators.required],[],'change');
  this.setDataService(this._verifyUserIdService);
}

}

