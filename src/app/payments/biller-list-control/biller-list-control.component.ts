// 1. Import Statements
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
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

import { BillerService } from '../biller-service/biller.service';
import { BillerIdFetchValidatorService } from './billerListFetch-validator.service';


// 2. Component Selector
@Component({
	selector: 'app-biller-list-control',
	templateUrl: './biller-list-control.component.html',
	styleUrls: ['./biller-list-control.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => BillerListControlComponent),
			multi: true,
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillerListControlComponent extends BaseFpxControlComponent {
	controlBusy:boolean = true;

	//4.  Constructor
	constructor(private controlContainer: ControlContainer, changeDetectorRef: ChangeDetectorRef
		, private billerService: BillerService
		, private _validatorService: ValidatorService,
		private _billerListFetchValidation: BillerIdFetchValidatorService
	) {
		super(controlContainer, changeDetectorRef);
	}
	@Output() dataReceived: EventEmitter<any> = new EventEmitter<any | null>();
	// event methods
	override doPreInit(): void {

		this.addPKList(['billerId']);
		// this.setDataSource(this.billerService);
		// this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent,this.billerService,this.formControlName,this.attributesMap));
		if (this.dependencyField) this.addDependencies(['categoryCode']);

		this.addAsyncValidatorFn(this._billerListFetchValidation.billerListFetchValidation(this.commonControlEvent, this.dependentValuesMap));
		// this.addAsyncValidatorFn(this._billerListFetchValidation.billerFetchValidation(this.commonControlEvent,this.dependentValuesMap));
	}

	protected override doPostInit(): void {
		let dependencyFieldsLen = this.dependencyField?.length || 0;
		if(dependencyFieldsLen == 0){
			this.controlBusy = true;
			let keys = {
				categoryCode: this.dependentValuesMap.get('categoryCode')
			}
			this.billerService.lookup(keys)().subscribe({
				next: (billers: any[]) => {
					this.setSelectableData(of(billers));
					this.controlBusy = false;
				},
				error: (err) => {
					this.controlBusy = false;
				},
			});
		} else {
			this.controlBusy = false;
			this.setDataSource(this.billerService);
		}
	}

	// 8. End
}