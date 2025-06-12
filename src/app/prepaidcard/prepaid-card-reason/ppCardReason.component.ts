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

import {  PpCardReasonService  } from '../ppCardReason-service/ppCardReason.service';


// 2. Component Selector
@Component({
selector: 'app-ppCardReason',
templateUrl: './ppCardReason.component.html',
styleUrls: ['./ppCardReason.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => prepaidCardBlockedreasonComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class prepaidCardBlockedreasonComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private ppCardReasonService: PpCardReasonService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	   
    this.addPKList(['id','code']);
	this.setDataSource(this.ppCardReasonService);
	} 
	
	// 8. End
}