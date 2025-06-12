// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-cc-confirm-pin-control',
templateUrl: './cc-confirm-pin-control.component.html',
styleUrls: ['./cc-confirm-pin-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => CCConfirmPinControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class CCConfirmPinControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	@Input() visiblityChange: boolean = true;
	@Input() autoComplete: boolean = false;

	protected readonly maxLength: any = "4";
	protected readonly minLength: any = "4";
	protected readonly pattern: any = /^[0-9]{4,4}$/;
	// event methods
	override doPreInit(): void {
		this.addSyncValidatorFn(Validators.pattern(this.pattern));

	} 
	
	// 8. End
}