import { Component, Inject, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent, BaseFpxFormHelper, FpxAppConfig, FpxFormControlErrorMessage, FpxModal, FpxModalAfterClosed, BaseFpxGridComponent, BaseFpxRoGridHelper, BaseFpxFunctionality, FpxCurrenyFormatterPipe } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { FavouritePaymentsValidator } from '../favouritePayments-validator.service';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { TransferService } from 'src/app/foundation/validator-service/transfers-service';
import { FileOpenerService, ShareInfo } from '@dep/native';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from '@dep/core';
import moment from 'moment';
import { AppConfigService } from 'src/app/dep/services/app-config-service/app-config.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EligibletoaccountService } from 'src/app/foundation/eligibletoaccount-service/eligibletoaccount.service';

@Component({
  selector: 'app-transfer-confirmation-receipt-form',
  templateUrl: './transfer-confirmation-receipt-form.component.html',
  styleUrls: ['./transfer-confirmation-receipt-form.component.scss']
})

export class TransferConfirmationReceiptFormComponent extends BaseFpxFunctionality {

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
  private _transactionDtl: any;
  private _transferToAccount: any;
  private _transferToBeneAccount: any;
  private _viewSchTransferData: any;
  scheduleType: any;
  failedPayment: any;
  currency: any;
  _delRequestServiceCode: any
  _payload: any;
  _delRequestStatus: any
  isSuccessMsgReq: boolean=false;
  paymentRef:string="";
  beneName: string="";

  constructor(private _router: Router,
    private _commonService: CommonService,
    private _transfersService: FavouritePaymentsValidator,
    private deviceDetectorService: DeviceDetectorService,
    private _fileOpener: FileOpenerService,
    private _paymentReceiptService: TransferService,
    private _shareInfo: ShareInfo,
    protected translate: TranslateService,
    public deviceService: DeviceDetectorService,
    private _appConfig: AppConfigService,
    private _deviceDetectorService: DeviceDetectorService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _dialogRef: MatDialogRef<any>,
    private eligibletoaccountService: EligibletoaccountService,
    private _currencyFormatter: FpxCurrenyFormatterPipe) {
    super();

  }

  ngOnInit(): void {
    console.log('transfers: confirmation receipt');
    console.log(this._appConfig.getData('processResponse'))
    if (this._appConfig.getData('processResponse')) {
      this.setPageDependency(this._appConfig.getData('processResponse'))
    }
  }

