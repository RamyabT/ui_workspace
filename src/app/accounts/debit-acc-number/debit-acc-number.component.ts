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

import {  DebitAccNoService  } from '../debitAccNo-service/debitAccNo.service';


// 2. Component Selector
@Component({
selector: 'app-debit-acc-number',
templateUrl: './debit-acc-number.component.html',
styleUrls: ['./debit-acc-number.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => DebitAccNoComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class DebitAccNoComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private debitAccNoService: DebitAccNoService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   
    this.addPKList(['customerCode']);
	this.setDataSource(this.debitAccNoService);
	} 
	
	// 8. End
}