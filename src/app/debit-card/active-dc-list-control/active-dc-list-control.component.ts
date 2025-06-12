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

import {  ActivedcService  } from '../activedc-service/activedc.service';


// 2. Component Selector
@Component({
selector: 'app-active-dc-list-control',
templateUrl: './active-dc-list-control.component.html',
styleUrls: ['./active-dc-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => activedcComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class activedcComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private activedcService: ActivedcService
  ,private _validatorService:ValidatorService
	) {
	super(controlContainer,changeDetectorRef);
	}
	@Output() dataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
	// event methods
	override doPreInit(): void {
	      
	      
	   
    this.addPKList(['customerCode','accType','cardRefNumber']);
	// dependency fields   Variables
	   
	this.addDependencies(['cardRefNumber']);
	this.setDataSource(this.activedcService);
    this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent,this.activedcService,this.formControlName,this.attributesMap));
	} 
	
	// 8. End
}