  ngAfterViewInit() {
    if (this._appConfig.hasData('scheduledTransferDel$')) {
      this._appConfig.getData('scheduledTransferDel$').subject.next({
        action: "REFRESH"
      })
    }
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
          // fpxModal.setData({
          //   title: "transfersConfirmationForm.favFailureAlert.title",
          //   message: res.error.ErrorDescription
          // });
          fpxModal.setData({
            title: "transfersConfirmationForm.favSuccessAlert.title",
            message: "transfersConfirmationForm.favSuccessAlert.message"
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
            title: "transfersConfirmationForm.favFailureAlert.title",
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
    this.result.payload = payload;


    this._requestServiceCode = payload?.serviceCode || this.result.payload.requestPayload.serviceCode;
    this._requestStatus = payload?.requestStatus || this.result.payload.taskName;

    this.payloadInfo = payload;
    this.payId = payload?.requestReference;
    this._transactionDtl = this._appConfig.getData('transferData');
    this._transferToAccount = this._appConfig.getData('transferToAccountData');
    this._viewSchTransferData=this._appConfig.getData('viewSchTransferData');
    this._transferToAccount = this._appConfig.getData('transferToAccountData');


    if (payload.requestPayload.operationMode == 'M') {
      this._requestStatus = this._requestStatus + "_M";
    } else if (payload.requestPayload.operationMode == 'D') {
      this._requestStatus = this._requestStatus + "_D";
    }

    console.log("this._requestStatus", this._requestStatus)
    console.log("this._requestServiceCode", this._requestServiceCode)

  }

  decodeFrequency(frequency: number): string {
    const frequencyMap: { [key: number]: string } = {
      1: 'Daily',
      2: 'Bi-Weekly',
      3: 'Weekly',
      4: 'Monthly',
      5: 'Quarterly'
    };
    return frequencyMap[frequency] ||  this._transactionDtl?.frequency;
  }

  // gotoModule(serviceCode: string) {
  //   let service = this._deviceDetectorService.isDesktop() ? ['transfers-space', 'transfers'] : ['transfers-space']
  //   this._router.navigate(service);
  // }

  gotoTransferSpace() {
    if (this.deviceService.isMobile()) {
      this._router.navigate(['transfers-space']);
    }
    else if(this._requestServiceCode=='RETAILTRANINTBT') {
      this._router.navigate(['transfers-space','entry-shell','transfers','retail-within-bank-transfer-form']);
    }
    else if (this._requestServiceCode=='RETAILTRANOAT'){
      this._router.navigate(['transfers-space','entry-shell','transfers','retail-own-account-transfer-form']);
    }
    else  if (this._requestServiceCode=='RETAILSCHOAT' ||this._requestServiceCode=='RETAILSCHINTBT'){
      this._router.navigate(['transfers-space','display-shell','transfers','view-scheduled-transfers']);
    }
    else {
      this._router.navigate(['transfers-space', 'transfers']);
    }
  }


  doRepeat() {
    this._router.navigate(this._serviceDetail.servicePath);
  }

  gotoHome() {
    this._router.navigate(['home']);
  }
  onDownloadClick() {
    this._paymentReceiptService.fetchPaymentReceipt(this.payId).subscribe({
      next: (response: any) => {
        if (this.deviceDetectorService.isHybrid()) {
          this.hideSpinner();
          this._fileOpener.openPDF(
            response,
            "application/pdf",
            "AccountsDetails.pdf"
          );
        }
        else {
          let documentURL = URL.createObjectURL(
            new Blob([response.body], { type: "application/pdf" })
          );
          const downloadLink = document.createElement("a");
          downloadLink.href = documentURL;
          const fileName = "accountDetails.pdf";
          downloadLink.download = fileName;
        }
      }
    });
  }

  onShareClick() {
    let confirmationReceiptInfo: string =
      "Debit Account: " + this.payloadInfo.debitAccount + "\n" +
      "Bene Name: " + this.payloadInfo.beneName + "\n" +
      "Amount: " + this.payloadInfo.amount + " " + this.payloadInfo.currency + "\n" +
      // "Currency: " + this.payloadInfo.currency + "\n" + 
      "Initiated On: " + this.payloadInfo.initiatedOn + "\n"
    this._shareInfo.shareInfo(confirmationReceiptInfo, this.translate.instant('TransferConfirmationReceipt.shareSuccess'));
  }

  gotoTranHome() {
    this.updateAccountBalance(this.result);

    let rid = Math.floor(Math.random() * 99999999);
    this._angularRouter.navigate(['transfers-space'], {
      queryParams: {
        refresh: "Y"
      }
    });
    this._dialogRef.close();
  }


  updateAccountBalance(result: any) {
    console.log("result", result?.payload?.requestPayload?.debitAccount)
    if (result.payload) {
  
      let existingEligibleAccounts = this._appConfig.getData('wholeEligibleAccountsList');
      this.eligibletoaccountService.fetchEligibleAccounts().subscribe((res: any) => {
        if (res) {
       
          this._appConfig.removeData('wholeEligibleAccountsList');
          let arrayIndex1 = existingEligibleAccounts.findIndex((element: any) => element.accountNumber == result?.payload?.requestPayload?.debitAccount)
          let arrayIndex2 = res.findIndex((element: any) => element.accountNumber == result?.payload?.requestPayload?.debitAccount)
          let arrayIndex3 = existingEligibleAccounts.findIndex((element: any) => element.accountNumber == result?.payload?.requestPayload?.beneAccount)
          let arrayIndex4 = res.findIndex((element: any) => element.accountNumber == result?.payload?.requestPayload?.beneAccount)
          console.log("arrayIndex1", arrayIndex1)
          console.log("arrayIndex2", arrayIndex2)
          console.log("res", res)

          existingEligibleAccounts[arrayIndex1].availableBalance = res[arrayIndex2].availableBalance;
          if (result?.payload?.requestPayload?.serviceCode === "RETAILTRANOAT") {
            existingEligibleAccounts[arrayIndex3].availableBalance = res[arrayIndex4].availableBalance;
          }
          this._appConfig.setData('wholeEligibleAccountsList', existingEligibleAccounts)
        }
      })
    }
  }

}
