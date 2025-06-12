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

import {  InstapurposeService  } from '../instapurpose-service/instapurpose.service';


// 2. Component Selector
@Component({
selector: 'app-insta-purpose-list-control',
templateUrl: './insta-purpose-list-control.component.html',
styleUrls: ['./insta-purpose-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => InstaPurposeComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class InstaPurposeComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private instapurposeService: InstapurposeService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   
    this.addPKList(['serviceCode']);
	this.setDataSource(this.instapurposeService);
	} 
	
	// 8. End
}