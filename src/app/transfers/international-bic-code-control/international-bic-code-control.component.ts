// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { InternationalBeneficiaryBICValidator } from './internationalBeneficiaryBIC-validator.service';


	

// 2. Component Selector
@Component({
selector: 'app-international-bic-code-control',
templateUrl: './international-bic-code-control.component.html',
styleUrls: ['./international-bic-code-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => InternationalBICCodeControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class InternationalBICCodeControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef,private bicValidator:InternationalBeneficiaryBICValidator
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	protected  readonly maxLength : any = "11";
	 protected  readonly minLength : any = "8";
	 protected  readonly pattern : any = /^[A-Za-z0-9]{8,11}$/;
	override doPreInit(): void {
		this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
	this.addSyncValidatorFn(Validators.minLength(this.minLength));
	this.addSyncValidatorFn(Validators.pattern(this.pattern));
		// this.addAsyncValidatorFn(this.bicValidator.BICValidation(this.commonControlEvent,this.dependentValuesMap));
	this.addAsyncValidatorFn(this.bicValidator.bicFetchValidation(this.commonControlEvent,this.dependentValuesMap));
	this.addDependencies(['isValidationRequired']);

	} 
	
	// 8. End
}