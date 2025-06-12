// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  DebitCreditFlagControlService  }  from './debit-credit-flag-cotrol.service';
	

// 2. Component Selector
@Component({
selector: 'app-debit-credit-flag-cotrol',
templateUrl: './debit-credit-flag-cotrol.component.html',
styleUrls: ['./debit-credit-flag-cotrol.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => DebitCreditFlagControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class DebitCreditFlagControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private debitCreditFlagControlService: DebitCreditFlagControlService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.debitCreditFlagControlService);

	} 
	
	// 8. End
}