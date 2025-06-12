// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-status-control',
templateUrl: './status-control.component.html',
styleUrls: ['./status-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => StatusControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class StatusControlComponent extends BaseFpxControlComponent {
	protected  readonly pattern = /^(?!.*(?:http:|https:|www\.|javascript|function|return))[a-zA-Z0-9\+\-\.\!@\/;:,\'=\$\^\?\*\(\) ]{1,120}$/;

	protected  readonly maxLength : any = "120";

	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}

	// event methods
	override doPreInit(): void {
		this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
		this.addSyncValidatorFn(Validators.pattern(this.pattern));

	} 
	
	// 8. End
}