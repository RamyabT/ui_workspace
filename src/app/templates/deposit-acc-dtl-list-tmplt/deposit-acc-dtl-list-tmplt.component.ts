import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { APPCONSTANTS } from '@dep/constants';
import { ShareInfo } from '@dep/native';
import { AppConfigService } from '@dep/services';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { TranslateService } from '@ngx-translate/core';
import { DepositsService } from 'src/app/deposits/deposits-service/deposits.service';
import { LoanAccountSharingInformationComponent } from 'src/app/loans/loan-account-sharing-information/loan-account-sharing-information.component';

@Component({
  selector: 'app-deposit-acc-dtl-list-tmplt',
  templateUrl: './deposit-acc-dtl-list-tmplt.component.html',
  styleUrls: ['./deposit-acc-dtl-list-tmplt.component.scss']
})
export class DepositsAccDtlListTmpltComponent extends BaseFpxFunctionality implements OnInit, OnChanges {
  protected _appConfig: AppConfigService = inject(AppConfigService);

  @Input('selectedData') selectedData: any;
  @Input('showViewAll') showViewAll : any;

  @Output('onClickingViewAll') onClickingViewAll: EventEmitter<any> = new EventEmitter();

  protected appConstant: any = APPCONSTANTS;

  constructor(
    private _depositsService: DepositsService,
  ) { 
    super();

  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

  // shareInfo($event: MouseEvent) {
  //   $event.stopPropagation();
  //   this._loanService.shareAccountInfo(this.selectedData);
  // }

  shareInfo($event: MouseEvent) {
    $event.stopPropagation();
    console.log(this.selectedData)
    let accountInfo: string = APPCONSTANTS.shareAccountInfoData(this.selectedData);

    let modal = new FpxModal();
    modal.setComponent(LoanAccountSharingInformationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(['dep-popup-back-drop', 'accounts-sharing-info-popup-back-drop']);
    modal.setDisableClose(true);
    modal.setData({
      title: 'Success',
      subTitle: 'Copied to clipboard',
      accountInfo: this.selectedData
    });
    modal.setAfterClosed(this.accountInfoShareAfterClose);
    this.openModal(modal)
    console.log(accountInfo)
    // this._depositsService.shareAccountInfo(this.selectedData,false);
  }

  accountInfoShareAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log(payload)
    console.log(addtionalData)
  }

  
  viewAll() {
    this.onClickingViewAll.emit();
  }
  getAbsoluteValue(value: number | undefined): number {
    return value ? Math.abs(value) : 0;
  }

  checkNegativeValue(value: number | undefined): string {
    return value && value < 0 ? '-' : '';
  }
}
