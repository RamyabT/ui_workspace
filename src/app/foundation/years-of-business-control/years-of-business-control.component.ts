// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-years-of-business-control',
templateUrl: './years-of-business-control.component.html',
styleUrls: ['./years-of-business-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => YearsOfBusinessComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class YearsOfBusinessComponent extends BaseFpxControlComponent {
	//4.  Constructor
	protected  readonly maxVal : any = "100";
	protected  readonly minVal : any = 1;
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
		this.addSyncValidatorFn(Validators.min(this.minVal));
	} 
	
	// 8. End
}