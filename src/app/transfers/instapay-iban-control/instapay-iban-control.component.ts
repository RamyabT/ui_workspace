// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { InstaPayIbanValidator } from './instaPayIbanValidator-validator.service';


	

// 2. Component Selector
@Component({
selector: 'app-instapay-iban-control',
templateUrl: './instapay-iban-control.component.html',
styleUrls: ['./instapay-iban-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => InstaPayIbanControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class InstaPayIbanControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef,
		private instaPayIbanValidator:InstaPayIbanValidator) {
	super(controlContainer,changeDetectorRef);
	}
	
	// event methods
	protected  readonly maxLength : any = "23";
	protected  readonly minLength : any = "23";
	protected  readonly pattern : any = /^[A-Z]{2}[A-Z0-9]{21,21}$/;
	override doPreInit(): void {
	this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
	this.addSyncValidatorFn(Validators.minLength(this.minLength));
	this.addSyncValidatorFn(Validators.pattern(this.pattern));
	this.addAsyncValidatorFn(this.instaPayIbanValidator.ibanFetchValidation(this.commonControlEvent,this.dependentValuesMap));

	} 
	
	// 8. End
}