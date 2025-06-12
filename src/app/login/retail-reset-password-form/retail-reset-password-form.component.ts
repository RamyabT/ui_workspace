import { Component, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailResetPasswordFormHelper, RetailResetPasswordFormState } from './retail-reset-password-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { ResetPasswordService } from '../resetpassword-service/ResetPassword.service';



@Component({
  selector: 'app-retail-reset-password-form',
  templateUrl: './retail-reset-password-form.component.html',
  styleUrls: ['./retail-reset-password-form.component.scss'],
  providers: [RetailResetPasswordFormHelper]
})

export class RetailResetPasswordFormComponent extends BaseFpxFormComponent<RetailResetPasswordFormHelper, RetailResetPasswordFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailResetPasswordFormHelper: RetailResetPasswordFormHelper,
    public resetPasswordService: ResetPasswordService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailResetPasswordFormHelper);
  }
  protected override doPreInit(): void {
    this.addFormControl('newPassword', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('confirmPassword', '', [Validators.required], [], 'blur', 1, false, 0);
    this.setDataService(this.resetPasswordService);
    this.setServiceCode("RETAILRESETPASSWORD");
  }

  protected override doPostInit(): void {

  }

}
