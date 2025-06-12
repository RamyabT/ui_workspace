// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  Observable,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

import {  PaymentpurposeService  } from '../paymentpurpose-service/paymentpurpose.service';


// 2. Component Selector
@Component({
selector: 'app-payment-purpose-list-control',
templateUrl: './payment-purpose-list-control.component.html',
styleUrls: ['./payment-purpose-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => PaymentPurposeListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class PaymentPurposeListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private paymentpurposeService: PaymentpurposeService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	      
	      
	   
    this.addPKList(['tenantId','code','description','applCode']);
	this.setDataSource(this.paymentpurposeService);
	} 
	
	// 8. End
}