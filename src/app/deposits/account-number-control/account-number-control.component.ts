// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-account-number-control',
templateUrl: './account-number-control.component.html',
styleUrls: ['./account-number-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => AccontNumberControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class AccontNumberControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	
	) {
	super(controlContainer,changeDetectorRef);
	}	
	 //protected  readonly pattern : any = /^[A-Z0-9]{11,11}$/;
	// event methods
	override doPreInit(): void {
	//this.addSyncValidatorFn(Validators.pattern(this.pattern));
 
	} 
	   
	
	// 8. End
}