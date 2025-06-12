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

import {  RegionService  } from '../region-service/region.service';


// 2. Component Selector
@Component({
selector: 'app-region-list-control',
templateUrl: './region-list-control.component.html',
styleUrls: ['./region-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => RegionListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class RegionListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private regionService: RegionService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	// dependency fields   Variables
	   
	this.addDependencies(['countryCode']);  
    this.addPKList(['countryCode','regionCode']);
	this.setDropdownMode('SEARCHABLE');
	this.setDataSource(this.regionService);
	} 
	
	// 8. End
}