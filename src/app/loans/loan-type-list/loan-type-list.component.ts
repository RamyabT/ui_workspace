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

import {  LoansgroupService  } from '../loansgroup-service/loansgroup.service';


// 2. Component Selector
@Component({
selector: 'app-loan-type-list',
templateUrl: './loan-type-list.component.html',
styleUrls: ['./loan-type-list.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => LoanTypeListComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class LoanTypeListComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private loansgroupService: LoansgroupService
  ,private _validatorService:ValidatorService
	) {
	super(controlContainer,changeDetectorRef);
	}
	@Output() dataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
	// event methods
	override doPreInit(): void {
	   
    this.addPKList(['productGCode']);
	this.setDataSource(this.loansgroupService);
    this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent,this.loansgroupService,this.formControlName,this.attributesMap));
	} 
	
	// 8. End
}