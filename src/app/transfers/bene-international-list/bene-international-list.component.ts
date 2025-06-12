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

import { BeneInternationalService } from '../beneInternational-service/beneInternational.service';
import { BeneInternational } from '../beneInternational-service/beneInternational.model';
import { BeneInternationalListHelper } from './bene-international-list.helper';


// 2. Component Selector
@Component({
	selector: 'app-bene-international-list',
	templateUrl: './bene-international-list.component.html',
	styleUrls: ['./bene-international-list.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => BeneInternationalListComponent),
			multi: true,
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeneInternationalListComponent extends BaseFpxControlComponent {
	controlBusy: boolean = false;
	//4.  Constructor
	constructor(private controlContainer: ControlContainer, changeDetectorRef: ChangeDetectorRef
		, private beneInternationalService: BeneInternationalService
		, private _validatorService: ValidatorService,
		protected _internationalBeneListHelper: BeneInternationalListHelper
	) {
		super(controlContainer, changeDetectorRef);
	}
	@Output() dataReceived: EventEmitter<any> = new EventEmitter<any | null>();
	// event methods
	override doPreInit(): void {
		this.setNgTemplateName('beneListTmplt');
		this.setHelper(this._internationalBeneListHelper)
		this.addPKList(['inventoryNumber']);
		// this.setDataSource(this.beneInternationalService);
		this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent, this.beneInternationalService, this.formControlName, this.attributesMap));
	}

	public override doPostInit(): void {
		// let criteriaQuery = new CriteriaQuery();
		this.controlBusy = true;
		this.beneInternationalService.findAll()().subscribe({
			next: (beneList: any) => {
				beneList.data.map((item: BeneInternational) => item.id = item.inventoryNumber);
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