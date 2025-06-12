import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { of } from 'rxjs';
import { Prepaidcard } from 'src/app/prepaidcard/prepaidcard-service/prepaidcard.model';

@Component({
  selector: 'app-prepaidcard-dtl-list-control',
  templateUrl: './prepaidcard-dtl-list-control.component.html',
  styleUrls: ['./prepaidcard-dtl-list-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrepaidcardDtlListControlComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrepaidcardDtlListControlComponent extends BaseFpxControlComponent {

  private _list!: Prepaidcard[];
  @Input() set selectableDataList(list: Prepaidcard[]) {
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
