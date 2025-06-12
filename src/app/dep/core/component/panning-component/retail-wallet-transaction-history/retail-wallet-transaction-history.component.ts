 


import { CompletedpymntsService } from './../../../../../transfers/completedpymnts-service/completedpymnts.service';
import { ChangeDetectorRef, Component, Renderer2 } from "@angular/core";
import { PanningService } from "src/app/dep/services/panning.service";
import { DepPanningComponent } from "../../dep-panning.component";
import { FavouritePaymentsValidator } from "src/app/transfers/favouritePayments-validator.service";
import { FpxModal, FpxModalAfterClosed, FpxToastService } from "@fpx/core";
import { TempScheduleRep } from "src/app/transfers/tempScheduleRep-service/tempScheduleRep.model";
import { DepConfirmationComponent } from "../../dep-confirmation/dep-confirmation.component";
import { FavpaymentsService } from "src/app/transfers/favpayments-service/favpayments.service";
import { Router } from "@angular/router";
import { DeviceDetectorService } from "../../../class/device-detector.service";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { AppConfigService } from "@dep/services";
import { Completedpymnts } from 'src/app/transfers/completedpymnts-service/completedpymnts.model';
import { ShareInfo } from '@dep/native';
import { wallettransactiondtls } from 'src/app/wallet/trans-history-service/transactionhistory.model';

declare let $: any;

@Component({
  selector: 'app-retail-wallet-transaction-history',
  templateUrl: './retail-wallet-transaction-history.component.html',
  styleUrls: ['./retail-wallet-transaction-history.component.scss'],
})
export class RetailWalletTransactionHistoryComponent extends DepPanningComponent {
  constructor(
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private _transferfavService: FavouritePaymentsValidator,
    private _favpaymentsService: FavpaymentsService,
    private _router: Router,
    protected _device: DeviceDetectorService,
    private _fpxToastService: FpxToastService,
    private _translateService: TranslateService,
    private _appConfig: AppConfigService,
    private _shareInfo:ShareInfo
  ) {
    super(renderer2, changeDetectorRef, panningService);
  }

  public override doPreInit(): void {
    this.setLeftActionBtnCount(1);
    this.setRightActionBtnCount(2);
  }

  onClickFavourite($event: any, selectedData: TempScheduleRep) {
    $event.stopPropagation();

    this.selectedData = selectedData;
    let doFavText = this.selectedData.isFavourite == '1' ? "Are you sure, you want to remove this transaction from Favourite Transfers?" : "Are you sure, you want to add this transaction as Favourite?";
    const fpxModal = new FpxModal();
    fpxModal.setComponent(DepConfirmationComponent);
    fpxModal.setDisableClose(false);
    fpxModal.setPanelClass('dep-alert-popup');
    fpxModal.setBackDropClass('dep-popup-back-drop');
    fpxModal.setData({
      title: "Confirm",
      message: doFavText
    });
    fpxModal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(fpxModal);
  }

  onClickRepeat($event: any, selectedData: wallettransactiondtls) {
    $event.stopPropagation();

    let historyDetails:any={
      sourceWalletAccount: selectedData.accountNumber,
      paymentAmount: selectedData.transactionAmount,
     // contactPhoneNumber: selectedData.mobileNumber,
    }
    this._appConfig.setData('RETAILWALLETHISTORY',historyDetails);
    //this._appConfig.setData('RETAILWALLETHISTORY',selectedData);
    let routePath;
    let queryParam: any = {
      "paymentId": selectedData["transactionReference"], 
      "serviceCode": "RETAILWALLETSENDMONEY",
      "mode": 'R'
    }

    
    routePath = ["wallet-space", "entry-shell","wallet","retail-wallet-transfer"].flat();
    console.log("wallettransactionrepeat",selectedData);
    this._router.navigate(routePath, {
      queryParams: {
        ...queryParam
      }
    });
  }

