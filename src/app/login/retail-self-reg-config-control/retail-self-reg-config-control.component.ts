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

import {  SelfregconfigService  } from '../selfregconfig-service/selfregconfig.service';


// 2. Component Selector
@Component({
selector: 'app-retail-self-reg-config-control',
templateUrl: './retail-self-reg-config-control.component.html',
styleUrls: ['./retail-self-reg-config-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => RetailSelfRegConfigControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class RetailSelfRegConfigControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private selfregconfigService: SelfregconfigService
  ,private _validatorService:ValidatorService
	) {
	super(controlContainer,changeDetectorRef);
	}
	@Output() dataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
	// event methods
	override doPreInit(): void {
	   
    this.addPKList(['id']);
	this.setDataSource(this.selfregconfigService);
    this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent,this.selfregconfigService,this.formControlName,this.attributesMap));
	} 
	
	// 8. End
}