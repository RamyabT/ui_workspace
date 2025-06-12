// 1. Import Statements
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
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

import { WalletService } from '../wallet-service/wallet.service';
import { WalletAccountNumberDropdownControlHelper } from './wallet-account-number-dropdown-control.helper';
import { AppConfigService } from '@dep/services';
import { Wallet } from '../wallet-service/wallet.model';


// 2. Component Selector
@Component({
	selector: 'app-wallet-account-number-dropdown-control',
	templateUrl: './wallet-account-number-dropdown-control.component.html',
	styleUrls: ['./wallet-account-number-dropdown-control.component.scss'],
	providers: [WalletAccountNumberDropdownControlHelper,
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => WalletAccountNumberDropdownControlComponent),
			multi: true,
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletAccountNumberDropdownControlComponent extends BaseFpxControlComponent {
	controlBusy: boolean = false;
	//4.  Constructor
	constructor(private controlContainer: ControlContainer, changeDetectorRef: ChangeDetectorRef
		, private walletService: WalletService
		, private _validatorService: ValidatorService,
		private _walletAccountNumberDropdownControlHelper: WalletAccountNumberDropdownControlHelper,
		private _appConfig: AppConfigService
	) {
		super(controlContainer, changeDetectorRef);
	}
	@Output() dataReceived: EventEmitter<any> = new EventEmitter<any | null>();
	// event methods
	override doPreInit(): void {
		this.setNgTemplateName('walletListTmplt');
		this.addPKList(['walletId']);
		if (this.dependencyField && this.dependencyField.length) this.addDependencies(this.dependencyField);
		// this.setDataSource(this.walletService);
		this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent, this.walletService, this.formControlName, this.attributesMap));
		this.setHelper(this._walletAccountNumberDropdownControlHelper);
	}

	public override doPostInit(): void {
		let dependencyFieldsLen = this.dependencyField?.length || 0;
		if (dependencyFieldsLen == 0) {
			this.controlBusy = true;
			this.walletService.fetchWallets()().subscribe({
				next: (wallet: any[]) => {
					wallet.map((item) => item.id = item.walletAccountNumber);
					this._appConfig.setData('walletsList', wallet);
					this.setSelectableData(of(wallet));
					if (!this.formControl?.parent?.get(this.formControlName)?.value && wallet.length == 1) {
						setTimeout(() => {
							this.formControl.setValue(wallet[0].walletAccountNumber, { emitEvent: true });
						});
					}
					this.controlBusy = false;
				},
				error: (err) => {
					this.controlBusy = false;
					console.error("Wallet list fetch error");
				},
			});
		}
	}
	override doChangeNotify(subject: string, payload: any): void {
		let _sourceAccount = payload.creditWalletAccount || payload.toAccount;
		let _wallets!: Wallet[];
		if (this._appConfig.hasData('walletsList')) {
			_wallets = this._appConfig.getData('walletsList');
			_wallets = _wallets.filter((wallet: Wallet) => wallet.walletAccountNumber != _sourceAccount);
			this.setSelectableData(of(_wallets));
		} else {
			this.walletService.fetchWallets()().subscribe({
				next: (accounts: Wallet[]) => {
					accounts.map((item) => item.walletId = item.walletAccountNumber);
					this.setSelectableData(of(accounts));
				},
				error: (err) => {
					console.error("Wallet list fetch error");
				},
			});
		}
	}

	// 8. End
}