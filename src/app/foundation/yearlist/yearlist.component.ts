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

import {  YearService  } from '../year-service/year.service';


// 2. Component Selector
@Component({
selector: 'app-yearlist',
templateUrl: './yearlist.component.html',
styleUrls: ['./yearlist.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => YearListComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class YearListComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private yearService: YearService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	      
	      
	   
    this.addPKList(['id','tenantId','code','applnCode']);
	this.setDataSource(this.yearService);
	} 
	
	// 8. End
}