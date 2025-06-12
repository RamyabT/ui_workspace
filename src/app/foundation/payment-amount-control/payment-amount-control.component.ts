// 1. Import Statements
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { ExchangeRateValidator } from './exchange-rate-validator.service';
import { PaymentAmountControlHelper } from './payment-amount-control.helper';




// 2. Component Selector
@Component({
	selector: 'app-payment-amount-control',
	templateUrl: './payment-amount-control.component.html',
	styleUrls: ['./payment-amount-control.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => PaymentAmountControlComponent),
			multi: true,
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentAmountControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer, changeDetectorRef: ChangeDetectorRef, private exchangeRateValidator: ExchangeRateValidator,
		public paymentAmountControlHelper: PaymentAmountControlHelper

	) {
		super(controlContainer, changeDetectorRef);
	}

	@Input() CurrencyList!: any[];
	@Input() isCurrEditable!: boolean;
	@Input() defaultFetch!: boolean;
	@Input() initCurrency!: any;
	@Input() amountInWords!: any;
	@Input() currListFromParent!: any;
	// event methods
	override doPreInit(): void {
		this.setHelper(this.paymentAmountControlHelper);
		this.addDependencies(this.dependencyField);
		this.addAsyncValidatorFn(this.exchangeRateValidator.exchangeRateValidation(this.commonControlEvent, this.dependentValuesMap));
		this.addPKList(['fromCurrency', 'againstCurrency', 'accountBalance']);
		this.addDependencies(['fromCurrency', 'againstCurrency', 'accountBalance','scheduleType','beneficiaryId']);
	}

	// 8. End
}