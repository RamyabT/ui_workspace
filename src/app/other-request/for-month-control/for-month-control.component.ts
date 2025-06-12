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

import {  FormonthService  } from '../../service-request/formonth-service/formonth.service';


// 2. Component Selector
@Component({
selector: 'app-for-month-control',
templateUrl: './for-month-control.component.html',
styleUrls: ['./for-month-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => MonthComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class MonthComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private formonthService: FormonthService
  ,private _validatorService:ValidatorService
	) {
	super(controlContainer,changeDetectorRef);
	}
	@Output() dataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
	// event methods
	override doPreInit(): void {
	      
	   
    this.addPKList(['lovId','code']);
	this.setDataSource(this.formonthService);
    this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent,this.formonthService,this.formControlName,this.attributesMap));
	} 
	
	// 8. End
}