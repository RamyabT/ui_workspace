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

import {  DepositInterestPayFrequencyService  } from '../depositInterestPayFrequency-service/depositInterestPayFrequency.service';


// 2. Component Selector
@Component({
selector: 'app-deposit-interest-pay-frequency',
templateUrl: './deposit-interest-pay-frequency.component.html',
styleUrls: ['./deposit-interest-pay-frequency.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => depositInterestPayFrequencyComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class depositInterestPayFrequencyComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private depositInterestPayFrequencyService: DepositInterestPayFrequencyService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	   
    this.addPKList(['lovId','lovCode']);
	this.setDataSource(this.depositInterestPayFrequencyService);
	} 
	
	// 8. End
}