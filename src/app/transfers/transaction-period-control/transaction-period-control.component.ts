// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  TransactionPeriodService  }  from './transaction-period-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-transaction-period-control',
templateUrl: './transaction-period-control.component.html',
styleUrls: ['./transaction-period-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => TransactionPeriodComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class TransactionPeriodComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private transactionPeriodService: TransactionPeriodService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.transactionPeriodService);

	} 
	
	// 8. End
}