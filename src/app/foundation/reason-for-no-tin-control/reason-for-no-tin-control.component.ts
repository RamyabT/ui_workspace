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

import {  ReasonForNoTinService  } from '../reasonForNoTin-service/reasonForNoTin.service';


// 2. Component Selector
@Component({
selector: 'app-reason-for-no-tin-control',
templateUrl: './reason-for-no-tin-control.component.html',
styleUrls: ['./reason-for-no-tin-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => ReasonForNoTinComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class ReasonForNoTinComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private reasonForNoTinService: ReasonForNoTinService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	   
    this.addPKList(['id','code']);
	this.setDataSource(this.reasonForNoTinService);
	} 
	
	// 8. End
}