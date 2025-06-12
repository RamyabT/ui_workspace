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
import { FulfillRequestApprovalComponent } from 'src/app/wallet/fulfill-request-approval-form/fulfill-request-approval-form.component';
 import { walletrequestedinfo } from 'src/app/wallet/trans-history-service/walletrequest.model';

declare let $: any;

@Component({
  selector: 'app-retail-wallet-requested-history',
  templateUrl: './retail-wallet-requested-history.component.html',
  styleUrls: ['./retail-wallet-requested-history.component.scss'],
})
export class RetailWalletRequestedHistoryComponent extends DepPanningComponent {
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
    public _appConfig: AppConfigService,
    private _shareInfo:ShareInfo
  ) {
    super(renderer2, changeDetectorRef, panningService);
  }

  public override doPreInit(): void {
    // this.setLeftActionBtnCount(1);
    this.setRightActionBtnCount(2);
  }

  onDecline($event: any, selectedData: any) {
    $event.stopPropagation();
    let fulfillRequestDetails:any={
      sourceWalletAccount: selectedData.fromWalletId,
      creditWalletAccount:selectedData.toWalletId,
      paymentAmount: Number(selectedData.amount),
      contactPhoneNumber: selectedData.mobileNumber,
    }
    this._appConfig.setData('DECLINEWALLETREQUEST',fulfillRequestDetails);
    this.selectedData = selectedData;
    let doDeclineText = "Are you sure to decline this request?";
    const fpxModal = new FpxModal();
    fpxModal.setComponent(FulfillRequestApprovalComponent);
    fpxModal.setDisableClose(false);
    fpxModal.setPanelClass('dep-alert-popup');
    fpxModal.setBackDropClass('dep-popup-back-drop');
    fpxModal.setData({
      title: "Confirm",
      message: doDeclineText
    });
    fpxModal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(fpxModal);
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

    this.doReverseAction();
  }


  onClickRepeat($event: any, selectedData: walletrequestedinfo) {
      $event.stopPropagation();
  
      let requestDetails:any={
        mobileNumber: selectedData.mobileNumber,
        amount: selectedData.amount,
        fromAccount: selectedData.fromWalletId,
        toAccount: selectedData.toWalletId,
 
      }
      this._appConfig.setData('RETAILWALLETREQUEST',requestDetails);
      //this._appConfig.setData('RETAILWALLETHISTORY',selectedData);
      let routePath;
      let queryParam: any = {
        "paymentId": selectedData["transactionReference"], 
        "serviceCode": "RETAILWALLETREQMONEY",
        "mode": 'R'
      }
  
      
      routePath = ["wallet-space", "entry-shell","wallet","retail-wallet-req-money"].flat();
      console.log("wallettransactionrepeat",selectedData);
      this._router.navigate(routePath, {
        queryParams: {
          ...queryParam
        }
      });
    }

  doAccept($event: any, rowData: any) {
     
  }
}
