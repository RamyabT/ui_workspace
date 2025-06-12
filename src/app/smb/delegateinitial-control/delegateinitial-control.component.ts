// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-delegateinitial-control',
templateUrl: './delegateinitial-control.component.html',
styleUrls: ['./delegateinitial-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => DelegateinitialControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class DelegateinitialControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	 protected  readonly pattern : any = /^[A-Za-z.]{0,1}$/;
	 protected  readonly maxLength : any = "1";
	 protected  readonly minLength : any = "0";
	// event methods
	override doPreInit(): void {
	this.addSyncValidatorFn(Validators.pattern(this.pattern));
	this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
	this.addSyncValidatorFn(Validators.minLength(this.minLength));

	} 
	
	// 8. End
}