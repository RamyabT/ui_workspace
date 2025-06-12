// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-client-number-control',
templateUrl: './client-number-control.component.html',
styleUrls: ['./client-number-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => ClientNumberControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class ClientNumberControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}
	protected  readonly maxLength : any = "8";
	protected  readonly minLength : any = "5";
	protected  readonly pattern : any = /^[0-9]{3,8}$/;
	// event methods
	override doPreInit(): void {
		this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
		this.addSyncValidatorFn(Validators.minLength(this.minLength));
		this.addSyncValidatorFn(Validators.pattern(this.pattern)); 

	} 
	
	// 8. End
}