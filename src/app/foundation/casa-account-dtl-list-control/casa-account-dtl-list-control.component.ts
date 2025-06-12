import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { of } from 'rxjs';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';

@Component({
  selector: 'app-casa-account-dtl-list-control',
  templateUrl: './casa-account-dtl-list-control.component.html',
  styleUrls: ['./casa-account-dtl-list-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CasaAccountDtlListControlComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CasaAccountDtlListControlComponent extends BaseFpxControlComponent {

  private _list!: Casaaccount[];
  @Input() set selectableDataList(list: Casaaccount[]) {
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
    this.setNgTemplateName('casaAccountDtlListTmplt');
  }

}
