// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-years-in-employment',
templateUrl: './years-in-employment.component.html',
styleUrls: ['./years-in-employment.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => YearsInEmploymentComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class YearsInEmploymentComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	protected  readonly maxLength : any = "99";
	 protected  readonly minLength : any = "1";
	 protected  readonly pattern : any = /^[0-9]{1,2}$/;
	// event methods
	override doPreInit(): void {
	this.addSyncValidatorFn(Validators.minLength(this.minLength));
	this.addSyncValidatorFn(Validators.minLength(this.maxLength));
	this.addSyncValidatorFn(Validators.pattern(this.pattern));

	} 
	
	// 8. End
}