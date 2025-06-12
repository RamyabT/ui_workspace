// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-Subject-Control',
templateUrl: './Subject-Control.component.html',
styleUrls: ['./Subject-Control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => SubjectControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class SubjectControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	protected  readonly pattern : any = /^[a-zA-Z0-9#@$!%*?&. ]{3,100}$/;  
	protected  readonly maxLength : any = "100";
	protected  readonly minLength : any = "3";
	override doPreInit(): void {
		this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
	this.addSyncValidatorFn(Validators.minLength(this.minLength));
		this.addSyncValidatorFn(Validators.pattern(this.pattern));

	} 
	
	// 8. End
}