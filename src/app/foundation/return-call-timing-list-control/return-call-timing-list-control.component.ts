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

import {  ReturncalltimingService  } from '../returncalltiming-service/returncalltiming.service';


// 2. Component Selector
@Component({
selector: 'app-return-call-timing-list-control',
templateUrl: './return-call-timing-list-control.component.html',
styleUrls: ['./return-call-timing-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => ReturnCallTimingListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class ReturnCallTimingListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private returncalltimingService: ReturncalltimingService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	      
	      
	   
    this.addPKList(['tenantId','id','code','applicationCode']);
	this.setDataSource(this.returncalltimingService);
	} 
	
	// 8. End
}