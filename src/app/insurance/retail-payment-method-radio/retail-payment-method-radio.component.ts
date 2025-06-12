// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { RetailPaymentMethodRadioService } from './retail-payment-method-radio.service';


	

// 2. Component Selector
@Component({
selector: 'app-retail-payment-method-radio',
templateUrl: './retail-payment-method-radio.component.html',
styleUrls: ['./retail-payment-method-radio.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => RetailPaymentMethodRadioComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class RetailPaymentMethodRadioComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef,private _retailPaymentMethodRadioService:RetailPaymentMethodRadioService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
		this.setDataSource(this._retailPaymentMethodRadioService);
	} 
	
	// 8. End
}