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

import {  ChildaccountService  } from '../childaccount-service/childaccount.service';


// 2. Component Selector
@Component({
selector: 'app-retail-child-account-control',
templateUrl: './retail-child-account-control.component.html',
styleUrls: ['./retail-child-account-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => childaccountFormComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class childaccountFormComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private childaccountService: ChildaccountService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	      
	   
    this.addPKList(['tenantId','customerCode','accountNumber']);
	this.setDataSource(this.childaccountService);
	} 
	
	// 8. End
}