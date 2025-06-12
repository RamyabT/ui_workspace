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

import {  PfmSubCategoryService  } from '../pfmSubCategory-service/pfmSubCategory.service';


// 2. Component Selector
@Component({
selector: 'app-pfm-sub-category-list-control',
templateUrl: './pfm-sub-category-list-control.component.html',
styleUrls: ['./pfm-sub-category-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => PfmSubCategoryListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class PfmSubCategoryListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private pfmSubCategoryService: PfmSubCategoryService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	      
	   
    this.addPKList(['subCategoryCode']);
	this.addDependencies(['categoryCode']);
	this.setDataSource(this.pfmSubCategoryService);
	} 
	
	// 8. End
}