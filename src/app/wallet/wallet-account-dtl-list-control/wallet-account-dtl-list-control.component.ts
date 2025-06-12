
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { of } from 'rxjs';
 import { wallet } from '../wallet-summary-service/walletsummary.model';
import { WalletSpaceManager } from 'src/app/wallet-space/wallet-space.manager';

@Component({
  selector: 'app-wallet-account-dtl-list-control',
  templateUrl: './wallet-account-dtl-list-control.component.html',
  styleUrls: ['./wallet-account-dtl-list-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WalletAccountDtlListControlComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletAccountDtlListControlComponent extends BaseFpxControlComponent {

  private _list!: wallet[];
  @Input() set selectableDataList(list: wallet[]) {
    this._list = list;
    this.setSelectableData(of(this._list));
  };
  get selectableDataList() {
    this._walletSpaceMgr.getwalletAccountsList()
     return this._list;
  }

  constructor(
    private controlContainer: ControlContainer,
    changeDetectorRef: ChangeDetectorRef , private _walletSpaceMgr : WalletSpaceManager
  ) {
    super(controlContainer, changeDetectorRef);
  }

  override doPreInit(): void {
       this.setNgTemplateName('walletAccountDtlListTmplt');

 
  }

}
