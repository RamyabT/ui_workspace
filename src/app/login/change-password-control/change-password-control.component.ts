import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';

@Component({
  selector: 'app-change-password-control',
  templateUrl: './change-password-control.component.html',
  styleUrls: ['./change-password-control.component.scss'],
  providers: [
    {
      provide : NG_VALUE_ACCESSOR,
      useExisting : forwardRef(() => ChangePasswordControlComponent),
      multi : true
    }
  ]
})
export class ChangePasswordControlComponent extends BaseFpxControlComponent{
  passwordType : 'text' | 'password' = 'password';
  protected override doPreInit(): void {
    this.addSyncValidatorFn(
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{6,32}$/
      )
    );
  }


}
