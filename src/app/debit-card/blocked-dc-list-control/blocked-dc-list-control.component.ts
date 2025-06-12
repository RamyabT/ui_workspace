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

import {  BlockeddcService  } from '../blockeddc-service/blockeddc.service';


// 2. Component Selector
@Component({
selector: 'app-blocked-dc-list-control',
templateUrl: './blocked-dc-list-control.component.html',
styleUrls: ['./blocked-dc-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => BlockedDebitCardControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class BlockedDebitCardControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private blockeddcService: BlockeddcService
  ,private _validatorService:ValidatorService
	) {
	super(controlContainer,changeDetectorRef);
	}

	@Output() dataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
	// event methods
	override doPreInit(): void {
	      
	      
	   
    this.addPKList(['accType','customerCode','cardRefNumber']);
	this.setDataSource(this.blockeddcService);
    this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent,this.blockeddcService,this.formControlName,this.attributesMap));
	} 
	
	// 8. End
}