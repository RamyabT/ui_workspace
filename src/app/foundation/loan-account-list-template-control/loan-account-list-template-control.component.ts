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
import { AppConfigService } from '@dep/services';
import { LoanAccountListTemplateControlHelper } from './loan-account-list-template-control.helper';
import { LoansService } from 'src/app/loans/loans-service/loans.service';
import { Loans } from 'src/app/loans/loans-service/loans.model';


// 2. Component Selector
@Component({
	selector: 'app-loan-account-list-template-control',
	templateUrl: './loan-account-list-template-control.component.html',
	styleUrls: ['./loan-account-list-template-control.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LoanAccountListTemplateControlComponent),
			multi: true,
		},
		LoanAccountListTemplateControlHelper
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoanAccountListTemplateControlComponent extends BaseFpxControlComponent {
	@Input('setDefault') setDefault: boolean = true;
	//4.  Constructor
	constructor(
		private controlContainer: ControlContainer,
		changeDetectorRef: ChangeDetectorRef,
		private _loansService: LoansService,
		private _validatorService: ValidatorService,
		protected _loanAccountListTemplateControlHelper: LoanAccountListTemplateControlHelper,
		private _appConfig: AppConfigService
	) {
		super(controlContainer, changeDetectorRef);
	}

	@Output() dataReceived: EventEmitter<any> = new EventEmitter<any | null>();
	// event methods
	override doPreInit(): void {
		this.setHelper(this._loanAccountListTemplateControlHelper);
		this.setDataSource(this._loansService);
		this.setNgTemplateName('loanAccountListTmplt');
		this.setDataSource(this._loansService);
		this.addPKList(['loanAccountNumber']);
		this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent, this._loansService, this.formControlName, this.attributesMap));
	}

	public override doPostInit(): void {
		this._loansService.fetchLoans().subscribe({
			next: (loans: Loans[]) => {
				loans.map((item) => item.id = item.loanAccountNumber);
				this.setSelectableData(of(loans));
				if (!this.formControl?.parent?.get(this.formControlName)?.value && this.setDefault) {
					setTimeout(() => {
						this.formControl.setValue(loans[0].loanAccountNumber, { emitEvent: true });
					});
				}
			},
			error: (err) => {
				console.error("Loan account fetch error");
			},
		});
	}

	// override doChangeNotify(subject: string, payload: any): void {
    //     let _sourceAccount = payload.sourceAccount;
    //     let _accounts!: Casaaccount[];
    //     if(this._appConfig.hasData('casaAccountsList')){
    //         _accounts = this._appConfig.getData('casaAccountsList');
	// 		_accounts = _accounts.filter((account:Casaaccount) => account.accountNumber != _sourceAccount);
    //     }
        
    //     this.setSelectableData(of(_accounts));
	// }
}