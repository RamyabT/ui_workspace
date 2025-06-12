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

import {  DebitcardblockreasonService  } from '../debitcardblockreason-service/debitcardblockreason.service';


// 2. Component Selector
@Component({
selector: 'app-debit-card-block-reason-list',
templateUrl: './debit-card-block-reason-list.component.html',
styleUrls: ['./debit-card-block-reason-list.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => DebitCardBlockReasonListComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class DebitCardBlockReasonListComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private debitcardblockreasonService: DebitcardblockreasonService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	   
    this.addPKList(['id','code']);
	this.setDataSource(this.debitcardblockreasonService);
	} 
	
	// 8. End
}