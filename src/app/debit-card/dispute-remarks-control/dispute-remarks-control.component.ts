// 1. Import Statements
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';




// 2. Component Selector
@Component({
	selector: 'app-dispute-remarks-control',
	templateUrl: './dispute-remarks-control.component.html',
	styleUrls: ['./dispute-remarks-control.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DisputeRemarksControlComponent),
			multi: true,
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisputeRemarksControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer, changeDetectorRef: ChangeDetectorRef
	) {
		super(controlContainer, changeDetectorRef);
	}
	// event methods
	protected readonly pattern: any = /^(?!.* {2,})(?! *$)[a-zA-Z0-9!@#$%^&()\-_=+\[\]{};:'",.*`~<>\/?\\| ]{3,100}$/;
	protected readonly maxLength: any = "100";
	protected readonly minLength: any = "3";
	override doPreInit(): void {
		this.addSyncValidatorFn(Validators.pattern(this.pattern));
		this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
		this.addSyncValidatorFn(Validators.minLength(this.minLength));
	}

	// 8. End
}