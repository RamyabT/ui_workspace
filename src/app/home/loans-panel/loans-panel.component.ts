import { ChangeDetectorRef, Component, EventEmitter, HostListener, inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService, CustomMenuService, LanguageService } from '@dep/services';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { LoanContextMenuComponent } from 'src/app/loans/loan-context-menu/loan-context-menu.component';
import { Loans } from 'src/app/loans/loans-service/loans.model';
import { LoansService } from 'src/app/loans/loans-service/loans.service';

@Component({
  selector: 'app-loans-panel',
  templateUrl: './loans-panel.component.html',
  styleUrls: ['./loans-panel.component.scss'],
  providers: [
    LoansService
  ]
})
export class LoansPanelComponent extends BaseFpxFunctionality implements OnInit {
  @Output() onLoansDataReceived:EventEmitter <any> = new EventEmitter<  any|null>();

  protected _appConfig: AppConfigService = inject(AppConfigService);
  loanAccounts!: Loans[];
  total: any = {};

  private restrictedServices:any;
  quickLinks: any;
  currentAccountNumber: string = "";

  contextMenuItems = [];
  contextMenuPositionX: number = 0;
  contextMenuPositionY: number = 0;
  isDisplayContextMenu: boolean = false;
  menuOptionBoundingRect: any;
  accountCurrency: string = '';
  currentIndex: any;
  loanAccountsApiFailed: boolean = false;

constructor(
    protected device:DeviceDetectorService,
    private _router: Router,
    private _loansService: LoansService,
    private _commonService: CommonService,
    private _menuService: CustomMenuService,
    protected languageService: LanguageService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    super()
  }

  ngOnInit(): void {
    this._loansService.fetchLoans().subscribe({
      next: (res: any) => {        
        this.loanAccounts = (res?.length > 0) ? res : [];

        let totalCAD = 0;
        let totalUSD = 0;
        if(this.loanAccounts.length > 0) {
          this.loanAccounts.forEach(card => {
            if(card.accountCurrency == this._appConfig.baseCurrency) {
              totalCAD = totalCAD + card.totalOutstanding;
            }
            else {
              this.accountCurrency = card.accountCurrency;
              totalUSD = totalUSD + card.totalOutstanding;
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
        this.onLoansDataReceived.emit({accounts:this.loanAccounts,total:this.total});
      },
      error: (error) => {
        // console.log("Casa accounts fetch error");
        // this.onLoansDataReceived.emit({accounts:[],total:{}});
        this.loanAccounts = [];
        this.loanAccountsApiFailed = true;
        this.onLoansDataReceived.emit({accounts:[],total:{totalCAD: '0.00', totalUSD: {amount: '0.00', accountCurrency: ''}}, hasError: true});
      }
    });
  }

  ngAfterViewInit(){
    
  }

  makePayment($event: any) {
    $event.preventDefault();
    $event.stopPropagation()
  }

  srRequest($event: any) {
    $event.preventDefault();
    $event.stopPropagation()
  }

  showMoreActions(cardData: Loans){
    let modal = new FpxModal();
    modal.setComponent(LoanContextMenuComponent);
    modal.setPanelClass('context-menu-popup');
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

  /** Display context menu */
  displayContextMenu($event: any, loan: Loans, index?: number): void {
    return;
    $event.preventDefault();
    $event.stopPropagation();
    if(this.device.isMobile()) {
      this.showMoreActions(loan);
      return;
    }
    this.menuOptionBoundingRect = $event.currentTarget?.getBoundingClientRect();
    this.currentAccountNumber = loan.loanAccountNumber;
    this.prepareContextMenu(loan.loanAccountNumber);
    this.currentIndex = index;
    this.resetActiveMenu();
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
      this.loanAccounts[this.currentIndex].displayContextMenu = true;
      this._changeDetectorRef.detectChanges();
    }, 100);
  }

  /** context-menu */
  getContextMenuStyle() {
    return {
      position: 'fixed',
      left: `${this.contextMenuPositionX}px`,
      top: `${this.contextMenuPositionY}px`,
    };
  }

  @HostListener('document:click', ['$event'])
  toggleProfile(event: Event): void {
    this.isDisplayContextMenu = false;
    this.resetActiveMenu();
  }

  resetActiveMenu() {
    this.loanAccounts?.forEach(element => {
      element.displayContextMenu = false;
    });
    this._changeDetectorRef.detectChanges();
  }

  getContextMenu(){
    this.hideSpinner();
    let contextMenu = this._menuService.getMenuList('LOANMENU');
    let serviceMenus = contextMenu;

    if(this.restrictedServices && this.restrictedServices.length){
      serviceMenus = contextMenu.filter((obj1:any) => !this.restrictedServices.find((obj2:any) => obj1.serviceCode == obj2.serviceCode));
    }

    this.quickLinks = serviceMenus;
    this.setMenuPosition();
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
        error: ()=> {
          this.getContextMenu();
        }
      });
    }
  }

  openLink(menu: any) {
    this._appConfig.setData('serviceCode', menu.serviceCode);
    this._activeSpaceInfoService.setAccountNumber(this.currentAccountNumber);
    let service = this._appConfig.getServiceDetails(menu.serviceCode);

    if (menu.serviceCode !== 'RETAILAPPLYLOAN') {
      setTimeout(() => {
        this._router.navigate(service.servicePath, {
          queryParams: {
            accountNumber: this.currentAccountNumber
          }
        });
      });
    } else if (menu.serviceCode === 'RETAILAPPLYLOAN') {
      if (this.device.isMobile()) {
        this._router.navigate(['accounts-space/apply-loan'])
      } else {
        this._router.navigate(['accounts-space/accounts/apply-loan'])
      }
    }

  }

  applyLoan() {
    if (this.device.isMobile()) {
      this._router.navigate(['accounts-space/apply-loan'])
    } else {
      this._router.navigate(['accounts-space/accounts/apply-loan'])
    }
  }

  gotoLoans(accountNumber: string) {
    return;
    this._activeSpaceInfoService.setAccountNumber(accountNumber);
    if(this.device.isMobile()) {
      this._activeSpaceInfoService.setModule('loans');
      this._router.navigate(['accounts-space']);
      
    }
    else {
      this._router.navigate(['accounts-space','loans']);
    }
   
  }

  newLoan(event: any) {
    return;
    event.preventDefault();
    event.stopPropagation();
    if (this.device.isMobile()) {
      this._router.navigate(['accounts-space/apply-loan'])
    } else {
      this._router.navigate(['accounts-space/accounts/apply-loan'])
    }
  }
  getAbsoluteValue(value: number | undefined): any {
    return value ? Math.abs(value) : 0;
  }

  checkNegativeValue(value: number | undefined): string {
    return value && value < 0 ? '' : '';
  }
}