// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-Applicant-Password-control',
templateUrl: './Applicant-Password-control.component.html',
styleUrls: ['./Applicant-Password-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => ApplicantPasswordControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class ApplicantPasswordControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
 @Input() visiblityChange:boolean=true;
@Input() autoComplete:boolean=false;
	// event methods
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

	// 8. End
}