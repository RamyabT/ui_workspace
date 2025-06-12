import { Component, Inject, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent, BaseFpxFormHelper, FpxAppConfig, FpxFormControlErrorMessage, FpxModal, FpxModalAfterClosed, BaseFpxGridComponent, BaseFpxRoGridHelper, BaseFpxFunctionality, FpxCurrenyFormatterPipe } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { FileOpenerService, ShareInfo } from '@dep/native';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { FavouritePaymentsValidator } from 'src/app/transfers/favouritePayments-validator.service';
import { TransferService } from 'src/app/foundation/validator-service/transfers-service';
import { EtransfersFavouritePaymentsValidator } from '../validators/etransfersFavouritePayments-validator.service';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-etransfer-confirmation-receipt-form',
  templateUrl: './etransfer-confirmation-receipt-form.component.html',
  styleUrls: ['./etransfer-confirmation-receipt-form.component.scss']
})

export class ETransferConfirmationReceiptFormComponent extends BaseFpxFunctionality {

  result: any;
  resultPayload: any
  amount: any;
  payId: any;
  payloadInfo: any;
  receiveStatus:any;
  private _serviceCodeDetails: FpxAppConfig = inject(FpxAppConfig);
  private _serviceDetail: any;
  protected _requestServiceCode: string = "";
  protected _requestStatus: string = "";
  protected doDisableFav: boolean = false;
  scheduleType: any;
  failedPayment: any;
  currency: any;
  protected currentDate: any;
  autoDepositDtl: any;
  enbaleFavToggle: any;
  checkFavourite: any;

  constructor(private _router: Router,
    private _commonService: CommonService,
    private _etransfersService: EtransfersFavouritePaymentsValidator,
    private deviceDetectorService: DeviceDetectorService,
    private _fileOpener: FileOpenerService,
    private _paymentReceiptService: TransferService,
    private _shareInfo: ShareInfo,
    protected translate: TranslateService,
    public deviceService: DeviceDetectorService,
    private _appConfig: AppConfigService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _dialogRef: MatDialogRef<any>,
    private _currencyFormatter: FpxCurrenyFormatterPipe) {
    super();

  }

  ngOnInit(): void {

    if(this._dialogData?._requestServiceCode) this._requestServiceCode = this._dialogData._requestServiceCode;
    if(this._dialogData?._requestStatus) this._requestStatus = this._dialogData._requestStatus;
    if(this._dialogData?.currentDate) this.currentDate = this._dialogData.currentDate;
    if(this._dialogData?.payId) this.payId = this._dialogData.payId;
    console.log(this._appConfig.getData('processResponse'));

    if (this._appConfig.getData('processResponse')) {
      this.setPageDependency(this._appConfig.getData('processResponse'))
    }

    // console.log('etransfers: confirmation receipt');
    // if (this.getRoutingParam('serviceCode') == "ETRANSFERCANCELPAYMENT") {
    //   this._requestServiceCode = "ETRANSFERCANCELPAYMENT";
    //   this._requestStatus = "success";
    // }
    if (this.getRoutingParam('serviceCode') == "ETRANSFERSENDMONEY") {
      this.enbaleFavToggle = this._appConfig.getData('SendMoneyCat');
    }
  }

  ngAfterViewInit() {
  }

