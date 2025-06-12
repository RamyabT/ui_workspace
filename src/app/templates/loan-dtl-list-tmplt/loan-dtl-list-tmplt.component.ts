import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { APPCONSTANTS } from '@dep/constants';
import { ShareInfo } from '@dep/native';
import { AppConfigService } from '@dep/services';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { TranslateService } from '@ngx-translate/core';
import { LoanAccountSharingInformationComponent } from 'src/app/loans/loan-account-sharing-information/loan-account-sharing-information.component';
import { LoansService } from 'src/app/loans/loans-service/loans.service';

@Component({
  selector: 'app-loan-dtl-list-tmplt',
  templateUrl: './loan-dtl-list-tmplt.component.html',
  styleUrls: ['./loan-dtl-list-tmplt.component.scss']
})
export class LoanDtlListTmpltComponent extends BaseFpxFunctionality implements OnInit, OnChanges {
  protected _appConfig: AppConfigService = inject(AppConfigService);

  @Input('selectedData') selectedData: any;
  @Input('showViewAll') showViewAll = false;

  @Output('onClickingViewAll') onClickingViewAll: EventEmitter<any> = new EventEmitter();

  protected appConstant: any = APPCONSTANTS;

  constructor(
    private _loanService: LoansService,
  ) { 
    super();

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.selectedData)
  }

  ngOnInit(): void {
    console.log("selectedData: ", this.selectedData);
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
    this._loanService.shareAccountInfo(this.selectedData,false);
  }

  accountInfoShareAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log(payload)
    console.log(addtionalData)
  }

  
  viewAll() {
    this.onClickingViewAll.emit();
  }
}