  onClickView($event: any, selectedData: TempScheduleRep) {
    $event.stopPropagation();

    let routePath;
    let queryParam: any = {
      'action': 'VIEW',
      "paymentId": selectedData["paymentId"],
      "serviceCode": selectedData["serviceCode"],
      "mode": 'V'
    }
    routePath = ["transfers-space", "display-shell", [...(routes as any)[selectedData["serviceCode"]]],].flat();
    console.log(selectedData);
    this._router.navigate(routePath, {
      queryParams: {
        ...queryParam
      }
    });
  }

 

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    let paymentId = this.selectedData.paymentId;
    let onFavTransfer!: Observable<any>;
    let doFav: boolean = false;

    if(payload == 0){
      return;
    }else if (payload == 1 && this.selectedData.isFavourite == '1') {
      onFavTransfer = this._transferfavService.unMarkFavouritePayments(paymentId);
      doFav = false;
    }
    else if (payload == 1 && this.selectedData.isFavourite == '0') {
      onFavTransfer = this._transferfavService.markFavouritePayments(paymentId);
      doFav = true;
    }
    if(onFavTransfer){
      onFavTransfer.subscribe({
        next: (res: any) => {
          console.log("onFavTransfes Response: ", res);
          if(this._appConfig.hasData('transfersUpdate$')) {
            this._appConfig.getData('transfersUpdate$').subject.next({event: 'fav-change'});
            if(doFav){
              this._fpxToastService.showSuccessAlert(this._translateService.instant("TOASTMESSAGES.favTransfer.title"), this._translateService.instant("TOASTMESSAGES.favTransfer.message"), {duration: 1000});
            } else {
              this._fpxToastService.showSuccessAlert(this._translateService.instant("TOASTMESSAGES.unFavTransfer.title"), this._translateService.instant("TOASTMESSAGES.unFavTransfer.message"), { duration: 1000});
            }
            this.selectedData.isFavourite = (doFav) ? "1" : "0";
          }
        },
        error: (error: any) => {
          console.log("onFavTransfes Response error: ", error);
        }
      });
    }

    this.doReverseAction();
  }

  doShare($event: any, rowData: any) {
    $event.preventDefault(); 
    $event.stopPropagation(); 
    let transferInfo: string = 
     "Wallet ID Number: " + this.selectedData.walletAccountNumber + "\n" +
    "Wallet NickName: " + this.selectedData.walletName + "\n" +
    "Available Balance: " + this.selectedData.availableBalance + "\n" +
    "Wallet Status: " + this.selectedData.status ;
    this.doReverseAction();
    //TODO: do share
    this._shareInfo.shareInfo(transferInfo, this._translateService.instant('CASASUMMARYCARD.shareSuccess'));

    
  }
}


const routes = {
  RETAILTRANDOMESTIC: ['transfers', 'retail-domestic-transfer'],
  RETAILTRANOAT: ['transfers', 'retail-own-account-transfer-form'],
  RETAILTRANCC: ['transfers', 'retail-cc-transfer-form'],
  RETAILTRANINTBT: ['transfers', 'retail-within-bank-transfer-form'],
  RETAILTRANSWIFT: ['transfers', 'retail-international-transfer-form'],
  RETAILTRANINSTA: ['transfers', 'retail-insta-pay-transfer-form'],
  RETAILSCHDOM: ['transfers', 'retail-domestic-transfer'],
  RETAILSCHOAT: ['transfers', 'retail-own-account-transfer-form'],
  RETAILSCHCC: ['transfers', 'retail-cc-transfer-form'],
  RETAILSCHINTBT: ['transfers', 'retail-within-bank-transfer-form'],
  RETAILSCHSWIFT: ['transfers', 'retail-international-transfer-form'],
  ARETAILTRANDOMESTIC: ['transfers', 'retail-domestic-transfer'],
  ARETAILTRANOAT: ['transfers', 'retail-own-account-transfer-form'],
  ARETAILTRANCC: ['transfers', 'retail-cc-transfer-form'],
  ARETAILTRANINTBT: ['transfers', 'retail-within-bank-transfer-form'],
  ARETAILTRANSWIFT: ['transfers', 'retail-international-transfer-form'],
  ARETAILTRANFTS: ['transfers', 'retail-domestic-transfer'],
  RETAILTRANFTS: ['transfers', 'retail-domestic-transfer'],
  
}