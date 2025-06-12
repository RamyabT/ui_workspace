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

import {  SubDistrictService  } from '../subDistrict-service/subDistrict.service';


// 2. Component Selector
@Component({
selector: 'app-barangay-list-control',
templateUrl: './barangay-list-control.component.html',
styleUrls: ['./barangay-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => BarangayListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class BarangayListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private subDistrictService: SubDistrictService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	// dependency fields   Variables
	      
	      
	   
	this.addDependencies(['countryCode','stateCode','cityCode']);
	      
	      
	      
	   
    this.addPKList(['countryCode','stateCode','cityCode','barangayCode']);
	this.setDataSource(this.subDistrictService);
	} 
	
	// 8. End
}