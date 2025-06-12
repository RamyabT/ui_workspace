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

import {  PreferredMaritalStatusService  } from '../preferredMaritalStatus-service/preferredMaritalStatus.service';


// 2. Component Selector
@Component({
selector: 'app-preferred-marital-status-control',
templateUrl: './preferred-marital-status-control.component.html',
styleUrls: ['./preferred-marital-status-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => PreferredMaritalStatusComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class PreferredMaritalStatusComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private preferredMaritalStatusService: PreferredMaritalStatusService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	   
    this.addPKList(['id','code']);
	this.setDataSource(this.preferredMaritalStatusService);
	} 
	
	// 8. End
}