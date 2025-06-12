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

import {  PrepaidcardService  } from '../prepaidcard-service/prepaidcard.service';


// 2. Component Selector
@Component({
selector: 'app-prepaidcard-list-control',
templateUrl: './prepaidcard-list-control.component.html',
styleUrls: ['./prepaidcard-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => PrepaidCardListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class PrepaidCardListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private prepaidcardService: PrepaidcardService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   
    this.addPKList(['cardRefNumber']);
	this.setDataSource(this.prepaidcardService);
	} 
	
	// 8. End
}