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

import {  InternationalPurposeService  } from '../internationalPurpose-service/internationalPurpose.service';


// 2. Component Selector
@Component({
selector: 'app-international-purpose',
templateUrl: './international-purpose.component.html',
styleUrls: ['./international-purpose.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => InternationalPurposeComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class InternationalPurposeComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private internationalPurposeService: InternationalPurposeService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   
    this.addPKList(['serviceCode']);
	this.setDataSource(this.internationalPurposeService);
	this.setDropdownMode('SEARCHABLE');
	this.setCriteriaMode('contains');
	} 
	
	// 8. End
}