import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  OnInit,
} from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';

@Component({
  selector: 'app-user-name',
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserNameComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserNameComponent extends BaseFpxControlComponent {
  constructor(
    controlContainer: ControlContainer,
    changeDetectorRef: ChangeDetectorRef
  ) {
    super(controlContainer, changeDetectorRef);
  }
  protected  readonly maxLength : any = "32";
  protected  readonly minLength : any = "8";
  protected  readonly pattern : any = /^[a-zA-Z0-9]{8,32}$/;
 // event methods
 override doPreInit(): void {
 this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
 this.addSyncValidatorFn(Validators.minLength(this.minLength));
 this.addSyncValidatorFn(Validators.pattern(this.pattern));
 } 
}
