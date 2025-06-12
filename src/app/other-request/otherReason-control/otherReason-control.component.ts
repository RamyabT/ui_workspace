// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-otherReason-control',
templateUrl: './otherReason-control.component.html',
styleUrls: ['./otherReason-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => OtherReasonControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class OtherReasonControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	//protected  readonly pattern : any = /^[a-zA-Z0-9 ]{3,100}$/;  
	protected  readonly pattern : any = /^(?!.*\s{2,})(?!\s*$)(\w+(\s\w+)*){3,100}$/;  
	protected  readonly maxLength : any = "100";
	protected  readonly minLength : any = "3";
	override doPreInit(): void {
		this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
	this.addSyncValidatorFn(Validators.minLength(this.minLength));
		this.addSyncValidatorFn(Validators.pattern(this.pattern));

	} 
	
	// 8. End
}