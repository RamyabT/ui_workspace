import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, forwardRef,Output,EventEmitter } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { of } from 'rxjs';
import { Deposits } from 'src/app/deposits/deposits-service/deposits.model';

@Component({
  selector: 'app-deposit-account-dtl-list-control',
  templateUrl: './deposit-account-dtl-list-control.component.html',
  styleUrls: ['./deposit-account-dtl-list-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DepositAccountDtlListControlComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepositAccountDtlListControlComponent extends BaseFpxControlComponent {

  private _list!: Deposits[];
  @Input() set selectableDataList(list: Deposits[]) {
    this._list = list;
    this.setSelectableData(of(this._list));
    this.changeDetectorRef.detectChanges();
  };
  @Output('onSelectAccount') onSelectAccount:EventEmitter<string> = new EventEmitter();
  get selectableDataList() {
    return this._list;
  }

  constructor(
    private controlContainer: ControlContainer,
    changeDetectorRef: ChangeDetectorRef
  ) {
    super(controlContainer, changeDetectorRef);
  }

  override doPreInit(): void {
  }

}
