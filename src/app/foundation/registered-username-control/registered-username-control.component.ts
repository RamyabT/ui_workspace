// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { CustomerValidatorService } from './registered-username-control.service';


	

// 2. Component Selector
@Component({
selector: 'app-registered-username-control',
templateUrl: './registered-username-control.component.html',
styleUrls: ['./registered-username-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => RegisteredUserNameControlComponent),
multi: true,
},
CustomerValidatorService
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class RegisteredUserNameControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef,
		private registeredUserValidator:CustomerValidatorService
	) {
	super(controlContainer,changeDetectorRef);
	}
	 protected  readonly maxLength : any = "32";
	 protected  readonly minLength : any = "8";
	 protected  readonly pattern : any = /^[a-zA-Z0-9]{8,32}$/;
	// event methods
	override doPreInit(): void {
	this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
	this.addSyncValidatorFn(Validators.minLength(this.minLength));
	this.addSyncValidatorFn(Validators.pattern(this.pattern));
	this.addPKList(['userName']);
	this.addAsyncValidatorFn(this.registeredUserValidator.username(this.commonControlEvent));
	} 
	
	// 8. End
}