  changeFavourite($event: any) {
    let paymentId = this.result.resultPayload.requestReference;
    if (!($event.checked)) {
      this.showSpinner();
      this._etransfersService
        .unMarkFavouritePayments(paymentId)
        .subscribe((res) => {
          this.hideSpinner();
          let modal = new FpxModal();
          modal.setComponent(DepAlertComponent);
          modal.setPanelClass("dep-alert-popup");
          modal.setDisableClose(true);
          modal.setBackDropClass(['dep-popup-back-drop', 'success-popup','frequent-transction-poppup']);
          modal.setData({
            alertIcon: "success",
            title: "Success!",
            message: "Your transcation marked as unfavourite",
            okBtnLbl: "Close"
          });
          modal.setAfterClosed(this.contextmenuModelAfterClose);
          this.openModal(modal);
        });
    }
    else {
      this.showSpinner();
      this._etransfersService
        .markFavouritePayments(paymentId)
        .subscribe((res) => {
          this.hideSpinner();
          if (res.favpayments) {
            let modal = new FpxModal();
            modal.setComponent(DepAlertComponent);
            modal.setPanelClass("dep-alert-popup");
            modal.setDisableClose(true);
            modal.setBackDropClass(['dep-popup-back-drop', 'success-popup','frequent-transction-poppup']);
            modal.setData({
              alertIcon: "success",
              title: "Success!",
              message: "Your transcation marked as favourite",
              okBtnLbl: "Close"
            });
            modal.setAfterClosed(this.contextmenuModelAfterClose);
            this.openModal(modal);
          }
          else if (!res.favpayments) {
            let modal = new FpxModal();
            modal.setComponent(DepAlertComponent);
            modal.setPanelClass("dep-alert-popup");
            modal.setDisableClose(true);
            modal.setBackDropClass(['dep-popup-back-drop', 'success-popup', 'frequent-transction-poppup']);
            modal.setData({
              alertIcon: "cancel",
              title: "Whoops...",
              message: "Your transcation already marked as favourite",
              okBtnLbl: "Close"
            });
            modal.setAfterClosed(this.contextmenuModelAfterClose1);
            this.openModal(modal);
          }
        });
    }

   
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (this._appConfig.hasData('etransfersUpdate$')) {
      this._appConfig.getData('etransfersUpdate$').subject.next({ event: 'fav-etransfer-change' });
    }
    console.log("model closed...");
  }
  contextmenuModelAfterClose1: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (this.deviceDetectorService.isMobile()) {
      this._angularRouter.navigate(['etransfers-space'], {
        queryParams: {
          refresh: "Y"
        }
      });
    } else {
      if (this._appConfig.hasData('etransfersUpdate$')) {
        this._appConfig.getData('etransfersUpdate$').subject.next({ event: 'fav-etransfer-change' });
      }
      this._angularRouter.navigate(['etransfers-space/etransfers/etransfers-home'], {
        queryParams: {
          refresh: "Y"
        }
      });
    }
    this._dialogRef.close();
    this._dialogRef.close();
  }
  public setPageDependency(payload: any): void {
    this.result = {};
    if(payload?.serviceCode){
      this._requestServiceCode = payload?.serviceCode;
    }
    else{
      this._requestServiceCode = payload?.requestPayload?.serviceCode;
    }
    this.payloadInfo = payload;
    this.payId = payload?.requestReference || payload?.requestPayload?.requestReference;
    if (payload?.requestStatus == 'FAILUR' || payload?.taskName == 'FAILUR') {
      this._requestStatus = "ErrorEnd";
      let errorPayload = payload.routingInfo.queryParams.response;
      this.result = {
        statusCode: "failure",
        resultPayload: {
          errorCode: errorPayload.ErrorCode,
          errorMessage: errorPayload.ErrorMessage
        }
      }
    }
    else {
      if(payload?.taskName){
        this.result = {
          resultPayload: payload?.requestPayload
        };
      }
      else{
        this.result = {
          resultPayload: payload
        };
      }

      if (payload?.operationMode || payload?.requestPayload?.operationMode) {
        this.scheduleType = '1';
      }
      else this.scheduleType = '0';

      if(payload?.taskName){
        this._requestStatus = payload?.taskName;
      }
      else{
        this._requestStatus = payload?.requestStatus;
      }

      if (payload?.requestStatus == "ErrorEnd" || payload?.taskName =='ErrorEnd' ) {
        this.result.statusCode = "failure";
        this.failedPayment = "etransfersConfirmationReceipt.defaultErrorMessage";

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
        if((payload?.serviceCode=='RETAILETRANSFERAUTODEPOSIT' || this._requestServiceCode == 'RETAILETRANSFERAUTODEPOSIT') &&  this._requestStatus=='SuccessEnd'){
          this.autoDepositDtl = this._appConfig.getData('autoDepositData');
        }
        
        if (payload?.operationMode == 'M' || payload?.requestPayload?.operationMode == 'M' ) {
          this._requestStatus = this._requestStatus + "_M";
        }
        if (payload?.operationMode == 'D' || payload?.requestPayload?.operationMode == 'D') {
          this._requestStatus = this._requestStatus + "_D";
        }
        if(payload?.taskName){
          if (!(payload?.requestPayload?.scheduleType)) {
            if (payload?.requestPayload?.serviceCode != 'RETAILETRANSFERAUTODEPOSIT' && payload?.requestPayload?.serviceCode != 'RETAILETRANSFERMANAGECONTACT' && payload?.requestPayload?.serviceCode != 'RETAILETRANSFERREGISTRATION' )
              this._requestStatus = payload?.taskName;
            if (payload?.requestPayload?.serviceCode == 'ETRANSFERRECEIVEMONEY' || this._requestServiceCode == 'ETRANSFERRECEIVEMONEY') {
              if (this._appConfig.getData("status") == "accept") {
                this._requestStatus = 'accept' + this._requestStatus;
              }
              else if (this._appConfig.getData("status") == "decline") {
                this._requestStatus = 'decline' + this._requestStatus;
              }
            }
          }
          else {
            this._requestStatus = this._requestStatus + "_" + payload?.requestPayload?.scheduleType;
          }
        }
        else{
          if (!(payload?.scheduleType)) {
            if(payload?.serviceCode=='ETRANSFERRECEIVEMONEY'){
              if(this._appConfig.getData("status")=="accept"){
                this._requestStatus='accept'+this._requestStatus;
              }
              else if(this._appConfig.getData("status")=="decline"){
                this._requestStatus='decline'+this._requestStatus;
              }
          }
            if(payload?.serviceCode=='ETRANSFERFULFILLREQUESTMONEY'){
              if(this._appConfig.getData("status")=="accept"){
                this._requestStatus='accept'+this._requestStatus;
              }
              else if(this._appConfig.getData("status")=="decline"){
                this._requestStatus='decline'+this._requestStatus;
              }
            
          }
          if(payload?.serviceCode=='ETRFDCLFULFILLREQUESTMONEY'){
            if(this._appConfig.getData("status")=="accept"){
              this._requestStatus='accept'+this._requestStatus;
            }
            else if(this._appConfig.getData("status")=="decline"){
              this._requestStatus='decline'+this._requestStatus;
            }
          
        }
            if (payload?.serviceCode != 'RETAILETRANSFERAUTODEPOSIT'&& payload?.serviceCode != 'ETRANSFERRECLAIMMONEY' && payload?.serviceCode != 'ETRANSFERRECEIVEMONEY' && payload?.serviceCode != 'RETAILETRANSFERREGISTRATION' && payload?.serviceCode!='RETAILETRANSFERMANAGECONTACT' && payload?.serviceCode != 'ETRANSFERREQUESTMONEY' && payload?.serviceCode != 'ETRANSFERFULFILLREQUESTMONEY' && payload?.serviceCode != 'ETRFDCLFULFILLREQUESTMONEY') 
              this._requestStatus = payload?.taskName;

            if(payload?.serviceCode=='RETAILETRANSFERAUTODEPOSIT' &&  this._requestStatus=='SuccessEnd'){
              this.autoDepositDtl = this._appConfig.getData('autoDepositData');
            }
          }
          else {
            this._requestStatus = this._requestStatus + "_" + payload?.scheduleType;
          }
        }


        if (payload?.taskName) {
          this.amount = payload?.requestPayload?.amount;
          this.currency = payload?.requestPayload?.currency;
          this.currentDate= payload?.requestPayload?.initiatedOn;
          if (payload?.requestPayload?.requestReference && payload?.requestPayload?.initiatedOn) {
            this.result.additionalInfo = [
              {
                label: "Sender Name",
                value: payload?.requestPayload?.senderName
              },
              {
                label: "Payment Method",
                value: payload?.requestPayload?.paymentMethod
              },
              {
                label: "econfirmationReceiptForm.refNum",
                value: payload?.requestPayload?.requestReference
              },
              {
                label: "econfirmationReceiptForm.paymentDtandTime",
                value: payload?.requestPayload?.initiatedOn,
                format: 'date'
              },
              {
                value: "spacer",
              },
              {
                label: "Transfer Charge",
                value: payload?.requestPayload?.charge
              }
            ];
          }
        }
        else {
          this.amount = payload?.amount;
          this.currency = payload?.currency;
          this.currentDate= payload?.initiatedOn;
          if (payload?.requestReference && payload?.initiatedOn) {
            this.result.additionalInfo = [
              {
                label: "Sender Name",
                value: payload?.senderName
              },
              {
                label: "Payment Method",
                value: payload?.paymentMethod
              },
              {
                label: "econfirmationReceiptForm.refNum",
                value: payload?.requestReference
              },
              {
                label: "econfirmationReceiptForm.paymentDtandTime",
                value: payload?.initiatedOn,
                format: 'date'
              },
              {
                value: "spacer",
              },
              {
                label: "Transfer Charge",
                value: payload?.charge
              }
            ];
          }
        }
        if (this.scheduleType == '1') {
        }
      }
    }

  }

  gotoManageAutoDeposit(){
    this._router.navigate(['etransfers-space/entry-shell/etransfers/etransfer-manage-autodeposit'],{
      queryParams: {
        refreshManageAutoDeposit: Math.floor(Math.random() * 99999999),
        serviceCode: 'GETETRFAUTODEPOSIT'
      }
    });
    this._dialogRef.close();
  }
  gotoHome() {
    this._router.navigate(['home']);
  }
  
   gotoETranHome(){
    let rid = Math.floor(Math.random() * 99999999);
    if (this._appConfig.hasData('closeContactForm$')) {
      this._appConfig.getData('closeContactForm$').subject.next({
        showContactForm: false,
        showSendMoneyDetails: false,
        showReceiveMoneyDetails: false,
        showRequestMoneyDetails: false
      });
    }
    if (this.deviceDetectorService.isMobile()) {
      this._angularRouter.navigate(['etransfers-space'], {
        queryParams: {
          refresh: "Y"
        }
      });
    } else {
      this._angularRouter.navigate(['etransfers-space/etransfers/etransfers-home'], {
        queryParams: {
          refresh: "Y"
        }
      });
    }
    this._dialogRef.close();
  }

  doRepeat() {
    this._router.navigate(this._serviceDetail.servicePath);
  }
  addContactClick(){
    this._router.navigate(['etransfers-space/entry-shell/etransfers/retail-etransfercontactlog-form'], {
      queryParams: {
        refreshAddContact: Math.floor(Math.random() * 99999999)
      }
    });
    this._dialogRef.close();
  }
  autoDepositClick(){
    this._router.navigate(['etransfers-space/entry-shell/etransfers/retail-etransferautodepositlog-form']);
    this._dialogRef.close();
  }
  sendMoney(){
    if(this.deviceDetectorService.isMobile()) {
      this._appConfig.setData('navBack', ['etransfers-space']);
    }
    else {
      this._appConfig.setData('navBack', ['etransfers-space', 'etransfers', 'etransfers-home']);
    }
    this._router.navigate(['etransfers-space/entry-shell/etransfers/retail-manage-etransfer-send-money-form'],
      {
        queryParams:{
          serviceCode: 'RETAILMANAGEETRANSFERSENDMONEY'
        }
      }
    );
    this._dialogRef.close();
  }
  requestMoney(){
    if(this.deviceDetectorService.isMobile()) {
      this._appConfig.setData('navBack', ['etransfers-space']);
    }
    else {
      this._appConfig.setData('navBack', ['etransfers-space', 'etransfers', 'etransfers-home']);
    }
    this._angularRouter.navigate(['etransfers-space/entry-shell/etransfers/retail-manage-etransfer-request-money-form'],{
      queryParams: {
        serviceCode: 'RETAILMANAGEETRANSFERREQUESTMONEY'
      }
  });
  this._dialogRef.close();
  }

}

