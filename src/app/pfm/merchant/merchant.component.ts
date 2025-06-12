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

import {  MerchantService  } from '../merchant-service/merchant.service';


// 2. Component Selector
@Component({
selector: 'app-merchant',
templateUrl: './merchant.component.html',
styleUrls: ['./merchant.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => merchantComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class merchantComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private merchantService: MerchantService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   
    this.addPKList(['merchantId']);
	this.setDataSource(this.merchantService);
	} 
	
	// 8. End
}