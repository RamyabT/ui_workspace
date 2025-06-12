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
import { ValidatorService } from '@fpx/core';

import {  ForyearService  } from '../../other-request/foryear-service/foryear.service';


// 2. Component Selector
@Component({
selector: 'app-retail-for-year',
templateUrl: './retail-for-year.component.html',
styleUrls: ['./retail-for-year.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => retailForYearComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class retailForYearComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private foryearService: ForyearService
  ,private _validatorService:ValidatorService
	) {
	super(controlContainer,changeDetectorRef);
	}
	@Output() dataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
	// event methods
	override doPreInit(): void {
	      
	   
    this.addPKList(['lovId','code']);
	this.setDataSource(this.foryearService);
    this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent,this.foryearService,this.formControlName,this.attributesMap));
	} 
	
	// 8. End
}