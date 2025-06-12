// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent, ValidatorService } from '@fpx/core';
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

import {  RpcontractsService  } from '../rpcontracts-service/rpcontracts.service';


// 2. Component Selector
@Component({
selector: 'app-rp-plancontract-control',
templateUrl: './rp-plancontract-control.component.html',
styleUrls: ['./rp-plancontract-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => rpPlanContractControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class rpPlanContractControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private rpcontractsService: RpcontractsService,
	private _validatorService:ValidatorService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   
    this.addPKList(['rpContractNumber']);
	this.addDependencies(['serviceCode', 'segmenId']);
	this.setDataSource(this.rpcontractsService);
	this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent,this.rpcontractsService,this.formControlName,this.attributesMap));
	} 
	
	// 8. End
}