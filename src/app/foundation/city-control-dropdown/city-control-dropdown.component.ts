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

import {  CityService  } from '../city-service/city.service';


// 2. Component Selector
@Component({
selector: 'app-city-control-dropdown',
templateUrl: './city-control-dropdown.component.html',
styleUrls: ['./city-control-dropdown.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => cityControlDropdownComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class cityControlDropdownComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private cityService: CityService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	      
	   
    this.addPKList(['countryCode','stateCode','cityCode']);
	this.setDataSource(this.cityService);
	this.addDependencies(['countryCode','stateCode']);
	this.setDropdownMode('SEARCHABLE');
	} 
	
	// 8. End
}