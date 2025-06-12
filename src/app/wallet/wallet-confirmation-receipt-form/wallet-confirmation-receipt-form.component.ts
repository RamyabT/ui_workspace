import { Component, OnInit, Optional, inject } from '@angular/core';
import { FpxAppConfig,FpxModal, FpxModalAfterClosed, BaseFpxGridComponent, BaseFpxRoGridHelper, BaseFpxFunctionality, FpxCurrenyFormatterPipe } from '@fpx/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { TransferService } from 'src/app/foundation/validator-service/transfers-service';
import { FileOpenerService, ShareInfo } from '@dep/native';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from '@dep/core';
import { FavouritePaymentsValidator } from 'src/app/transfers/favouritePayments-validator.service';

@Component({
  selector: 'app-wallet-confirmation-receipt-form',
  templateUrl: './wallet-confirmation-receipt-form.component.html',
  styleUrls: ['./wallet-confirmation-receipt-form.component.scss']
})

export class WalletConfirmationReceiptFormComponent extends BaseFpxFunctionality {

  result: any;
  resultPayload: any
  amount: any;
  payId: any;
  payloadInfo: any;
  private _serviceDetail: any;
  protected _requestServiceCode: string = "";
  protected _requestStatus: string = "";
  protected doDisableFav: boolean = false;
  scheduleType: any;
  failedPayment: any;
  currency: any;

  constructor(private _router: Router,
    private _transfersService: FavouritePaymentsValidator,
    private deviceDetectorService: DeviceDetectorService,
    private _fileOpener: FileOpenerService,
    private _shareInfo: ShareInfo,
    protected translate: TranslateService,
    public deviceService: DeviceDetectorService,
    private _currencyFormatter: FpxCurrenyFormatterPipe) {
    super();

  }

  ngOnInit(): void {
    console.log('Payments: confirmation receipt');
  }

  ngAfterViewInit() {
  }

