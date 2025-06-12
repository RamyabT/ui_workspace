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

import {  LoanPaymentFrequencyService  } from '../loanPaymentFrequency-service/loanPaymentFrequency.service';


// 2. Component Selector
@Component({
selector: 'app-loan-payment-frequency',
templateUrl: './loan-payment-frequency.component.html',
styleUrls: ['./loan-payment-frequency.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => LoanPaymentFrequencyComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class LoanPaymentFrequencyComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private loanPaymentFrequencyService: LoanPaymentFrequencyService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	   
    this.addPKList(['code','id']);
	this.setDataSource(this.loanPaymentFrequencyService);
	} 
	
	// 8. End
}