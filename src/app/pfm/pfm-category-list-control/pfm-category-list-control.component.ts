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

import {  PfmcategoryService  } from '../pfmcategory-service/pfmcategory.service';


// 2. Component Selector
@Component({
selector: 'app-pfm-category-list-control',
templateUrl: './pfm-category-list-control.component.html',
styleUrls: ['./pfm-category-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => PfmcategoryListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class PfmcategoryListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private pfmcategoryService: PfmcategoryService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	   
    //this.addPKList(['categoryCode','tenantId']);
	this.addPKList(['pfmSubCategory']);
	this.addDependencies(['categoryCode']);
	this.setDataSource(this.pfmcategoryService);
	} 
	
	// 8. End
}