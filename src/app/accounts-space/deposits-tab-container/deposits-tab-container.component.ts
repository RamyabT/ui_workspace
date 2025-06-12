import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService, CustomMenuService } from '@dep/services';
import { BaseFpxFunctionality, FpxActionMap, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Deposits, DepositsSummary } from 'src/app/deposits/deposits-service/deposits.model';
import { DepositsService } from 'src/app/deposits/deposits-service/deposits.service';
import { AccountsSpaceManager } from '../accounts-space.manager';
import { DepositsAccountsListComponent } from 'src/app/deposits/deposits-accounts-list/deposits-accounts-list.component';

@Component({
  selector: 'deposits-tab-container',
  templateUrl: './deposits-tab-container.component.html',
  styleUrls: ['./deposits-tab-container.component.scss'],
  providers: [DepositsService]
})
export class DepositsTabContainerComponent extends BaseFpxFunctionality implements OnInit {
  @Output('onAccountsReceived') onAccountsReceived: EventEmitter<DepositsSummary> = new EventEmitter();

  depositProducts!: DepositsSummary[];
  registerProducts!: DepositsSummary[];
  marketInvestments!: DepositsSummary[];
  qtrade: any;
  depositAccountsRoGrid: Subject<FpxActionMap> = new Subject();
  currentProduct!: DepositsSummary;
  accountDetails!: Deposits[];
  accountDetails1!: Deposits[];
  accountDetails2!: Deposits[];
  allDeposits: DepositsSummary[] = [];
  toggleMap$!: Subject<any>;
  selectedProduct: string = "TERMDEPOSIT"
  adsBannerSlids = [
    {
      id: '01',
      banner: './assets/images/banners/ads-banner1.jpg',
      content: 'Quick, <br>Easy, <br>Sure and Digital'
    },
    {
      id: '02',
      banner: './assets/images/banners/ads-banner2.jpg',
      content: 'Reach financial freedom with tailored investment'
    },
    {
      id: '03',
      banner: './assets/images/banners/ads-banner3.jpg',
      content: '<h4 class="h4">Personal loan</h4> for any purpose'
    }
  ]

  onDataFetching: boolean = true;
  productsList: any;
  activeProduct: string = "";
  depositsGroup: any = [];
  accountsRoGirdList: any;
  accountsSummaryList$: Subject<FpxActionMap> = new Subject();
  currentCard: any;
  showCard : boolean = true;
  accountNumber: string = '';
  cardReady: boolean = false;
  depositSummary: any;
  selecetdAccountNumber: any;
  selectedAccount: any;
  quickMenus: any[] = [];

