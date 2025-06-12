// 1. Import Statements
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
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

import { EstmtrelationshipService } from '../estmtrelationship-service/estmtrelationship.service';
import { estmtrelationshipHelper } from './estmtrelationship.helper';


// 2. Component Selector
@Component({
	selector: 'app-estmtrelationship',
	templateUrl: './estmtrelationship.component.html',
	styleUrls: ['./estmtrelationship.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => estmtrelationshipComponent),
			multi: true,
		},
		estmtrelationshipHelper
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class estmtrelationshipComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer, changeDetectorRef: ChangeDetectorRef
		, private estmtrelationshipService: EstmtrelationshipService,
		private _validatorService: ValidatorService,
		private _estmtrelationshipHelper: estmtrelationshipHelper
	) {
		super(controlContainer, changeDetectorRef);
	}
	// event methods
	@Output() dataReceived: EventEmitter<any> = new EventEmitter<any | null>();
	override doPreInit(): void {

		this.addPKList(['relationshipCode']);
		this.setDataSource(this.estmtrelationshipService);
		this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent, this.estmtrelationshipService, this.formControlName, this.attributesMap));
		this.setHelper(this._estmtrelationshipHelper);
	}

	// 8. End
}