// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-emp-dependent-emiratesid-control',
templateUrl: './emp-dependent-emiratesid-control.component.html',
styleUrls: ['./emp-dependent-emiratesid-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => EmpDependentEmiratesidComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class EmpDependentEmiratesidComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	 protected  readonly minLength : any = "99999999999999";
	 protected  readonly maxLength : any = "999999999999999";
	 protected  readonly pattern : any = /^[0-9]{15,15}$/;
	// event methods
	override doPreInit(): void {
	this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
	this.addSyncValidatorFn(Validators.minLength(this.minLength));
	this.addSyncValidatorFn(Validators.pattern(this.pattern));

	} 
	
	// 8. End
}