  constructor(
    private _depositsService: DepositsService,
    private _router: Router,
    private _appConfig: AppConfigService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _menuService: CustomMenuService,
    protected _deviceMgr: DeviceDetectorService,
    protected _accountSpaceMgr: AccountsSpaceManager,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getQuickActions('menuCode');

    let depositActionPublisher$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('depositActionPublisher$', {
      "observable": depositActionPublisher$.asObservable(),
      "subject": depositActionPublisher$
    });

    if (this._appConfig.hasData("toggleMap$")) {
      this.toggleMap$ = this._appConfig.getData("toggleMap$").subject;
    }

    this.onDataFetching = true;
    

    let _productsList: DepositsSummary[] = [];
    let response: any = this._accountSpaceMgr.getDeposits();
    let getDepositAccountType =this._activeSpaceInfoService.getDepositAccountType().toLocaleLowerCase();
    if(getDepositAccountType=='aviso'){
      response.marketInvestments=response;
    }
    if(getDepositAccountType=='qtrade'){
      response.marketInvestments=response;
    }

    let termDeposits: any = response?.termDeposits;
    let registeredProducts: any = response?.registeredProducts;
    let marketInvestments: any = response?.marketInvestments;
    let qtrade: any = response?.qtrade;

    if (termDeposits && termDeposits?.product) {
      termDeposits.hasContextMenu = true;
      this.depositProducts = termDeposits?.product || [];
      _productsList.push(...this.depositProducts);
    }

    if (marketInvestments) {
      marketInvestments.hasContextMenu = false;
      this.marketInvestments = marketInvestments || [];
      _productsList.push(...this.marketInvestments);
    }
    if (qtrade) {
      qtrade.hasContextMenu = false;
      this.qtrade = qtrade || [];
      _productsList.push(...this.qtrade);
    }

    if (registeredProducts && registeredProducts?.product) {
      registeredProducts.hasContextMenu = true;
      this.registerProducts = registeredProducts.product || [];
      _productsList.push(...this.registerProducts);
    }

    // _productsList.map((product: DepositsSummary) => {
    //   product.accountDetails.map((account: Deposits) => {
    //     account.accountType = account.accountType?.replaceAll(/\s/g, '').toLowerCase();
    //     return account;
    //   });
    //   product.accountType = product.accountDetails[0].accountType;
    //   return product;
    // });

    this.productsList = _productsList;
    this.onAccountsReceived.emit(this.productsList);
    

    this.onDataFetching = false;

    this._activeSpaceInfoService.setdepositList(response)
    // this.accountDetails = this.depositProducts?.[0]?.accountDetails || [];
    
    this.accountsSummaryList$.next({
      action: 'SETGRIDDATA',
      value: this.productsList[0],
      nestedControl: '',
      rowIndex: undefined
    });

    if(this._deviceMgr.isDesktop()){
      // this.refreshContainer(this.productsList[0]);
    }



    // this._depositsService.fetchDeposits().subscribe({
    //   next: (response: any) => {

    //     let _productsList: DepositsSummary[] = [];

    //     let termDeposits: any = response?.termDeposits;
    //     let registeredProducts: any = response?.registeredProducts;
    //     let marketInvestments: any = response?.marketInvestments;

    //     if (termDeposits && termDeposits?.product) {
    //       termDeposits.hasContextMenu = true;
    //       this.depositProducts = termDeposits?.product || [];
    //       _productsList.push(...this.depositProducts);
    //     }

    //     if (marketInvestments && marketInvestments?.product) {
    //       marketInvestments.hasContextMenu = false;
    //       this.marketInvestments = marketInvestments.product || [];
    //       _productsList.push(...this.marketInvestments);
    //     }

    //     if (registeredProducts && registeredProducts?.product) {
    //       registeredProducts.hasContextMenu = true;
    //       this.registerProducts = registeredProducts.product || [];
    //       _productsList.push(...this.registerProducts);
    //     }

    //     _productsList.map((product: DepositsSummary) => {
    //       product.accountDetails.map((account: Deposits) => {
    //         account.accountType = account.accountType?.replaceAll(/\s/g, '').toLowerCase();
    //         return account;
    //       });
    //       product.accountType = product.accountDetails[0].accountType;
    //       return product;
    //     });

    //     this.productsList = _productsList;
        

    //     this.onDataFetching = false;

    //     this._activeSpaceInfoService.setdepositList(this.allDeposits)
    //     this.accountDetails = this.depositProducts?.[0]?.accountDetails || [];
        
    //     this.accountsSummaryList$.next({
    //       action: 'SETGRIDDATA',
    //       value: this.productsList[0]?.accountDetails,
    //       nestedControl: '',
    //       rowIndex: undefined
    //     });

    //     if(this._deviceMgr.isDesktop()){
    //       this.refreshContainer(this.productsList[0]);
    //     }

    //   },
    //   error: (err) => {
    //     console.log("Deposits product fetch failure!");
    //   }
    // });
  }

  ngAfterViewInit() {
    this.depositSummary =  this._accountSpaceMgr.getDeposits();
    let accountNumber: string = this._activeSpaceInfoService.getAccountNumber();
    if (!accountNumber) {
      accountNumber = this.depositSummary[0].accountNumber;
    }

    this.selecetdAccountNumber = accountNumber;

    let selectedAccount = this.depositSummary.filter((item: any) => item.accountNumber === this.selecetdAccountNumber);
    this.selectedAccount = selectedAccount[0];

    console.log(this.selectedAccount)

    // if (this.appConfig.hasData('accountDetailsData$')) {
    //   this.appConfig.getData('accountDetailsData$').subject.next({ action: 'ACCOUNTDETAILSDATA', data: { accountDetails: this.selectedAccount } });
    // }

  }

  // refreshContainer(_currentProduct: any) {
  //   _currentProduct?.accountDetails.map((obj: Deposits) => {
  //     obj.monthsCompletedPrecentage = (Number(obj.noOfMonthsCompleted) / Number(obj.depositTerm)) * 100;
  //     return obj;
  //   });

  //   this.currentProduct = _currentProduct || [];
  //   if (this._deviceMgr.isMobile()) {

  //     let data = this.currentProduct
  //     this._activeSpaceInfoService.setAccountType(data.accountDetails[0].accountType);
  //     this._activeSpaceInfoService.setAccountNumber(data.accountDetails[0].accountNumber);
  //     setTimeout(() => {

  //       this.depositAccountsRoGrid.next({
  //         action: 'SETGRIDDATA',
  //         value: this.currentProduct.accountDetails,
  //         nestedControl: '',
  //         rowIndex: undefined
  //       });
  //     });
  //   } else {
  //     this.onAccountsReceived.emit(this.currentProduct);
  //     let serviceCode: any = 'RETAILDEPOSIT';
  //     let depositProductType = 'deposits';
  //     if (this._appConfig.hasData('depositActionPublisher$')) {
        
  //       if (this.currentProduct.productDesc == 'Aviso') {
  //         depositProductType = 'aviso';
  //         serviceCode = 'RETAILMARKETINGINVESTMENT';
  //       }
  //       else if (this.currentProduct.productDesc == 'Registered Products') {
  //         depositProductType = 'registeredproducts';
  //         serviceCode = 'RETAILREGISTEREDPRODUCTS';
  //       }
  //       this._appConfig.getData('depositActionPublisher$').subject.next({ action: 'REFRESHCONTAINER', data: this.currentProduct, depositProductType: depositProductType });
  //     }
  //     serviceCode = 'RETAILDEPOSIT';
  //     let servicePath: any = this._appConfig.getServiceDetails(serviceCode).servicePath;
  //     this._router.navigate(servicePath);
  //   }
  //   this.setDepositQuickAction(this.currentProduct.productDesc);
  // }

