

import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { FileOpenerService } from '@dep/native';
import { AppConfigService, CustomMenuService, LanguageService } from '@dep/services';
import { FpxModal, HttpRequest } from '@fpx/core';
import { IFpxMenuChild } from '@fpx/layout';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { BaseFpxFunctionality} from '@fpx/core';
import { HttpContext } from '@angular/common/http';
import { APPCONSTANTS } from '@dep/constants';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { TranslateService } from '@ngx-translate/core';
import { Wallet } from '../components/wallet-service/wallet.model';

@Component({
  selector: 'app-wallet-context-menu',
  templateUrl: './wallet-context-menu.component.html',
  styleUrls: ['./wallet-context-menu.component.scss']
})
export class WalletContextMenuComponent extends BaseFpxFunctionality implements OnInit {
  protected activeMenu: string = '';

  @Input('resetActiveMenu') 
  set resetActiveMenu(value: boolean){
    if(value) this.activeMenu = '';
  }

  private _accountNumber:string = '';
  @Input() 
  set accountNumber(accNum:string){
    this._accountNumber = accNum;
    if(this._accountNumber) this.prepareContextMenu(this._accountNumber);
  }
  get accountNumber():string{
    return this._accountNumber;
  }
  private _highlightMenu: string = '';
  get highlightMenu(){
    return this._highlightMenu
  }
  @Input() set highlightMenu(highlightMenu){
    this._highlightMenu = highlightMenu;
    if(this._highlightMenu == 'open-new-casa') {
      this.openLink({
        id: "RETAILOPENNEWCASA",
        name: "<em>Apply for CASA</em>Account",
        icon: "RETAILOPENNEWCASA"
      });
    }
  }
  quickLinks: any;
  cardData!: Wallet;
  
  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);
  private restrictedServices:any;
  protected isPopup:boolean = false;
  protected doShowMoreQuickActions: boolean = false;

  protected appConstant: any = APPCONSTANTS;

  constructor(
    private _dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) private _dialogData : any,
    private _appConfig:AppConfigService,
    private _router:Router,
    private _menuService: CustomMenuService,
    private _commonService: CommonService,
    protected languageService: LanguageService,
    private route: ActivatedRoute,
    private _fileOpener: FileOpenerService,
    private _device: DeviceDetectorService,
    private _translate:TranslateService
  ) {
    super();
  }

  ngOnInit(): void {
    if(this._dialogData.hasOwnProperty('cardData')){
      this.isPopup = true;
      this.cardData = this._dialogData.cardData;
      this._accountNumber = this.cardData.walletAccountNumber;
      this.prepareContextMenu(this._accountNumber);
    }
  }
  ngAfterViewInit(): void {
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

  openLink(menu:any){
    this.activeMenu = menu.serviceCode;
    let service = this._appConfig.getServiceDetails(menu.serviceCode);
    if(this.activeMenu == "RETAILVOIDCHEQUE"){
      this.onDownloadClick();
    }
    else {
      let rid:number = Math.floor(Math.random() * 99999999);
      this._activeSpaceInfoService.setAccountNumber(this._accountNumber);
      this._router.navigate(service.servicePath, {
        queryParams: {
          rid: rid
        }
      });
    }

    if(this.isPopup) {
      this._dialogRef.close();
      this._appConfig.setData('accountCardData', this.cardData);
      this._activeSpaceInfoService.setAccountNumber(this.cardData.walletAccountNumber);
    }
    
    // setTimeout(()=>{
      
    // });

    this.doShowMoreQuickActions = false;
  }

  closeContextMenu(){
    this._dialogRef.close();
  }

  getContextMenu(){
    let contextMenu = this._menuService.getMenuList('WALLETQUICK');
    let serviceMenus = contextMenu;

    if(this.restrictedServices && this.restrictedServices.length){
      serviceMenus = contextMenu.filter((obj1:any) => !this.restrictedServices.find((obj2:any) => obj1.serviceCode == obj2.serviceCode));
    }

    this.quickLinks = serviceMenus;

    if(this.route?.snapshot?.queryParams?.['serviceCode'] && this.quickLinks.length > 0) {
      let menu = this.quickLinks.find((x: any)=>x.serviceCode == this.route?.snapshot?.queryParams?.['serviceCode'])
      this.openLink(menu);
    }
  }

  prepareContextMenu(accountNumber:string){
    this.activeMenu = '';
    if(APPCONSTANTS.contextMenuRestrictionRequired){
      if(this._commonService.casaServiceRestriction.has(accountNumber)){
        this.restrictedServices = this._commonService.casaServiceRestriction.get(accountNumber);
        this.getContextMenu();
      } else {
        this._commonService.fetchServiceRestriction(accountNumber).subscribe({
          next: (res) => {
            this._commonService.casaServiceRestriction.set(accountNumber, res);
            this.restrictedServices = res;
            this.getContextMenu();
          },
          error: (reason) => {
            this.getContextMenu();
          }
        });
      }
    } else {
      this.getContextMenu();
    }
    
  }

  showMoreQuickActions(){
    this.doShowMoreQuickActions = !this.doShowMoreQuickActions;
  }

  onDownloadClick() {
    console.log('qwerty');
    let accountNumber = this._accountNumber;
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
        fpxModal.setBackDropClass('dep-popup-back-drop');
        fpxModal.setData({
          title: titleMsg,
          message: errMsg
        });
        this.openModal(fpxModal);
      }
    });

  }

}
