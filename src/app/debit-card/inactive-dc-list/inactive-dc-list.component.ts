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

import {  InactivedcService  } from '../inactivedc-service/inactivedc.service';


// 2. Component Selector
@Component({
selector: 'app-inactive-dc-list',
templateUrl: './inactive-dc-list.component.html',
styleUrls: ['./inactive-dc-list.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => InactiveDCListComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class InactiveDCListComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private inactivedcService: InactivedcService
  ,private _validatorService:ValidatorService
	) {
	super(controlContainer,changeDetectorRef);
	}

	@Output() dataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
	// event methods
	override doPreInit(): void {
		this.addPKList(['cardRefNumber'])
	 this.setDataSource(this.inactivedcService);
    this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent,this.inactivedcService,this.formControlName,this.attributesMap));
	
	
 
	} 
	   
	
	// 8. End
}