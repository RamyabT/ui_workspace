// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  DeliveryOptionListControlService  }  from './delivery-option-list-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-delivery-option-list-control',
templateUrl: './delivery-option-list-control.component.html',
styleUrls: ['./delivery-option-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => DeliveryOptionListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class DeliveryOptionListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private deliveryOptionListControlService: DeliveryOptionListControlService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.deliveryOptionListControlService);

	} 
	
	// 8. End
}