// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-security-answer-masked-control',
templateUrl: './security-answer-masked-control.component.html',
styleUrls: ['./security-answer-masked-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => SecurityAnswerMaskedControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class SecurityAnswerMaskedControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
 @Input() visiblityChange:boolean=true;
@Input() autoComplete:boolean=false;
protected  readonly pattern : any = /^[a-zA-Z0-9'-]{3,25}$/;
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