import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { of } from 'rxjs';
import { Debitcard } from 'src/app/debit-card/debitcard-service/debitcard.model';

@Component({
  selector: 'app-debitcard-dtl-list-control',
  templateUrl: './debitcard-dtl-list-control.component.html',
  styleUrls: ['./debitcard-dtl-list-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DebitcardDtlListControlComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DebitcardDtlListControlComponent extends BaseFpxControlComponent {

  private _list!: Debitcard[];
  @Input() set selectableDataList(list: Debitcard[]) {
    this._list = list;
    this.setSelectableData(of(this._list));
  };
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
