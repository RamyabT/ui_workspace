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
import { BilleraccountService } from '../billeraccount-service/billeraccount.service';
import { BillerAccountFetchValidatorService } from './billerAccount-validator.service';

//import {  BilleraccountService  } from '../../bill-payments/billeraccount-service/billeraccount.service';


// 2. Component Selector
@Component({
selector: 'app-billeraccount-list-control',
templateUrl: './billeraccount-list-control.component.html',
styleUrls: ['./billeraccount-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => BilleraccountListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class BilleraccountListControlComponent extends BaseFpxControlComponent {
	
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private billeraccountService: BilleraccountService,
	private _validatorService: ValidatorService,
	private _billerAccountFetchValidatorService: BillerAccountFetchValidatorService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   
    this.addPKList(['billerBeneficiaryId']);
	this.setDataSource(this.billeraccountService);
	//this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent,this.billeraccountService,this.formControlName,this.attributesMap));


	this.addAsyncValidatorFn(this._billerAccountFetchValidatorService.billerAccFetchValidation(this.commonControlEvent,this.dependentValuesMap));
	} 
	
	// 8. End
}