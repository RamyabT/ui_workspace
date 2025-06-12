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

import {  InterestpaymentfrequencyService  } from '../interestpaymentfrequency-service/interestpaymentfrequency.service';
import { DepositMaturityValidator } from './deposit-maturity-validator.service';


// 2. Component Selector
@Component({
selector: 'app-interest-payment-frequency-list-control',
templateUrl: './interest-payment-frequency-list-control.component.html',
styleUrls: ['./interest-payment-frequency-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => InterestPaymentFrequencyListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class InterestPaymentFrequencyListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private interestpaymentfrequencyService: InterestpaymentfrequencyService,private depositMaturityValidator:DepositMaturityValidator
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	   
    this.addPKList(['id','code']);
    //this.addPKList(['id','code','productCode','depositAmount','depositDate','tenorInMonths']);
    this.addDependencies(this.dependencyField);
    if(this.formControlName=='interestpaymentfrequency'){
		  this.addAsyncValidatorFn(this.depositMaturityValidator.depositMaturityValidation(this.commonControlEvent,this.dependentValuesMap));
    }
    //this.addDependencies(['productCode','depositAmount','depositDate','tenorInMonths']);
	  this.setDataSource(this.interestpaymentfrequencyService);
	}

	// 8. End
}