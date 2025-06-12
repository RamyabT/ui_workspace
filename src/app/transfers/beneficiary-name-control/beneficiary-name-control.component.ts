// 1. Import Statements
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


import { BeneficiaryNameControlService } from './beneficiary-name-control.service';


// 2. Component Selector
@Component({
	selector: 'app-beneficiary-name-control',
	templateUrl: './beneficiary-name-control.component.html',
	styleUrls: ['./beneficiary-name-control.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => BeneficiaryNameControlComponent),
			multi: true,
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeneficiaryNameControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer, changeDetectorRef: ChangeDetectorRef
		, private beneficiaryNameControlService: BeneficiaryNameControlService
	) {
		super(controlContainer, changeDetectorRef);
	}
	// event methods
	protected readonly maxLength: any = "25";
	protected readonly minLength: any = "1";
	protected readonly pattern: any = /^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|`~ -]*$/;
	
	override doPreInit(): void {
		this.setDataSource(this.beneficiaryNameControlService);
		this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
		this.addSyncValidatorFn(Validators.minLength(this.minLength));
		this.addSyncValidatorFn(Validators.pattern(this.pattern));

	}

	// 8. End
}