  // setDepositQuickAction(accountType: string = "") {
  //   let quickLinks: any = [];
    
  //   if (accountType == 'Aviso') quickLinks = this.getQuickActions('AVISOMENU');
  //   else if (accountType == 'Registered Products') {
  //     quickLinks = this.getQuickActions('REGPRODMENU');
  //   }
  //   else quickLinks = this.getQuickActions('TERMDEPOSITMENU');

  //   this._appConfig.setData('depositAccountType', accountType);
  //   this._appConfig.setData('depositQuickActions', quickLinks);
  // }

  // onSelectCard(cardEvent: any) {
  //   let data = cardEvent;
  //   this.currentCard=cardEvent;
  //   this.showCard=true;
  //   if(!this._deviceMgr.isDesktop()){
  //     this.accountsSummaryList$.next({
  //       action: 'SETGRIDDATA',
  //       value: data || [],
  //       nestedControl: '',
  //       rowIndex: undefined
  //     });
      
  //     this._appConfig.setData('depositAccountType', data?.productDesc);
  //     this.setDepositQuickAction(data?.productDesc);
  //   }
  // }
  onSelectCard(cardEvent: any) {
    this.currentCard = cardEvent;
    this.showCard = true;
    this.accountNumber = cardEvent?.accountNumber;
    this.cardReady = true;
    this._activeSpaceInfoService.setAccountNumber(this.accountNumber);
  }

  getInverstmentAmount(product: DepositsSummary) {
    let inverstedAmount = product.accountDetails.reduce((accumulator: number, currentObj: { depositAmount: any; }) => {
      return accumulator + Number(currentObj.depositAmount);
    }, 0);
    return inverstedAmount;
  }

  getInverstmentRegAmount(product: any) {
    let inverstedAmount = product.accountDetails.reduce((accumulator: number, currentObj: { principalAmount: any }) => {
      return accumulator + Number(currentObj.principalAmount);
    }, 0);
    return inverstedAmount;
  }

  getMarketInvestmentAmount(product: any) {
    let inverstedAmount = product.accountDetails.reduce((accumulator: number, currentObj: { totalMarketValue: any }) => {
      return accumulator + Number(currentObj.totalMarketValue);
    }, 0);
    return inverstedAmount;
  }

  selectProduct(product: any) {

    // this.refreshContainer(product);

    // if (product.productDesc == "Registered Products") {
    //   this.selectedProduct = "REGISTERPRODUCTS"
    // } else if (product.productDesc == "Aviso") {
    //   this.selectedProduct = "AVISO"
    // }
    // else {
    //   this.selectedProduct = "TERMDEPOSIT"
    // }
    // this.setDepositQuickAction(product.productDesc);
  }

  getQuickActions(menuCode: string): any {
    let contextMenu = this._menuService.getMenuList(menuCode);
    // return (contextMenu && contextMenu.length) ? contextMenu : [];
    // let serviceMenus = (contextMenu && contextMenu.length) ? contextMenu : [];
    let serviceMenus: any=[
      {
        "id": "AVISOMENU",
        "name": "RETAILAVISOMENU",
        "serviceCode": "RETAILDEPOSIT",
        "serviceDescription": "Account Details"
      }
    ]
    
    this.quickMenus = serviceMenus;
  }

  openNewDeposit() {
    this._router.navigate(['accounts-space', 'entry-shell', 'deposits', 'retail-deposit-request-form'])
  }


  ngOnDestroy() {
    // destory the depositActionPublisher
    if (this._depositsService.depositActionPublisher) {
      this._depositsService.depositActionPublisher?.unsubscribe();
    }
  }
  viewAll() {
    let selectedAccount: any;
    if (this.currentCard?.accountNumber) {
      selectedAccount = this.currentCard;
    }
    else {
      selectedAccount = this.productsList[0];
    }

    this.showCard = false;
    let modal = new FpxModal();
    modal.setComponent(DepositsAccountsListComponent);
    modal.setPanelClass('full-view-popup');
    modal.setBackDropClass(['dep-popup-back-drop', 'accounts-list-popup-back-drop', 'mobile-all-accounts-list']);
    modal.setDisableClose(true);
    modal.setData({
      title: 'Aviso Wealth*',
      depositsList: this.productsList ,
      selectedAccount: selectedAccount,
      fromAccountsModule: true
    });
    modal.setAfterClosed(this.accountSelectedAfterClose);
    this.openModal(modal)
  }
  accountSelectedAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log(payload)

    if (payload.action === 1) {
      this._activeSpaceInfoService.setAccountNumber(payload.data.accountNumber);
      this.onSelectCard(payload.data);
    } else {
      this.showCard = true;
    }
  }

}
