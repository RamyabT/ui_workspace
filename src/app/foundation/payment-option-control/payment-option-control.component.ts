// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  PaymentOptionControlService  }  from './payment-option-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-payment-option-control',
templateUrl: './payment-option-control.component.html',
styleUrls: ['./payment-option-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => PaymentOptionControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class PaymentOptionControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private paymentOptionControlService: PaymentOptionControlService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	// dependency fields   Variables
	   
	this.addDependencies(['cardRefNumber']);
	   this.setDataSource(this.paymentOptionControlService);

	} 
	
	// 8. End
}