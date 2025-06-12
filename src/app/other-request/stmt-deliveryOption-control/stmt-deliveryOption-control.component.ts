// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  StmtDeliveryOptionControlService  }  from './stmt-deliveryOption-control.service';
import { CustomerValidatorService } from 'src/app/foundation/validator-service/delivery-option-validator.service';
	

// 2. Component Selector
@Component({
selector: 'app-stmt-deliveryOption-control',
templateUrl: './stmt-deliveryOption-control.component.html',
styleUrls: ['./stmt-deliveryOption-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => StmtDeliveryOptionControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class StmtDeliveryOptionControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private stmtDeliveryOptionControlService: StmtDeliveryOptionControlService,
	   private customerValidatorService:CustomerValidatorService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.stmtDeliveryOptionControlService);
	   this.addDependencies(this.dependencyField);
       this.addPKList(['customerCode']);
        this.addAsyncValidatorFn(this.customerValidatorService.fetchCustomer(this.commonControlEvent));

	} 
	
	// 8. End
}