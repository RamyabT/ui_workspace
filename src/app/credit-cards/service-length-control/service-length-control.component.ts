// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-service-length-control',
templateUrl: './service-length-control.component.html',
styleUrls: ['./service-length-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => LengthOfServiceCcontrolComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class LengthOfServiceCcontrolComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	protected  readonly pattern : any = /^[0-9]{1,2}$/;
	protected  readonly maxLength : any = "2";
	protected  readonly minLength : any = "1";
	// event methods
	override doPreInit(): void {

	} 
	
	// 8. End
}