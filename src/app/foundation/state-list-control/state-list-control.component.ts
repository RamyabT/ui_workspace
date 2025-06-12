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

import {  StatesService  } from '../states-service/states.service';


// 2. Component Selector
@Component({
selector: 'app-state-list-control',
templateUrl: './state-list-control.component.html',
styleUrls: ['./state-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => StateControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class StateControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private statesService: StatesService
  ,private _validatorService:ValidatorService
	) {
	super(controlContainer,changeDetectorRef);
	}
	@Output() dataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
	// event methods
	
	override doPreInit(): void {
	      
	   
    this.addPKList(['countryCode','states']);
	// dependency fields   Variables
	   
	this.addDependencies(['countryCode']);
	this.setDataSource(this.statesService);
    this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent,this.statesService,this.formControlName,this.attributesMap));
	this.setDropdownMode('SEARCHABLE');
	} 
	
	// 8. End
}