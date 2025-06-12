import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { defaultRoutes, mobileRoutes } from '../accounts-space-routing.module';
import { ActivatedRoute, Router } from '@angular/router';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { AccountsSpaceManager } from '../accounts-space.manager';
import { Deposits, DepositsSummary } from 'src/app/deposits/deposits-service/deposits.model';
import { AppConfigService } from '@dep/services';
import { Loans } from 'src/app/loans/loans-service/loans.model';
import { DepositsService } from 'src/app/deposits/deposits-service/deposits.service';
import { CasaaccountService } from 'src/app/foundation/casaaccount-service/casaaccount.service';
import { BaseFpxFunctionality, CriteriaQuery, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { AccountnicknameService } from 'src/app/accounts/accountnickname-service/accountnickname.service';
import { APPCONSTANTS } from '@dep/constants';
import { LoansService } from 'src/app/loans/loans-service/loans.service';
import { MembershipService } from 'src/app/membership/membership-service/membership.service';
import { Membership } from 'src/app/membership/membership-service/membership.model';

import { MatDialogRef } from '@angular/material/dialog';
import { DepositsMobQuickActionsComponent } from 'src/app/deposits/deposits-mob-quick-actions/deposits-mob-quick-actions.component';


@Component({
  selector: 'app-accounts-container',
  templateUrl: './accounts-container.component.html',
  styleUrls: ['./accounts-container.component.scss']
})
export class AccountsContainerComponent extends BaseFpxFunctionality implements OnInit, OnDestroy {

  @ViewChild('spaceHome', {read: ElementRef}) spaceHome!: ElementRef;
  protected _device:DeviceDetectorService = inject(DeviceDetectorService);
  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);
  protected appConstant: any = APPCONSTANTS;

  protected accountNavigator: string = '';
  protected activeTabIndex: number = 0;
  protected moduleHeaderTop: number = 0;
  protected casaAccountsList!: Casaaccount[];
  protected membershipAccountList!: Membership[];
  protected isReceivedAccounts: any = undefined;
  protected noTemplate: boolean = false;

  private tabs = ['accounts', 'deposits', 'loans', 'membership'];
  protected summary: any;
  highlightMenu: string = '';
  showTemplate: boolean = false;
  depositProducts: any;
  accountDetails: any;
  accountNickName: any;
  casaAccounts!: Casaaccount[];
  navTo: string = '';

  loanAccounts!: Loans[];
  depositAccounts!: Deposits[];
  memmbership!: Membership[];
  total: string | number = 0;
  casaAccountsApiFailed: boolean = false;
  asideBar: any;
  activeModuleCheck:any;
 protected isPopup:boolean = false;


  constructor( 
    private _router:Router, 
    protected _accountSpaceMgr: AccountsSpaceManager,
    private _appConfig: AppConfigService,
    private _commonService: CommonService,
    private route: ActivatedRoute,
    private _depositsService: DepositsService,
    private casaAccountService: CasaaccountService,
    private _accountnicknameService: AccountnicknameService,
    private _loansService: LoansService,
    private _membershipService: MembershipService,
    private _dialogRef: MatDialogRef<any>,
  ) {
    super();
    this.route.queryParams.subscribe(params => {
      let selecetedIndex: any = params['selecetedIndex'];
      if(selecetedIndex) this.activeTabIndex = selecetedIndex;
      this.navTo = params['navTo'];
      if(this.navTo == 'openNewCasa') {
        this.addNewAccount();
      }
    });
  }

  ngOnInit(): void {

    if(!APPCONSTANTS.requiredAccountsSpaceNavigation){
      APPCONSTANTS.headerNavBackRequired$.next({
        required: false,
        callback: this.onBackNav.bind(this)
      });
    }

    this._activeSpaceInfoService.setActiveSpace('accounts-space');

    if(!this._device.isMobile()){
      let moduleRefresh$:BehaviorSubject<any> = new BehaviorSubject<any>(null);
      this._appConfig.setData('moduleRefresh$', {
        "observable": moduleRefresh$.asObservable(),
        "subject": moduleRefresh$
      });
    }

    let accountDetailsData$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('accountDetailsData$', {
      "observable": accountDetailsData$.asObservable(),
      "subject": accountDetailsData$
    });


    if (!this._device.isMobile()) {
      let accountRefresh$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
      this._appConfig.setData('accountRefresh$', {
        "observable": accountRefresh$.asObservable(),
        "subject": accountRefresh$
        
      });


      let refreshAccountDetails$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
      this._appConfig.setData('refreshAccountDetails$', {
      "observable": refreshAccountDetails$.asObservable(),
      "subject": refreshAccountDetails$
      });
    }


    if(!this._device.isMobile()){
      let deleteRefresh$:BehaviorSubject<any> = new BehaviorSubject<any>(null);
      this._appConfig.setData('deleteRefresh$', {
        "observable": deleteRefresh$.asObservable(),
        "subject": deleteRefresh$
        
      });
    }

    let activeModule = this._activeSpaceInfoService.getActiveModule();
    if(this._device.isMobile()){
    activeModule = this._activeSpaceInfoService.getModule();
    this.activeModuleCheck=activeModule;
    } 
    this.activeTabIndex = this.tabs.indexOf(activeModule as string);
    let space = this._activeSpaceInfoService.getActiveSpace();
    if(!activeModule || activeModule == 'home'){
      if(space == 'accounts-space') {
        activeModule = 'accounts';
        this.activeModuleCheck=activeModule;
      }
    }
    this._activeSpaceInfoService.setActiveModule(activeModule as string);
    this.accountNavigator = activeModule as string;

    if(APPCONSTANTS.requiredAccountsSpaceNavigation){
      this._commonService.fetchAccountSummary().subscribe({
        next: (summary:any) => {
          this.summary = summary;
        }
      });
    } else {
      switch(activeModule){
        case "accounts":
          console.log("accounts module");
          this.getCasaAccountsDetails();
          break;
        case "deposits":
          console.log("deposits module");
          this.getDepositsDetails();
          break;
        case "loans":
          console.log("loans module");
          this.getLoanDetails();
          break;
        case "membership":
          console.log("membership module");
          this.getMembershipAccountDetails();
          break;
      }
    }
    
  }

  ngAfterViewInit(){
    setTimeout(()=>{
      this.moduleHeaderTop = -(this.spaceHome.nativeElement.offsetTop);
    });
  }

  ngOnDestroy(): void {
    console.log('Method not implemented.');
    APPCONSTANTS.headerNavBackRequired$.next({required:false});
    if(this._appConfig.hasData('moduleRefresh$')){
      this._appConfig.getData('moduleRefresh$').subject.unsubscribe();
      this._appConfig.removeData('moduleRefresh$');
    }
      if(this._device.isDesktop()){
        this._activeSpaceInfoService.setDepositAccountType('');
      }
    if (this._appConfig.hasData('showInvestmentSecurites$')) {
      this._appConfig.getData('showInvestmentSecurites$').subject.next({
        showInvestmentSecurites: false,
        depositAccount: ''
      });
    }
    if (this._appConfig.hasData('showInvestmentAccDetails$')) {
      this._appConfig.getData('showInvestmentAccDetails$').subject.next({
        showInvestmentAccDetails: false,
        depositAccount: ''
      });
    }

  }

  onTabChanged($event:any){
    this.isReceivedAccounts = undefined;
    // this.noTemplate = false;
    this.showTemplate = false;

    let module = this.tabs[$event.index];

    if(this._device.isMobile()) this._activeSpaceInfoService.setModule(module as any);
    else {
      this._activeSpaceInfoService.setActiveModule(module as string);
      this.accountNavigator = module;
      
      this._router.navigate([this._activeSpaceInfoService.getActiveSpace(), this.accountNavigator]);
    }
  }

  // getCasaAccountsDetails() {
  //   if (!this._device.isMobile()) {
  //     let cq = new CriteriaQuery();
  //     let accountNickName$ = this._accountnicknameService.findAll(cq)();
  //     let casaSummary$ = this.casaAccountService.fetchCasaAccounts();
  //     console.log(1, "CASA SUMMARY")
  //     combineLatest([accountNickName$, casaSummary$]).subscribe({
  //       next: ([nickName, accounts]) => {
  //         this.accountNickName = nickName.data;

  //         let tempCasaAccount: Casaaccount[] = []
  //         accounts?.forEach((item: Casaaccount) => {
  //           let itemNickname = this.accountNickName?.find((x: any) => item.accountNumber === x.accountNumber);
  //           if (itemNickname) {
  //             tempCasaAccount.push({ ...item, accountNickname: itemNickname?.nickName });
  //           }
  //           else {
  //             tempCasaAccount.push({ ...item });
  //           }
  //         });
  //         this.casaAccounts = tempCasaAccount;
  //         this.onCasaAccountReceivedHandler(tempCasaAccount);
  //       },
  //       error: (error) => {
  //         console.error("Error fetching CASA accounts:", error);
  //         this.casaAccountsApiFailed = true;

  //         // Reset received accounts
  //         // Optionally, you can show a user-friendly message or notification here
  //       }
  //     });
  //   }
  // }
  
getCasaAccountsDetails() {
    if (!this._device.isMobile()) {
      let cq = new CriteriaQuery();
      // let accountNickName$ = this._accountnicknameService.findAll(cq)();
      let casaSummary$ = this.casaAccountService.fetchCasaAccounts();
      console.log(1, "CASA SUMMARY")
      combineLatest([ casaSummary$]).subscribe({
        next: ([accounts]) => {
          // this.accountNickName = nickName.data;

          let tempCasaAccount: Casaaccount[] = []
          accounts?.forEach((item: Casaaccount) => {
            tempCasaAccount.push({ ...item });
          });
          this.casaAccounts = tempCasaAccount;
          this.onCasaAccountReceivedHandler(tempCasaAccount);
        },
        error: (error) => {
          console.error("Error fetching CASA accounts:", error);
          this.casaAccountsApiFailed = true;

          // Reset received accounts
          // Optionally, you can show a user-friendly message or notification here
        }
      });
    }
  }


  getDepositsDetails(){
    // this._depositsService.fetchDeposits().subscribe({
    //   next: (res: any) => {
    //     this.depositAccounts =  res || [];
        
    //     // let termDeposits = res?.termDeposits;
    //     // this.depositProducts = (termDeposits?.product)? termDeposits?.product: [];
    //     // this.depositAccounts = this.depositProducts?.[0]?.accountDetails || [];
    //     let x=this.depositAccounts;
    //     this.onDepositsReceivedHandler( this.depositAccounts)
    //   },
    //   error: (error: any) => {
    //     this.depositAccounts = [];
    //     this.onDepositsReceivedHandler(this.depositAccounts)
    //     console.log("Casa accounts fetch error");
    //   }
    // });

    let res: any= this._appConfig.getDepositsSummary();
    this.depositAccounts =  res || [];
    this.onDepositsReceivedHandler( this.depositAccounts)
  }
  getMembershipAccountDetails(){
    let cq = new CriteriaQuery();
    let accountNickName$ = this._accountnicknameService.findAll(cq)();
    let casaSummary$ = this._membershipService.fetchMemberShipAccounts();
    combineLatest([accountNickName$, casaSummary$]).subscribe({
      next: ([nickName, accounts]) => {
        this.accountNickName = nickName.data;
        
        let tempCasaAccount: Membership[] = []
        accounts?.forEach((item: Membership) => {
          let itemNickname = this.accountNickName?.find((x: any) => item.accountNumber === x.accountNumber);
          if(itemNickname){
            tempCasaAccount.push({ ...item, accountNickname: itemNickname?.nickName });
          }
          else{
            tempCasaAccount.push({ ...item});

          }
        });
        this.memmbership = tempCasaAccount;
        this.onMembershipAccountReceivedHandler(tempCasaAccount);
      }
    });
  }

  getLoanDetails() {
    this._loansService.fetchLoans().subscribe({
      next: (res: any) => {
        this.loanAccounts = (res?.length > 0) ? res : [];
        this.onLoanAccountReceivedHandler(this.loanAccounts)
      },
      error: (error: any) => {
        this.loanAccounts = [];
        this.onLoanAccountReceivedHandler(this.loanAccounts)
        console.log("Casa accounts fetch error");
      }
    });
  }

  onCasaAccountReceivedHandler(casaAccountsList:Casaaccount[]){
    if(casaAccountsList && casaAccountsList.length != 0){
      this._accountSpaceMgr.setCasaAccountsList(casaAccountsList);
      this.isReceivedAccounts = casaAccountsList;
    }
    else {
      this.isReceivedAccounts = [];
      if(this.navTo) {
        this.navTo = ''; 
      }
      else this.showTemplate = false;
    }
  }
  onMembershipAccountReceivedHandler(membershipAccountList:Membership[]){
    if(membershipAccountList && membershipAccountList.length != 0){
      this._accountSpaceMgr.setMembershipAccountsList(membershipAccountList);
      this.isReceivedAccounts = membershipAccountList;
    }
    else {
      this.isReceivedAccounts = [];
      if(this.navTo) {
        this.navTo = ''; 
      }
      else this.showTemplate = false;
    }
  }

  onDepositsReceivedHandler(depositsSummary:any){
    console.log("DepositSummary:", depositsSummary);
    if(depositsSummary && depositsSummary?.deposits?.length != 0){
      this.asideBar=this._activeSpaceInfoService.getDepositAccountType().toLocaleLowerCase();
      if(this.asideBar=='aviso'){
        this._accountSpaceMgr.setDeposits(depositsSummary.marketInvestments);
        this.isReceivedAccounts = depositsSummary.marketInvestments;
      }
      else if(this.asideBar=='qtrade'){
        this._accountSpaceMgr.setDeposits(depositsSummary.qtrade);
        this.isReceivedAccounts = depositsSummary.qtrade;
      }
      else{
        this._accountSpaceMgr.setDeposits(depositsSummary.deposits);
        this.isReceivedAccounts = depositsSummary.deposits;
      }
    }
    else {
      this.isReceivedAccounts = [];
      this.showTemplate = false;
    }
  }

  onLoanAccountReceivedHandler(loanSummary:Loans[]){
    console.log("DepositSummary:", loanSummary);
    if(loanSummary.length != 0){
      this._accountSpaceMgr.setLoans(loanSummary);
      this.isReceivedAccounts = loanSummary;
    }
    else {
      this.isReceivedAccounts = [];
      this.showTemplate = false;
    }
  }

  addNewAccount() {
    // this.highlightMenu = 'open-new-deposit';
    this.showTemplate = true;
    this.isReceivedAccounts = [];
    if(this.navTo) {
      return;
    }
    this._router.navigate(['accounts-space','entry-shell','accounts','retail-open-new-casa-form'],{
      queryParams:{
        routeFrom: 'otherModule',
        title:' Apply for CASA Account'
      }
    });
  }

  addNewDeposit() {
    this.highlightMenu = 'open-new-deposit';
    this.showTemplate = true;
    this.isReceivedAccounts = [];
    this._router.navigate(['accounts-space','entry-shell','deposits','retail-deposit-request-form'],{
      queryParams:{
        routeFrom: 'otherModule',
        title:'Open a New Deposit'
      }
    });
  }

  addNewLoan() {
    // this.highlightMenu = 'open-new-deposit';
    this.showTemplate = true;
    this.isReceivedAccounts = [];
    this._router.navigate(['accounts-space','entry-shell','accounts','retail-open-new-casa-form'],{
      queryParams:{
        routeFrom: 'otherModule',
        title:' Apply for CASA Account'
      }
    });
  }

  onActivate(component: any) {
    if(component.applyLoan) {
      this.showTemplate = false;
    }
    else this.showTemplate = true;
  }

  checkAccountData() {
    this.isReceivedAccounts = undefined;
    this.showTemplate = false;
    let cq = new CriteriaQuery();
    let accountNickName$ = this._accountnicknameService.findAll(cq)();
    let casaSummary$ = this.casaAccountService.fetchCasaAccounts();
    combineLatest([accountNickName$, casaSummary$]).subscribe({
      next: ([nickName, accounts]) => {
        this.accountNickName = nickName.data;
        
        let tempCasaAccount: Casaaccount[] = []
        accounts?.forEach((item: Casaaccount) => {
          let itemNickname = this.accountNickName?.find((x: any) => item.accountNumber === x.accountNumber);
          if(itemNickname){
            tempCasaAccount.push({ ...item, accountNickname: itemNickname?.nickName });
          }
          else{
            tempCasaAccount.push({ ...item});

          }
        });
        this.casaAccounts = tempCasaAccount;
        this.onCasaAccountReceivedHandler(this.casaAccounts);
      },
      error: (error) => {
        console.error("Error fetching CASA accounts:", error);
        this.casaAccountsApiFailed = true;

        // Reset received accounts
        // Optionally, you can show a user-friendly message or notification here
      }
    });
  }

  checkDepositData() {
    this.isReceivedAccounts = undefined;
    this.showTemplate = false;
    this._depositsService.fetchDeposits().subscribe({
      next: (response:any) => {
        let termDeposits = response?.termDeposits;
        this.depositProducts = (termDeposits?.product)? termDeposits?.product: [];
        this.accountDetails = this.depositProducts?.[0]?.accountDetails;

        let _currentProduct = this.depositProducts?.[0];
        _currentProduct?.accountDetails.map((obj:Deposits) => {
          obj.monthsCompletedPrecentage = (Number(obj.noOfMonthsCompleted) / Number(obj.depositTerm)) * 100;
          return obj;
        });
        this.onDepositsReceivedHandler(_currentProduct);
      },
      error: (err: any) => {
        console.log("Deposits product fetch failur!");
      }
    });
  }

  onBackNav(){
    this.goBack();
  }

  goBack(){
    if(this._accountSpaceMgr.getViewAll()){
      this._accountSpaceMgr.setViewAll(false);
    }
    else{
      this._router.navigate(['home']);
    }
  }

  newAccount() {

  }


    quickLinkActions(){
   let modal = new FpxModal();
         modal.setComponent(DepositsMobQuickActionsComponent);
         // modal.setPanelClass('dep-info-popup');
         modal.setPanelClass('context-menu-popup');
         // modal.setBackDropClass('dep-popup-back-drop');
         modal.setDisableClose(false);
         modal.setData({
           title: "Link account",
          // moreActionsList: this.moreMobileList
         });
         modal.setAfterClosed(this.onCloseMoreActionPopup);
         this.openModal(modal);
         this.isPopup = true;
  }

   onCloseMoreActionPopup: FpxModalAfterClosed = (menu: any) => {
      // if (menu) {
      //   this._activeSpaceInfoService.setAccountNumber('');
      //   this._activeSpaceInfoService.setModule('');
      //   let service = this._appConfig.getServiceDetails(menu.serviceCode || menu.id);
  
      //   if(service?.servicePath){
      //     // this._appConfig.activeMenuId = 'MOREACTIONS';
      //     this._appConfig.setData("activeMenuId", "MOREACTIONS");
      //     this._activeSpaceInfoService.setOrginSpace(service?.servicePath[0]);
      //     this._router.navigate(service?.servicePath);
      //   }
      // }
       this._dialogRef.close();
      this.isPopup = false;
    }


}
