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

import {  ResidentstatusService  } from '../residentstatus-service/residentstatus.service';


// 2. Component Selector
@Component({
selector: 'app-resident-status-dropdown-control',
templateUrl: './resident-status-dropdown-control.component.html',
styleUrls: ['./resident-status-dropdown-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => ResidentStatusDropdownControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class ResidentStatusDropdownControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private residentstatusService: ResidentstatusService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	   
    this.addPKList(['lovCode','lovId']);
	this.setDataSource(this.residentstatusService);
	this.setDropdownMode('SEARCHABLE');
	} 
	
	// 8. End
}