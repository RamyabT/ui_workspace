// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { InternationalBeneficiaryValidator } from './internationalBeneficiary-validator.service';


	

// 2. Component Selector
@Component({
selector: 'app-international-account-number-control',
templateUrl: './international-account-number-control.component.html',
styleUrls: ['./international-account-number-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => InternationalAccountNumberControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class InternationalAccountNumberControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef,private accountNumberValidator:InternationalBeneficiaryValidator
	) {
	super(controlContainer,changeDetectorRef);
	}
 @Input() visiblityChange:boolean=true;
@Input() autoComplete:boolean=false;
	// event methods

	protected readonly maxLength : any ="16";
	 protected readonly minLength : any="5";
	 protected  readonly pattern : any = /^[0-9]{5,16}$/;
	override doPreInit(): void {
		this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
	this.addSyncValidatorFn(Validators.minLength(this.minLength));
	this.addSyncValidatorFn(Validators.pattern(this.pattern));
	this.addDependencies(this.dependencyField);
	this.addAsyncValidatorFn(this.accountNumberValidator.accountNumberValidation(this.commonControlEvent,this.dependentValuesMap));
	this.addPKList(['serviceCode']);
    this.addDependencies(['serviceCode']);

	} 
	
	// 8. End
}