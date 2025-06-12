import { Component, Inject, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent, BaseFpxFormHelper, FpxAppConfig, FpxFormControlErrorMessage, FpxModal, FpxModalAfterClosed, BaseFpxGridComponent, BaseFpxRoGridHelper, BaseFpxFunctionality, FpxCurrenyFormatterPipe } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { AppConfigService } from '@dep/services';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from '@dep/core';
import { BillPaymentsService } from 'src/app/foundation/validator-service/billpayments.service';
import moment from 'moment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EligibletoaccountService } from 'src/app/foundation/eligibletoaccount-service/eligibletoaccount.service';

@Component({
  selector: 'app-payments-confirmation-receipt-form',
  templateUrl: './payments-confirmation-receipt-form.component.html',
  styleUrls: ['./payments-confirmation-receipt-form.component.scss']
})

export class PaymentsConfirmationReceiptFormComponent extends BaseFpxFunctionality {

  result: any;
  resultPayload: any
  description: any;
  protected _requestServiceCode: string = "";
  protected _requestStatus: string = "";
  multiBillInfo: any = [];
  closeBtnText: string = "Close";
  primaryBtnText: string = "Back to bills";
  operationMode: string = "";
  selectedBillerDataForModify: any;
  paidBillDetails: any;

  constructor(private _router: Router,
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _translateService: TranslateService,
    private _deviceDetectorService: DeviceDetectorService,
    private _billPaymentsService: BillPaymentsService,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
    private eligibletoaccountService: EligibletoaccountService,
    private _appConfig: AppConfigService) {
    super();
  }

  ngOnInit(): void {
    if (this._appConfig.getData('processResponse')) {
      this.constructPayload(this._appConfig.getData('processResponse'))
    }
  }
  constructPayload(payload: any) {
    let newPayload: any;

    if (payload?.requestPayload) {
      newPayload = payload?.requestPayload;
      this._requestServiceCode = payload.requestPayload.serviceCode;
      this._requestStatus = payload.taskName;
    } else {
      newPayload = payload;
      this._requestServiceCode = payload?.serviceCode;
      this._requestStatus = payload?.taskName || payload?.requestStatus;
    }

    this.setPageDependency(newPayload);
  }

  ngAfterViewInit() {
    this._billPaymentsService.billpaymentsDesktopActionPublisher?.next({ action: 'REFRESHSAVEDBILLER' })


    if (this._appConfig.hasData('scheduledBillAction$')) {
      this._appConfig.getData('scheduledBillAction$').subject.next({
        action: "REFRESH"
      })
    }

  }

  public setPageDependency(payload: any): void {

    // let errorPayload = {
    //   "requestPayload": {
    //     "rootFlowInstanceId": "20250228152321016074",
    //     "amount": "2",
    //     "debitAccount": "100000932360",
    //     "serviceCode": "ETRANSFERSENDMONEY",
    //     "requestReference": "20250228095320362791",
    //     "errorMessage": " Insertion Failed for the Table PAYMENT_ETRANSFER_MOCK with Error: \"CONTACT_CATEGORY\": invalid identifier\n",
    //     "errorCode": "ORA-00904",
    //     "serviceName": "Send Money",
    //     "beneName": "mansur rana singh",
    //     "scheduleType": "1",
    //     "initiatedOn": "2025-02-28 09:53:21",
    //     "completedOn": "2025-02-28 09:53:22",
    //     "currency": "CAD",
    //     "initiatedBy": "U00021524",
    //     "status": "9"
    //   },
    //   "errorMessage": " Insertion Failed for the Table PAYMENT_ETRANSFER_MOCK with Error: \"CONTACT_CATEGORY\": invalid identifier\n",
    //   "errorCode": "ORA-00904",
    //   "workflowType": "T",
    //   "taskName": "ErrorEnd"
    // }

    // payload = errorPayload;
    // this._requestStatus = payload.taskName;
    this.result = { resultPayload: payload };

    if (payload.taskName === 'ErrorEnd') {
      this.closeBtnText = "Cancel";
      this.primaryBtnText = "Try Again";
      this.description = this._translateService.instant(this._requestServiceCode + '.' + this._requestStatus + ".description");
    } else {
      if (payload.operationMode == 'M') {
        this.selectedBillerDataForModify = this._appConfig.getData('selectedBillerDataForModify');
        this.operationMode = 'M';
        this.description = this._translateService.instant(this._requestServiceCode + '.' + "startMsg");
        this.primaryBtnText = "Pay a bill";
      } else if (payload.operationMode == 'D') {
        this.operationMode = 'D';
        let billerName = payload?.billerNickName || payload?.billerName;
        if (this._requestServiceCode === "RETAILBILLERACCOUNT") {
          this.description = billerName + " " + (this._translateService.instant(this._requestServiceCode + '.' + this._requestStatus + '.' + "deleteMsg"));
        } else if (this._requestServiceCode === "RETAILSCHBILLPAYMENTS") {
          this.description = (this._translateService.instant(this._requestServiceCode + '.' + this._requestStatus + '.' + "deleteMsg"));
        }
      } else if (payload.operationMode == 'A') {
        this.operationMode = 'A';
        this.selectedBillerDataForModify = this._appConfig.getData('selectedBillerDataForAdd');
        this.description = this._translateService.instant(this._requestServiceCode + '.' + "addMsg") + " " + payload?.billerName + " " + this._translateService.instant(this._requestServiceCode + '.' + "addedMsgContent");
        this.primaryBtnText = "Pay a bill";
      } else {
        if (this._requestServiceCode === 'RETAILMULTIBILLPAYMENT') {
          // this.paidBillDetails = this._appConfig.getData('paidBillDetails');
          this.paidBillDetails = payload;
          this.operationMode = 'BILLPAYMENT';
          this.primaryBtnText = "Pay another bill";
          if (this.paidBillDetails?.billResponse.length > 1) {
            this.description = this._translateService.instant(this._requestServiceCode + '.' + this._requestStatus + ".multiBillDescription");
          }
          else {
            this.description = this._translateService.instant(this._requestServiceCode + '.' + this._requestStatus + ".description");
          }
        }
      }
    }
  }


