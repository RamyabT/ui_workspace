// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-ifsc-code-control',
templateUrl: './ifsc-code-control.component.html',
styleUrls: ['./ifsc-code-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => IfscCodeControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class IfscCodeControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	 protected  readonly pattern : any = /^[A-Z]{4}0[A-Z0-9]{6}$/;
	 protected  readonly maxLength : any = "11";
	protected  readonly minLength : any = "11";
	// event methods
	override doPreInit(): void {
	this.addSyncValidatorFn(Validators.pattern(this.pattern));

	} 
	
	// 8. End
}