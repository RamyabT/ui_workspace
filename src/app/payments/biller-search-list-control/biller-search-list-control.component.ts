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

import {  BillerService  } from '../biller-service/biller.service';
import { BillerSearchListControlHelper } from './biller-search-list-control.helper';
import { BillerIdFetchValidatorService } from '../biller-list-control/billerListFetch-validator.service';


// 2. Component Selector
@Component({
selector: 'app-biller-search-list-control',
templateUrl: './biller-search-list-control.component.html',
styleUrls: ['./biller-search-list-control.component.scss'],
providers: [
	BillerSearchListControlHelper,
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => BillerSearchListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class BillerSearchListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(public _billerSearchListControlHelper:BillerSearchListControlHelper,private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private billerService: BillerService,
	private _billerListFetchValidation:BillerIdFetchValidatorService

	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
		this.setHelper(this._billerSearchListControlHelper);


		this.addPKList(['billerId']);
		this.setDataSource(this.billerService);
		this.addAsyncValidatorFn(this._billerListFetchValidation.billerListFetchValidation(this.commonControlEvent, this.dependentValuesMap));
		let parentFormData = this.formControl.parent?.value;
		if(parentFormData?.operationMode == 'M' || parentFormData?.operationMode == 'D' ){
			this.setDropdownMode('BASIC');
		} else {
			this.setDropdownMode('SEARCHABLE');
		}
		
	}

	// 8. End
}