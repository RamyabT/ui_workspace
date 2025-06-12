// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-maturity-age',
templateUrl: './maturity-age.component.html',
styleUrls: ['./maturity-age.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => MaturityAgeComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class MaturityAgeComponent extends BaseFpxControlComponent {
	//4.  Constructor
	protected  readonly maxVal : any = "100";
	protected  readonly minVal : any = 1;
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
		// this.addSyncValidatorFn(Validators.max(this.maxVal));
		this.addSyncValidatorFn(Validators.min(this.minVal));
	} 
	
	// 8. End
}