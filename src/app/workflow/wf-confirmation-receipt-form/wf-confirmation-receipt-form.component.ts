import { Component, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent, BaseFpxFormHelper, FpxAppConfig, FpxFormControlErrorMessage, FpxModal, FpxModalAfterClosed, BaseFpxGridComponent, BaseFpxRoGridHelper, BaseFpxFunctionality, FpxCurrenyFormatterPipe } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { TransferService } from 'src/app/foundation/validator-service/transfers-service';
import { FileOpenerService, ShareInfo } from '@dep/native';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from '@dep/core';
import { FavouritePaymentsValidator } from 'src/app/transfers/favouritePayments-validator.service';

@Component({
  selector: 'app-wf-confirmation-receipt-form',
  templateUrl: './wf-confirmation-receipt-form.component.html',
  styleUrls: ['./wf-confirmation-receipt-form.component.scss']
})

export class WfConfirmationReceiptFormComponent extends BaseFpxFunctionality {

  result: any;
  resultPayload: any
  amount: any;
  payId: any;
  payloadInfo: any;
  private _serviceCodeDetails: FpxAppConfig = inject(FpxAppConfig);
  private _serviceDetail: any;
  protected _requestServiceCode: string = "";
  protected _requestStatus: string = "";
  protected doDisableFav: boolean = false;
  scheduleType: any;
  failedPayment: any;
  currency: any;

  constructor(private _router: Router,
    private _commonService: CommonService,
    private _wfsService: FavouritePaymentsValidator,
    private deviceDetectorService: DeviceDetectorService,
    private _fileOpener: FileOpenerService,
    // private _paymentReceiptService: WfService,
    private _shareInfo: ShareInfo,
    protected translate: TranslateService,
    public deviceService: DeviceDetectorService,
    private _currencyFormatter: FpxCurrenyFormatterPipe) {
    super();

  }

  ngOnInit(): void {
    console.log('accounts: confirmation receipt');
  }

  ngAfterViewInit() {
  }

  markFavourite() {
    let paymentId = this.result.resultPayload.requestReference
    this._wfsService
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
          // fpxModal.setData({
          //   title: "wfsConfirmationForm.favFailureAlert.title",
          //   message: res.error.ErrorDescription
          // });
          fpxModal.setData({
            title: "wfsConfirmationForm.favSuccessAlert.title",
            message: "wfsConfirmationForm.favSuccessAlert.message"
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
            title: "wfsConfirmationForm.favFailureAlert.title",
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
    this._requestServiceCode = payload?.serviceCode || payload?.requestPayload?.serviceCode;
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

      this._requestStatus = payload?.requestStatus || payload?.requestPayload?.taskName;

      if (payload?.requestStatus == "ErrorEnd") {
        this.result.statusCode = "failure";
        this.failedPayment = "wfConfirmationReceipt.defaultErrorMessage";

        if (payload?.requestReference && payload.initiatedOn) {
          this.result.additionalInfo = [
            {
              label: "confirmationReceiptForm.refNum",
              value: payload.requestReference
            },
            {
              label: "confirmationReceiptForm.paymentDtandTime",
              value: payload.initiatedOn,
              format: 'date'
            }
          ];
        }
      }
      else {
        if (payload.operationMode == 'M') {
          this._requestStatus = this._requestStatus + "_M";
        }
        if (payload.operationMode == 'D') {
          this._requestStatus = this._requestStatus + "_D";
        }
        // this.amount = this._commonService.formatAmount(payload.amount) + ' ' + payload.currency;
        this.amount = payload.amount;
        this.currency = payload.currency;
        this.result.additionalInfo = [
          {
            label: "Sender Name",
            value: payload.senderName
          },
          {
            label: "Payment Method",
            value: payload.paymentMethod
          },
          {
            label: "confirmationReceiptForm.refNum",
            value: payload.requestReference
          },
          {
            label: "confirmationReceiptForm.paymentDtandTime",
            value: payload.initiatedOn,
            format: 'date'
          },
          {
            value: "spacer",
          },
          {
            label: "confirmationReceiptForm.amount",
            value: this._currencyFormatter.transform(payload.amount, payload.currency) + " " + payload.currency
          },
          {
            label: "Transfer Charge",
            value: payload.charge
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
      this._router.navigate(['smb-transaction-management-space']);
    }
    else {
      this._router.navigate(['smb-transaction-management-space', 'transfers']);
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
    //         "application/pdf",
    //         "AccountsDetails.pdf"
    //       );
    //     }
    //     else {
    //       let documentURL = URL.createObjectURL(
    //         new Blob([response.body], { type: "application/pdf" })
    //       );
    //       const downloadLink = document.createElement("a");
    //       downloadLink.href = documentURL;
    //       const fileName = "accountDetails.pdf";
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
    this._shareInfo.shareInfo(confirmationReceiptInfo, this.translate.instant('WfConfirmationReceipt.shareSuccess'));
  }

}
