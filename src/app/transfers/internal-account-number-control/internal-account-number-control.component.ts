// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { WithinBankBeneficiaryValidator } from './withinBankBeneficiary-validator.service';


	

// 2. Component Selector
@Component({
selector: 'app-internal-account-number-control',
templateUrl: './internal-account-number-control.component.html',
styleUrls: ['./internal-account-number-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => InternalAccountNumberControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class InternalAccountNumberControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef,private accountNumberValidator:WithinBankBeneficiaryValidator
	) {
	super(controlContainer,changeDetectorRef);
	}
 @Input() visiblityChange:boolean=true;
@Input() autoComplete:boolean=false;
	// event methods
	protected readonly minLength : any =0;
	protected readonly maxLength : any=999999999999;
	override doPreInit(): void {
		this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
		this.addSyncValidatorFn(Validators.minLength(this.minLength));
		// this.addSyncValidatorFn(Validators.pattern(this.pattern));
		this.addDependencies(this.dependencyField);
		if (this.formMode != 'VIEW') {
			// this.addAsyncValidatorFn(this.accountNumberValidator.accountNumberValidation(this.commonControlEvent, this.dependentValuesMap));
			// this.addAsyncValidatorFn(this.accountNumberValidator.accountNumberFetchValidation(this.commonControlEvent,this.dependentValuesMap));
		}
		this.addPKList(['serviceCode']);
		this.addDependencies(['serviceCode']);


	} 
	
	// 8. End
}