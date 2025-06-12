import { ChangeDetectorRef, Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DepPanningComponent, DeviceDetectorService } from '@dep/core';
import { FpxAppConfig, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { AccountsSpaceManager } from 'src/app/accounts-space/accounts-space.manager';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import { DepTooltipComponent } from 'src/app/dep/core/component/dep-tooltip/dep-tooltip.component';
import { PanningService } from 'src/app/dep/services/panning.service';
import { EtransfercustomerService } from 'src/app/etransfers-space/etransfercustomer-service/etransfercustomer.service';
import { ETransferConfirmationReceiptFormComponent } from 'src/app/etransfers/etransfer-confirmation-receipt-form/etransfer-confirmation-receipt-form.component';
import { BannerAdsService } from 'src/app/foundation/banner-ads/banner-ads.service';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { MomentService } from 'src/app/foundation/validator-service/moment-service';

@Component({
  selector: 'etransfers-aside-bar',
  templateUrl: './etransfers-aside-bar.component.html',
  styleUrls: ['./etransfers-aside-bar.component.scss']
})
export class eTransfersAsideBarComponent extends DepPanningComponent implements OnInit {
  serviceCode: string = "";
  expandAsideBar: boolean = true;
  showWidget: boolean = true;
  dateTime: any
  adsBannerSlids = [
    {
      id: '01',
      banner: './assets/images/banners/ads-banner1.jpg',
      content: 'BANNER_SLIDES.01'
    },
    { 
      id: '02',
      banner: './assets/images/banners/ads-banner2.jpg', 
      content: 'BANNER_SLIDES.02'
    }, 
    { 
      id: '03',
      banner: './assets/images/banners/ads-banner3.jpg', 
      content: 'BANNER_SLIDES.03'
    }
  ];
  bannersList: any;
  selectedScheduleBillDetails: any;

  showContactForm: boolean = false;
  showRequestMoneyDetails: boolean = false; 
  showSendMoneyDetails: boolean = false;
  showReceiveMoneyDetails: boolean = false;
  sendMoneyDetailsObj: any = {};
  receiveMoneyDetailsObj: any = {};
  requestMoneyDetailsObj: any = {};
  sendMoneyDetails: any = [
    {
      title: this._translateService.instant('ETRANSFER_ASIDE_BAR.sendMoneyDetails.sentTo'),
      value: "",
      showLabel: true
    },
    {
      title: this._translateService.instant('ETRANSFER_ASIDE_BAR.sendMoneyDetails.notifiedBy'),
      value: "",
      showLabel: true
    },
    {
      title: this._translateService.instant('ETRANSFER_ASIDE_BAR.sendMoneyDetails.sentFrom'),
      value: "",
      showLabel: true
    },
    {
      title: this._translateService.instant('ETRANSFER_ASIDE_BAR.sendMoneyDetails.amount'),
      value: "",
      showLabel: true,
      format: 'currency'
    }, 
    {
      title: this._translateService.instant('ETRANSFER_ASIDE_BAR.sendMoneyDetails.fee'),
      value: "",
      showLabel: true
    },
    {
      title: this._translateService.instant('ETRANSFER_ASIDE_BAR.sendMoneyDetails.status'),
      value: "",
      showLabel: true
    }, 
    {
      title: this._translateService.instant('ETRANSFER_ASIDE_BAR.sendMoneyDetails.message'),
      value: "",
      showLabel: true
    }
  ];
  receiveMoneyDetails: any = [
    {
      title: this._translateService.instant('ETRANSFER_ASIDE_BAR.receiveMoneyDetails.sentFrom'),
      value: "",
      showLabel: true
    },
    {
      title: this._translateService.instant('ETRANSFER_ASIDE_BAR.receiveMoneyDetails.depositTo'),
      value: "",
      showLabel: true
    },
    {
      title: this._translateService.instant('ETRANSFER_ASIDE_BAR.sendMoneyDetails.amount'),
      value: "",
      showLabel: true,
      format: 'currency'
    },
    {
      title: this._translateService.instant('ETRANSFER_ASIDE_BAR.sendMoneyDetails.fee'),
      value: "",
      showLabel: true
    }, 
    {
      title: this._translateService.instant('ETRANSFER_ASIDE_BAR.sendMoneyDetails.status'),
      value: "",
      showLabel: true
    },
    {
      title: this._translateService.instant('ETRANSFER_ASIDE_BAR.sendMoneyDetails.message'),
      value: "",
      showLabel: true
    }
  ];
  requestMoneyDetails: any = [
    {
      title: this._translateService.instant('ETRANSFER_ASIDE_BAR.requestMoneyDetails.sentTo'),
      value: "",
      showLabel: true
    },
    {
      title: this._translateService.instant('ETRANSFER_ASIDE_BAR.requestMoneyDetails.notifiedBy'),
      value: "",
      showLabel: true
    },
    {
      title: this._translateService.instant('ETRANSFER_ASIDE_BAR.requestMoneyDetails.depositTo'),
      value: "",
      showLabel: true
    },
    {
      title: this._translateService.instant('ETRANSFER_ASIDE_BAR.requestMoneyDetails.amount'),
      value: "",
      showLabel: true,
      format: 'currency'
    },
    {
      title: this._translateService.instant('ETRANSFER_ASIDE_BAR.requestMoneyDetails.fee'),
      value: "",
      showLabel: true
    }, 
    {
      title: this._translateService.instant('ETRANSFER_ASIDE_BAR.requestMoneyDetails.status'),
      value: "",
      showLabel: true
    },
    {
      title: this._translateService.instant('ETRANSFER_ASIDE_BAR.requestMoneyDetails.invoice'),
      value: "",
      showLabel: true
    },
    {
      title: this._translateService.instant('ETRANSFER_ASIDE_BAR.requestMoneyDetails.message'),
      value: "",
      showLabel: true
    }
  ];

  constructor(private _router: Router, private _appConfig: FpxAppConfig,
    private _device: DeviceDetectorService,
    private _bannerAdsService: BannerAdsService,
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private _accountSpaceManager: AccountsSpaceManager,
    private _commonService: CommonService,
    private _translateService: TranslateService,
    private etransfercustomerService: EtransfercustomerService,
    private momentService: MomentService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _dialogRef: MatDialogRef<any>,
  ) {
    super(renderer2, changeDetectorRef, panningService);
  }

  override ngOnInit(): void {
    this.serviceCode = this._device.isMobile() ? "RETAILMOBDASHBOARD" : "RETAILDESKDASHBOARD";
    // this._bannerAdsService.fetchBannerAds({ serviceCode: serviceCode }).subscribe({
    //   next: (res: any) => {
    //     console.log("ADS Banner:", res);
    //     this.bannersList = res || [];
    //   }
    // });

    let closeContactForm$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('closeContactForm$', {
      "observable": closeContactForm$.asObservable(),
      "subject": closeContactForm$
    });
    let showContactForm$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('showContactForm$', {
      "observable": showContactForm$.asObservable(),
      "subject": showContactForm$
    });
    let showSendMoneyDetails$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('showSendMoneyDetails$', {
      "observable": showSendMoneyDetails$.asObservable(),
      "subject": showSendMoneyDetails$
    });
    let showReceiveMoneyDetails$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('showReceiveMoneyDetails$', {
      "observable": showReceiveMoneyDetails$.asObservable(),
      "subject": showReceiveMoneyDetails$
    });
    let showRequestMoneyDetails$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('showRequestMoneyDetails$', {
      "observable": showRequestMoneyDetails$.asObservable(),
      "subject": showRequestMoneyDetails$
    });

    if (this._appConfig.hasData('closeContactForm$')) {
      this._appConfig.getData('closeContactForm$').observable.subscribe(
        (res: any) => {
          console.log("selectedScheduleBill", res);
          this.showContactForm = res?.showContactForm ? true : false;
          this.showSendMoneyDetails = res?.showSendMoneyDetails ? true : false;
          this.showReceiveMoneyDetails = res?.showReceiveMoneyDetails ? true : false;
          this.showRequestMoneyDetails = res?.showRequestMoneyDetails ? true : false;
        }
      );
    }

    if (this._appConfig.hasData('showContactForm$')) {
      this._appConfig.getData('showContactForm$').observable.subscribe(
        (res: any) => {
          console.log("selectedScheduleBill", res);
          // this.showContactForm = false;
          // setTimeout(() => {
            this.showContactForm = res?.showContactForm ? true : false;
          // }, 100);
        }
      );
    }

    if (this._appConfig.hasData('showSendMoneyDetails$')) {
      this._appConfig.getData('showSendMoneyDetails$').observable.subscribe(
        (res: any) => {
          console.log("selectedScheduleBill", res);
          this.showSendMoneyDetails = res?.showSendMoneyDetails ? true : false;
          this.sendMoneyDetailsObj = res?.sendMoneyDetailsObj;
          this.sendMoneyDetails[0].value = this.sendMoneyDetailsObj.beneficiaryName;
          this.sendMoneyDetails[1].value = this.sendMoneyDetailsObj.notificationPreference == 'E' ? this.sendMoneyDetailsObj.contactEmailId : this.sendMoneyDetailsObj.contactPhoneNumber;

          let casaAccounts = this._accountSpaceManager.getCasaAccountsList();
          let index = 0;
          if(this.sendMoneyDetailsObj.sourceAccount) index = casaAccounts.findIndex(x=>x.accountNumber == this.sendMoneyDetailsObj.sourceAccount);
          if(index != -1) this.sendMoneyDetails[2].value = casaAccounts[index].productDesc;
          
          this.sendMoneyDetails[3].value = this.sendMoneyDetailsObj.paymentAmount;
          this.sendMoneyDetails[4].value = this.sendMoneyDetailsObj.serviceFee;
          this.sendMoneyDetails[5].value = this.decodePaymentStatus(this.sendMoneyDetailsObj.status);
          this.sendMoneyDetails[6].value = this.sendMoneyDetailsObj.remarks;
        }
      );
    }

    if (this._appConfig.hasData('showReceiveMoneyDetails$')) {
      this._appConfig.getData('showReceiveMoneyDetails$').observable.subscribe(
        (res: any) => {
          console.log("selectedScheduleBill", res);
          this.showReceiveMoneyDetails = res?.showReceiveMoneyDetails ? true : false;
          this.receiveMoneyDetailsObj = res?.receiveMoneyDetailsObj;
          this.receiveMoneyDetails[0].value = this.receiveMoneyDetailsObj.contactName;
          // this.receiveMoneyDetails[1].value = this.receiveMoneyDetailsObj.notificationPreference == 'E' ? this.receiveMoneyDetailsObj.contactEmailId : this.receiveMoneyDetailsObj.contactPhoneNumber;

          let casaAccounts = this._accountSpaceManager.getCasaAccountsList();
          let index = 0;
          if(this.receiveMoneyDetailsObj.sourceAccount) index = casaAccounts.findIndex(x=>x.accountNumber == this.receiveMoneyDetailsObj.sourceAccount);
          if(index != -1) this.receiveMoneyDetails[1].value = casaAccounts[index].productDesc;
          
          this.receiveMoneyDetails[2].value = this.receiveMoneyDetailsObj.creditAmount;
          this.receiveMoneyDetails[3].value = this.receiveMoneyDetailsObj.serviceFee;
          this.receiveMoneyDetails[4].value = this.decodePaymentStatus(this.receiveMoneyDetailsObj.status);
          this.receiveMoneyDetails[5].value = this.receiveMoneyDetailsObj.remarks;
        }
      );
    }

    if (this._appConfig.hasData('showRequestMoneyDetails$')) {
      this._appConfig.getData('showRequestMoneyDetails$').observable.subscribe(
        (res: any) => {
          console.log("selectedScheduleBill", res);
          this.showRequestMoneyDetails = res?.showRequestMoneyDetails ? true : false;
          this.requestMoneyDetailsObj = res?.requestMoneyDetailsObj;
          this.requestMoneyDetails[0].value = this.requestMoneyDetailsObj.beneficiaryName;
          this.requestMoneyDetails[1].value = this.requestMoneyDetailsObj.notificationPreference == 'E' ? this.requestMoneyDetailsObj.contactEmailId : this.requestMoneyDetailsObj.contactPhoneNumber;

          let casaAccounts = this._accountSpaceManager.getCasaAccountsList();
          let index = 0;
          if(this.requestMoneyDetailsObj.sourceAccount) index = casaAccounts.findIndex(x=>x.accountNumber == this.requestMoneyDetailsObj.sourceAccount);
          if(index != -1) this.requestMoneyDetails[2].value = casaAccounts[index].productDesc;
          
          this.requestMoneyDetails[3].value = this.requestMoneyDetailsObj.paymentAmount;
          this.requestMoneyDetails[4].value = this.requestMoneyDetailsObj.serviceFee;
          this.requestMoneyDetails[5].value = this.decodePaymentStatus(this.requestMoneyDetailsObj.status);
          this.requestMoneyDetails[6].value = this.requestMoneyDetailsObj.invoiceNumber;
          this.requestMoneyDetails[7].value = this.requestMoneyDetailsObj.remarks;
        }
      );
    }
  }

  decodeTransferMode(transferMode: string){
    if(transferMode == 'S'){
      return 'Sent';
    }
    else if(transferMode == 'R'){
      return 'Requested';
    }
    return 'Received';
    
  }

  decodePaymentStatus(paymentStatus: string): string {
    const scheduleMap: { [key: string]: string } = {
      'P': 'Pending',
      'S': 'Completed',
      'C': 'Cancelled',
      'D': 'Declined',
      'E': 'Expired',

      'F': 'Failed',
      'I': 'Initiated',
      'A': 'Accepted',
    };
    return scheduleMap[paymentStatus];
  }
  formatDate(date: string, format: string) {
    console.log(date)
    console.log(moment(date).format(format))
    return moment(date).format(format);
  }

  toggleAsideBar(){
    this.expandAsideBar = !this.expandAsideBar;
    this.showWidget = this.expandAsideBar;
  }
  closeContactForm(){
    this.showContactForm = false;
  }

  closeSendMoneyDetails(){
    this.showSendMoneyDetails = false;
  }

  closeReceiveMoneyDetails(){
    this.showReceiveMoneyDetails = false;
  }

  closeRequestMoneyDetails(){
    this.showRequestMoneyDetails = false;
  }

  navToScreen(serviceCode:string){
    let service = this._appConfig.getServiceDetails(serviceCode);
    this._router.navigate(service?.servicePath, {
      queryParams: {
        "serviceCode": serviceCode,
      }
    });
  }

  onCancelETransfer() {
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(['dep-popup-back-drop','dep-confirmation-backdrop-2', 'logout-backdrop', 'bottom-transparent-overlay']);
    modal.setDisableClose(true);
    modal.setData({
      title: 'CancelETransferPopup.title',
      message: 'CancelETransferPopup.message',
      confirmationIcon: 'cancel-e-transfer',
      okBtnLbl: 'CancelETransferPopup.okBtnLbl',
      cancelBtnLbl: 'CancelETransferPopup.cancelBtnLbl'
    });
    modal.setAfterClosed(this.cancelETransferModelAfterClose);
    this.openModal(modal)
  }
  
  cancelETransferModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (payload === 1) {
      let payload={
        "paymentId": this.sendMoneyDetailsObj.paymentId,
        "transferMode": this.sendMoneyDetailsObj.transferMode,
        "amount" : this.sendMoneyDetailsObj.paymentAmount,
        "currency" : this.sendMoneyDetailsObj.paymentCurrency
      }
      this.showSpinner();
      this.etransfercustomerService.cancelETransfer(payload)().subscribe({
        next: (res: any) => {
          this.hideSpinner();
          if (this._appConfig.hasData('closeContactForm$')) {
            this._appConfig.getData('closeContactForm$').subject.next({
              showSendMoneyDetails: false,
            });
          }
          this._angularRouter.navigate(['etransfers-space','entry-shell','etransfers','etransfer-confirmation-receipt'],
            {
              queryParams: {
                serviceCode: "ETRANSFERCANCELPAYMENT"
              }
            }
          );
          this.dateTime = this.momentService.getInstance().format("YYYY-MM-DD HH:mm:ss");
          let modal = new FpxModal();
          modal.setComponent(ETransferConfirmationReceiptFormComponent);
          modal.setPanelClass("dep-alert-popup");
          modal.setDisableClose(true);
          modal.setBackDropClass(['dep-popup-back-drop', 'success-popup','etransfers-contacts-backdrop']);
          modal.setAfterClosed(this.dummycontextmenuModelAfterClose);
          modal.setData({
            _requestServiceCode:"ETRANSFERCANCELPAYMENT",
            _requestStatus: "SuccessEnd",
            payId: res?.etrfcancelpayment.processId,
            currentDate: this.dateTime

          });
          this.openModal(modal);
        },
        error: (err: any) => {
          this.hideSpinner();
        }
      })
    } else {

    }
  }

  backToETransfer() {
    if(this._device.isMobile()) {
      this._router.navigate(['etransfers-space'], {
        queryParams: {
          refresh: "Y"
        }
      });
    }
    else {
      this._router.navigate(['etransfers-space', 'etransfers', 'etransfers-home']);
    }
  }

  dummycontextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    // this._angularRouter.navigate(['etransfers-space']);
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (this._device.isMobile()) {
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

  sendReminder() {
    let payload={
      paymentId: this.sendMoneyDetailsObj.paymentId,
      transferMode: this.sendMoneyDetailsObj.transferMode,
    }
    this.showSpinner();
    this.etransfercustomerService.sendRemainder(payload)().subscribe({
      next: (res: any) => {
        this.hideSpinner();
        let modal = new FpxModal();
        modal.setComponent(DepAlertComponent);
        modal.setPanelClass("dep-alert-popup");
        modal.setDisableClose(true);
        modal.setBackDropClass(['dep-popup-back-drop', 'success-popup']);
        modal.setAfterClosed(this.contextmenuModelAfterClose);
        modal.setData({
          alertIcon: "success",
          title: "Success!",
          message: "Reminder was sent to the recipient.",
          okBtnLbl: "Close"
        });
        this.openModal(modal);
      },
    //   error: (err: any) => {
    //     this.hideSpinner();
    //     // let modal = new FpxModal();
    //     // modal.setComponent(DepConfirmationComponent);
    //     // modal.setPanelClass("dep-confirmation-popup");
    //     // modal.setDisableClose(false);
    //     // modal.setAfterClosed(this.contextmenuModelAfterClose);
    //     // modal.setData({
    //     //   message: "DeleteNicknamePopup.message",
    //     //   okBtnLbl: "DeleteNicknamePopup.okBtnLbl",
    //     //   cancelBtnLbl: "DeleteNicknamePopup.cancelBtnLbl",
    //     //   confirmationIcon: "delete"
    //     // });
    //     // this.openModal(modal);
    //   }
    })
  }

  sendAnotherETransfer() {
    if (this._appConfig.hasData('closeContactForm$')) {
      this._appConfig.getData('closeContactForm$').subject.next({
        showSendMoneyDetails: false,
      });
    }
    this._router.navigate(['etransfers-space','entry-shell','etransfers','retail-etransfer-form'],
      {
        queryParams: {
          paymentId: this.sendMoneyDetailsObj.paymentId,
          serviceCode: 'ETRANSFERSENDMONEY',
          mode:'R'
        }
      }
    );
  }

  closeBillDetails() {
    this.showSendMoneyDetails = false;
    this.showRequestMoneyDetails = false;
    this.showReceiveMoneyDetails = false;
    if (this._appConfig.hasData('refreshTransferHistoryGrid$')) {
      this._appConfig.getData('refreshTransferHistoryGrid$').subject.next();
    }
  }

  RonCancelETransfer() {
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(['dep-popup-back-drop','dep-confirmation-backdrop-2', 'logout-backdrop', 'bottom-transparent-overlay']);
    modal.setDisableClose(true);
    modal.setData({
      title: 'CancelETransferReqPopup.title',
      message: 'CancelETransferPopup.message',
      confirmationIcon: 'cancel-e-transfer',
      okBtnLbl: 'CancelETransferPopup.okBtnLbl',
      cancelBtnLbl: 'CancelETransferPopup.cancelBtnLbl'
    });
    modal.setAfterClosed(this.RcancelETransferModelAfterClose);
    this.openModal(modal)
  }

  RcancelETransferModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (payload === 1) {
      let payload={
        "paymentId":this.requestMoneyDetailsObj.paymentId,
        "transferMode": this.requestMoneyDetailsObj.transferMode,
        "amount" : this.requestMoneyDetailsObj.paymentAmount,
        "currency" : this.requestMoneyDetailsObj.paymentCurrency
      }
      this.showSpinner();
      this.etransfercustomerService.cancelETransfer(payload)().subscribe({
        next: (res: any) => {
          this.hideSpinner();
          if (this._appConfig.hasData('closeContactForm$')) {
            this._appConfig.getData('closeContactForm$').subject.next({
              showRequestMoneyDetails: false
            });
          }
          this._angularRouter.navigate(['etransfers-space','entry-shell','etransfers','etransfer-confirmation-receipt'],
            {
              queryParams: {
                serviceCode: "ETRANSFERCANCELPAYMENT"
              }
            }
          );
          this.dateTime = this.momentService.getInstance().format("YYYY-MM-DD HH:mm:ss");
          let modal = new FpxModal();
          modal.setComponent(ETransferConfirmationReceiptFormComponent);
          modal.setPanelClass("dep-alert-popup");
          modal.setDisableClose(true);
          modal.setBackDropClass(['dep-popup-back-drop', 'success-popup','etransfers-contacts-backdrop']);
          modal.setAfterClosed(this.contextmenuModelAfterClose);
          modal.setData({
            _requestServiceCode:"ETRANSFERCANCELPAYMENT",
            _requestStatus: "SuccessEnd",
            payId: res?.etrfcancelpayment.processId,
            currentDate: this.dateTime

          });
          this.openModal(modal);
        },
        error: (err: any) => {
          this.hideSpinner();
        }
      })
    } else {

    }
  }

  RsendReminder() {
    let payload={
      paymentId:this.requestMoneyDetailsObj.paymentId,
      transferMode:this.requestMoneyDetailsObj.transferMode,
    }
    this.showSpinner();
    this.etransfercustomerService.sendRemainder(payload)().subscribe({
      next: (res: any) => {
        this.hideSpinner();
        let modal = new FpxModal();
        modal.setComponent(DepAlertComponent);
        modal.setPanelClass("dep-alert-popup");
        modal.setDisableClose(true);
        modal.setBackDropClass(['dep-popup-back-drop', 'success-popup']);
        modal.setAfterClosed(this.contextmenuModelAfterClose);
        modal.setData({
          alertIcon: "success",
          title: "Success!",
          message: "Reminder was sent to the recipient.",
          okBtnLbl: "Close"
        });
        this.openModal(modal);
      },
      error: (err: any) => {
        this.hideSpinner();
        // let modal = new FpxModal();
        // modal.setComponent(DepConfirmationComponent);
        // modal.setPanelClass("dep-confirmation-popup");
        // modal.setDisableClose(false);
        // modal.setAfterClosed(this.contextmenuModelAfterClose);
        // modal.setData({
        //   message: "DeleteNicknamePopup.message",
        //   okBtnLbl: "DeleteNicknamePopup.okBtnLbl",
        //   cancelBtnLbl: "DeleteNicknamePopup.cancelBtnLbl",
        //   confirmationIcon: "delete"
        // });
        // this.openModal(modal);
      }
    })
  }

  RcontextmenuAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    this._angularRouter.navigate(['etransfers-space']);
  }

  RsendAnotherETransfer() {
    if (this._appConfig.hasData('closeContactForm$')) {
      this._appConfig.getData('closeContactForm$').subject.next({
        showRequestMoneyDetails: false,
      });
    }
    this._router.navigate(['etransfers-space','entry-shell','etransfers','retail-etransfer-request-money-form'],
      {
        queryParams: {
          paymentId: this.requestMoneyDetailsObj.paymentId,
          serviceCode: 'ETRANSFERREQUESTMONEY',
          mode:'R'
        }
      }
    );
  }

  deleteBill() {
    // $event.stopPropagation();
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(['dep-popup-back-drop', 'delete-bill-backdrop', 'bottom-transparent-overlay', 'delete-scheduled-bill-backdrop']);
    modal.setDisableClose(true);
    modal.setData({
      title: "Delete your scheduled bill to" + " " + this.selectedScheduleBillDetails.selectedData.beneficiaryName + "?",
      // message: "DeleteBillerPopup.message",
      okBtnLbl: "DeleteScheduledBillPopup.okBtnLbl",
      cancelBtnLbl: "DeleteScheduledBillPopup.cancelBtnLbl",
      confirmationIcon: "delete"
    });
    modal.setAfterClosed(this.DelBillModelAfterClose);
    this.openModal(modal);
  }


  DelBillModelAfterClose: FpxModalAfterClosed = (payload) => {
    console.log(payload)
    console.log(payload)
    if (payload == 1) {
      if (this._appConfig.hasData('scheduledBillRefresh$')) {
        this._appConfig.getData('scheduledBillRefresh$').subject.next({ payload: this.selectedScheduleBillDetails.selectedData, deleteRequest: 1 });
        this.selectedScheduleBillDetails = null;
      }
    }
  }
  

}
