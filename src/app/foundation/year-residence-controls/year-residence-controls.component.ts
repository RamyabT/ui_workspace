// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-year-residence-controls',
templateUrl: './year-residence-controls.component.html',
styleUrls: ['./year-residence-controls.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => YearResidenceComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class YearResidenceComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	protected  readonly maxLength : any = "9999";
	protected  readonly minLength : any = "0000";
	protected  readonly pattern : any = /^[0-9]{1,4}$/;
   // event methods
   override doPreInit(): void {
   this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
   this.addSyncValidatorFn(Validators.minLength(this.minLength));
   this.addSyncValidatorFn(Validators.pattern(this.pattern));

	} 
	
	// 8. End
}