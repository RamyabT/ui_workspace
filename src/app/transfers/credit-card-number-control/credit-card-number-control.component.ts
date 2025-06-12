// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { CreditCardBeneficiaryValidator } from './creditCardBeneficiary-validator.service';


	

// 2. Component Selector
@Component({
selector: 'app-credit-card-number-control',
templateUrl: './credit-card-number-control.component.html',
styleUrls: ['./credit-card-number-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => CreditCardNumberControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class CreditCardNumberControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef,private creditCardNumberValidator:CreditCardBeneficiaryValidator
	) {
	super(controlContainer,changeDetectorRef);
	}
 @Input() visiblityChange:boolean=true;
@Input() autoComplete:boolean=false;
protected readonly maxLength : any ="16";
	protected readonly minLength : any="16";
	 protected  readonly pattern : any = /^(?!0{16})\d{16}$/;
	 ;
	// event methods
	override doPreInit(): void {
		this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
		this.addSyncValidatorFn(Validators.minLength(this.minLength));
		this.addSyncValidatorFn(Validators.pattern(this.pattern));
	this.addDependencies(this.dependencyField);
	if(this.formMode != 'VIEW'){
		this.addAsyncValidatorFn(this.creditCardNumberValidator.creditCardNumberValidation(this.commonControlEvent,this.dependentValuesMap));
	}
	this.addPKList(['serviceCode']);
    this.addDependencies(['serviceCode','formMode','entryMode']);


	} 
	
	// 8. End
}