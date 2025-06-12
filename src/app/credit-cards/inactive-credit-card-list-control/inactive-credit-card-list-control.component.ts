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

import {  InactiveccService  } from '../inactivecc-service/inactivecc.service';


// 2. Component Selector
@Component({
selector: 'app-inactive-credit-card-list-control',
templateUrl: './inactive-credit-card-list-control.component.html',
styleUrls: ['./inactive-credit-card-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => InactiveCreditCardListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class InactiveCreditCardListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private inactiveccService: InactiveccService
  ,private _validatorService:ValidatorService
	) {
	super(controlContainer,changeDetectorRef);
	}
	@Output() dataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
	// event methods
	override doPreInit(): void {
	      
	      
	   
    this.addPKList(['customerCode','type','cardRefNumber']);
	this.addDependencies(['cardRefNumber']);

	

	this.setDataSource(this.inactiveccService);
    this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent,this.inactiveccService,this.formControlName,this.attributesMap));
	} 
	
	// 8. End
}