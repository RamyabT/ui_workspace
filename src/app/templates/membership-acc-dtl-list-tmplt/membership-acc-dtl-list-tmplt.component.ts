import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { APPCONSTANTS } from '@dep/constants';
import { ShareInfo } from '@dep/native';
import { TranslateService } from '@ngx-translate/core';
import { CasaaccountService } from 'src/app/foundation/casaaccount-service/casaaccount.service';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed, FpxToastService } from '@fpx/core';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import { AccountSharingInformationComponent } from 'src/app/accounts/account-sharing-information/account-sharing-information.component';
import { CASAAccountsListComponent } from 'src/app/accounts/casa-accounts-list/casa-accounts-list.component';
import { AppConfigService, UserAuthService } from '@dep/services';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { MembershipService } from 'src/app/membership/membership-service/membership.service';

@Component({
  selector: 'app-membership-acc-dtl-list-tmplt',
  templateUrl: './membership-acc-dtl-list-tmplt.component.html',
  styleUrls: ['./membership-acc-dtl-list-tmplt.component.scss']
})
export class MembershipAccDtlListTmpltComponent extends BaseFpxFunctionality implements OnInit, OnChanges {

  protected _appConfig: AppConfigService = inject(AppConfigService);

  @Input('payFromLabel') payFromLabel: string = '';
  @Input('selectedData') selectedData: any;
  @Input('showViewAll') showViewAll = false;

  @Output('onClickingViewAll') onClickingViewAll:EventEmitter<any> = new EventEmitter();
  @Output('preferredAccount') preferredAccount:EventEmitter<any> = new EventEmitter();

  protected appConstant: any = APPCONSTANTS;

  constructor(
    private _casaAccountService: MembershipService,
    private _userAuth: UserAuthService,
    private _fpxToastService: FpxToastService,
    protected translate: TranslateService
  ) {
    super();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.selectedData, 'iuytrdfghj')
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    if (this._appConfig.hasData('accountRefresh$')) {
      this._appConfig.getData('accountRefresh$').observable.subscribe(
        (res: any) => {
          console.log("refresh nickName QUICKACTION...");
          if(res?.action === 'NICKNAMEUPDATE'){
            this.selectedData.accountNickname = res.data.nickName
          }
          console.log(this.selectedData)
        }
      );
    }

    if (this._appConfig.hasData('deleteRefresh$')) {
      this._appConfig.getData('deleteRefresh$').observable.subscribe(
        (res: any) => {
          console.log("refresh  delete nickName QUICKACTION...");
          if(res?.action === 'NICKNAMEDELETE'){
            this.selectedData.accountNickname = res.data.nickName
          }
          console.log(this.selectedData)
        }
      );
    }

}

  shareInfo($event: MouseEvent) {
    $event.stopPropagation();
    console.log(this.selectedData);
    if(APPCONSTANTS.showOrganizationName)this.selectedData.accountName = this._userAuth.organizationName;

    let accountInfo: string = APPCONSTANTS.shareAccountInfoData(this.selectedData);

    let modal = new FpxModal();
    modal.setComponent(AccountSharingInformationComponent);
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
    this._casaAccountService.shareAccountInfo(this.selectedData, false);
  }

  accountInfoShareAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log(payload)
    console.log(addtionalData)
  }

  viewAll(){
    this.onClickingViewAll.emit();
  }

  // setDefaultAccount(cardData: Casaaccount) {
  //   this.showSpinner();
  //   let preferredaccount = {
  //             "preferredaccount": {
  //                 "accountNumber": cardData.accountNumber,
  //                 "isPreferred": cardData.preferredAccount?"0":"1"
  //             }
  //         };
  //         this._casaAccountService.postPreferredAccount(preferredaccount).subscribe({
  //           next: (res) => {
  //             this.preferredAccount.emit(cardData.accountNumber);
  //             cardData.preferredAccount = !cardData.preferredAccount;
  //             this.hideSpinner();
  //             let message = cardData.preferredAccount?"Account set as default":"Default account removed";
  //             this._fpxToastService.showSuccessAlert("Success", message, {duration: 1000});

  //             // this._fpxToastService.showSuccessAlert(this.translate.instant("TOASTMESSAGES.defaultAccount.title"), this.translate.instant("TOASTMESSAGES.defaultAccount.message"));
  //           },
  //           error: (reason) => {
  //             this.hideSpinner();
  //             console.log("fetch service restriction error");
  //           }
  //         });

  // }


}
