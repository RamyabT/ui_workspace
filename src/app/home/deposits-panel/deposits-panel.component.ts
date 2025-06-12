import { ChangeDetectorRef, Component, EventEmitter, HostListener, inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService, CustomMenuService, LanguageService, UserAuthService } from '@dep/services';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { DepositsContextualMenuComponent } from 'src/app/deposits/deposits-contextual-menu/deposits-contextual-menu.component';
import { DepositsSummary, Deposits } from 'src/app/deposits/deposits-service/deposits.model';
import { DepositsService } from 'src/app/deposits/deposits-service/deposits.service';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { gsap } from "gsap";
import { AccountsSpaceManager } from 'src/app/accounts-space/accounts-space.manager';
import { CustomDatePipe } from 'src/app/common/pipe/custom-date/custom-date.pipe';
import moment from 'moment';

declare let $: any;
@Component({
  selector: 'app-deposits-panel',
  templateUrl: './deposits-panel.component.html',
  styleUrls: ['./deposits-panel.component.scss'],
  providers: [
    DepositsService,
    CustomDatePipe
  ]
})
export class DepositsPanelComponent extends BaseFpxFunctionality implements OnInit {
  @Output() onDepositsDataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
  protected _appConfig: AppConfigService = inject(AppConfigService);

  private restrictedServices:any;
  quickLinks: any;
  currentAccountNumber: string | undefined;

  contextMenuItems = [];
  contextMenuPositionX: number = 0;
  contextMenuPositionY: number = 0;
  isDisplayContextMenu: boolean = false;

  // depositProducts!:DepositsSummary[];
  accountDetails!: Deposits[];
  currentProduct!: DepositsSummary | any;
  depositsAccounts: Deposits[] | any;

  total: any = {
    totalCAD: 0,
    totalUSD: {
      amount: 0,
      accountCurrency: ''
    }
  };
  menuOptionBoundingRect: any;
  accountCurrency: string = '';
  currentIndex: any;
  depositApiFailed:boolean=false;
  depositsProductsKeys: string[] = [];
  depositsSummaryResponse: any
  depositsProducts: any = [
    {
      id: 'deposits',
      accountType: 'Non-Registered',
      accountTypeDesc: 'Non-Registered Term Deposits',
      products: [],
      total: {},
      showPanel: true
    },
    {
      id: 'tfsa',
      accountType: 'TFSA',
      accountTypeDesc: 'Tax-Free Savings Accounts',
      products: [],
      total: {},
      showPanel: true
    },
    {
      id: 'rrsp',
      accountType: 'RRSP',
      accountTypeDesc: 'Registered Retirement Savings Plans',
      products: [],
      total: {},
      showPanel: true
    },
    {
      id: 'rrif',
      accountType: 'RRIF',
      accountTypeDesc: 'Registered Retirement Income Fund',
      products: [],
      total: {},
      showPanel: true
    },
    {
      id: 'fhsa',
      accountType: 'FHSA',
      accountTypeDesc: 'First Home Savings Account',
      products: [],
      total: {},
      showPanel: true
    },  
    {
      id: 'marketInvestments',
      accountType: 'Aviso Wealth*',
      accountTypeDesc: 'Aviso Wealth - Direct Investing linked accounts ',
      products: [],
      total: {},
      showPanel: true
    },
    {
      id: 'qtrade',
      accountType: 'Qtrade',
      accountTypeDesc: 'Direct Investing Accounts',
      products: [],
      total: {},
      showPanel: true
    },
    
    
    
  ];
  totalProducts: any[] = [];
  birthDate:any;
  currentYear:any;
  age:any;


constructor(
    protected device:DeviceDetectorService,
    private _router: Router,
    private _depositsService: DepositsService,
    private _commonService: CommonService,
    private _menuService: CustomMenuService,
    protected languageService: LanguageService,
    private route: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _userauthServiec:UserAuthService,
    private customDatePipe:CustomDatePipe,
    protected _accountSpaceMgr: AccountsSpaceManager,
  ) {
    super();
   }