  markFavourite() {
    let paymentId = this.result.resultPayload.requestReference
    this._transfersService
      .markFavouritePayments(paymentId)
      .subscribe((res) => {
        if (res.favpayments) {

          console.log("Response", res)
          this.doDisableFav = true;
          const fpxModal = new FpxModal();
          fpxModal.setComponent(DepAlertComponent);
          fpxModal.setDisableClose(false);
          fpxModal.setPanelClass('dep-alert-popup');
          fpxModal.setBackDropClass('dep-popup-back-drop');
          fpxModal.setData({
            title: "walletConfirmationForm.favSuccessAlert.title",
            message: "walletConfirmationForm.favSuccessAlert.message"
          });
          fpxModal.setAfterClosed(this.contextmenuModelAfterClose);
          this.openModal(fpxModal);
        }
        else if (!res.favpayments) {
          console.log("Response", res)
          this.doDisableFav = true;
          const fpxModal = new FpxModal();
          fpxModal.setComponent(DepAlertComponent);
          fpxModal.setDisableClose(false);
          fpxModal.setPanelClass('dep-alert-popup');
          fpxModal.setBackDropClass('dep-popup-back-drop');
          fpxModal.setData({
            title: "walletConfirmationForm.favFailureAlert.title",
            message: res.error.ErrorDescription
          });
          fpxModal.setAfterClosed(this.contextmenuModelAfterClose);
          this.openModal(fpxModal);

        }
      });
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...");
  }
  public setPageDependency(payload: any): void {
    this.result = {};
    this._requestServiceCode = payload?.serviceCode;
    this.payloadInfo = payload;
    this.payId = payload?.requestReference;
    if (payload?.status == 'FAILUR') {
      this._requestStatus = "ErrorEnd";
      let errorPayload = payload.routingInfo.queryParams.response;
      this.result = {
        statusCode: "failure",
        resultPayload: {
          errorCode: errorPayload.ErrorCode,
          errorMessage: errorPayload.ErrorMessage
        }
      }
    } else {
      this.result = {
        resultPayload: payload
      };

      if (payload.operationMode) {
        this.scheduleType = '1';
      } else this.scheduleType = '0';

      this._requestStatus = payload?.requestStatus;

      if (payload?.requestStatus == "ErrorEnd") {
        this.result.statusCode = "failure";
        this.failedPayment = "walletConfirmationForm.defaultErrorMessage";

        if (payload?.requestReference && payload.initiatedOn) {
          this.result.additionalInfo = [
            // {
            //   label: "confirmationReceiptForm.transferAmount",
            //   value: payload.amount
            // },
            {
              label: "confirmationReceiptForm.paymentDtandTime",
              value: payload.initiatedOn,
              format: 'date'
            },
            {
              label: payload.paymentType == "RETAILWALLETWITHDRAWMONEY" ?  "confirmationReceiptForm.beneAccount" :  "confirmationReceiptForm.debitAccount",
              value: payload.paymentType == "RETAILWALLETWITHDRAWMONEY" ?  payload.beneAccount :  payload.debitAccount, 
            },
            {
              label: payload.paymentType == "RETAILWALLETWITHDRAWMONEY" ?  "confirmationReceiptForm.beneNick" : '',
              value: payload.paymentType == "RETAILWALLETWITHDRAWMONEY" ?  payload.beneName : '',
            },
            {
              label: "confirmationReceiptForm.refNum",
              value: payload.requestReference
            }
          ];
        }
      }
      else {
        if (payload.operationMode == 'M') {
          this._requestStatus = this._requestStatus + "_M";
        }
        else if (payload.operationMode == 'D') {
          this._requestStatus = this._requestStatus + "_D";
        }
        else if (payload.operationMode == 'A') {
          this._requestStatus = this._requestStatus + "_A";
        }
        // this.amount = this._commonService.formatAmount(payload.amount) + ' ' + payload.currency;
        this.amount = payload.amount;
        this.currency = payload.currency;
        this.result.additionalInfo = [
          // {
          //   label: "confirmationReceiptForm.transferAmount",
          //   value: payload.amount
          // },
          {
            label: "confirmationReceiptForm.paymentDtandTime",
            value: payload.initiatedOn,
            format: 'date'
          },
          {
            label: payload.paymentType == "RETAILWALLETWITHDRAWMONEY" ?  "confirmationReceiptForm.beneAccount" :  "confirmationReceiptForm.debitAccount",
              value: payload.paymentType == "RETAILWALLETWITHDRAWMONEY" ?  payload.beneAccount :  payload.debitAccount, 
          },
          {
            label: payload.paymentType == "RETAILWALLETWITHDRAWMONEY" ?  "confirmationReceiptForm.beneNick" : '',
            value: payload.paymentType == "RETAILWALLETWITHDRAWMONEY" ?  payload.beneName : '',
          },
          {
            label: "confirmationReceiptForm.refNum",
            value: payload.requestReference
          }
          
        ];
        if (this.scheduleType == '1') {
          this.result.additionalInfo.splice(3, 0, {
            label: "confirmationReceiptForm.scheduleRefNum",
            value: payload.paymentReference
          })

          this.result.additionalInfo.splice(4, 1, {
            label: "confirmationReceiptForm.tranDateAndTime",
            value: payload.initiatedOn
          })
        }
      }
    }

  }



  gotoModule(module: string) {
    if (this.deviceService.isMobile()) {
      this._router.navigate(['wallet-space']);
    }
    else {
      this._router.navigate(['wallet-space', 'wallet']);
    }
  }

  doRepeat() {
    this._router.navigate(this._serviceDetail.servicePath);
  }

  gotoHome() {
    this._router.navigate(['home']);
  }
  onDownloadClick() {
    // this._paymentReceiptService.fetchPaymentReceipt(this.payId).subscribe({
    //   next: (response: any) => {
    //     if (this.deviceDetectorService.isHybrid()) {
    //       this.hideSpinner();
    //       this._fileOpener.openPDF(
    //         response,
    //         "PaymentDetails/pdf",
    //         "PaymentDetails.pdf"
    //       );
    //     }
    //     else {
    //       let documentURL = URL.createObjectURL(
    //         new Blob([response.body], { type: "PaymentDetails/pdf" })
    //       );
    //       const downloadLink = document.createElement("a");
    //       downloadLink.href = documentURL;
    //       const fileName = "PaymentDetails.pdf";
    //       downloadLink.download = fileName;
    //     }
    //   }
    // });
  }

  onShareClick() {
    let confirmationReceiptInfo: string =
      "Debit Account: " + this.payloadInfo.debitAccount + "\n" +
      "Bene Name: " + this.payloadInfo.beneName + "\n" +
      "Amount: " + this.payloadInfo.amount + " " + this.payloadInfo.currency + "\n" +
      // "Currency: " + this.payloadInfo.currency + "\n" + 
      "Initiated On: " + this.payloadInfo.initiatedOn + "\n"
    this._shareInfo.shareInfo(confirmationReceiptInfo, this.translate.instant('walletConfirmationReceipt.shareSuccess'));
  }

}
