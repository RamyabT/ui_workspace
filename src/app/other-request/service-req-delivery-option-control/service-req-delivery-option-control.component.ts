// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  ServiceReqDeliveryOptionControlService  }  from './service-req-delivery-option-control.service';
import { CustomerValidatorService } from 'src/app/foundation/validator-service/delivery-option-validator.service';
	

// 2. Component Selector
@Component({
selector: 'app-service-req-delivery-option-control',
templateUrl: './service-req-delivery-option-control.component.html',
styleUrls: ['./service-req-delivery-option-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => ServiceReqDeliveryOptionControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class ServiceReqDeliveryOptionControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private serviceReqDeliveryOptionControlService: ServiceReqDeliveryOptionControlService,
	   private customerValidatorService:CustomerValidatorService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.serviceReqDeliveryOptionControlService);
	   this.addDependencies(this.dependencyField);
       this.addPKList(['customerCode']);
        this.addAsyncValidatorFn(this.customerValidatorService.fetchCustomer(this.commonControlEvent));

	} 
	
	// 8. End
}