  ngOnInit(): void {
    let newDate = new Date();
    this.currentYear = new Date(newDate.setDate(newDate.getDate() + 1)).getFullYear();
    
    this._depositsService.fetchDeposits().subscribe({
      next: (response:any) => {
        if(response){
          this.depositsSummaryResponse=response
        }
        this.depositsAccounts = this.depositsProducts;
        this.depositApiFailed = false;
        this.depositsProducts.forEach((product:any) => {
          product.products = response?.[product.id] || [];
        });
        // this.depositsProductsKeys = Object.keys(this.depositsProducts);
        // for (var key of Object.keys(response)) {
        //   if(this.depositsAccounts) break;
        //   this.depositsAccounts = response?.[key].length > 0 ? response[key] : [];
        // }


        // this.depositsAccounts.map((obj:Deposits) => {
        //   obj.monthsCompletedPrecentage = (Number(obj.noOfMonthsCompleted) / Number(obj.depositTerm)) * 100;
        //   return obj;
        // });
        let customerDtls = this._userauthServiec.getCustomerDetails();
        if (customerDtls?.DOB) {
          this.birthDate = customerDtls.DOB;
          const birthYear = new Date(this.birthDate).getFullYear();
          this.age = this.currentYear - birthYear;
        }
        this.depositsProducts?.forEach((item:any, index:number) => {
          let totalCAD = 0;
          let totalUSD = 0;
          if (item.id == 'rrif') {
            if (this.age && this.age >= 71) {
              if (item.products.length == 0) {
                this.depositsProducts?.forEach((element: any, eindex: number) => {
                  if (element.id == 'rrsp') {
                    if (element.products.length == 0) {
                      element.showPanel = false;
                      item.showPanel = false;
                    }
                    else {
                      element.showPanel = true;
                      item.showPanel = true;
                    }
                  }
                })
              }
              else {
                // item.showPanel = true;
                this.depositsProducts?.forEach((element: any, eindex: number) => {
                  if (element.id == 'rrsp') {
                    if (element.products.length == 0) {
                      item.showPanel = true;
                      element.showPanel = false;
                    }
                    else {
                      item.showPanel = true;
                      element.showPanel = true;
                    }
                  }
                })
              }
            }
            else{
              item.showPanel = true;
               this.depositsProducts?.forEach((element: any, eindex: number) => {
                  if (element.id == 'rrsp') element.showPanel = true;
                  })
            }
          }
          
          
          // if(item.id!='marketInvestments'){
            item.products?.forEach((card:any) => { 
              this.totalProducts.push(card);
                if(card.accountCurrency != this._appConfig.baseCurrency) {
                  this.accountCurrency = card.accountCurrency;
                  totalUSD = totalUSD + parseFloat(card.baseCurrencyAvlBal);
                  totalCAD = totalCAD + (totalUSD?totalUSD:0);
                }
                else {
                  totalCAD = totalCAD + parseFloat(card.availableBalance);
                  }
            });
          // }
          // else{
          //   item.products?.forEach((card:any) => { 
          //     this.totalProducts.push(card);
          //       if(card.accountCurrency != this._appConfig.baseCurrency) {
          //         this.accountCurrency = card.accountCurrency;
          //         totalUSD = totalUSD + parseFloat(card.baseCurrencyAvlBal);
          //       }
          //       else {
          //         totalCAD = totalCAD + parseFloat(card.availableBalance);
          //         }
          //   });
          // }

          this.depositsProducts[index].total = {
            totalCAD: totalCAD.toFixed(2),
            totalUSD: {
              amount: totalUSD.toFixed(2),
              accountCurrency: this.accountCurrency
            }
          }

          if(item.total?.totalCAD) {
              this.total = {
                totalCAD: this.total?.totalCAD + parseFloat(item.total?.totalCAD),
                totalUSD: {
                amount:  this.total?.totalUSD?.amount + parseFloat(item.total?.totalUSD?.amount),
                accountCurrency: this.accountCurrency
              }
            }
          }
        });
        
        this.onDepositsDataReceived.emit({accounts:this.totalProducts,total:this.total});
        this._changeDetectorRef.detectChanges();
        setTimeout(() => {
          this.setupAccordionAnimation();
          this.accountsAccordionIndexes[0].play(); 
        }, 100);
      },
      error: (err) => {
        // console.log("Deposits product fetch failure!");
        // this.onDepositsDataReceived.emit({accounts: [], total: {totalCAD: '0.00', totalUSD: {amount: '0.00', accountCurrency: ''}}});
        this.depositsAccounts = [];
        this.depositApiFailed = true;
        this.onDepositsDataReceived.emit({accounts:[],total:{totalCAD: '0.00', totalUSD: {amount: '0.00', accountCurrency: ''}}, hasError: true});
        this._changeDetectorRef.detectChanges();
        setTimeout(() => {
          this.setupAccordionAnimation();
          this.accountsAccordionIndexes[0].play(); 
        }, 100);
      }
    });
    // this._depositsService.fetchDeposits().subscribe({
    //   next: (response:any) => {
    //     let termDeposits = response?.termDeposits;
    //     this.depositProducts = (termDeposits?.product)? termDeposits?.product: [];
    //     this.accountDetails = this.depositProducts?.[0]?.accountDetails || [];

    //     let _currentProduct = this.depositProducts?.[0];
    //     _currentProduct?.accountDetails.map((obj:Deposits) => {
    //       obj.monthsCompletedPrecentage = (Number(obj.noOfMonthsCompleted) / Number(obj.depositTerm)) * 100;
    //       return obj;
    //     });

    //     this.currentProduct = _currentProduct || [];

    //     let totalCAD = 0;
    //     let totalUSD = 0;
    //     if(this.currentProduct.accountDetails?.length > 0) {
    //       this.currentProduct.accountDetails?.forEach((card:any) => {
    //         if(card.accountType != 'Aviso') {
    //           if(card.accountCurrency != this._appConfig.baseCurrency) {
    //             this.accountCurrency = card.accountCurrency;
    //             totalUSD = totalUSD + parseInt(card.depositAmount);
    //           }
    //           else {
    //             totalCAD = totalCAD + parseInt(card.depositAmount);
    //           }
    //         }
    //         else {
    //           if(card.accountCurrency != this._appConfig.baseCurrency) {
    //             this.accountCurrency = card.accountCurrency;
    //             totalUSD = totalUSD + parseInt(card.marketValue);
    //           }
    //           else {
    //             totalCAD = totalCAD + parseInt(card.marketValue);
    //           }
    //         }
    //       });
    //       this.total = {
    //         totalCAD: totalCAD.toFixed(2),
    //         totalUSD: {
    //           amount: totalUSD.toFixed(2),
    //           accountCurrency: this.accountCurrency
    //         }
    //       }
    //     }
    //     this.onDepositsDataReceived.emit({accounts:this.currentProduct?.accountDetails,total:this.total});
    //   },
    //   error: (err) => {
    //     // console.log("Deposits product fetch failure!");
    //     // this.onDepositsDataReceived.emit({accounts: [], total: {totalCAD: '0.00', totalUSD: {amount: '0.00', accountCurrency: ''}}});
    //     this.currentProduct = [];
    //     this.depositApiFailed = true;
    //     this.onDepositsDataReceived.emit({accounts:[],total:{totalCAD: '0.00', totalUSD: {amount: '0.00', accountCurrency: ''}}});
    //   }
    // });
    this.quickLinks = [
      {
        id: "RETAILOPENNEWDEPOSIT",
        name: "Open New Fixed Deposit",
        icon: "apply-new-deposit"
      },
      {
        id: "RETAILCHNGMATURITYINSTR",
        name: "Change Maturity Instructions",
        icon: "change-maturity-instruction"
      },
   
    ];
  }
  private accountsAccordionIndexes: any = [];
  private opnedAccordionIndex = 0;
  setupAccordionAnimation() {
    this.accountsAccordionIndexes = new Array();

    this.depositsProducts.forEach((element: any, i: any) => {
      let accordionAnimation = gsap.timeline({ reversed: true, paused: true });
      let target = ".deposit-accordion-item-" + i;

      accordionAnimation.eventCallback("onStart", () => {
        $(target)[0]?.classList.remove('accordion-content-open');
      });

      accordionAnimation.eventCallback("onUpdate", () => {
        $(target)[0]?.classList.remove('accordion-content-open');
      });

      accordionAnimation.eventCallback("onComplete", () => {
        $(target)[0]?.classList.add('accordion-content-open');
      });

      accordionAnimation.eventCallback("onReverseComplete", () => {
        $(target)[0]?.classList.remove('accordion-content-open');
      });

      accordionAnimation.fromTo(target + " .item-content", {
        css: { height:0 }
      }, {
        css: { height: 'auto' }
      }, 0);
      
      accordionAnimation.fromTo(target + " .accordion-btn-toggle", {
        css: { rotationZ: 0 }
      }, {
        css: { rotationZ: -180 }
      }, 0);

      this.accountsAccordionIndexes[i] = accordionAnimation;

    },0);
  }

