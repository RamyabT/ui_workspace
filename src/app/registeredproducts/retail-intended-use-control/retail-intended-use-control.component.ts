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

import {  IntendedUseService  } from '../intendedUse-service/intendedUse.service';


// 2. Component Selector
@Component({
selector: 'app-retail-intended-use-control',
templateUrl: './retail-intended-use-control.component.html',
styleUrls: ['./retail-intended-use-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => RetailIntendedUseControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class RetailIntendedUseControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private intendedUseService: IntendedUseService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
    this.addPKList(['tenantId','serviceCode','intendCode','applicationCode']);
	this.addDependencies(['serviceCode']);
	this.setDataSource(this.intendedUseService);
	} 
	
	// 8. End
}