// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-loan-reason-control',
templateUrl: './loan-reason-control.component.html',
styleUrls: ['./loan-reason-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => LoanReasonControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class LoanReasonControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	 protected  readonly maxLength : any = "150";
	 protected  readonly minLength : any = "1";
	 //protected  readonly pattern : any = /^[A-Za-z0-9\s{1}]{1,150}$/;
	 protected  readonly pattern : any = /^(?!.*\s{2,})(?!\s*$)(\w+(\s\w+)*){1,150}$/;  
	// event methods
	override doPreInit(): void {
	this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
	this.addSyncValidatorFn(Validators.minLength(this.minLength));
	this.addSyncValidatorFn(Validators.pattern(this.pattern));

	} 
	
	// 8. End
}