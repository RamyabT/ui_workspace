import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';

@Component({
	selector: 'app-landline-number-control',
	templateUrl: './landline-number-control.component.html',
	styleUrls: ['./landline-number-control.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LandlineNumberControlComponent),
			multi: true,
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandlineNumberControlComponent extends BaseFpxControlComponent {
	constructor(private controlContainer: ControlContainer, changeDetectorRef: ChangeDetectorRef
	) {
		super(controlContainer, changeDetectorRef);
	}
	protected readonly minLength: any = "6";
	protected readonly maxLength: any = "12";
	protected readonly pattern: any = /^[ 0-9]{6,12}$/;
	override doPreInit(): void {
		this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
		this.addSyncValidatorFn(Validators.minLength(this.minLength));
		this.addSyncValidatorFn(Validators.pattern(this.pattern));
	}
}