// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-payment-date1-control',
templateUrl: './payment-date-control.component.html',
styleUrls: ['./payment-date-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => PaymentDateControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class PaymentDateControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	selectedDate!: Date;
	@Input() inputDisabled: boolean = true;
	@Input() toggleDisabled: boolean = false;
	@Input() minDate: string | undefined;
	@Input() maxDate: string | undefined;
	// event methods
	override doPreInit(): void {

	} 
	
	// 8. End
}