import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { of } from 'rxjs';
import { Loans } from 'src/app/loans/loans-service/loans.model';

@Component({
  selector: 'app-loan-account-dtl-list-control',
  templateUrl: './loan-account-dtl-list-control.component.html',
  styleUrls: ['./loan-account-dtl-list-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LoanAccountDtlListControlComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoanAccountDtlListControlComponent extends BaseFpxControlComponent {

  private _list!: Loans[]
  @Input() set selectableDataList(list: Loans[]) {
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
    this.setNgTemplateName('loanAccountDtlListTmplt');
  }

}