  setUpAdditionalInfo(payload: any) {
    if (payload?.requestReference && payload?.initiatedOn) {
      this.result.additionalInfo = [];
      let multibillrequest = JSON.parse(JSON.stringify(this._appConfig.getData('multibillrequest')));
      let payFrom = multibillrequest?.accountNickname + ' ' + multibillrequest.debitAccount;
      let multibillrequestdetail = multibillrequest.multibillrequestdetail.filter((x: any) => x.paymentAmount != "");
      this.multiBillInfo = [];
      let title = [{
        label: "Paid From",
        value: payFrom,
        format: 'innerhtml'
      }];
      this.multiBillInfo.push(title);
      multibillrequestdetail.forEach((element: any) => {
        this.result.additionalInfo = [];
        if (multibillrequestdetail.length > 1) {
          this.result.additionalInfo.push({
            label: "Payee " + element.orderSl,
            value: element.nickName,
            format: 'header'
          },)
        }
        this.result.additionalInfo.push({
          label: "Paid To",
          value: element.nickName,
        },)
        let amount = { amount: element.paymentAmount, currencyCode: (element.currency || this._appConfig.getBaseCurrency()) }
        this.result.additionalInfo.push({
          label: "Payment Amount",
          value: amount,
          format: 'amount'
        },)
        this.result.additionalInfo.push(
          {
            label: "confirmationReceiptForm.paymentDate",
            value: element.paymentDate,
            format: 'date'
          }
        );
        if (element.scheduleType) {
          this.result.additionalInfo.push({
            label: "Frequency ",
            value: this.getFrequency(element.paymentFrequency),
            format: 'innerhtml'
          },)
          this.result.additionalInfo.push({
            label: "End Date",
            value: element.paymentEndDate,
          },)
        }
        this.result.additionalInfo.push(
          {
            label: "confirmationReceiptForm.confirmationNumber",
            value: payload?.requestReference
          }
        );
        this.multiBillInfo.push(this.result.additionalInfo);
      });

      if (this._requestServiceCode != 'RETAILMULTIBILLPAYMENT') {
        this.result.additionalInfo.push(
          {
            label: "confirmationReceiptForm.paymentDate",
            value: moment(payload?.initiatedOn).format('DD MMM yyyy'),
            format: 'date'
          }
        );
        if (payload.amount) {
          let amount = { amount: payload.amount, currencyCode: (payload.currencyCode || this._appConfig.getBaseCurrency()) }
          this.result.additionalInfo.push({
            label: "Payment Amount",
            value: amount,
            format: 'amount'
          },)
        }
        this.result.additionalInfo.push(
          {
            label: "confirmationReceiptForm.confirmationNumber",
            value: payload?.requestReference
          }
        );
      }

    }
  }

  gotoModule(serviceCode: string) {
    this.updateAccountBalance(this.result);

    let service = ["payments-space",
      "display-shell",
      "payments",
      "retail-saved-biller-list-ro-grid"]

    this._dialogRef.close();

    // let service = ["payments-space"]
    this._router.navigate(service);
  }

  updateAccountBalance(result: any) {
    let existingEligibleAccounts = this._appConfig.getData('wholeEligibleAccountsList');
    this.eligibletoaccountService.fetchEligibleAccounts().subscribe((res: any) => {
      if (res) {
        this._appConfig.removeData('wholeEligibleAccountsList');
        let arrayIndex1 = existingEligibleAccounts.findIndex((element: any) => element.accountNumber == result?.resultPayload?.debitAccount)
        let arrayIndex2 = res.findIndex((element: any) => element.accountNumber == result?.resultPayload?.debitAccount)
        existingEligibleAccounts[arrayIndex1].availableBalance = res[arrayIndex2].availableBalance
        this._appConfig.setData('wholeEligibleAccountsList', existingEligibleAccounts)
      }
    })
  }




  getFrequency(key: any) {
    let frequency;
    switch (key) {
      case "1": frequency = "Daily"; break;
      case "2": frequency = "Bi-Weekly"; break;
      case "3": frequency = "Weekly"; break;
      case "4": frequency = "Monthly"; break;
      case "5": frequency = "Quarterly"; break;
      case "6": frequency = "Half Yearly"; break;
      case "7": frequency = "Yearly"; break;
      case "8": frequency = "Every N Days"; break;
    }
    return frequency
  }
  gotoHome(){
    this._dialogRef.close();
    this._router.navigate(['home']);
  }
}
