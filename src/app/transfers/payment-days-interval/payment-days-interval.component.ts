// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-payment-days-interval',
templateUrl: './payment-days-interval.component.html',
styleUrls: ['./payment-days-interval.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => PaymentDaysInteravalComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class PaymentDaysInteravalComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	 protected  readonly maxLength : any = "999";
	 protected  readonly minLength : any = "9";
	 protected readonly pattern : any =/^(?!0+$)[0-9]+$/;

	 @Output() dataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
	// event methods
	override doPreInit(): void {
	this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
	this.addSyncValidatorFn(Validators.minLength(this.minLength));
	this.addSyncValidatorFn(Validators.pattern(this.pattern));

	} 
	preventDecimal(event:KeyboardEvent){
		if(event.key === '.'|| event.key===','){
			event.preventDefault();
		}
	} 
	
	// 8. End
}