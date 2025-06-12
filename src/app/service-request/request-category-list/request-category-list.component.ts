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

import {  RequestCategoryService  } from '../requestCategory-service/requestCategory.service';


// 2. Component Selector
@Component({
selector: 'app-request-category-list',
templateUrl: './request-category-list.component.html',
styleUrls: ['./request-category-list.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => RequestCategoryListComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class RequestCategoryListComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private requestCategoryService: RequestCategoryService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   
    this.addPKList(['categoryCode']);
	this.setDataSource(this.requestCategoryService);
	this.setDropdownMode('SEARCHABLE');
	} 
	
	// 8. End
}