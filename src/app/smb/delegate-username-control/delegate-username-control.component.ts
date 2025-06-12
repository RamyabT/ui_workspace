// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { CustomerValidatorService } from './delegate-username-validator.service';


	

// 2. Component Selector
@Component({
selector: 'app-delegate-username-control',
templateUrl: './delegate-username-control.component.html',
styleUrls: ['./delegate-username-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => DelegateUsernameControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class DelegateUsernameControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef,
				private registeredUserValidator:CustomerValidatorService
		
	) {
	super(controlContainer,changeDetectorRef);
	}
	 protected  readonly maxLength : any = "30";
	 protected  readonly minLength : any = "8";
	 protected  readonly pattern : any = /^[A-Z0-9]{8,30}$/;
	// event methods
	override doPreInit(): void {
	let mode = this.getRoutingParam('mode');
	this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
	this.addSyncValidatorFn(Validators.minLength(this.minLength));
	this.addSyncValidatorFn(Validators.pattern(this.pattern));
    this.addPKList(['userName']);
	this.addDependencies(this.dependencyField);
	if(this.formMode != 'VIEW'){
	this.addAsyncValidatorFn(this.registeredUserValidator.username(this.commonControlEvent,this.dependentValuesMap));
	this.addAsyncValidatorFn(this.registeredUserValidator.delegateusername(this.commonControlEvent,this.dependentValuesMap));
	}
	this.addDependencies(['serviceCode','formMode','entryMode']);

}
	// 8. End
}