// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-employees-count-control',
templateUrl: './employees-count-control.component.html',
styleUrls: ['./employees-count-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => EmployeeCountComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class EmployeeCountComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {

	} 
	
	// 8. End
}