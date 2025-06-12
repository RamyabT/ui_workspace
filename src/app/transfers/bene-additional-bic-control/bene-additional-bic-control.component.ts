// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-bene-additional-bic-control',
templateUrl: './bene-additional-bic-control.component.html',
styleUrls: ['./bene-additional-bic-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => BeneAdditionalBicComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class BeneAdditionalBicComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	 protected  readonly maxLength : any = "10";
	 protected  readonly minLength : any = "5";
	 protected  readonly pattern : any = /^(?:(?:\d{2}[-\s]?\d{2}[-\s]?\d{2})|(?:\d{5})|(?:[0-3]\d{8})|(?:\d{9}))$/;
	// event methods
	override doPreInit(): void {
	this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
	this.addSyncValidatorFn(Validators.minLength(this.minLength));
	this.addSyncValidatorFn(Validators.pattern(this.pattern));

	} 
	
	// 8. End
}