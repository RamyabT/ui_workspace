// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  AccDeliveryOptionsControlService  }  from './acc-delivery-options-control.service';
import { CustomerValidatorService } from '../validator-service/delivery-option-validator.service';
	

// 2. Component Selector
@Component({
selector: 'app-acc-delivery-options-control',
templateUrl: './acc-delivery-options-control.component.html',
styleUrls: ['./acc-delivery-options-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => AccDeliveryOptionsControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class AccDeliveryOptionsControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private accDeliveryOptionsControlService: AccDeliveryOptionsControlService,
	   private customerValidatorService:CustomerValidatorService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.accDeliveryOptionsControlService);
       this.addDependencies(this.dependencyField);
       this.addPKList(['customerCode']);
        this.addAsyncValidatorFn(this.customerValidatorService.fetchCustomer(this.commonControlEvent));
	} 
	
	// 8. End
}