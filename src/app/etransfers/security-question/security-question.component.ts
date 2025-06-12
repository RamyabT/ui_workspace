// 1. Import Statements
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';




// 2. Component Selector
@Component({
	selector: 'app-security-question',
	templateUrl: './security-question.component.html',
	styleUrls: ['./security-question.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SecurityQuestionComponent),
			multi: true,
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityQuestionComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer, changeDetectorRef: ChangeDetectorRef
	) {
		super(controlContainer, changeDetectorRef);
	}
	protected readonly pattern: any = /^[a-zA-Z0-9][a-zA-Z0-9?\-'_,.]*(?: [a-zA-Z0-9?\-'_,.]*)*$/;
	protected readonly maxLength: any = "40";
	protected readonly minLength: any = "1";
	// event methods
	override doPreInit(): void {
		this.addSyncValidatorFn(Validators.minLength(this.minLength));
		this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
		this.addSyncValidatorFn(Validators.pattern(this.pattern));
	}

	// 8. End
}