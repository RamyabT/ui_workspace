// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-cheque-start-number-control',
templateUrl: './cheque-start-number-control.component.html',
styleUrls: ['./cheque-start-number-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => ChequeStartNumberControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class ChequeStartNumberControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	 protected  readonly maxLength : any = "999";
	 protected  readonly minLength : any = 0;
	// event methods
	override doPreInit(): void {
	// this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
	// this.addSyncValidatorFn(Validators.minLength(this.minLength));

	} 
	
	// 8. End
}