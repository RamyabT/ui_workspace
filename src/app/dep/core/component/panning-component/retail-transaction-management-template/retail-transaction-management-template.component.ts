
import { ChangeDetectorRef, Component, Renderer2 } from "@angular/core";
import { PanningService } from "src/app/dep/services/panning.service";

import { FavouritePaymentsValidator } from "src/app/transfers/favouritePayments-validator.service";
import { FpxModal, FpxModalAfterClosed, FpxToastService } from "@fpx/core";
import { TempScheduleRep } from "src/app/transfers/tempScheduleRep-service/tempScheduleRep.model";

import { FavpaymentsService } from "src/app/transfers/favpayments-service/favpayments.service";
import { Router } from "@angular/router";

import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { AppConfigService } from "@dep/services";
import { Completedpymnts } from 'src/app/transfers/completedpymnts-service/completedpymnts.model';
import { ShareInfo } from '@dep/native';
import { DepPanningComponent, DeviceDetectorService } from "@dep/core";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";

declare let $: any;

@Component({
  selector: "app-retail-transaction-management-template",
  templateUrl: "./retail-transaction-management-template.component.html",
  styleUrls: ["./retail-transaction-management-template.component.scss"],
})
export class RetailTransactionManagementTemplateComponent extends DepPanningComponent {
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
    this.selectedData.transactionCategory = 'INTPAY';
    this.setLeftActionBtnCount(0);
    this.setRightActionBtnCount(0);
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

  onClickRepeat($event: any, selectedData: Completedpymnts) {
    $event.stopPropagation();
    let routePath;
    let queryParam: any = {
      "paymentId": selectedData["paymentId"],
      "serviceCode": selectedData["serviceCode"],
      "mode": 'R'
    }
    routePath = ["transfers-space", "entry-shell", [...(routes as any)[selectedData["serviceCode"]]],].flat();
    console.log(selectedData);
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
    let transferInfo: string = "Beneficiary Name: " + rowData.beneName + "\n" +
    // "Amount: " + rowData.paymentAmount + "\n" +
    "Amount: " + rowData.paymentCurrency + " " + rowData.paymentAmount  + "\n" +
    "Payment Date: " + rowData.initiationDate + "\n" +
    "Reference Number: " + rowData.paymentId 
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