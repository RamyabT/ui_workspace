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
import { AccountListTemplateControlHelper } from './account-list-template-control.helper';
import { AppConfigService } from '@dep/services';


// 2. Component Selector
@Component({
	selector: 'app-account-list-template-control',
	templateUrl: './account-list-template-control.component.html',
	styleUrls: ['./account-list-template-control.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => AccountListTemplateControlComponent),
			multi: true,
		},
		AccountListTemplateControlHelper
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountListTemplateControlComponent extends BaseFpxControlComponent {
	@Input('setDefault') setDefault: boolean = true;
	controlBusy: boolean = false;
	//4.  Constructor
	constructor(
		private controlContainer: ControlContainer,
		changeDetectorRef: ChangeDetectorRef,
		private _casaAccountService: CasaaccountService,
		private _validatorService: ValidatorService,
		protected _accountListTemplateControlHelper: AccountListTemplateControlHelper,
		private _appConfig: AppConfigService
	) {
		super(controlContainer, changeDetectorRef);
	}

	@Output() dataReceived: EventEmitter<any> = new EventEmitter<any | null>();
	// event methods
	override doPreInit(): void {
		if(this.dependencyField) this.addDependencies(this.dependencyField);
		// this.setHelper(this._accountListTemplateControlHelper);
		this.setNgTemplateName('accountListTmplt');
		this.addPKList(['accountNumber']);
		this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent, this._casaAccountService, this.formControlName, this.attributesMap));
	}

	public override doPostInit(): void {
		let dependencyFieldsLen = this.dependencyField?.length || 0;
		if(dependencyFieldsLen == 0){
			this.controlBusy = true;
			this._casaAccountService.findAll()().subscribe({
				next: (accounts: Casaaccount[]) => {

					accounts.map((item) => item.id = item.accountNumber);
					
					this._appConfig.setData('casaAccountsList', accounts);
					this.setSelectableData(of(accounts));
					if (!this.formControl?.parent?.get(this.formControlName)?.value && accounts.length == 1) {
						setTimeout(() => {
							this.formControl.setValue(accounts[0].accountNumber, { emitEvent: true });
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

	override doChangeNotify(subject: string, payload: any): void {
        let _sourceAccount = payload.sourceAccount;
        let _accounts!: Casaaccount[];
        if(this._appConfig.hasData('casaAccountsList')){
            _accounts = this._appConfig.getData('casaAccountsList');
			_accounts = _accounts.filter((account:Casaaccount) => account.accountNumber != _sourceAccount);
			this.setSelectableData(of(_accounts));
        } else {
			this._casaAccountService.findAll()().subscribe({
				next: (accounts: Casaaccount[]) => {
					accounts.map((item) => item.id = item.accountNumber);
					this.setSelectableData(of(accounts));
				},
				error: (err) => {
					console.error("Casa account fetch error");
				},
			});
		}
	}
}