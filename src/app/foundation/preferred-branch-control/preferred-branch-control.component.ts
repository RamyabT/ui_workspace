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

import {  PreferredBranchService  } from '../preferredBranch-service/preferredBranch.service';


// 2. Component Selector
@Component({
selector: 'app-preferred-branch-control',
templateUrl: './preferred-branch-control.component.html',
styleUrls: ['./preferred-branch-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => PreferredBranchComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class PreferredBranchComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private preferredBranchService: PreferredBranchService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	   
    this.addPKList(['id','code']);
	this.setDataSource(this.preferredBranchService);
	} 
	
	// 8. End
}