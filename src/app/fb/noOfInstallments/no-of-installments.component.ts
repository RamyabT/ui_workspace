// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-no-of-installments',
templateUrl: './no-of-installments.component.html',
styleUrls: ['./no-of-installments.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => noOfInstallmentsComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class noOfInstallmentsComponent extends BaseFpxControlComponent {
	protected readonly maxVal:number = 999999;
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