
// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-applicant-mobile-control',
templateUrl: './applicant-mobile-control.component.html',
styleUrls: ['./applicant-mobile-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => ApplicantMobileControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class ApplicantMobileControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	 protected  readonly maxLength : any = "9999999999";
	//  protected  readonly minLength : any = "000000000";
	 
	 protected  readonly pattern : any = /^[0-9]{9,10}$/;
	// event methods
	override doPreInit(): void {
	this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
	// this.addSyncValidatorFn(Validators.minLength(this.minLength));
	this.addSyncValidatorFn(Validators.pattern(this.pattern));

	} 

	
	// 8. End
}