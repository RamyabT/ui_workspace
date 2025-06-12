// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-security-answer',
templateUrl: './security-answer.component.html',
styleUrls: ['./security-answer.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => SecurityAnswerComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class SecurityAnswerComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	protected  readonly pattern : any = /^[a-zA-Z0-9]{3,25}$/;
	protected  readonly maxLength : any = "25";
	protected  readonly minLength : any = "3";
	// event methods
	override doPreInit(): void {
		this.addSyncValidatorFn(Validators.minLength(this.minLength));
		this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
		this.addSyncValidatorFn(Validators.pattern(this.pattern));
	} 
	
	// 8. End
}