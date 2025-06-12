// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { InternationalIbanBeneficiaryValidator } from './internationalIbanBeneficiaryValidator-validator.service';


	

// 2. Component Selector
@Component({
selector: 'app-international-iban-control',
templateUrl: './international-iban-control.component.html',
styleUrls: ['./international-iban-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => InternationalIbanControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class InternationalIbanControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef,private internationalIbanBeneficiaryValidator:InternationalIbanBeneficiaryValidator
	) {
	super(controlContainer,changeDetectorRef);
	}
	 protected  readonly maxLength : any = "23";
	 protected  readonly minLength : any = "23";
	 protected  readonly pattern : any = /^[A-Z]{2}[A-Z0-9]{21,21}$/;
	// event methods
	override doPreInit(): void {
	this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
	this.addSyncValidatorFn(Validators.minLength(this.minLength));
	this.addSyncValidatorFn(Validators.pattern(this.pattern));
	this.addDependencies(this.dependencyField);
	if(this.formMode != 'VIEW'){
		this.addAsyncValidatorFn(this.internationalIbanBeneficiaryValidator.ibanDuplicateValidation(this.commonControlEvent,this.dependentValuesMap));
		// this.addAsyncValidatorFn(this.internationalIbanBeneficiaryValidator.ibanFetchValidation(this.commonControlEvent,this.dependentValuesMap));
	}
	
	this.addPKList(['serviceCode']);
    this.addDependencies(['serviceCode']);
	

	} 
	
	// 8. End
}