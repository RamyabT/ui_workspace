import { ChangeDetectorRef, Component, EventEmitter, HostListener, OnInit, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { FileOpenerService } from '@dep/native';
import { AppConfigService, CustomMenuService, LanguageService } from '@dep/services';
import { BaseFpxFunctionality, CriteriaQuery, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest } from 'rxjs';
import { AccountnicknameService } from 'src/app/accounts/accountnickname-service/accountnickname.service';
import { CasaContextMenuComponent } from 'src/app/accounts/casa-context-menu/casa-context-menu.component';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import { DepTooltipComponent } from 'src/app/dep/core/component/dep-tooltip/dep-tooltip.component';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { CasaaccountService } from 'src/app/foundation/casaaccount-service/casaaccount.service';
import { CommonService } from 'src/app/foundation/validator-service/common-service';

@Component({
  selector: 'app-accounts-panel',
  templateUrl: './accounts-panel.component.html',
  styleUrls: ['./accounts-panel.component.scss']
})
export class AccountsPanelComponent extends BaseFpxFunctionality implements OnInit {
  @Output() onAccountsDataReceived:EventEmitter <any> = new EventEmitter<  any|null>();

  protected _appConfig: AppConfigService = inject(AppConfigService);
  contextMenuItems = [];
  contextMenuPositionX: number = 0;
  contextMenuPositionY: number = 0;
  isDisplayContextMenu: boolean = false;

  accountNickName!: any;
  casaAccounts!: Casaaccount[];
  total: any = {};

  private restrictedServices:any;
  quickLinks: any;
  currentAccountNumber: any;
  menuOptionBoundingRect: any;
  accountCurrency: string = '';
  currentIndex: any;
  currentAccount: Casaaccount = {} as Casaaccount;
  quickMenu: any;
  quickMenuLength:any;
  selectedAccountType: string = '';
  casaAccountsApiFailed: boolean = false;
  dormantInfo = 'Reinstate your account from dormant status by completing a transaction';
  showTooltip = false;
  quickLinksGrpObject: any = {
    payments: [],
    account: [],
    product: []
  };



constructor(
    protected device:DeviceDetectorService,
    private _router: Router,
    private casaAccountService: CasaaccountService,
    private _accountnicknameService: AccountnicknameService,
    private _commonService: CommonService,
    private _menuService: CustomMenuService,
    protected languageService: LanguageService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _fileOpener: FileOpenerService,
    private _translate: TranslateService,
    private _changeDetectorRef: ChangeDetectorRef
  ) { 
   super()
   }

  ngOnInit(): void {
    let cq = new CriteriaQuery();
    //let accountNickName$ = this._accountnicknameService.findAll(cq)();
    let casaSummary$ = this.casaAccountService.fetchCasaAccounts();
    combineLatest([ casaSummary$]).subscribe({
      next: ([ accounts]) => {
       // this.accountNickName = nickName.data;
        
        let tempCasaAccount: Casaaccount[] = []
        accounts?.forEach((item: Casaaccount) => {          
         
            tempCasaAccount.push({ ...item});

          
        });
        this.casaAccounts = tempCasaAccount;
        let totalCAD = 0;
        let totalUSD = 0;
        if(this.casaAccounts.length > 0) {
          this.casaAccounts.forEach(card => {
            if(card.accountCurrency == this._appConfig.baseCurrency) { //CAD account
              totalCAD = totalCAD + card.currentBalance;
            }
            else { //USD account
              this.accountCurrency = card.accountCurrency;
              totalUSD = totalUSD + card.currentBalance;
              totalCAD = totalCAD + (card.baseCurrencyCurrentBal?card.baseCurrencyCurrentBal:0);
            }
          });
          this.total = {
            totalCAD: totalCAD.toFixed(2),
            totalUSD: {
              amount: totalUSD.toFixed(2),
              accountCurrency: this.accountCurrency
            }
          }
        }
        this.onAccountsDataReceived.emit({accounts:this.casaAccounts,total:this.total});
        setTimeout(() => {
          let contextMenu = JSON.parse(JSON.stringify(this._menuService.getMenuList(this._menuService.getAccountsMenuCodeByAccountType(this.casaAccounts[0].accountType))));
          if(contextMenu.length>4){
            this.quickMenu = JSON.parse(JSON.stringify(contextMenu.splice(0,3)));
            this.quickMenuLength=3;
          }
          else{
            this.quickMenu = JSON.parse(JSON.stringify(contextMenu.splice(0,1)));
            this.quickMenuLength=1;
          }
          console.log(this.quickLinks,"quickmenu");
          
          this._changeDetectorRef.detectChanges();
        }, 1000);
      },
      error:(err)=> {
          this.casaAccounts = [];
          this.casaAccountsApiFailed = true;
          this.onAccountsDataReceived.emit({accounts:[],total:{totalCAD: '0.00', totalUSD: {amount: '0.00', accountCurrency: ''}}, hasError: true});
      },
    });
    if(!this.device.isMobile()) {
      this.getContextMenu();
    }
  }

  getAbsoluteValue(value: number | undefined): number {
    return value ? Math.abs(value) : 0;
  }

  checkNegativeValue(value: number | undefined): string {
    return value && value < 0 ? '-' : '';
  }

  ngAfterViewInit(){
    
  }

  sendMoney($event: any) {
    $event.preventDefault();
    $event.stopPropagation()
  }

  payBill($event: any) {
    $event.preventDefault();
    $event.stopPropagation()
  }

  showMoreActions(cardData: Casaaccount){
    let modal = new FpxModal();
    modal.setComponent(CasaContextMenuComponent);
    modal.setPanelClass('context-menu-popup');
    modal.setBackDropClass(['show-cross-button']);
    modal.setDisableClose(false);
    modal.setData({
      cardData: cardData
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...");
  }

  ModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if(payload==1){
      this._angularRouter.navigate(['home']);
    }
  }

  newAccount(event: any) {
    return;
    event.preventDefault();
    event.stopPropagation();
    this._router.navigate(['accounts-space','entry-shell','accounts','retail-open-new-casa-form']);
  }

  /** Display context menu */
  displayContextMenu($event: any, account: Casaaccount, index: number): void {
    this._appConfig.setData('selectedAccountNicknameDetails', account);
    console.log(account)
    console.log($event)
    $event.preventDefault();
    $event.stopPropagation();
    if(account.displayContextMenu) {
      account.displayContextMenu = false;
      return;
    }
    // this.casaAccounts.forEach(x=>x.displayContextMenu = false);
    // this.casaAccounts[index].displayContextMenu = true;
    this.selectedAccountType = account.accountType;

    // if (this.selectedAccountType !== 'CAA') {
    //   this.quickLinks = this.quickLinks.filter((item: any) => item.serviceCode !== 'RETAILSTOPCHEQUESUMMARY');
    // }


    if(this.device.isMobile()) {
      this.showMoreActions(account);
      return;
    }
    this.menuOptionBoundingRect = $event.currentTarget?.getBoundingClientRect();
    this.currentAccount = account;
    this.currentAccountNumber = account.accountNumber;
    this.prepareContextMenu(account.accountNumber);
    this.currentIndex = index;
    this.resetActiveMenu();
    this._changeDetectorRef.detectChanges();
  }

  setMenuPosition() {
    let currentTarget = this.menuOptionBoundingRect;
    let menuDefaultHeight = 20;
    let quickMenuHeight = ((this.quickLinks.length * (menuDefaultHeight)) + 32) + this.quickLinks.length*16 + 3*16;
    let footerHeight = 0;
    let menuTopFromCurrentTarget = this.device.isMobile()? 38: 42;
    let menuLeftToCurrentTarget = this.device.isMobile()? 32: 36;
    let menuSpaceTopY = menuTopFromCurrentTarget + quickMenuHeight;
    let endBottomY = currentTarget.top + menuTopFromCurrentTarget + quickMenuHeight + footerHeight;
    let quickMenuWidth = 280;

    this.contextMenuPositionX = currentTarget.left + menuLeftToCurrentTarget - quickMenuWidth;
    if(endBottomY < window.innerHeight) {
      this.contextMenuPositionY = currentTarget.top + menuTopFromCurrentTarget;
    }
    else if(currentTarget.top > menuSpaceTopY) {
      let finalY = currentTarget.top - 6 - quickMenuHeight;
      this.contextMenuPositionY = finalY;
    }
    else {
      this.contextMenuPositionY = currentTarget.top + 36 - (quickMenuHeight/2);
    }
    this.isDisplayContextMenu = true;
    setTimeout(() => {
      this.casaAccounts[this.currentIndex].displayContextMenu = true;
      this._changeDetectorRef.detectChanges();
    }, 100);
  }

  setQuickMenuPosition() {
    let currentTarget = this.menuOptionBoundingRect;
    let menuDefaultHeight = 20;
    let gapCount = this.quickLinks?.slice(3)?.length == 4? 4: 7; 
    let hrCount = this.quickLinks?.slice(3)?.length == 4? 1: 2; 
    let quickMenuHeight = ((this.quickLinks?.slice(3)?.length * (menuDefaultHeight)) + 32 + (hrCount*15) + (gapCount*16));
    let footerHeight = 0;
    let menuTopFromCurrentTarget = this.device.isMobile()? 38: 42;
    let menuSpaceTopY = menuTopFromCurrentTarget + quickMenuHeight;
    let endBottomY = currentTarget.top + menuTopFromCurrentTarget + quickMenuHeight + footerHeight;

    if(endBottomY < window.innerHeight) {
      this.contextMenuPositionY = 64;
    }
    else if(currentTarget.top > menuSpaceTopY) {
      this.contextMenuPositionY =  - (quickMenuHeight);
    }
    else {
      this.contextMenuPositionY = -114;
    }
    this.isDisplayContextMenu = true;
    setTimeout(() => {
      this.casaAccounts[this.currentIndex].displayContextMenu = true;
      this._changeDetectorRef.detectChanges();
    }, 100);
  }

  /** context-menu */
  getContextMenuStyle() {
    return {
      position: 'Fixed',
      left: `${this.contextMenuPositionX}px`,
      top: `${this.contextMenuPositionY}px`,
    };
  }

  getContextQuickMenuStyle() {
    return {
      position: 'absolute',
      right: `24px`,
      top: `${this.contextMenuPositionY}px`,
    };
  }

  @HostListener('document:click', ['$event'])
  toggleProfile(event: any): void {
    this.isDisplayContextMenu = false;
    this.resetActiveMenu();
  }
  objectKeys(obj: any) {
    return Object.keys(obj);
  }

  prepareContextMenu(accountNumber:string){
    this.showSpinner();
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
  }

  getContextMenu(){
    this.hideSpinner();
    let contextMenu = JSON.parse(JSON.stringify(this._menuService.getMenuList(this._menuService.getAccountsMenuCodeByAccountType(this.currentAccount?.accountType))));

    // if(this.currentAccount?.accountCurrency == 'USD') {
    //   contextMenu = contextMenu.filter((item: any)=>item.serviceCode != 'RETAILMULTIBILLPAYMENT' && item.serviceCode != 'RETAILMULTIBILLREQUEST')
    // }
    // if (!this.device.isMobile()) {
    //   contextMenu = contextMenu.filter((item: any) => item.serviceCode != 'CHEQUEDEPOSIT');
    //   contextMenu = contextMenu.filter((item: any) => item.serviceCode != 'RETAILTRANSFERS' 
    //     && item.serviceCode != 'RETAILMULTIBILLPAYMENT' && item.serviceCode != 'RETAILETRANSFER' && item.serviceCode != 'RETAILMANAGEETRANSFERSENDMONEY' && item.serviceCode != 'RETAILMULTIBILLREQUEST');
    // }

    let serviceMenus = contextMenu;

    if(this.restrictedServices && this.restrictedServices.length){
      serviceMenus = contextMenu.filter((obj1:any) => !this.restrictedServices.find((obj2:any) => obj1.serviceCode == obj2.serviceCode));
    }

    this.quickLinks = serviceMenus;

    setTimeout(() => {
      this.casaAccounts[this.currentIndex].displayContextMenu = true;
      this._changeDetectorRef.detectChanges();
    }, 100);
    this.quickLinks.forEach((item: any) => {
      if (item.serviceCode == 'RETAILMULTIBILLPAYMENT' || item.serviceCode == 'RETAILETRANSFER' || item.serviceCode == 'RETAILTRANSFERS' || item.serviceCode == 'RETAILMULTIBILLREQUEST') {
        this.quickLinksGrpObject.payments.push(item);
    }
    else if(item.serviceCode == 'RETAILACCOUNT' || item.serviceCode == 'RETAILACCNICKNAME' || item.serviceCode == 'RETAILCHANGEPRODUCT'){
      this.quickLinksGrpObject.account.push(item);
    }
      else this.quickLinksGrpObject.product.push(item);
    });
    console.log(this.quickLinksGrpObject,"desktop")
    console.log(typeof(this.quickLinksGrpObject),"quickLinksGrpObject")

    // if (this.selectedAccountType !== 'CAA') {
    //   this.quickLinks = this.quickLinks.filter((item: any) => item.serviceCode !== 'RETAILSTOPCHEQUESUMMARY');
    // }



    // if(this.route?.snapshot?.queryParams?.['serviceCode'] && this.quickLinks.length > 0) {
    //   let menu = this.quickLinks.find((x: any)=>x.serviceCode == this.route?.snapshot?.queryParams?.['serviceCode'])
    //   this.openLink(menu);
    // }
    this.setQuickMenuPosition();
  }

  enabledServices = [
    'RETAILMULTIBILLREQUEST',
    'RETAILETRANSFER',
    'RETAILACCNICKNAME',
    'RETAILVOIDCHEQUE',
    'RETAILSTOPCHEQUE',
    'RETAILTRANSFERS'
  ]

  disableActions(event: any) {
    if(event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  openLink(menu: any, event?: any, account?: any) {
    console.log("menu", menu)
    console.log(account, "account")
    this._appConfig.setData('selectedAccountNicknameDetails', account);
  if(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  if(menu.serviceCode && this.enabledServices.includes(menu.serviceCode)) {
      this._activeSpaceInfoService.setOrginSpace("home");
      let service = this._appConfig.getServiceDetails(menu.serviceCode);
      this._activeSpaceInfoService.setAccountNumber(this.currentAccountNumber);
      let rid:number = Math.floor(Math.random() * 999999);
      if(menu.serviceCode == "RETAILVOIDCHEQUE"){
        this.onDownloadClick();
      } else if (menu.serviceCode == "RETAILTRANSFERS" || menu.serviceCode == "RETAILMULTIBILLREQUEST") {
        console.log(this.currentAccountNumber, "currentAccountNumber")
        this._appConfig.setData('selectedAccountFromSummary', account.accountNumber);
        this._router.navigate(service.servicePath);
      }
      else{
        this._router.navigate(service.servicePath, {
          queryParams: {
            rid: rid
          }
        });

    }
    this.isDisplayContextMenu = false;
    this.resetActiveMenu();
    }
  }

  resetActiveMenu() {
    this.casaAccounts?.forEach(element => {
      element.displayContextMenu = false;
    });
    this._changeDetectorRef.detectChanges();
  }

  showDormantInfoDesktop($event: any) {
    $event.stopPropagation();
    $event.preventDefault();
    this.showTooltip = !this.showTooltip;
  }

  openDormantInfo($event: any){
    $event.stopPropagation();
    $event.preventDefault();
    // this.showTooltip = !this.showTooltip;
    let modal = new FpxModal();
    modal.setComponent(DepTooltipComponent);
    modal.setPanelClass("dep-tooltip-popup");
    modal.setDisableClose(false);
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    modal.setData({
      // title: "RetailAccountDetailsForm.debitCardLimitToolTip.title",
      message: this.dormantInfo,

    });
    this.openModal(modal);
  }

  gotoAccounts(accountNumber: string) {
    if(this.device.isMobile()) this._activeSpaceInfoService.setModule('accounts');
    this._activeSpaceInfoService.setAccountNumber(accountNumber);
    this._router.navigate(['accounts-space']);
  }

  onDownloadClick(){
    let accountNumber = this.currentAccountNumber;
    this.showSpinner();
    this._commonService.downloadVoidCheque(accountNumber).subscribe({
      next: (response: any) => {
        this.hideSpinner();
        if (this.device.isHybrid()) {
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
        let errMsg :any;
        let titleMsg:any;
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
        // fpxModal.setAfterClosed(this.contextmenuModelAfterClose);
        this.openModal(fpxModal);
      }
    });   
  }

  onAccountChangeClick() {
    this._router.navigate(['accounts-space','entry-shell','accounts','retail-change-product-req-form']);
  }

  showQuickMenuTooltip(event: any, item: any, account: any) {
    this.casaAccounts.forEach(x=>x.showTooltip = false);
    account.showTooltip = account.showTooltip == undefined ? false : account.showTooltip;
    item.showTooltip = item.showTooltip == undefined ? false : item.showTooltip;
    event.stopPropagation();
    event.preventDefault();
    item.showTooltip = !item.showTooltip;
    account.showTooltip = !account.showTooltip;
    this._changeDetectorRef.detectChanges();
  }

}


