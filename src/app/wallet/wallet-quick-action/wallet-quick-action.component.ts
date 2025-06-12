
import { Component, Input, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent, BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { AppConfigService } from '@dep/services';
import { DeviceDetectorService } from '@dep/core';
import { TranslateService } from '@ngx-translate/core';
import { RetailScanWalletQrComponent } from '../scan-wallet-qr/scan-wallet-qr.component';

@Component({
  selector: 'app-wallet-quick-action',
  templateUrl: './wallet-quick-action.component.html',
  styleUrls: ['./wallet-quick-action.component.scss'],
  providers: []

})
 
export class WalletQuickActionComponent extends BaseFpxFunctionality implements OnInit {
  activeMenu: string | undefined = '';

  protected _activeMenu: string = '';
  @Input('resetActiveMenu') 
  @Input('receivedValue') receivedValue!: any;

  set resetActiveMenu(value: boolean){
    if(value) this._activeMenu = '';
  }

  quickLinks: any;
  doShowMoreQuickActions: boolean = false;

  constructor(
    private _router: Router,
    private _appConfig: AppConfigService,
    protected _device: DeviceDetectorService,
    protected translate: TranslateService
  ) { 
    super();
  }

  ngOnInit(): void {
       this.quickLinks = [
        {
          id: this.translate.instant('WALLETQUICKACTION.scanPay.id'),
          name: "Scan and Pay",
          serviceCode: 'RETAILSCANWALLETQR'
        },
        {
          id: this.translate.instant('WALLETQUICKACTION.scanPay.id'),
          name: "Send Money",
          serviceCode: 'RETAILWALLETTRANSFER'
        },
        {
          id: this.translate.instant('WALLETQUICKACTION.addMoney.id'),
          name: "Add Money",
          serviceCode: this.translate.instant('WALLETQUICKACTION.addMoney.serviceCode')
        },
        {
          id: this.translate.instant('WALLETQUICKACTION.requestMoney.id'),
          name: "Request Money",
          serviceCode: "RETAILWALLETREQMONEY"
        } 
      ];
   
    
  }

  openContextMenu(menu: any) {
    if(menu.serviceCode == 'RETAILSCANWALLETQR'){
      this.scanAndPay();
    }
    else{
    let service = this._appConfig.getServiceDetails(menu.serviceCode);
    if(!this._device.isMobile()){
      this.doShowMoreQuickActions = false;
    }
    this._activeMenu = menu.serviceCode;
    this._router.navigate(service.servicePath);
  }
  }

  toggleMoreQuickActions() {
    this.doShowMoreQuickActions = !this.doShowMoreQuickActions;
  }

  hideMoreQuickActions($event:any){
    $event.stopPropagation();
    this.doShowMoreQuickActions = false;
  }
  scanAndPay() {
    let modal = new FpxModal();
    modal.setComponent(RetailScanWalletQrComponent);
    modal.setPanelClass("dep-info-popup");
    modal.setDisableClose(false);


    modal.setData({
      title: "Scan and Pay",
      subTitle: "Scan or Upload Wallet QR code",
    });
    modal.setAfterClosed(this.popupCloseEvent);
    this.openModal(modal);
  }

  popupCloseEvent: FpxModalAfterClosed = (payload: any) => {
    if(payload=='RETAILWALLETTRANSFER'){
      let service = this._appConfig.getServiceDetails(payload);
      this._router.navigate(service.servicePath);
    }
  }

}
