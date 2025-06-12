// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-remarks-control',
templateUrl: './remarks-control.component.html',
styleUrls: ['./remarks-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => RemarksControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class RemarksControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	// protected  readonly pattern : any = /[a-zA-Z0-9!@#$%^&()\-_=+\[\]{};:'",.*`~<>\/?\\|\s]$/;
	 protected  readonly pattern : any = /^(?!.* {2,})(?! *$)[a-zA-Z0-9!@#$%^&()\-_=+\[\]{};:'",.*`~<>\/?\\| ]{3,400}$/;
	 protected  readonly maxLength : any = "400";
	 protected  readonly minLength : any = "3";
	// event methods
	override doPreInit(): void {
		this.addSyncValidatorFn(Validators.minLength(this.minLength));
		this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
		this.addSyncValidatorFn(Validators.pattern(this.pattern));
	} 
	
	// 8. End
}