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

import {  DebunblockreasonService  } from '../debunblockreason-service/debunblockreason.service';


// 2. Component Selector
@Component({
selector: 'app-dc-unblock-list-control',
templateUrl: './dc-unblock-list-control.component.html',
styleUrls: ['./dc-unblock-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => DCUnblockReasonComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class DCUnblockReasonComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private debunblockreasonService: DebunblockreasonService
	) {
	super(controlContainer,changeDetectorRef);
	}

	// event methods
	override doPreInit(): void {
	   
    this.addPKList(['debitunblockreason']);
	// dependency fields   Variables
	   
	this.addDependencies(['debitcardblockreason']);
	this.setDataSource(this.debunblockreasonService);
	} 
	
	// 8. End
}