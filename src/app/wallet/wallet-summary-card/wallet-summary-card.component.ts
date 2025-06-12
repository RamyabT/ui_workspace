import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShareInfo } from '@dep/native';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { TranslateService } from '@ngx-translate/core';
import { CasaContextMenuComponent } from 'src/app/accounts/casa-context-menu/casa-context-menu.component';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { CasaaccountService } from 'src/app/foundation/casaaccount-service/casaaccount.service';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { wallet } from '../wallet-summary-service/walletsummary.model';
import { WalletContextMenuComponent } from '../wallet-context-menu/wallet-context-menu.component';
import { RetailShowWalletQrComponent } from '../show-wallet-qr/show-wallet-qr.component';

@Component({
  selector: 'app-wallet-summary-card',
  templateUrl: './wallet-summary-card.component.html',
  styleUrls: ['./wallet-summary-card.component.scss']
})
 
export class WalletSummaryCardComponent extends BaseFpxFunctionality implements OnInit {

  @Output('contextmenu') contextmenu: EventEmitter<any> = new EventEmitter<any|null>();
  @Input('contextmenuBtn') contextmenuBtn:boolean = false;
  @Input('cardData') cardData!: wallet;

  constructor(
    protected translate: TranslateService,
    private _commonService: CommonService,
    private _casaAccountService: CasaaccountService,
    private _shareInfo:ShareInfo,

  ) {
    
    super();
  }

  ngOnInit(): void {
  }

  notifyContextMenuClick(){
    this.contextmenu.emit();
    let modal = new FpxModal();
    modal.setComponent(WalletContextMenuComponent);
    modal.setPanelClass('context-menu-popup');
    modal.setDisableClose(false);
    modal.setData({
      cardData: this.cardData
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...");
  }
  showQR() {
    let modal = new FpxModal();
    modal.setComponent(RetailShowWalletQrComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setDisableClose(false);
    modal.setData({
      title: "RETAILSHOWWALLETQR.title",
      name: this.cardData.walletName,
      businessId: this.cardData.mobileNumber || '9876543210'
    });
    modal.setAfterClosed(this.showQRAfterClose);
    this.openModal(modal);
  }

  showQRAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {

  }

  dataShare(){
    let walletInfo: string = 
    "Wallet ID Number: " + this.cardData.walletAccountNumber + "\n" +
    "Wallet NickName: " + this.cardData.walletName + "\n" +
    "Available Balance: " + this.cardData.availableBalance + "\n" +
    "Wallet Status: " + this.cardData.status ;
    this._shareInfo.shareInfo(walletInfo, this.translate.instant('CASASUMMARYCARD.shareSuccess'));
  }
 

  getServiceRestriction(accountNumber: string) {
    this._commonService.fetchServiceRestriction(accountNumber).subscribe({
      next: (res) => {
        console.log("fetchServiceRestriction: ", res);
        this._commonService.casaServiceRestriction.set(accountNumber, res);
      },
      error: (reason) => {
        console.log("fetch service restriction error");
      }
    });
  }

}