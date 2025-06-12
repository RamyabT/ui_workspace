import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, forwardRef, Output } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { of } from 'rxjs';
import { Creditcard } from 'src/app/credit-cards/creditcard-service/creditcard.model';

@Component({
  selector: 'app-creditcard-dtl-list-control',
  templateUrl: './creditcard-dtl-list-control.component.html',
  styleUrls: ['./creditcard-dtl-list-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CreditcardDtlListControlComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditcardDtlListControlComponent extends BaseFpxControlComponent {

  private _list!: Creditcard[];

  @Input('cardData') cardData: Creditcard | undefined;
  @Input('allCreditCards') allCreditCards: Creditcard[] = [];
  @Input() set selectableDataList(list: Creditcard[]) {
    this._list = list;
    this.setSelectableData(of(this._list));
  };
  get selectableDataList() {
    return this._list;
  }

  @Output('onClickingViewAll') onClickingViewAll:EventEmitter<any> = new EventEmitter();

  // @Input() set selectableDataList(list: Creditcard[]) {
  //   this._list = list;
  //   this.setSelectableData(of(this._list));
  // };
  // get selectableDataList() {
  //   return this._list;
  // }

  currentBalanceToolTip = false;
  availableCreditToolTip = false;
  statementBalanceToolTip = false;

  constructor(
    private controlContainer: ControlContainer,
    changeDetectorRef: ChangeDetectorRef
  ) {
    super(controlContainer, changeDetectorRef);
  }

  override doPreInit(): void {
  }

  viewAll(){
    this.onClickingViewAll.emit();
  }

  showCurrentBalanceDesktop($event: any) {
    $event.stopPropagation();
    $event.preventDefault();
    this.currentBalanceToolTip = !this.currentBalanceToolTip;
  }

  showAvailableCreditToolTipDesktop($event: any) {
    $event.stopPropagation();
    $event.preventDefault();
    this.availableCreditToolTip = !this.availableCreditToolTip;
  }

  showStatementBalanceToolTipDesktop($event: any) {
    $event.stopPropagation();
    $event.preventDefault();
    this.statementBalanceToolTip = !this.statementBalanceToolTip
  }

  getAbsoluteValue(value: number | undefined): number {
    return value ? Math.abs(value) : 0;
  }
}
