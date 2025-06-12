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

import {  DistrictService  } from '../district-service/district.service';


// 2. Component Selector
@Component({
selector: 'app-district-list-control',
templateUrl: './district-list-control.component.html',
styleUrls: ['./district-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => DistrictListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class DistrictListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private districtService: DistrictService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	// dependency fields   Variables
	      
	// this.addDependencies(['stateCode']);
	this.addPKList(['countryCode','stateCode','districtCode']);
	// this.setDataSource(this.cityService);
	this.addDependencies(['countryCode','stateCode']);
	   
    // this.addPKList(['stateCode','barangayCode']);
	this.setDataSource(this.districtService);
	this.setDropdownMode('SEARCHABLE');

	} 
	
	// 8. End
}