// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-mobile-phone-number-control',
templateUrl: './mobile-phone-number-control.component.html',
styleUrls: ['./mobile-phone-number-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => MobilePhoneNumberControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class MobilePhoneNumberControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	 protected  readonly maxLength : any = "9999999999";
	 protected  readonly minLength : any = 0;
	// event methods
	override doPreInit(): void {
	// this.addSyncValidatorFn(Validators.pattern(this.pattern));

	} 
	
	// 8. End
}