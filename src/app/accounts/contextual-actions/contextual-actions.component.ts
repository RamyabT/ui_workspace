import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService, LanguageService } from '@dep/services';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { CasaContextMenuComponent } from '../casa-context-menu/casa-context-menu.component';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import { TranslateService } from '@ngx-translate/core';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { FileOpenerService } from '@dep/native';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
@Component({
  selector: 'contextual-actions',
  templateUrl: './contextual-actions.component.html',
  styleUrls: ['./contextual-actions.component.scss']
})
export class ContextualActionsComponent extends BaseFpxFunctionality implements OnInit {
  @Input('accountNumber') accountNumber: string = '';
  @Input('cardData') cardData: Casaaccount | undefined;
  @Input('hasAtleastOneTransferToAccount') hasAtleastOneTransferToAccount: boolean = true;
  @Input('showAccountsLoader') showAccountsLoader: boolean = false;

  @Input('quickLinks') 
  set quickLinks(data:any){
    if(data && data.length){
      if(data.length > 5){
        let cloneList = data.slice();
        this.quickActionsList = cloneList.splice(0,5);
        this.showMore = true;
      } else {
        this.quickActionsList = data;
      }
    }
  }
  get quickLinks(){
    return this.quickActionsList;
  }

  private _quickLinks: any;
  protected showMore:boolean = false;
  protected quickActionsList:any;
  protected activeMenu: string = '';

  constructor(
    private _appConfig: AppConfigService,
    private _router: Router,
    protected languageService: LanguageService,
    protected _device: DeviceDetectorService,
    private _activeSpaceInfo:ActiveSpaceInfoService,
    private _translate:TranslateService,
    private _fileOpener:FileOpenerService,
    private _commonService:CommonService

  ) {
    super();
   }

  ngOnInit(): void {
    console.log('cardData', this.cardData);
    console.log('quickLinks', this.quickLinks);

    if (this._appConfig.hasData('accountDetailsData$')) {
      this._appConfig.getData('accountDetailsData$').observable.subscribe(
        (res: any) => {
          setTimeout(() => {
            if (res?.data.accountDetails.accountCurrency === 'USD') {
              this.quickLinks = this.quickLinks.filter((item: any) => item.serviceCode !== 'RETAILMULTIBILLREQUEST');
              console.log('quickLinks', this.quickLinks);
            }
          }, 500);
        }
      );
    }

    if (this._appConfig.hasData('moduleRefresh$')) {
      this._appConfig.getData('moduleRefresh$').observable.subscribe(
        (res: any) => {
          console.log("refresh accounts QUICKACTION...");
          if(res?.action === 'ACCOUNTSQUICKACTION'){
            this.activeMenu = res.data.serviceCode;
          }
        }
      );
    }

  }

  enabledServices = [
    'RETAILMULTIBILLPAYMENT',
    'RETAILETRANSFER',
    'RETAILACCNICKNAME',
    'RETAILVOIDCHEQUE',
    'RETAILSTOPCHEQUE',
    'RETAILACCOUNT',
    'RETAILTRANOAT',
    'RETAILTRANINTBT',
    'RETAILTRANSFERS',
    'RETAILMULTIBILLREQUEST',
    'CHEQUEDEPOSIT'

  ]

  openLink(menu:any){
    this.activeMenu = menu.serviceCode;
    if(!this.enabledServices.includes(menu.serviceCode)) return;
    let service = this._appConfig.getServiceDetails(menu.serviceCode);
    this._activeSpaceInfo.setOrginSpace(this._activeSpaceInfo.getActiveSpace());
    console.log("service", service);
    console.log("menu", menu);
    if (menu.serviceCode == 'RETAILTRANOAT' || menu.serviceCode == 'RETAILTRANINTBT') {
      if (!this.hasAtleastOneTransferToAccount && menu.serviceCode == 'RETAILTRANOAT') {
        this.openUnavailableEligibleAccountsPopup();
        return;
      }
      this._router.navigate(service.servicePath);
    } else if (menu.serviceCode == 'RETAILTRANSFERS' || menu.serviceCode == 'RETAILMULTIBILLREQUEST' || menu.serviceCode == 'CHEQUEDEPOSIT') {
      this._appConfig.setData('selectedAccountFromSummary', this.accountNumber);
      this._router.navigate(service.servicePath);
      // this._router.navigate(service.servicePath, {
      //   queryParams: {
      //     accountNumber: this.accountNumber,
      //     fromHome: true
      //   }
      // });
    }
    else if(this.activeMenu == "RETAILVOIDCHEQUE"){
      this.onDownloadClick();
    } 
    else {
      if(this._device.isDesktop()){
        this._appConfig.getData('showTransactionDetails$').subject.next({
          showTransactionDetails: false,
          viewChequeImg :false})
      }
      this._router.navigate(service.servicePath, {
        queryParams: {
          accountNumber: this.accountNumber
        }
      });
    }
  }

