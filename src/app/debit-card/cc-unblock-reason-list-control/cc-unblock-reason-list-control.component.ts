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
import { CredunblockreasonService } from '../credunblockreason-service/credunblockreason.service';

//import {  CredunblockreasonService  } from '../credunblockreason-service/credunblockreason.service';


// 2. Component Selector
@Component({
selector: 'app-cc-unblock-reason-list-control',
templateUrl: './cc-unblock-reason-list-control.component.html',
styleUrls: ['./cc-unblock-reason-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => CCUnblockReasonListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class CCUnblockReasonListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private credunblockreasonService: CredunblockreasonService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   
		this.addPKList(['reason']);
		this.addDependencies(['blockReason']);
	this.setDataSource(this.credunblockreasonService);
	} 
	
	
	// 8. End
}