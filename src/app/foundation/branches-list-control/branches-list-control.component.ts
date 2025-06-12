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

import {  BranchesService  } from '../branches-service/branches.service';


// 2. Component Selector
@Component({
selector: 'app-branches-list-control',
templateUrl: './branches-list-control.component.html',
styleUrls: ['./branches-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => BranchesListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class BranchesListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private branchesService: BranchesService
	) {
	super(controlContainer,changeDetectorRef);
	}

	// event methods
	override doPreInit(): void {
	 this.setDataSource(this.branchesService);
	
	
 
	} 
	   
	
	// 8. End
}