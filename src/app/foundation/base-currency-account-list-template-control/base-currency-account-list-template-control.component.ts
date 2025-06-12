// 1. Import Statements
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import {
	debounceTime,
	distinctUntilChanged,
	finalize,
	Observable,
	of,
	startWith,
	switchMap,
	tap,
} from 'rxjs';
import { ValidatorService } from '@fpx/core';
import { CasaaccountService } from '../casaaccount-service/casaaccount.service';
import { Casaaccount } from '../casaaccount-service/casaaccount.model';
import { AppConfigService } from '@dep/services';


// 2. Component Selector
@Component({
	selector: 'app-base-currency-account-list-template-control',
	templateUrl: './base-currency-account-list-template-control.component.html',
	styleUrls: ['./base-currency-account-list-template-control.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => BaseCurrencyAccountListTemplateControlComponent),
			multi: true,
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseCurrencyAccountListTemplateControlComponent extends BaseFpxControlComponent {
	@Input('setDefault') setDefault: boolean = true;
	controlBusy: boolean = false;
	//4.  Constructor
	constructor(
		private controlContainer: ControlContainer,
		changeDetectorRef: ChangeDetectorRef,
		private _casaAccountService: CasaaccountService,
		private _validatorService: ValidatorService,
		private _appConfig: AppConfigService
	) {
		super(controlContainer, changeDetectorRef);
	}

	@Output() dataReceived: EventEmitter<any> = new EventEmitter<any | null>();
	// event methods
	override doPreInit(): void {
		this.setNgTemplateName('accountListTmplt');
		this.addPKList(['accountNumber']);
		this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent, this._casaAccountService, this.formControlName, this.attributesMap));
	}

	public override doPostInit(): void {

			this.controlBusy = true;
			this._casaAccountService.findAll()().subscribe({
				next: (accounts: Casaaccount[]) => {
					let baseCurrencyaccounts  = accounts.filter(x=>x?.accountCurrency === this._appConfig.baseCurrency)
					baseCurrencyaccounts.map((item) => (item.id = item.accountNumber) );
					this.setSelectableData(of(baseCurrencyaccounts));
					if (!this.formControl?.parent?.get(this.formControlName)?.value && baseCurrencyaccounts.length == 1) {
						setTimeout(() => {
							this.formControl.setValue(baseCurrencyaccounts[0].accountNumber, { emitEvent: true });
						});
					}
					this.controlBusy = false;
				},
				error: (err) => {
				this.controlBusy = false;
					console.error("Casa account fetch error");
				},
			});
	}

	
}