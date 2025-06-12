// 1. Import Statements
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AppConfigService } from '@dep/services';
import { BaseFpxControlComponent } from '@fpx/core';




// 2. Component Selector
@Component({
	selector: 'app-installment-number-control',
	templateUrl: './installment-number-control.component.html',
	styleUrls: ['./installment-number-control.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InstallmentNumberControlComponent),
			multi: true,
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstallmentNumberControlComponent extends BaseFpxControlComponent {

	@Input() override min: number = 1;
	@Input() override max: number = 9999;
	@Input() step: number = 1;
	@Input() readonly: boolean = false;

	currentValue: number = 0;
	disabled: boolean = false;
	isDecrementDisabled: boolean = false;
	isIncrementDisabled: boolean = false;
	minimumValue: number = 2;

	//4.  Constructor
	constructor(private controlContainer: ControlContainer, changeDetectorRef: ChangeDetectorRef, private _appConfig: AppConfigService
	) {
		super(controlContainer, changeDetectorRef);
	}
	protected readonly pattern: any = /^(?!0+$)[0-9]+$/;
	protected readonly minLength: any = "1";
	protected readonly maxLength: any = "9999";
	@Output() dataReceived: EventEmitter<any> = new EventEmitter<any | null>();
	@ViewChild('inputField') inputField: ElementRef<HTMLInputElement> | undefined;
	// event methods
	override doPreInit(): void {
		if(this.formControl.value){
			this.currentValue=this.formControl.value
		}

		this.addSyncValidatorFn(Validators.max(this.maxLength));
		// this.addSyncValidatorFn(Validators.minLength(this.minLength));
		this.addSyncValidatorFn(Validators.pattern(this.pattern))


		this._appConfig.getData('modulenumberOfPaymentsUpdatedRefresh$').observable.subscribe(
			(res: any) => {
				console.log("res", res)
				this.currentValue = res.data;
				if (this.currentValue <= this.minimumValue) {
					this.isDecrementDisabled = true;
				} else {
					this.isDecrementDisabled = false;
				}
			}
		);
	}

	preventDecimal(event: KeyboardEvent) {
		if (event.key === '.' || event.key === ',') {
			event.preventDefault();
		}
	}
	onInputChange(event: Event): void {
		if (this.disabled || this.readonly) return;
		const inputElement = event.target as HTMLInputElement;
		const rawValue = inputElement.value;

		if (rawValue === '') {
			this.currentValue = 0;
			this.isDecrementDisabled = true;
		} else {
			
			const numericValue = parseFloat(rawValue);
			if (!isNaN(numericValue)) {
				this.currentValue = this.clampValue(numericValue);
			} else {
				this.currentValue = this.currentValue;
			}
			if (this.currentValue  < this.max) {
			this.isIncrementDisabled = false;
			}
			if (this.currentValue > this.minimumValue) {
				this.isDecrementDisabled = false;
			}

		}
		// this.formControl.setValue(this.currentValue,{emitEvent: true})
		this.onChange(this.currentValue);
	}
	private updateValue(value: number): void {
		this.currentValue = this.clampValue(value);
		if (value <= this.minimumValue) {
			this.isDecrementDisabled = true;
		}
		else if (value >= this.max) {
			this.isIncrementDisabled = true;
		}
		else {
			this.isDecrementDisabled = false;
			this.isIncrementDisabled = false;
		}
		this.onChange(this.currentValue);
	}

	private clampValue(value: any): number {
		let clampedValue = value;
		if (this.max !== Infinity && value > this.max) {
			clampedValue = this.max;
		}
		if (this.minimumValue !== -Infinity && value < this.minimumValue) {
			clampedValue = value;
		}
		return clampedValue;
	}

	decrement() {
		if (this.isDecrementDisabled) return;
		let newValue = (this.currentValue === null ? 0 : this.currentValue) - this.step;
		this.updateValue(newValue);
		this.onTouched();
	}
	increment() {
		if (this.isIncrementDisabled) return;
		let newValue = (this.currentValue === null ? 0 : this.currentValue) + this.step;
		this.updateValue(newValue);
		this.onTouched();
	}

	onblurInput(event: any) {
		if (event.target.value === '') {
			this.formControl.setValue(this.currentValue, { emitEvent: true })
			console.log('onblurInput', event.target.value);
		}
	}
	// 8. End
}