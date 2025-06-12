// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  BpPaymentTypeFormControlService  }  from './bp-payment-type-form-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-bp-payment-type-form-control',
templateUrl: './bp-payment-type-form-control.component.html',
styleUrls: ['./bp-payment-type-form-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => BpPaymentTypeFormControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class BpPaymentTypeFormControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private bpPaymentTypeFormControlService: BpPaymentTypeFormControlService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.bpPaymentTypeFormControlService);

	} 
	
	// 8. End
}