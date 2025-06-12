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

import { BeneccService } from '../benecc-service/benecc.service';
import { Benecc } from '../benecc-service/benecc.model';


// 2. Component Selector
@Component({
	selector: 'app-benecc-list-control',
	templateUrl: './benecc-list-control.component.html',
	styleUrls: ['./benecc-list-control.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => BeneccListControlComponent),
			multi: true,
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeneccListControlComponent extends BaseFpxControlComponent {
	controlBusy: boolean = false;
	//4.  Constructor
	constructor(private controlContainer: ControlContainer, changeDetectorRef: ChangeDetectorRef
		, private beneccService: BeneccService
		, private _validatorService: ValidatorService
	) {
		super(controlContainer, changeDetectorRef);
	}
	@Output() dataReceived: EventEmitter<any> = new EventEmitter<any | null>();
	// event methods
	override doPreInit(): void {
		this.setNgTemplateName('beneListTmplt');
		this.addPKList(['inventoryNumber']);
		// this.setDataSource(this.beneccService);
		this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent, this.beneccService, this.formControlName, this.attributesMap));
	}

	public override doPostInit(): void {
		let criteriaQuery = new CriteriaQuery();
		this.controlBusy = true;
		this.beneccService.findAll()().subscribe({
			next: (beneList: any) => {
				beneList.data.map((item: Benecc) => item.id = item.inventoryNumber);
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