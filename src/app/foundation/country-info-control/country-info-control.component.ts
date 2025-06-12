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

import {  CountryinfoService  } from '../countryinfo-service/countryinfo.service';


// 2. Component Selector
@Component({
selector: 'app-country-info-control',
templateUrl: './country-info-control.component.html',
styleUrls: ['./country-info-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => CountryInformationComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class CountryInformationComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private countryinfoService: CountryinfoService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   
    this.addPKList(['applicantId']);
	this.setDataSource(this.countryinfoService);
	} 
	
	// 8. End
}