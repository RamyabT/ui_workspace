// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-bene-name-control',
templateUrl: './bene-name-control.component.html',
styleUrls: ['./bene-name-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => BeneNameControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class BeneNameControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}

	protected  readonly maxLength : any = "30";
	protected  readonly minLength : any = "3";
	protected  readonly pattern : any = /^(?!.*\s{2,})(?!\s*$)([\w*]+(\s[\w*]+)*){3,30}$/;
   // event methods
   override doPreInit(): void {
   this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
   this.addSyncValidatorFn(Validators.minLength(this.minLength));
   this.addSyncValidatorFn(Validators.pattern(this.pattern));
	} 
	
	// 8. End
}