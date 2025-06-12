// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-transaction-amount-control',
templateUrl: './transaction-amount-control.component.html',
styleUrls: ['./transaction-amount-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => TransactionAmountControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class TransactionAmountControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	protected  readonly pattern : any = /^[0-9.]{1,20}$/;

	// event methods
	override doPreInit(): void {
	  //this.setHelper(this.transactionAmountControlHelper);
	  this.addSyncValidatorFn(Validators.pattern(this.pattern));
	} 
	
	// 8. End
}