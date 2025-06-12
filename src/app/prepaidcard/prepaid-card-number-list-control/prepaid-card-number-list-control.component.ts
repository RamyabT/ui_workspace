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

import {  ActivePcService  } from '../activePc-service/activePc.service';


// 2. Component Selector
@Component({
selector: 'app-prepaid-card-number-list-control',
templateUrl: './prepaid-card-number-list-control.component.html',
styleUrls: ['./prepaid-card-number-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => PrepaidCardNumberComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class PrepaidCardNumberComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private activePcService: ActivePcService
  ,private _validatorService:ValidatorService
	) {
	super(controlContainer,changeDetectorRef);
	}
	@Output() dataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
	// event methods
	override doPreInit(): void {
	   
    this.addPKList(['cardRefNumber']);
	this.setDataSource(this.activePcService);
    this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent,this.activePcService,this.formControlName,this.attributesMap));
	} 
	
	// 8. End
}