  showMoreActions(){
    let modal = new FpxModal();
    modal.setComponent(CasaContextMenuComponent);
    modal.setPanelClass('context-menu-popup');
    modal.setBackDropClass(['accounts-menu-backdrop']);
    modal.setDisableClose(false);
    modal.setData({
      cardData: this.cardData,
      showSubGroupHeader: true,
      showModuleHeader: true
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }

  openUnavailableEligibleAccountsPopup() {
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass("dep-alert-popup");
    modal.setBackDropClass(['dep-popup-back-drop', 'logout-backdrop', 'transfers-unavailable-popup', 'bottom-transparent-overlay']);
    modal.setDisableClose(true);
    modal.setData({
      message: "eligibleUnavailable.message",
      description: "eligibleUnavailable.description",
      okBtnLbl: "eligibleUnavailable.okBtnLbl",
      cancelBtnLbl: "eligibleUnavailable.cancelBtnLbl",
      confirmationIcon: "transfers-alert"
    })
    modal.setAfterClosed(this.unavailablePopupAfterClosed);
    this.openModal(modal);
  }

  unavailablePopupAfterClosed: FpxModalAfterClosed = (payload: any) => {
    this._router.navigate(['home'])
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...");
  }

  onDownloadClick() {
      console.log('qwerty');
      let accountNumber = this.accountNumber;
      this.showSpinner();
      this._commonService.downloadVoidCheque(accountNumber).subscribe({
        next: (response: any) => {
          this.hideSpinner();
          if (this._device.isHybrid()) {
            this._fileOpener.openPDF(
              response,
              "application/pdf",
              "Direct Deposit Form.pdf"
            );
          } else {
            let documentURL = URL.createObjectURL(
              new Blob([response.body], { type: "application/pdf" })
            );
            const downloadLink = document.createElement("a");
            downloadLink.href = documentURL;
            const fileName = "Direct Deposit Form.pdf";
            downloadLink.download = fileName;
          }
          let modal = new FpxModal();
          modal.setComponent(DepConfirmationComponent);
          modal.setPanelClass('dep-alert-popup');
          // modal.setBackDropClass(['accounts-menu-backdrop']);
          modal.setBackDropClass(['dep-popup-back-drop', 'dep-confirmation-backdrop-2', 'logout-backdrop', 'bottom-transparent-overlay']);
          modal.setDisableClose(false);
          modal.setData({
            title: 'RetailVoidChequeform.title',
            message: 'RetailVoidChequeform.message',
            confirmationIcon: 'success',
            okBtnLbl: 'RetailVoidChequeform.okBtnLbl',
            cancelBtnLbl: 'RetailVoidChequeform.cancelBtnLbl'
          });
          modal.setAfterClosed(this.ModelAfterClose);
          this.openModal(modal);
        },
        error: (error) => {
          this.hideSpinner();
          let errMsg: any;
          let titleMsg: any;
          if (error.status == 500) {
            titleMsg = this._translate.instant('RetailVoidChequeform.dataErrorTitle');
            errMsg = this._translate.instant('RetailVoidChequeform.DataError')
          }
          else if (error.status == 404) {
            titleMsg = this._translate.instant('RetailVoidChequeform.serviceUnavailableTitle');
            errMsg = this._translate.instant('RetailVoidChequeform.serverError');
          }
          else if (error.status == 504) {
            titleMsg = this._translate.instant('RetailVoidChequeform.timeOutTitle');
            errMsg = this._translate.instant('RetailVoidChequeform.TimeOutError');
          }
          const fpxModal = new FpxModal();
          fpxModal.setComponent(DepAlertComponent);
          fpxModal.setDisableClose(false);
          fpxModal.setPanelClass('dep-alert-popup');
          fpxModal.setBackDropClass('etransfer-send-limits');
          fpxModal.setData({
            title: titleMsg,
            message: errMsg
          });
          this.openModal(fpxModal);
        }
      });
    }

     ModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if(payload==1){
      this._angularRouter.navigate(['home']);
    }
  }

}
