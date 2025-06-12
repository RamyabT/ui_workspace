// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent, CriteriaQuery } from '@fpx/core';
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
import { DebitcardService } from '../debitcard-service/debitcard.service';
import { AppConfigService } from '@dep/services';
import { RetailCreditcardDropdownControlHelper } from './retail-creditcard-dropdown-control.helper';
import { CreditcardService } from '../creditcard-service/creditcard.service';



// 2. Component Selector
@Component({
selector: 'app-retail-creditcard-dropdown-control',
templateUrl: './retail-creditcard-dropdown-control.component.html',
styleUrls: ['./retail-creditcard-dropdown-control.component.scss'],
providers: [RetailCreditcardDropdownControlHelper,
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => RetailCreditcardDropdownControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class RetailCreditcardDropdownControlComponent extends BaseFpxControlComponent {
  controlBusy: boolean = false;
  @Input('cardData') cardData: any;
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	
  ,private _validatorService:ValidatorService,private _creditcardService:CreditcardService,
  private _retailCreditcardDropdownControlHelper: RetailCreditcardDropdownControlHelper,
  private _appConfig: AppConfigService,
	) {
	super(controlContainer,changeDetectorRef);
	}
	@Output() dataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
	// event methods
  override doPreInit(): void {
    this.setNgTemplateName('crediCardDropDownTmplt');
    this.addPKList(['creditCardRefNumber']);
    this.setDataSource(this._creditcardService);
    if (this.dependencyField && this.dependencyField.length) this.addDependencies(this.dependencyField);
    this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent, this._creditcardService, this.formControlName, this.attributesMap));
    this.setHelper(this._retailCreditcardDropdownControlHelper);
  }

  public override doPostInit(): void {
    let dependencyFieldsLen = this.dependencyField?.length || 0;
    if (dependencyFieldsLen == 0) {
      this.controlBusy = true;
      this._creditcardService.fetchCreditcardSummary().subscribe({
        next: (cardData: any[]) => {
          cardData.map((item) => item.id = item.cardRefNumber);
          this._appConfig.setData('creditCardData',cardData);
          this.setSelectableData(of(cardData));
          // if (!this.formControl?.parent?.get(this.formControlName)?.value && cardData.length == 1) {
          //   setTimeout(() => {
          //     this.formControl.setValue(cardData[0].walletAccountNumber, { emitEvent: true });
          //   });
          // }
          this.controlBusy = false;
        },
        error: (err) => {
          this.controlBusy = false;
          console.error("CreditCard list fetch error");
        },
      });
    }
  }


}