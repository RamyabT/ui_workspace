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

import {  DcCardTypeService  } from '../dcCardType-service/dcCardType.service';


// 2. Component Selector
@Component({
selector: 'app-dcCardType',
templateUrl: './dcCardType.component.html',
styleUrls: ['./dcCardType.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => dcCardTypeComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class dcCardTypeComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private dcCardTypeService: DcCardTypeService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	   
    this.addPKList(['id','code']);
	this.setDataSource(this.dcCardTypeService);
	} 
	
	// 8. End
}