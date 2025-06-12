// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter, ViewChild, ElementRef  } from '@angular/core';
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
import {  ChildaccountService  } from '../childaccount-service/childaccount.service';
import { AppConfigService } from '@dep/services';
import { RetailChildAccountListControlHelper } from './retail-child-account-list-control.helper';
import { Childaccount } from '../childaccount-service/childaccount.model';


// 2. Component Selector
@Component({
selector: 'app-retail-child-account-list-control',
templateUrl: './retail-child-account-list-control.component.html',
styleUrls: ['./retail-child-account-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => RetailChildAccountListControlComponent),
multi: true,
},RetailChildAccountListControlHelper
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class RetailChildAccountListControlComponent extends BaseFpxControlComponent {
	@Input('setDefault') setDefault: boolean = true;
	controlBusy: boolean = false;
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private _childaccountService: ChildaccountService,private _appConfig: AppConfigService,
         private _retailChildAccountListControlHelper: RetailChildAccountListControlHelper,
		 private _validatorService: ValidatorService,
	) {
	super(controlContainer,changeDetectorRef);
	}
	@Output() dataReceived: EventEmitter<any> = new EventEmitter<any | null>();
	// event methods
	override doPreInit(): void {
	      
	   
	this.setNgTemplateName('childAccountListTmplt');
    this.addPKList(['accountNumber']);
		this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent, this._childaccountService, this.formControlName, this.attributesMap));
}
	public override doPostInit(): void {
		let dependencyFieldsLen = this.dependencyField?.length || 0;
		if(dependencyFieldsLen == 0){
			this.controlBusy = true;
			this._childaccountService.findAll()().subscribe({
				next: (accounts: Childaccount[]) => {

					accounts.map((item) => item.id = item.accountNo);
					
					this._appConfig.setData('childAccountList', accounts);
					this.setSelectableData(of(accounts));
					if (!this.formControl?.parent?.get(this.formControlName)?.value && accounts.length == 1) {
						setTimeout(() => {
							this.formControl.setValue(accounts[0].accountNo, { emitEvent: true });
						});
					}
					this.controlBusy = false;
				},
				error: (err) => {
				this.controlBusy = false;
					console.error("child account fetch error");
				},
			});
		}
	}

	override doChangeNotify(subject: string, payload: any): void {
        let _sourceAccount = payload.sourceAccount;
        let _accounts!: Childaccount[];
        if(this._appConfig.hasData('childAccountList')){
            _accounts = this._appConfig.getData('casaAccountsList');
			// _accounts = _accounts.filter((account:Childaccount) => account.accountNumber != _sourceAccount);
			this.setSelectableData(of(_accounts));
        } else {
			this._childaccountService.findAll()().subscribe({
				next: (accounts: Childaccount[]) => {
					accounts.map((item) => item.id = item.accountNo);
					this.setSelectableData(of(accounts));
				},
				error: (err) => {
					console.error("child account fetch error");
				},
			});
		}
	}

	
	

}