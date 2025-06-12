import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import {
  ControlContainer,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordComponent extends BaseFpxControlComponent {
  @Input() visiblityChange:boolean=true;
  @Input() autoComplete:boolean=false;
  
  passwordType : 'text' | 'password' = 'password';
  
  constructor(
    controlContainer: ControlContainer,
    changeDetectorRef: ChangeDetectorRef
  ) {
    super(controlContainer, changeDetectorRef);
  }

protected  readonly maxLength : any = "32";
  protected  readonly minLength : any = "8";
  // protected  readonly pattern : any = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,32}$/";
  protected override doPreInit(): void {
    // this.addSyncValidatorFn(
    //   Validators.pattern(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,32}$/
    //   )
    // );
    this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
    this.addSyncValidatorFn(Validators.minLength(this.minLength));
    // this.addSyncValidatorFn(Validators.pattern(this.pattern));
  }
}

