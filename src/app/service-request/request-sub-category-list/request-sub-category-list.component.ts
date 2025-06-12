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
import { RequestSubCategoryService } from '../requestSubCategory-service/requestSubCategory.service';


// 2. Component Selector
@Component({
selector: 'app-request-sub-category-list',
templateUrl: './request-sub-category-list.component.html',
styleUrls: ['./request-sub-category-list.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => RequestSubCategoryListComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class RequestSubCategoryListComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private requestSubCategoryService: RequestSubCategoryService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   
    this.addPKList(['subCategory']);
	this.addDependencies(['Category']);
	this.setDataSource(this.requestSubCategoryService);
	} 
	
	// 8. End
}