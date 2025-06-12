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

import {  RpexistingcontractinfoService  } from '../rpexistingcontractinfo-service/rpexistingcontractinfo.service';


// 2. Component Selector
@Component({
selector: 'app-retail-plan-contract-control',
templateUrl: './retail-plan-contract-control.component.html',
styleUrls: ['./retail-plan-contract-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => RetailPlanContractControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class RetailPlanContractControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private rpexistingcontractinfoService: RpexistingcontractinfoService
  ,private _validatorService:ValidatorService
	) {
	super(controlContainer,changeDetectorRef);
	}
	@Output() dataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
	// event methods
	override doPreInit(): void {
	      
	   
    this.addPKList(['tenantId','rpContractNumber']);
	this.setDataSource(this.rpexistingcontractinfoService);
    this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent,this.rpexistingcontractinfoService,this.formControlName,this.attributesMap));
	} 
	
	// 8. End
}