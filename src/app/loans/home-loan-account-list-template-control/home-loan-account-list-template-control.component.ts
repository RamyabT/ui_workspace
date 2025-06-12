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
import { LoansService } from 'src/app/loans/loans-service/loans.service';
import { Loans } from 'src/app/loans/loans-service/loans.model';
import { HomeLoanAccountListTemplateControlHelper } from './home-loan-account-list-template-control.helper';

// 2. Component Selector
@Component({
	selector: 'app-home-loan-account-list-template-control',
	templateUrl: './home-loan-account-list-template-control.component.html',
	styleUrls: ['./home-loan-account-list-template-control.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => HomeLoanAccountListTemplateControlComponent),
			multi: true,
		},
		HomeLoanAccountListTemplateControlHelper
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeLoanAccountListTemplateControlComponent extends BaseFpxControlComponent {
	@Input('setDefault') setDefault: boolean = true;
	//4.  Constructor
	constructor(
		private controlContainer: ControlContainer,
		changeDetectorRef: ChangeDetectorRef,
		private _loansService: LoansService,
		private _validatorService: ValidatorService,
		protected _homeloanAccountListTemplateControlHelper: HomeLoanAccountListTemplateControlHelper,
		private _appConfig: AppConfigService
	) {
		super(controlContainer, changeDetectorRef);
	}

	@Output() dataReceived: EventEmitter<any> = new EventEmitter<any | null>();
	// event methods
	override doPreInit(): void {
		this.setHelper(this._homeloanAccountListTemplateControlHelper);
		this.setDataSource(this._loansService);
		this.setNgTemplateName('loanAccountListTmplt');
		this.setDataSource(this._loansService);
		this.addPKList(['loanAccountNumber']);
		this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent, this._loansService, this.formControlName, this.attributesMap));
	}

	public override doPostInit(): void {
		this._loansService.fetchLoans().subscribe({
			next: (loans: Loans[]) => {
				let homeLoan = loans.filter((item: any) => {
					return item.productCode === "104";
				});
				homeLoan.map((item) => item.id = item.loanAccountNumber);
				this.setSelectableData(of(homeLoan));
				if (!this.formControl?.parent?.get(this.formControlName)?.value && this.setDefault) {
					setTimeout(() => {
						this.formControl.setValue(homeLoan[0].loanAccountNumber, { emitEvent: true });
					});
				}
			},
			error: (err) => {
				console.error("Loan account fetch error");
			},
		});
	}
}