  toggleAccordion(index:number){
    let animation = this.accountsAccordionIndexes[this.opnedAccordionIndex];
    if(this.opnedAccordionIndex == index){

    } else if(this.opnedAccordionIndex >= 0){
      // if(this.device.isMobile()) {
      //   animation = this.accountsAccordionIndexes[this.opnedAccordionIndex]; 
      //   animation.reverse(); 
      // }
    }
    animation = this.accountsAccordionIndexes[index];
    if(animation?.reversed()) {
      animation.play();
      this.depositsProducts[index].accordianOpened = true;
    }
    else {
      animation.reverse();
      this.depositsProducts[index].accordianOpened = false;
    }
    this.opnedAccordionIndex = index;
    this._changeDetectorRef.detectChanges();
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
  showMoreActions(cardData: Deposits){
    let modal = new FpxModal();
    modal.setComponent(DepositsContextualMenuComponent);
    modal.setPanelClass('context-menu-popup');
    modal.setDisableClose(false);
    modal.setData({
      cardData: cardData,
      isMainProduct: true
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...");
  }

  /** Display context menu */
  displayContextMenu($event: any, deposit: Deposits, index?: number): void {
    $event.preventDefault();
    $event.stopPropagation()
    if(this.device.isMobile()) {
      this.showMoreActions(deposit);
      return;
    }
    this.menuOptionBoundingRect = $event.currentTarget?.getBoundingClientRect();
    this.currentAccountNumber = deposit.accountNumber;
    this.prepareContextMenu(deposit.accountNumber);
    this.currentIndex = index;
    this.resetActiveMenu();
  }

  resetActiveMenu() {
    this.currentProduct?.accountDetails?.forEach((element:any) => {
      element.displayContextMenu = false;
    });
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
      this.currentProduct.accountDetails[this.currentIndex].displayContextMenu = true;
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

  // @HostListener('document:click', ['$event'])
  // toggleProfile(event: Event): void {
  //   this.isDisplayContextMenu = false;
  //   this.resetActiveMenu();
  // }

  prepareContextMenu(accountNumber:string){
    if(this.route?.snapshot?.queryParams?.['serviceCode'] && this.quickLinks.length > 0) {
      let menu = this.quickLinks.find((x: any)=>x.id == this.route?.snapshot?.queryParams?.['serviceCode'])
      this.openLink(menu);
    }
    this.setMenuPosition();
  }

  openLink(menu:any){
    let service = this._appConfig.getServiceDetails(menu.id);
    // this._router.navigate(['accounts-space','entry-shell','deposits','link-investment-req-form']);

    setTimeout(()=>{
      this._router.navigate(service.servicePath, {
        queryParams: {
          accountNumber: this.currentAccountNumber
        }
      });
    });
    
  }

  newDeposit(event: any) {
    return;
    event.preventDefault();
    event.stopPropagation();
    this._router.navigate(['accounts-space','entry-shell','deposits']);
  }

  getAbsoluteValue(value: number | undefined): number {
    return value ? Math.abs(value) : 0;
  }

  checkNegativeValue(value: number | undefined): string {
    return value && value < 0 ? '-' : '';
  }

  gotoDeposits(product: any) {
    if(this.device.isMobile()) this._activeSpaceInfoService.setModule('deposits');
    this._appConfig.setDepositsSummary(this.depositsSummaryResponse)
    this._activeSpaceInfoService.setDepositAccountType(product.productCode);
    this._activeSpaceInfoService.setAccountNumber(product.accountNumber);
    if(product.productCode=='AVISO' || product.productCode=='QTRADE'){
      if(this.device.isMobile()){
        this._router.navigate(['accounts-space']);
      }
      else{
        this._router.navigate(['accounts-space','deposits']);
      }
    }
  }
}
