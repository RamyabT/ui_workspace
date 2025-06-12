// 1. Import Statements
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { DomesticBICBeneficiaryValidator } from './domesticBeneficiaryBIC-validator.service';




// 2. Component Selector
@Component({
	selector: 'app-domestic-bic-control',
	templateUrl: './domestic-bic-control.component.html',
	styleUrls: ['./domestic-bic-control.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DomesticBicControlComponent),
			multi: true,
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DomesticBicControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer, changeDetectorRef: ChangeDetectorRef, private bicValidator: DomesticBICBeneficiaryValidator
	) {
		super(controlContainer, changeDetectorRef);
	}
	protected readonly maxLength: any = "11";
	protected readonly minLength: any = "8";
	protected readonly pattern: any = /^[A-Za-z0-9]{8,11}$/;
	// event methods
	override doPreInit(): void {
		this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
		this.addSyncValidatorFn(Validators.minLength(this.minLength));
		this.addSyncValidatorFn(Validators.pattern(this.pattern));
		if (this.formMode != 'VIEW') {
			// this.addAsyncValidatorFn(this.bicValidator.BICValidation(this.commonControlEvent, this.dependentValuesMap));
			this.addAsyncValidatorFn(this.bicValidator.bicFetchValidation(this.commonControlEvent, this.dependentValuesMap));
		}
	}

	// 8. End
}