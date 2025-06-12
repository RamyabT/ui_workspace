// 1. Import Statements
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent, CriteriaQuery } from '@fpx/core';
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

import { BeneinternalService } from '../beneinternal-service/beneinternal.service';
import { beneInternallistControlHelper } from './bene-internal-list-control.helper';
import { Beneinternal } from '../beneinternal-service/beneinternal.model';


// 2. Component Selector
@Component({
	selector: 'app-bene-internal-list-control',
	templateUrl: './bene-internal-list-control.component.html',
	styleUrls: ['./bene-internal-list-control.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => beneInternallistControlComponent),
			multi: true,
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class beneInternallistControlComponent extends BaseFpxControlComponent {
	controlBusy:boolean = false;
	//4.  Constructor
	constructor(private controlContainer: ControlContainer, changeDetectorRef: ChangeDetectorRef
		, private beneinternalService: BeneinternalService
		, private _validatorService: ValidatorService,
		protected _beneInternalListHelper: beneInternallistControlHelper
	) {
		super(controlContainer, changeDetectorRef);
	}
	@Output() dataReceived: EventEmitter<any> = new EventEmitter<any | null>();
	// event methods
	override doPreInit(): void {
		this.setNgTemplateName('beneListTmplt');
		this.setHelper(this._beneInternalListHelper)

		this.addPKList(['inventoryNumber']);
		// this.setDataSource(this.beneinternalService);
		this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent, this.beneinternalService, this.formControlName, this.attributesMap));
	}



	public override doPostInit(): void {
		this.controlBusy = true;
		let criteriaQuery = new CriteriaQuery()
		this.beneinternalService.findAll()().subscribe({
			next: (beneList: any) => {
				beneList.data.map((item: Beneinternal) => item.id = item.inventoryNumber);
				this.setSelectableData(of(beneList.data));
				if (!this.formControl?.parent?.get('beneficiaryId')?.value && beneList.data.length == 1) {
					setTimeout(() => {
						this.formControl.setValue(beneList.data[0].inventoryNumber, { emitEvent: true });
					});
				}
				this.controlBusy = false;
			},
			error: (err) => {
				this.controlBusy = false;
			},
		})
	}
	// 8. End
}